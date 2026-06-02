#!/usr/bin/env python3
"""
Extract Monday data from Snowflake.

Filters rows where the given date column falls on a Monday, or runs a custom SQL.
Uses env: SNOWFLAKE_ACCOUNT, SNOWFLAKE_USER, SNOWFLAKE_PASSWORD (or SNOWFLAKE_PRIVATE_KEY_PATH),
SNOWFLAKE_WAREHOUSE, SNOWFLAKE_DATABASE, SNOWFLAKE_SCHEMA.
"""

import os
import sys
from pathlib import Path

try:
    import snowflake.connector
except ImportError:
    print("Install with: pip install 'snowflake-connector-python[pandas]'", file=sys.stderr)
    sys.exit(1)


def get_connection():
    """Build Snowflake connection from environment."""
    account = os.environ.get("SNOWFLAKE_ACCOUNT")
    user = os.environ.get("SNOWFLAKE_USER")
    password = os.environ.get("SNOWFLAKE_PASSWORD")
    warehouse = os.environ.get("SNOWFLAKE_WAREHOUSE", "")
    database = os.environ.get("SNOWFLAKE_DATABASE", "")
    schema = os.environ.get("SNOWFLAKE_SCHEMA", "")

    if not account or not user:
        print("Set SNOWFLAKE_ACCOUNT and SNOWFLAKE_USER (and SNOWFLAKE_PASSWORD or key auth).", file=sys.stderr)
        sys.exit(1)

    conn_params = {
        "account": account,
        "user": user,
        "warehouse": warehouse,
        "database": database,
        "schema": schema,
    }
    if password:
        conn_params["password"] = password
    else:
        private_key_path = os.environ.get("SNOWFLAKE_PRIVATE_KEY_PATH")
        if private_key_path and Path(private_key_path).exists():
            from cryptography.hazmat.primitives import serialization
            from cryptography.hazmat.backends import default_backend
            with open(private_key_path, "rb") as f:
                p_key = serialization.load_pem_private_key(f.read(), password=None, backend=default_backend())
            conn_params["private_key"] = p_key
        else:
            print("Set SNOWFLAKE_PASSWORD or SNOWFLAKE_PRIVATE_KEY_PATH.", file=sys.stderr)
            sys.exit(1)

    return snowflake.connector.connect(**conn_params)


def sql_mondays_only(table: str, date_column: str, schema: str | None = None, database: str | None = None) -> str:
    """Generate SQL that selects rows where date_column is a Monday.
    In Snowflake, DAYOFWEEK returns 0 for Monday (default).
    """
    full_name = ".".join(filter(None, [database, schema, table]))
    return f"""
    SELECT *
    FROM {full_name}
    WHERE DAYOFWEEK({date_column}) = 0
    ORDER BY {date_column}
    """


def main():
    import argparse
    parser = argparse.ArgumentParser(description="Extract Monday data from Snowflake")
    parser.add_argument("--table", "-t", help="Table name (e.g. MY_TABLE)")
    parser.add_argument("--date-column", "-d", default="DATE", help="Date/timestamp column name (default: DATE)")
    parser.add_argument("--schema", "-s", help="Schema (default: from SNOWFLAKE_SCHEMA env)")
    parser.add_argument("--database", "-db", help="Database (default: from SNOWFLAKE_DATABASE env)")
    parser.add_argument("--sql", "-q", help="Run this SQL instead of auto Monday filter")
    parser.add_argument("--output", "-o", help="Output CSV path (default: stdout)")
    parser.add_argument("--format", "-f", choices=["csv", "json"], default="csv", help="Output format")
    args = parser.parse_args()

    if not args.sql and not args.table:
        parser.error("Provide --table or --sql")

    conn = get_connection()
    try:
        if args.sql:
            query = args.sql
        else:
            query = sql_mondays_only(
                args.table,
                args.date_column,
                schema=args.schema or os.environ.get("SNOWFLAKE_SCHEMA"),
                database=args.database or os.environ.get("SNOWFLAKE_DATABASE"),
            ).strip()

        cursor = conn.cursor()
        cursor.execute(query)

        try:
            df = cursor.fetch_pandas_all()
        except Exception:
            rows = cursor.fetchall()
            col_names = [d[0] for d in cursor.description]
            import pandas as pd
            df = pd.DataFrame(rows, columns=col_names)

        if df.empty:
            print("No rows returned.", file=sys.stderr)
        else:
            if args.output:
                if args.format == "csv":
                    df.to_csv(args.output, index=False)
                else:
                    df.to_json(args.output, orient="records", lines=False, indent=2)
                print(f"Wrote {len(df)} rows to {args.output}", file=sys.stderr)
            else:
                if args.format == "csv":
                    print(df.to_csv(index=False))
                else:
                    print(df.to_json(orient="records", indent=2))
    finally:
        conn.close()


if __name__ == "__main__":
    main()

from __future__ import annotations

import os
import subprocess
from pathlib import Path
from urllib.parse import urlparse

from app.core.config import settings


class RestoreService:

    @staticmethod
    def restore_backup(backup_file: str) -> dict:

        backup_path = Path(backup_file)

        if not backup_path.exists():
            raise FileNotFoundError(
                f"Backup file not found: {backup_file}"
            )

        db_url = settings.DATABASE_URL.replace(
            "postgresql+asyncpg",
            "postgresql",
        )

        parsed = urlparse(db_url)

        command = [
            "pg_restore",
            "--clean",
            "--if-exists",
            "-h",
            parsed.hostname or "localhost",
            "-p",
            str(parsed.port or 5432),
            "-U",
            parsed.username or "",
            "-d",
            parsed.path.lstrip("/"),
            str(backup_path),
        ]

        env = os.environ.copy()

        if parsed.password:
            env["PGPASSWORD"] = parsed.password

        result = subprocess.run(
            command,
            env=env,
            capture_output=True,
            text=True,
        )

        if result.returncode != 0:
            raise RuntimeError(result.stderr)

        return {
            "success": True,
            "restored_from": str(backup_path),
        }

from __future__ import annotations

import os
import subprocess
from datetime import datetime
from pathlib import Path
from urllib.parse import urlparse

from app.core.config import settings


class BackupService:
    @staticmethod
    def create_backup() -> dict:
        backup_dir = settings.BACKUP_DIR
        backup_dir.mkdir(parents=True, exist_ok=True)

        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"salonflow_{timestamp}.dump"
        backup_file = backup_dir / filename

        db_url = settings.DATABASE_URL.replace(
            "postgresql+asyncpg",
            "postgresql",
        )

        parsed = urlparse(db_url)

        command = [
            "pg_dump",
            "-h",
            parsed.hostname or "localhost",
            "-p",
            str(parsed.port or 5432),
            "-U",
            parsed.username or "",
            "-F",
            "c",
            "-f",
            str(backup_file),
            parsed.path.lstrip("/"),
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
            "filename": filename,
            "path": str(backup_file),
            "size": backup_file.stat().st_size,
            "created_at": datetime.now().isoformat(),
        }

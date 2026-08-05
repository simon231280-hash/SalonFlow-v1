from fastapi import APIRouter, Depends, HTTPException

from app.api.dependencies import require_admin
from app.models.user import User
from app.services.backup_service import BackupService

router = APIRouter(
    prefix="/backup",
    tags=["Backup"],
)


@router.post("/")
async def create_backup(
    current_user: User = Depends(require_admin),
):
    try:
        return BackupService.create_backup()
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )

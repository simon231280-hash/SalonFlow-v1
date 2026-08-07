from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from app.api.dependencies import require_admin
from app.models.user import User
from app.services.backup_service import BackupService
from app.services.restore_service import RestoreService

router = APIRouter(
    prefix="/backup",
    tags=["Backup"],
)


class RestoreRequest(BaseModel):
    backup_file: str


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


@router.post("/restore")
async def restore_backup(
    request: RestoreRequest,
    current_user: User = Depends(require_admin),
):
    try:
        return RestoreService.restore_backup(
            request.backup_file
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )

"""remove old appointment service_id

Revision ID: b081b73da885
Revises: fa4ccdccd3c7

"""

from typing import Sequence, Union

from alembic import op


revision: str = "b081b73da885"
down_revision: Union[str, Sequence[str], None] = "fa4ccdccd3c7"

branch_labels = None
depends_on = None


def upgrade() -> None:
    op.drop_column(
        "appointments",
        "service_id",
    )


def downgrade() -> None:
    pass

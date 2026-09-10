"""extend models

Revision ID: 001_extend_models
Revises: 
Create Date: 2026-08-15 11:10:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '001_extend_models'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    with op.batch_alter_table('farmer_fields', schema=None) as batch_op:
        batch_op.add_column(sa.Column('acreage', sa.Float(), nullable=True))
        batch_op.add_column(sa.Column('current_crop', sa.String(length=100), nullable=True))
        batch_op.add_column(sa.Column('irrigation_type', sa.String(length=100), nullable=True))
        
    with op.batch_alter_table('disease_detections', schema=None) as batch_op:
        batch_op.add_column(sa.Column('crop_name', sa.String(length=100), nullable=True))


def downgrade() -> None:
    with op.batch_alter_table('disease_detections', schema=None) as batch_op:
        batch_op.drop_column('crop_name')

    with op.batch_alter_table('farmer_fields', schema=None) as batch_op:
        batch_op.drop_column('irrigation_type')
        batch_op.drop_column('current_crop')
        batch_op.drop_column('acreage')

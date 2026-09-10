"""Add one-time OTP registration grants.

Revision ID: 002_otp_registration_grants
Revises: 001_extend_models
"""
from alembic import op
import sqlalchemy as sa


revision = "002_otp_registration_grants"
down_revision = "001_extend_models"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "otp_registration_grants",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("phone_number", sa.String(length=50), nullable=False, unique=True),
        sa.Column("token_hash", sa.String(length=64), nullable=False),
        sa.Column("expires_at", sa.DateTime(), nullable=False),
        sa.Column("used_at", sa.DateTime(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False),
    )
    op.create_index("ix_otp_registration_grants_phone_number", "otp_registration_grants", ["phone_number"])


def downgrade() -> None:
    op.drop_index("ix_otp_registration_grants_phone_number", table_name="otp_registration_grants")
    op.drop_table("otp_registration_grants")

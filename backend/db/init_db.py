import os
import logging
from db.session import engine, Base
from db.models import *

logger = logging.getLogger(__name__)

def init_db():
    if os.getenv("DATABASE_URL", "").startswith("postgresql"):
        logger.warning("Using PostgreSQL in production. It is recommended to use Alembic for migrations instead of Base.metadata.create_all.")
    
    # Never drop tables
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    init_db()

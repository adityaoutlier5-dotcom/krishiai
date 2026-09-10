import os
import sys
import unittest

from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from main import app
from api.auth import limiter
from db.models import ActivityLog, MediaAsset, SiteContent, User, UserSession
from db.session import Base, get_db
from services.auth_service import hash_password


TEST_DB_URL = "sqlite:///./test_admin.db"
engine = create_engine(TEST_DB_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


class AdminAuthorizationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        Base.metadata.create_all(bind=engine)
        if limiter:
            limiter.enabled = False
        cls.client = TestClient(app, base_url="https://testserver")

    @classmethod
    def tearDownClass(cls):
        Base.metadata.drop_all(bind=engine)
        engine.dispose()
        if os.path.exists("./test_admin.db"):
            os.remove("./test_admin.db")

    def setUp(self):
        app.dependency_overrides[get_db] = override_get_db
        db = TestingSessionLocal()
        for table in (ActivityLog, MediaAsset, SiteContent, UserSession, User):
            db.query(table).delete()
        db.add_all([
            User(name="Farmer", email="farmer@example.com", phone_number="9000000001", password_hash=hash_password("password123"), provider="email", role="Farmer", is_active=True),
            User(name="Owner", email="owner@example.com", phone_number="9000000002", password_hash=hash_password("password123"), provider="email", role="Admin", is_active=True),
        ])
        db.commit()
        db.close()
        self.client.cookies.clear()

    def tearDown(self):
        app.dependency_overrides.clear()

    def login(self, email):
        response = self.client.post("/api/auth/login", json={"email": email, "password": "password123"})
        self.assertEqual(response.status_code, 200)

    def test_logged_out_user_is_rejected_from_admin_api(self):
        response = self.client.get("/api/admin/overview")
        self.assertEqual(response.status_code, 401)

    def test_normal_user_is_rejected_from_every_admin_api(self):
        self.login("farmer@example.com")
        self.assertEqual(self.client.get("/api/admin/overview").status_code, 403)
        self.assertEqual(self.client.put("/api/admin/content/en/hero.title", json={"value": "Not allowed"}).status_code, 403)

    def test_owner_can_manage_published_english_content(self):
        self.login("owner@example.com")
        self.assertEqual(self.client.get("/api/admin/overview").status_code, 200)
        response = self.client.put("/api/admin/content/en/hero.title", json={"value": "Owner-managed English title", "is_published": True})
        self.assertEqual(response.status_code, 200)
        public_response = self.client.get("/api/content/en")
        self.assertEqual(public_response.status_code, 200)
        self.assertEqual(public_response.json()["hero.title"], "Owner-managed English title")

    def test_owner_can_manage_published_hindi_content(self):
        self.login("owner@example.com")
        response = self.client.put("/api/admin/content/hi/hero.title", json={"value": "मालिक द्वारा अपडेट किया गया शीर्षक", "is_published": True})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.client.get("/api/content/hi").json()["hero.title"], "मालिक द्वारा अपडेट किया गया शीर्षक")


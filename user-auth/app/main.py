# app/ main.py
from fastapi import FastAPI
from app.database import Base, engine
from app.routes import auth
from app.models import user as user_model
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # hoặc thay bằng ["http://localhost:3000"] nếu FE chạy ở port 3000
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#base.metadata là các bảng được định nghĩa bằng models
Base.metadata.create_all(bind=engine)

app.include_router(auth.router)

@app.on_event("startup")
def init_admin():
    from app.database import SessionLocal
    from app.models.user import User, Role
    from app.services.auth_service import hash_md5

    db = SessionLocal()
    try:
        if not db.query(User).filter_by(username="admin").first():
            admin = User(
            username="admin",
            hashed_password=hash_md5("123456aA@"),
            role=Role.admin
            )
            db.add(admin)
            db.commit()
            print("Tạo tài khoản admin thành công")
        else:
            print("Đã tồn tại")
    finally:
        db.close()
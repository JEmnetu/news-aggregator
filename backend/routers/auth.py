from fastapi import APIRouter, Depends, HTTPException, status
from slowapi import Limiter
from slowapi.util import get_remote_address
from fastapi import Request
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import get_db
from models.user import User
from auth import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])

class RegisterRequest(BaseModel):
    email: str
    password: str
    first_name: str
    last_name: str

class LoginRequest(BaseModel):
    email: str
    password: str

limiter = Limiter(key_func=get_remote_address)

@router.post("/register")
@limiter.limit("3/minute")
def register(request:Request, body: RegisterRequest, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == body.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    hashed = hash_password(body.password)
    new_user = User(email=body.email, password=hashed, first_name=body.first_name, last_name=body.last_name)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {'message': 'User created successfully', 'user_id': new_user.id}

@router.post("/login")
@limiter.limit("5/minute")
def login(request:Request, body: LoginRequest, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == body.email).first()
    if not existing_user:
         raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect Email or Password"
        )
    hashed_pw = existing_user.password
    password_match = verify_password(body.password, hashed_pw)
    if not password_match:
         raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect Email or Password"
        )
    # return {'message': 'User verified successfully'}
    token = create_access_token({"sub": str(existing_user.id)})
    return {"access_token": token, "token_type": "bearer"}    
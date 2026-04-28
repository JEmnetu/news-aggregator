from fastapi import APIRouter, Depends, HTTPException, status
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

@router.post("/register")
def register(request: RegisterRequest, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == request.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    hashed = hash_password(request.password)
    new_user = User(email=request.email, password=hashed, first_name=request.first_name, last_name=request.last_name)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {'message': 'User created successfully', 'user_id': new_user.id}

@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == request.email).first()
    if not existing_user:
         raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect Email or Password"
        )
    hashed_pw = existing_user.password
    password_match = verify_password(request.password, hashed_pw)
    if not password_match:
         raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect Email or Password"
        )
    # return {'message': 'User verified successfully'}
    token = create_access_token({"sub": str(existing_user.id)})
    return {"access_token": token, "token_type": "bearer"}    
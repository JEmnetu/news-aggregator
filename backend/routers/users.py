from fastapi import APIRouter, HTTPException, Depends, Query
from sqlalchemy.orm import Session
from database import get_db
from models.user import User
from dependencies import get_current_user

router = APIRouter(prefix='/users', tags=['users'])

@router.get('/me')
def get_current_user_info(
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):
    user = db.query(User).filter(User.id == user_id).first()

    return {
        "id":user.id ,
        "email": user.email,
        "firstName": user.first_name,
        "lastName": user.last_name
    }
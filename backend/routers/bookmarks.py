from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import get_db
from models.bookmark import Bookmark
from dependencies import get_current_user
from datetime import datetime


router = APIRouter(prefix="/bookmarks", tags=["bookmarks"])


class CreateBookmarkRequest(BaseModel):
    article_url: str
    title: str
    image_url: str = None
    description: str = None
    published_at: datetime


@router.post("/")
def create_bookmark(
    request: CreateBookmarkRequest,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):
    existing_bookmark = db.query(Bookmark).filter(Bookmark.user_id == user_id, Bookmark.article_url == request.article_url).first()
    if existing_bookmark:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Bookmark already exists"
        )
    
    new_bookmark = Bookmark(article_url = request.article_url, title = request.title,  user_id = user_id, description = request.description, published_at = request.published_at, image_url = request.image_url,)
    db.add(new_bookmark)
    db.commit()
    db.refresh(new_bookmark)
    return {'message': 'Bookmark saved successfully'}


@router.get("/")
def get_bookmarks(

    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):
    query = db.query(Bookmark).filter(Bookmark.user_id == user_id)
    bookmarks = query.order_by(Bookmark.created_at).all()

    return {'data': bookmarks}

@router.delete("/{bookmark_id}")
def delete_bookmark(
    bookmark_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):
    bookmark = db.query(Bookmark).filter(Bookmark.user_id == user_id,  Bookmark.id == bookmark_id).first()
    if not bookmark:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Bookmark does not exist"
        )
    
    db.delete(bookmark)
    db.commit()
    return {'message': 'Bookmark deleted successfully'}
    
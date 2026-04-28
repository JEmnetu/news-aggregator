from fastapi import APIRouter, HTTPException, Depends, Query
from sqlalchemy.orm import Session
from database import get_db
from models.article import Article
# import httpx
# import os
# from dotenv import load_dotenv

# load_dotenv()

# NEWS_API_KEY = os.getenv("NEWS_API_KEY")
# NEWS_API_BASE_URL = "https://api.thenewsapi.com/v1/news"

# router = APIRouter(prefix="/news", tags=["news"])

# @router.get("/")
# async def get_news(category: str = "general", search: str = None):
#     params = {
#         "api_token": NEWS_API_KEY,
#         "language": "en",
#         "limit" : 10
#     }

#     if category:
#         params["categories"] = category
#     if search:
#         params["search"] = search
    
#     async with httpx.AsyncClient() as client:
#         response = await client.get(f"{NEWS_API_BASE_URL}/top", params=params)
#         if response.status_code != 200:
#             raise HTTPException(status_code=response.status_code, detail="Failed to fetch news")
#         return response.json()

router = APIRouter(prefix='/news', tags=['news'])

@router.get('/')
def get_news(
    category: str = 'general',
    search: str = None,
    page: int = 1,
    page_size: int = 10,
    db: Session = Depends(get_db)
):
    query = db.query(Article)

    if category:
        query = query.filter(Article.categories == category)
    if search:
        query = query.filter(Article.title.ilike(f"%{search}%"))

    offset = (page - 1) * page_size
    articles = query.order_by(Article.published_at.desc()).offset(offset).limit(page_size).all()

    return {'data': articles, 'page': page, 'page_size': page_size}
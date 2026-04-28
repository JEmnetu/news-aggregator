import httpx
import os
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from database import SessionLocal
from models.article import Article
from datetime import datetime

load_dotenv()

NEWS_API_KEY = os.getenv("NEWS_API_KEY")
NEWS_API_BASE_URL = "https://api.thenewsapi.com/v1/news/top"

CATEGORIES = ["general", "politics", "sports", "tech", "business"]

async def fetch_and_store_news():
    print("Fetching news...")
    db: Session = SessionLocal()

    try:
        async with httpx.AsyncClient() as client:
            for category in CATEGORIES:
                response = await client.get(NEWS_API_BASE_URL, params={
                    "api_token": NEWS_API_KEY,
                    "language": "en",
                    "limit": 3,
                    "categories": category
                })

                if response.status_code != 200:
                    print(f"Failed to fetch {category} news")
                    continue
                articles = response.json().get("data", [])

                for article in articles:
                    existing = db.query(Article).filter(
                        Article.uuid == article["uuid"]
                    ).first()

                    if existing:
                        continue
                    
                    new_article = Article(
                        uuid=article["uuid"],
                        title=article["title"],
                        description=article["description"],
                        url=article["url"], # every article should have a url, throws a KeyError if url doesn't exist
                        source=article.get("source"), #article.get() -> source field may not be present. if source doesn't exist, returns None
                        image_url=article.get("image_url"),
                        categories=category,
                        published_at=datetime.fromisoformat(
                            article["published_at"].replace("Z", "+00:00")
                        )
                    )
                    db.add(new_article)
                db.commit()
                print(f"Saved {category} articles")
    finally:
        db.close()
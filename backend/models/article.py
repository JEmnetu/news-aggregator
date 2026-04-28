from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from database import Base

class Article(Base):
    __tablename__ = 'articles'

    id=Column(Integer, primary_key=True, index=True)
    uuid=Column(String, unique=True, nullable=False)
    title=Column(String, nullable=False)
    description=Column(Text, nullable=True)
    url=Column(String, nullable=False)
    image_url=Column(String, nullable=True)
    source=Column(String, nullable=True)
    categories=Column(String, nullable=True)
    published_at=Column(DateTime(timezone=True), nullable=True)
    created_at=Column(DateTime(timezone=True), server_default=func.now())
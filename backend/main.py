from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from contextlib import asynccontextmanager
from database import engine, Base
from models import User, Bookmark, Article
from routers import auth, news, bookmarks, users
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.interval import IntervalTrigger
from jobs import fetch_and_store_news

scheduler = AsyncIOScheduler()


@asynccontextmanager
async def lifespan(app: FastAPI):
    scheduler.add_job(fetch_and_store_news, IntervalTrigger(minutes=60))
    scheduler.start()
    # await fetch_and_store_news()
    yield
    scheduler.shutdown()

app = FastAPI(lifespan=lifespan)

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000",
                   "https://main.d3obvy4n2s2l0g.amplifyapp.com",
                   "https://news.jhabte.dev"
                   ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(news.router)
app.include_router(bookmarks.router)
app.include_router(users.router)


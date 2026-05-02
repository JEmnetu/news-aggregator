# News Aggregator
 
A full stack news aggregator application that fetches, stores, and displays news articles from around the world. Users can browse articles by category, search by keyword, and bookmark articles to read later.
 
> **Phase 2 in progress** — AWS deployment and AI-powered summarization via AWS Bedrock coming soon.
 
---
 
## Screenshots
 
<!-- Add screenshots here -->
 
---
 
## Tech Stack
 
**Frontend**
- React 18 with TypeScript
- React Bootstrap for UI components
- React Router v6 for client-side routing
- Axios for HTTP requests with JWT interceptor
- Context API for global auth and bookmark state
**Backend**
- Python 3.12
- FastAPI with Uvicorn
- SQLAlchemy ORM
- PostgreSQL 16
- APScheduler for background jobs
- JWT authentication with python-jose and bcrypt
**Infrastructure (Phase 2)**
- AWS EC2 (backend)
- AWS RDS PostgreSQL (database)
- AWS S3 + CloudFront (frontend)
- VPC with public/private subnets
- GitHub Actions CI/CD
---
 
## Features
 
- **Authentication** — Register, login, and logout with JWT-based auth. Token expiry handled automatically with client-side detection and graceful redirect.
- **News Feed** — Articles fetched from TheNewsAPI and cached in PostgreSQL via a background job that runs every 30 minutes. Users never wait on an external API.
- **Category Filtering** — Filter articles by General, Politics, Sports, Tech, and Business.
- **Search** — Keyword search across all articles.
- **Pagination** — 10 articles per page with previous/next navigation.
- **Bookmarks** — Save and remove articles. Bookmark state persists across sessions and syncs across pages.
- **Responsive Design** — Mobile friendly layout with adaptive navigation and filter controls.
---
 
## Architecture
 
```
TheNewsAPI
    ↓ (every 30 mins via APScheduler)
FastAPI Backend
    ↓
PostgreSQL Database
    ↓
React Frontend (served via S3/CloudFront in Phase 2)
```
 
**Background job pattern** — Rather than hitting the external news API on every user request, a scheduled job fetches and stores articles in PostgreSQL. The frontend reads from the local database — fast, rate-limit-proof, and resilient to external API downtime.
 
**Auth flow** — JWT tokens are issued on login and stored in localStorage. An Axios request interceptor attaches the token to every outbound request automatically. Token expiry is detected client-side before requests go out, triggering an immediate logout and redirect rather than showing an error.
 
**Defense in depth (Phase 2)** — The AWS architecture places the database in a private subnet with no public IP. EC2 lives in a public subnet and is the only resource that can reach the database. NACLs and security groups provide layered network protection.
 
---
 
## Running Locally
 
### Prerequisites
- Python 3.12
- PostgreSQL 16
- Node.js 18+
### Backend
 
```bash
# Clone the repo
git clone https://github.com/JEmnetu/news-aggregator.git
cd news-aggregator/backend
 
# Create and activate virtual environment
python3.12 -m venv venv
source venv/bin/activate
 
# Install dependencies
pip install -r requirements.txt
 
# Create a .env file
touch .env
```
 
Add the following to `.env`:
```
DATABASE_URL=postgresql://your_user@localhost/newsaggregator
SECRET_KEY=your-secret-key
NEWS_API_KEY=your-thenewsapi-key
```
 
```bash
# Create the database
psql postgres -c "CREATE DATABASE newsaggregator;"
 
# Start the server
uvicorn main:app --reload
```
 
API docs available at `http://localhost:8000/docs`
 
### Frontend
 
```bash
cd news-aggregator/frontend
 
# Install dependencies
npm install
 
# Start the dev server
npm start
```
 
App available at `http://localhost:3000`
 
---
 
## API Endpoints
 
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | No | Register a new user |
| POST | `/auth/login` | No | Login and receive JWT token |
| GET | `/users/me` | Yes | Get current user info |
| GET | `/news` | No | Get articles (category, search, page, page_size) |
| GET | `/bookmarks` | Yes | Get user's bookmarks |
| POST | `/bookmarks` | Yes | Save a bookmark |
| DELETE | `/bookmarks/{id}` | Yes | Delete a bookmark |
 
---
 
## Roadmap
 
- [ ] AWS deployment (EC2, RDS, S3, CloudFront)
- [ ] GitHub Actions CI/CD pipeline
- [ ] Multi-source news aggregation
- [ ] AWS Bedrock AI article summarization
- [ ] Dark mode toggle
- [ ] User profile and settings
---
 
## Author
 
Jacob Emnetu — [GitHub](https://github.com/JEmnetu)

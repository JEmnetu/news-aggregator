# News Aggregator

A full stack news aggregation platform built with React/TypeScript and Python/FastAPI, deployed on AWS with a production-grade architecture.

**Live Demo:** https://main.d3obvy4n2s2l0g.amplifyapp.com  
**API:** https://api.jhabte.dev/docs

---

## Architecture

```
User
→ AWS Amplify (React frontend, HTTPS, CI/CD)
→ Nginx reverse proxy (SSL termination)
→ EC2 t2.micro (FastAPI backend, public subnet)
→ RDS PostgreSQL db.t3.micro (private subnet)

All resources inside a custom VPC with:
→ Public/private subnets across 2 availability zones
→ Internet Gateway and route tables
→ Security groups with least privilege rules
→ RDS accessible only from EC2 security group
```

**Background job pattern** 
APScheduler fetches articles from TheNewsAPI every 60 minutes and stores them in PostgreSQL. Users read from the local database. Fast, rate-limit-proof, and resilient to API downtime.

**Auth flow** 
JWT tokens issued on login, stored in localStorage, and attached to every request via an Axios interceptor. Token expiry detected client-side before requests go out, triggering immediate logout rather than a failed request.

---

## Tech Stack

**Frontend**
- React with TypeScript
- React Bootstrap
- React Router 
- Axios with JWT interceptor
- Context API for global state
- AWS Amplify (hosting + CI/CD)

**Backend**
- Python 3.12
- FastAPI + Uvicorn
- SQLAlchemy ORM
- PostgreSQL 16
- APScheduler (background jobs)
- JWT auth (python-jose + bcrypt)
- Nginx (reverse proxy + SSL termination)
- Let's Encrypt (SSL certificate)
- systemd (process management)

**AWS Infrastructure**
- VPC with public/private subnets
- EC2
- RDS PostgreSQL
- AWS Amplify
- Elastic IP

---

## Features

- **News Feed** — Articles cached from TheNewsAPI every 60 minutes across 5 categories
- **Category Filtering** — General, Politics, Sports, Tech, Business
- **Search** — Keyword search across all cached articles
- **Pagination** — 10 articles per page
- **Authentication** — JWT-based register/login with automatic token expiry handling
- **Bookmarks** — Save, view, and delete bookmarks per user
- **Responsive** — Mobile friendly layout


---

## Author

Jacob Habtemariam — [GitHub](https://github.com/JEmnetu) | [jhabte.dev](https://jhabte.dev)

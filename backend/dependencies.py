from auth import verify_token
from fastapi import  Depends, HTTPException, status
from fastapi.security import HTTPBearer

oauth2_scheme = HTTPBearer()



# def get_current_user(token: str = Depends(oauth2_scheme)):
#     payload = verify_token(token)
#     if payload is None:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail = "Invalid or expired token"
#         )
#     return int(payload["sub"])

def get_current_user(credentials = Depends(oauth2_scheme)):
    token = credentials.credentials
    payload = verify_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )
    return int(payload["sub"])
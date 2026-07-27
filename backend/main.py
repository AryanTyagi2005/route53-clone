from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.hosted_zones import router as hosted_zone_router
from app.api.dns_record import router as dns_record_router
from app.models import HostedZone

app = FastAPI(
    title="AWS Route53 Clone API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_origin_regex=r"https://route53-clone-u6bk.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(hosted_zone_router)
app.include_router(dns_record_router)


@app.get("/")
def read_root():
    return {
        "message": "Welcome to the AWS Route53 Clone API"
    }
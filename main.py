from fastapi import FastAPI
from routes import router
import asyncio
from register_with_eureka import register_with_eureka

app = FastAPI()
app.include_router(router, prefix="/transaction")

@app.on_event("startup")
async def startup():
    await register_with_eureka("transaction", 8084)

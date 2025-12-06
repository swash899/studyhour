import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="FastAPI Ping Testbed")

origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")
origins = [o.strip() for o in origins if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.get("/ping")
async def ping():
    return {"message": "Pong!"}

@app.api_route("/echo", methods=["GET", "POST"])
async def echo(req: Request):
    data = None
    try:
        data = await req.json()
    except Exception:
        data = None

    return {
        "method": req.method,
        "path": req.url.path,
        "query": dict(req.query_params),
        "json": data,
        "client": (req.client.host if req.client else None),
        "ua": req.headers.get("user-agent", ""),
    }

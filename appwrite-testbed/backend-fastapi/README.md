## Run locally
python -m venv .venv
. .venv/Scripts/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

## Docker
docker build -t fastapi-ping .
docker run -p 8000:8000 -e ALLOWED_ORIGINS=http://localhost:5173 fastapi-ping

## Run locally
python -m venv .venv
. .venv/Scripts/activate
pip install -r requirements.txt
python app.py

## Docker
docker build -t flask-ping .
docker run -p 8000:8000 -e ALLOWED_ORIGINS=http://localhost:5173 flask-ping

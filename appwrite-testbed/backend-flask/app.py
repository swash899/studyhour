import os
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Comma-separated origins, e.g. "http://localhost:5173,https://your-site.appwrite.global"
origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")
origins = [o.strip() for o in origins if o.strip()]

CORS(app, supports_credentials=True, origins=origins)

@app.get("/health")
def health():
    return jsonify(status="ok")

@app.get("/ping")
def ping():
    return "Pong!", 200

@app.route("/echo", methods=["GET", "POST"])
def echo():
    payload = None
    try:
        payload = request.get_json(silent=True)
    except Exception:
        payload = None

    return jsonify(
        method=request.method,
        path=request.path,
        query=dict(request.args),
        json=payload,
        ip=request.headers.get("X-Forwarded-For", request.remote_addr),
        ua=request.headers.get("User-Agent", ""),
    )

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "8000")), debug=True)

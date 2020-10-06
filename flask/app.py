from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/flask")
def friends():
    return {
        "data": "Flask and Next.js are holding hands :)!"
    }


if __name__ == "__main__":
    app.run()

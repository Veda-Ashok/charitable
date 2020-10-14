'''
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
def friends():
    return {
        "data": "Flask and Next.js are holding hands :)!"
    }

if __name__ == "__main__":
    app.run()

'''
from flask import Flask, request, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime


app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test-database.db'
db = SQLAlchemy(app)

# one-many relationship bc 1 user can have multiple
# posts but a post can only have 1 user

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    image_file = db.Column(db.String(20), nullable=False, default='default.jpg')
    password = db.Column(db.String(60), nullable=False)

    #post is not a column, but a query that grabs any post by particular user
    posts = db.relationship('Post', backref='author', lazy=True)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.image_file}')"

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f"Post('{self.title}', '{self.date_posted}')"

@app.route("/database")
def testingStuffs():
    return {
        "testing flask stuffs"
    }

if __name__ == "__main__":
    app.run()


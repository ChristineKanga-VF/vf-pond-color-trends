from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Pond_Color_Trends(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image_filename = db.Column(db.String(150), nullable=False)
    closest_color_name = db.Column(db.String(50), nullable=False)
    closest_color_code = db.Column(db.String(7), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    pond = db.Column(db.String(50), nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Pond_Color_Trends {self.id}>"

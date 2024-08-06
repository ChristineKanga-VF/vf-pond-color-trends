import os

class Config:
    SECRET_KEY = os.urandom(24)
    # SQLALCHEMY_DATABASE_URI = 'sqlite:///pond_images.db'
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://victoryf_vf_pond_color_trends:8GPDsKceN2Xv926@localhost/vf_pond_color_trends_db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    UPLOAD_FOLDER = 'static/uploads'

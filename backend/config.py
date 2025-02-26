import os

class Config:
    SECRET_KEY = '7rW75KvUQrCudaU'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///pond_images.db'
    # SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://victoryf_vf_pond_color_trends:7rW75KvUQrCudaU@victoryfarmskenya.com:2083/victoryf_vf_pond_color_trends_db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    UPLOAD_FOLDER = 'static/uploads'

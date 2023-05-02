import os
dir = os.path.dirname(os.path.abspath(os.path.dirname(__file__)))

class Development(object):
    DEBUG = True
    FLASK_APP = 'linkservice_dev'
    ENV = 'development'
## DB URL FOR DEVELOPMENT
    SQLALCHEMY_DATABASE_URI = 'Your Postgresql URL'  
# 데이터 변경사항에 대해 커밋 전후로 알림 여부
    SQLALCHEMY_TRACK_MODIFICATIONS = True
# Query Debug 여부
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_POOL_SIZE = 20
    SQLALCHEMY_POOL_RECYCLE = 3600
#JSON에서 한글 표현을 위해서 반영
    JSON_AS_ASCII = False
#이미지 위치 설정
    image_folder = os.path.normpath(os.path.join(dir, os.pardir)) + '/client/public/images/'
    COVER_IMAGE_FORDER = image_folder
    IMAGE_FORDER = image_folder
    IMAGE_URL = 'http://127.0.0.1:3000/images/'

class Production(object):
    DEBUG = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False
    FLASK_APP = 'linkservice'
    ENV = 'production'
    ## DB URL FOR PRODUCTION
    SQLALCHEMY_DATABASE_URI = 'Your Postgresql URL'  
    SQLALCHEMY_POOL_SIZE = 20
    SQLALCHEMY_POOL_RECYCLE = 3600
    #JSON에서 한글 표현을 위해서 반영
    JSON_AS_ASCII = False    
#이미지 위치 설정
    image_folder = os.path.normpath(os.path.join(dir, os.pardir)) + '/images/'
    COVER_IMAGE_FORDER = image_folder
    IMAGE_FORDER = image_folder 
#운영계 
    IMAGE_URL = 'https://www.linkservice.com/img/'

app_config = {
    'development': Development(),
    'production': Production(),
}

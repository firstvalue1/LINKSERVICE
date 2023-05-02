from . import config
from flask import Flask

def create_app(environment):
    # config파일에서 불려오기
    config_map = {
        'development': config.Development(),
        'production': config.Production(),
    }
    config_obj = config_map[environment.lower()]   
    
    app = Flask(__name__)

    app.config.from_object(config_obj)

    return app

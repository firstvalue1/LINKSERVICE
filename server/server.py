import socket
from config.create_app import create_app
from flask import Flask
    #flask_restful에서 API를 import 한다.
from flask_restful import Api
    #src 밑에 links.py 에서 class들을 import한다.
from src.links import LinkRegister, LinksAll, LinkSelect, LinkRemove, LinkUpdate
from src.image import ImageUpload, ImageChange
from db_init import db

env = socket.gethostbyname(socket.gethostname())
if 'linkservice.com' in env :
   app = create_app('production')
else:
   app = create_app('development')
    # API 선언
api = Api(app)
    #API에 Resource를 추가한다.
api.add_resource(LinkRegister, '/api/link/create')
api.add_resource(LinksAll, '/api/links')
api.add_resource(LinkSelect, '/api/link/select/<int:id>')
api.add_resource(LinkRemove, '/api/link/delete/<int:id>')
api.add_resource(LinkUpdate, '/api/link/update/<int:id>')

api.add_resource(ImageUpload, '/api/link/image')
api.add_resource(ImageChange, '/api/link/image/<int:id>')

if __name__ == "__main__":
    # ORM
    db.init_app(app)
    app.run(debug=True, port=5000)

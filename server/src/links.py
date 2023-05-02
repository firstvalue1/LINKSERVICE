from db_init import db
from flask_restful import Resource, reqparse
from flask import jsonify, request, current_app
import os
from flask_marshmallow import Marshmallow
from models.links_model import LinkModel
from datetime import date as date_function

ma = Marshmallow()

class LinkSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = LinkModel

"""
POST /api/link/create -  등록 resource
"""
class LinkRegister(Resource):
# 입력 파라미터 설정
# DB항목에 맞게 파라메타로 받아 저장한다.
    parser = reqparse.RequestParser()
    parser.add_argument('name',type=str,required=True,help="필수항목입니다.")
    parser.add_argument('tag',type=str)
    parser.add_argument('sort',type=str)     
    parser.add_argument('imageurl',type=str )      
    parser.add_argument('linkurl',type=str )    

    def post(self):
        # Request Parameter를 dictionary 형태로 저장
        data = LinkRegister.parser.parse_args()
        name = data['name']
        tag = data['tag']
        sort = LinkModel.max_sort() #Sort순서를 위한 값으로 입력시 max값을 입력한다.
        imageurl = data['imageurl']
        linkurl = data['linkurl']
        create_date = date_function.today()  #create_date는 datetime으로 저장
        update_date = date_function.today()

        LinkModel.save(LinkModel(None,name, tag, sort, imageurl, linkurl,create_date,update_date))

        return {'message':f'링크 정보가 등록 되었습니다'},201

"""
GET /api/links - 전체 링크정보 조회
"""

class LinksAll(Resource):

    def get(self):
    # 입력 파라미터 설정 - 목록전체 출력으로 파라미터가 없음.
        link = LinkModel.query.order_by(LinkModel.sort).all()
        link_schema = LinkSchema(many=True)
        output = link_schema.dump(link)
        return jsonify({'links' : output})

"""
GET /api/link/select/<int:id> - 링크 정보 조회
"""
class LinkSelect(Resource):

    def get(self,id):
        # 정보 조회
        link = LinkModel.find_by_id(id)
        link_schema = LinkSchema()
        output = link_schema.dump(link)
        return jsonify({'links' : output})

"""
DELETE /api/link/delete/<int:id> - 링크정보삭제
"""
class LinkRemove(Resource):
    def delete(self, id):
        # id에 해당되는 링크 정보 조회
        link_data = LinkModel.find_by_id(id)
        folder = current_app.config.get('IMAGE_FORDER')
        # 이미지 링크 항목 가져오기
        if link_data.imageurl is not None:
            imageurl = link_data.imageurl.split('/')
            file_name = imageurl[len(imageurl) - 1]
            #파일 존재여부 확인후 이미지 파일을 삭제한다.
            if os.path.isfile(folder + file_name):
                os.remove(folder + file_name)

        # 정보 삭제 ( links_model의 delete_by_id 메소드 호출 )
        LinkModel.delete_by_id(id)

        return {'message':'정상적으로 삭제 되었습니다.'},201

"""
PUT /api/link/update/<int:id> - 링크 정보 수정
"""
class LinkUpdate(Resource):

    def put(self,id):
        #Request를 json으로 받는다.
        values = request.get_json()
        # 정보 수정 ( links_model의 update_by_id 메소드 호출 )
        LinkModel.update_by_id(id, values)
        return {'message':'정보가 수정 되었습니다.'},201

  
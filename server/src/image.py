from flask_restful import Resource
from flask import jsonify, request, current_app
from PIL import Image, ImageOps
from datetime import date as date_function
from models.links_model import LinkModel

"""
UPLOAD  IMAGE /api/link/image 
"""
class ImageUpload(Resource):
    def post(self):
        f = request.files['image']
        folder = current_app.config.get('IMAGE_FORDER')
        img_url = current_app.config.get('IMAGE_URL')

        img = Image.open(f)
        # 이미지를 강제적으로 Resizing한다.
        # Resizing을 안해도 좋으나, 파일 용량을 줄이고자 반영
        img_resize = img.resize((50,50), Image.LANCZOS)
        img_resize = ImageOps.exif_transpose(img_resize)
        img_resize = img_resize.convert('RGB')

        id = LinkModel.currval_id()
        file_name = str(id) + '_' + str(date_function.today()) + '.' + f.filename.rsplit('.', 1)[1].lower()
        img_resize.save(folder + file_name)
        # f.save(os.path.join(folder, secure_filename(file_name)))
        LinkModel.update_filename(id, img_url + file_name)

        return '이미지가 저장되었습니다..'      

"""
CHANGE  IMAGE /api/link/image/<int:id>
"""
class ImageChange(Resource):
    def put(self, id):
        f = request.files['image']
        folder = current_app.config.get('IMAGE_FORDER')
        img_url = current_app.config.get('IMAGE_URL')

        img = Image.open(f)
        # 이미지를 강제적으로 Resizing한다.
        # Resizing을 안해도 좋으나, 파일 용량을 줄이고자 반영
        img_resize = img.resize((50,50), Image.LANCZOS)
        img_resize = ImageOps.exif_transpose(img_resize)
        img_resize = img_resize.convert('RGB')

        file_name = str(id) + '_' + str(date_function.today()) + '.' + f.filename.rsplit('.', 1)[1].lower()
        img_resize.save(folder + file_name)

        LinkModel.update_filename(id, img_url + file_name)

        return '이미지가 수정되었습니다..'          
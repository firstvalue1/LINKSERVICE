from db_init import db
from sqlalchemy import func
from sqlalchemy.sql import text

class LinkModel(db.Model):
# DB 스키마가 기본(public)이 아니면 별도로 선언을 해주면 된다.
    __table_args__ = {'schema': 'chooya'}
# 물리 테이블명
    __tablename__ = "links"
# 컬럼 맵핑
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    tag = db.Column(db.String(50))
    sort = db.Column(db.Integer)
    imageurl = db.Column(db.Text)
    linkurl = db.Column(db.Text)
    create_date = db.Column(db.Date)
    update_date = db.Column(db.Date)

    def __init__(self, id, name, tag, sort, imageurl, linkurl, create_date,update_date):
        self.id = id
        self.name = name
        self.tag = tag
        self.sort = sort
        self.imageurl = imageurl
        self.linkurl = linkurl
        self.create_date = create_date
        self.update_date = update_date

    def save(links):
        """
        정보 저장/수정
        :param item: 정보 객체
        """
        db.session.merge(links)
        db.session.commit()
        db.session.close()

# Link정보 저장시 sort 순서의 max값을 구한다.
    @classmethod
    def max_sort(self):
      result = db.session.query(func.coalesce(func.max(self.sort), 0)).scalar()
      return result+1

# 기본적인 조회/삭제/업데이트 코드를 구성한다. ( param : id )
    @classmethod
    def find_by_id(self, id):

        links= db.session.query(self).filter_by(id=id).first()
        return links

    @classmethod
    def delete_by_id(self, id):
      try:
        db.session.query(self).filter_by(id=id).delete(synchronize_session=False)
      except:
        db.session.rollback()
      finally:
        db.session.commit()
        db.session.close()

    @classmethod
    def update_by_id(self, id, values):
        db.session.query(self).filter_by(id=id).update(values)     
        db.session.commit()   
        db.session.close()     

 
# 링크 이미지 정보를 DB에 저장하기 위한 코드
# id와 파일이름 혹은 이미지 링크를 파라메타를 받아 처리
    @classmethod
    def update_filename(self, id, filename):
        try:
            query = "update links set imageurl = :v2 where id = :v1"
            db.session.execute(text(query), {'v1':id, 'v2':filename})

        except Exception as e:
            db.session.rollback()
            print('update_filename : 오류발생', e)
            print(query)
        finally:
            db.session.commit()
            db.session.close()

# 링크정보가 저장된 현재 시퀀스 id 값을 알아낸다. 
    @classmethod
    def currval_id(self):
        result = db.session.query(func.max(self.id)).scalar()
        return result

    def __str__(self):
        return "[" + str(self.__class__) + "]: " + str(self.__dict__)

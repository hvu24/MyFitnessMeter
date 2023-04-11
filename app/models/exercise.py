from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Exercise(db.Model):
    __tablename__ = 'exercises'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    met = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'met': self.met,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }

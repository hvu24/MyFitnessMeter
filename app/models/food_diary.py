from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class FoodDiary(db.Model):
    __tablename__ = 'food_diaries'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    date = db.Column(db.Date(), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    user = db.relationship('User', back_populates='food_diaries')
    food_entries = db.relationship('FoodEntry', cascade="all, delete", back_populates='food_diaries')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'date': self.date,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'userInfo': self.user.to_dict(),
            'foodEntries': [food_entry.to_dict() for food_entry in self.food_entries]
        }

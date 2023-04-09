from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy.ext.hybrid import hybrid_property

class FoodEntry(db.Model):
    __tablename__ = 'food_entries'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    food_diary_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('food_diaries.id')), nullable=False)
    name = db.Column(db.String, nullable=False)
    amount = db.Column(db.Float, nullable=False)
    calories_per_gram = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    @hybrid_property
    def calories(self):
        return self.calories_per_gram * self.amount


    food_diaries = db.relationship('FoodDiary', back_populates='food_entries')

    def to_dict(self):
        return {
            'id': self.id,
            'foodDiaryId': self.food_diary_id,
            'name': self.name,
            'amount': self.amount,
            'caloriesPerGram': self.calories_per_gram,
            'calories': self.calories,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }

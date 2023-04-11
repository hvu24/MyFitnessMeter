from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy.ext.hybrid import hybrid_property

class FoodDiary(db.Model):
    __tablename__ = 'food_diaries'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    date = db.Column(db.Date(), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    @hybrid_property
    def total_calories(self):
        return sum([entry.calories for entry in self.food_entries])

    @hybrid_property
    def total_protein(self):
        return sum([entry.protein for entry in self.food_entries])

    @hybrid_property
    def total_fat(self):
        return sum([entry.fat for entry in self.food_entries])

    @hybrid_property
    def total_carb(self):
        return sum([entry.carb for entry in self.food_entries])

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
            'totalCalories': self.total_calories,
            'totalProtein': self.total_protein,
            'totalFat': self.total_fat,
            'totalCarb': self.total_carb,
            'foodEntries': [food_entry.to_dict() for food_entry in self.food_entries]
        }

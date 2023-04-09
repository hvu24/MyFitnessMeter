from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class ExerciseEntry(db.Model):
    __tablename__ = 'exercise_entries'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    exercise_diary_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('exercise_diaries.id')), nullable=False)
    name = db.Column(db.String, nullable=False)
    amount = db.Column(db.Float, nullable=False)
    calories = db.Column(db.Float, nullable=False)
    mets = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    exercise_diaries = db.relationship('ExerciseDiary', back_populates='exercise_entries')

    def to_dict(self):
        return {
            'id': self.id,
            'exerciseDiaryId': self.exercise_diary_id,
            'name': self.name,
            'amount': self.amount,
            'calories': self.calories,
            'mets': self.mets,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }

from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class ExerciseDiary(db.Model):
    __tablename__ = 'exercise_diaries'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    date = db.Column(db.Date(), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    user = db.relationship('User', back_populates='exercise_diaries')
    exercise_entries = db.relationship('ExerciseEntry', cascade="all, delete", back_populates='exercise_diaries')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'date': self.date,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'userInfo': self.user.to_dict(),
            'exerciseEntries': [exercise_entry.to_dict() for exercise_entry in self.exercise_entries]
        }

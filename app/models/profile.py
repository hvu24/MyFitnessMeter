from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import date, datetime


class Profile(db.Model):
    __tablename__ = 'profiles'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    height_in_inches = db.Column(db.Float, nullable=False)
    sex = db.Column(db.String(255), nullable=False)
    birthday = db.Column(db.Date(), nullable=False)
    weight_in_pounds = db.Column(db.Float, nullable=False)
    body_fat = db.Column(db.Float, nullable=False)
    body_mass_index = db.column_property(
        ((weight_in_pounds)/(height_in_inches*height_in_inches))*703)
    protein_ratio = db.Column(db.Integer, nullable=False)
    carbohydrate_ratio = db.Column(db.Integer, nullable=False)
    fat_ratio = db.Column(db.Integer, nullable=False)
    activity_level = db.Column(db.String(255), nullable=False)
    weight_goal = db.Column(db.Integer, nullable=False)
    weight_goal_rate = db.Column(db.Float, nullable=False)

    @hybrid_property
    def age(self):
        return date.today().year - self.birthday.year

    @hybrid_property
    def basal_metabolic_rate(self):
        if (self.sex == 'male'):
            return ((4.536*self.weight_in_pounds)+(15.88*self.height_in_inches)-(5*self.age)+5)
        if (self.sex == 'female'):
            return ((4.536*self.weight_in_pounds)+(15.88*self.height_in_inches)-(5*self.age)-161)

    @hybrid_property
    def activity_calories(self):
        if self.activity_level == 'sedentary':
            return self.basal_metabolic_rate * 0.2
        elif self.activity_level == 'lightly_active':
            return self.basal_metabolic_rate * 0.375
        elif self.activity_level == 'moderately_active':
            return self.basal_metabolic_rate * 0.5
        elif self.activity_level == 'very_active':
            return self.basal_metabolic_rate * 0.9
        else:
            return 0

    @hybrid_property
    def weight_goal_calories(self):
        if self.weight_goal_rate == -2.0:
            return -125 * (8)
        elif self.weight_goal_rate == -1.75:
            return -125 * (7)
        elif self.weight_goal_rate == -1.5:
            return -125 * (6)
        elif self.weight_goal_rate == -1.25:
            return -125 * (5)
        elif self.weight_goal_rate == -1:
            return -125 * (4)
        elif self.weight_goal_rate == -.75:
            return -125 * (3)
        elif self.weight_goal_rate == -.5:
            return -125 * (2)
        elif self.weight_goal_rate == -.25:
            return -125
        elif self.weight_goal_rate == 2.0:
            return 125 * (8)
        elif self.weight_goal_rate == 1.75:
            return 125 * (7)
        elif self.weight_goal_rate == 1.5:
            return 125 * (6)
        elif self.weight_goal_rate == 1.25:
            return 125 * (5)
        elif self.weight_goal_rate == 1:
            return 125 * (4)
        elif self.weight_goal_rate == .75:
            return 125 * (3)
        elif self.weight_goal_rate == .5:
            return 125 * (2)
        elif self.weight_goal_rate == .25:
            return 125
        else:
            return 0

    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    user = db.relationship('User', back_populates='profile')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'heightInInches': self.height_in_inches,
            'sex': self.sex,
            'birthday': self.birthday,
            'weightInPounds': self.weight_in_pounds,
            'bodyFat': self.body_fat,
            'bodyMassIndex': self.body_mass_index,
            'age': self.age,
            'basalMetabolicRate': self.basal_metabolic_rate,
            'proteinRatio': self.protein_ratio,
            'carbohydrateRatio': self.carbohydrate_ratio,
            'fatRatio': self.protein_ratio,
            'activityLevel': self.activity_level,
            'activityCalories': self.activity_calories,
            'weightGoal':self.weight_goal,
            'weightGoalRate':self.weight_goal_rate,
            'weightGoalCalories':self.weight_goal_calories,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }

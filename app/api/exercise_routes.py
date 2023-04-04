from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Profile, db, Exercise
from ..forms.profile_form import ProfileForm
from datetime import datetime, date, time, timedelta
from sqlalchemy.sql import func

exercise_routes = Blueprint('exercises', __name__)


@exercise_routes.route('/')
def getExercises():
    exercises = Exercise.query.all()
    return jsonify({'exercises': [exercise.to_dict() for exercise in exercises]})

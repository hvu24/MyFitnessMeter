from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Profile, db, Exercise, ExerciseEntry, ExerciseDiary
from ..forms.profile_form import ProfileForm
from datetime import datetime, date, time, timedelta
from sqlalchemy.sql import func
from ..forms.exercise_entry_form import ExerciseEntryForm
from ..forms.edit_exercise_entry_form import EditExerciseEntryForm

exercise_routes = Blueprint('exercises', __name__)


@exercise_routes.route('/')
def getExercises():
    exercises = Exercise.query.all()
    return jsonify({'exercises': [exercise.to_dict() for exercise in exercises]})


@exercise_routes.route('/diary/<int:year>/<int:month>/<int:day>', methods=['GET'])
@login_required
def getDiary(year, month, day):
    diary = ExerciseDiary.query.filter(
        ExerciseDiary.date == date(year, month, day), ExerciseDiary.user_id == current_user.get_id()).first()
    # if diary is None:
    #     return 'no diary for that date'
    return diary.to_dict()


@exercise_routes.route('/diary/<int:year>/<int:month>/<int:day>', methods=['POST'])
@login_required
def addToDiary(year, month, day):
    diary = ExerciseDiary.query.filter(
        ExerciseDiary.date == date(year, month, day), ExerciseDiary.user_id == current_user.get_id()).first()
    form = ExerciseEntryForm()
    data = form.data
    if diary is None:
        new_diary = ExerciseDiary(
            user_id=current_user.get_id(),
            date=date(year, month, day)
        )
        db.session.add(new_diary)
        db.session.commit()
        diary = ExerciseDiary.query.filter(
            ExerciseDiary.date == date(year, month, day), ExerciseDiary.user_id == current_user.get_id()).first()
        new_entry = ExerciseEntry(
            exercise_diary_id=diary.id,
            name=data['name'],
            amount=data['amount'],
            calories=data['calories'],
            mets=data['mets']
        )
        db.session.add(new_entry)
        db.session.commit()
        return diary.to_dict()
    new_entry = ExerciseEntry(
        exercise_diary_id=diary.id,
        name=data['name'],
        amount=data['amount'],
        calories=data['calories'],
        mets=data['mets']
    )
    db.session.add(new_entry)
    db.session.commit()
    return diary.to_dict()


@exercise_routes.route('/diary/<int:year>/<int:month>/<int:day>', methods=['DELETE'])
@login_required
def deleteDiary(year, month, day):
    diary = ExerciseDiary.query.filter(
        ExerciseDiary.date == date(year, month, day), ExerciseDiary.user_id == current_user.get_id()).first()
    # if diary is None:
    #     return 'no diary for that date'
    db.session.delete(diary)
    db.session.commit()
    return 'successfully deleted'


@exercise_routes.route('/diary/<int:year>/<int:month>/<int:day>', methods=['PUT'])
@login_required
def editDiary(year, month, day):
    diary = ExerciseDiary.query.filter(
        ExerciseDiary.date == date(year, month, day), ExerciseDiary.user_id == current_user.get_id()).first()
    form = EditExerciseEntryForm()
    data = form.data
    entry = ExerciseEntry.query.filter(
        ExerciseEntry.id == data['id'], ExerciseEntry.exercise_diary_id == diary.id).first()
    db.session.delete(entry)
    db.session.commit()
    return diary.to_dict()


@exercise_routes.route('/diary/<int:year>/<int:month>/<int:day>/entry', methods=['PUT'])
@login_required
def editEntry(year, month, day):
    diary = ExerciseDiary.query.filter(
        ExerciseDiary.date == date(year, month, day), ExerciseDiary.user_id == current_user.get_id()).first()
    form = EditExerciseEntryForm()
    data = form.data
    entry = ExerciseEntry.query.filter(
        ExerciseEntry.id == data['id'], ExerciseEntry.exercise_diary_id == diary.id).first()
    entry.amount = data['amount']
    entry.calories = data['calories']
    entry.mets=data['mets']
    # for key, value in data.items():
    #     if hasattr(entry, key) and value is not None:
    #         setattr(entry, key, value)
    db.session.commit()
    return diary.to_dict()

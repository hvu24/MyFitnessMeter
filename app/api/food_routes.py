from flask import Blueprint, jsonify
from sqlalchemy.exc import SQLAlchemyError
from flask_login import login_required, current_user
from app.models import FoodDiary, FoodEntry, db
from datetime import date
from ..forms.food_entry_form import FoodEntryForm
from ..forms.edit_food_entry_form import EditFoodEntryForm

food_routes = Blueprint('foods', __name__)


@food_routes.route('/diary/<int:year>/<int:month>/<int:day>', methods=['GET'])
@login_required
def getDiary(year, month, day):
    diary = FoodDiary.query.filter(
        FoodDiary.date == date(year, month, day), FoodDiary.user_id == current_user.get_id()).first()
    return diary.to_dict()


@food_routes.route('/diary/<int:year>/<int:month>/<int:day>', methods=['POST'])
@login_required
def addToDiary(year, month, day):
    diary = FoodDiary.query.filter(
        FoodDiary.date == date(year, month, day), FoodDiary.user_id == current_user.get_id()).first()
    form = FoodEntryForm()
    data = form.data
    if diary is None:
        new_diary = FoodDiary(
            user_id=current_user.get_id(),
            date=date(year, month, day)
        )
        db.session.add(new_diary)
        db.session.commit()
        diary = FoodDiary.query.filter(
            FoodDiary.date == date(year, month, day), FoodDiary.user_id == current_user.get_id()).first()
        new_entry = FoodEntry(
            food_diary_id=diary.id,
            name=data['name'],
            amount=data['amount']
        )
        db.session.add(new_entry)
        db.session.commit()
        return diary.to_dict()
    new_entry = FoodEntry(
        food_diary_id=diary.id,
        name=data['name'],
        amount=data['amount']
    )
    db.session.add(new_entry)
    db.session.commit()
    return diary.to_dict()


@food_routes.route('/diary/<int:year>/<int:month>/<int:day>', methods=['DELETE'])
@login_required
def deleteDiary(year, month, day):
    diary = FoodDiary.query.filter(
        FoodDiary.date == date(year, month, day), FoodDiary.user_id == current_user.get_id()).first()
    if diary is None:
        return 'no diary for that date'
    db.session.delete(diary)
    db.session.commit()
    return 'successfully deleted'


@food_routes.route('/diary/<int:year>/<int:month>/<int:day>', methods=['PUT'])
@login_required
def editDiary(year, month, day):
    diary = FoodDiary.query.filter(
        FoodDiary.date == date(year, month, day), FoodDiary.user_id == current_user.get_id()).first()
    form = EditFoodEntryForm()
    data = form.data
    entry = FoodEntry.query.filter(
        FoodEntry.id == data['id'], FoodEntry.food_diary_id == diary.id).first()
    db.session.delete(entry)
    db.session.commit()
    return diary.to_dict()


@food_routes.route('/diary/<int:year>/<int:month>/<int:day>/entry', methods=['PUT'])
@login_required
def editEntry(year, month, day):
    diary = FoodDiary.query.filter(
        FoodDiary.date == date(year, month, day), FoodDiary.user_id == current_user.get_id()).first()
    form = EditFoodEntryForm()
    data = form.data
    entry = FoodEntry.query.filter(
        FoodEntry.id == data['id'], FoodEntry.food_diary_id == diary.id).first()
    entry.amount = data['amount']
    # for key, value in data.items():
    #     if hasattr(entry, key) and value is not None:
    #         setattr(entry, key, value)
    db.session.commit()
    return diary.to_dict()

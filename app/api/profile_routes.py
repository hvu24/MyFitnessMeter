from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Profile, db
from ..forms.profile_form import ProfileForm
from datetime import datetime, date, time, timedelta
from sqlalchemy.sql import func

profile_routes = Blueprint('profiles', __name__)


@profile_routes.route('/')
@login_required
def userProfile():
    profile = Profile.query.filter(
        Profile.user_id == current_user.get_id()).first()
    if profile is None:
        return 'no profile'
    return profile.to_dict()


@profile_routes.route('/', methods=['POST'])
@login_required
def createProfile():
    profile = Profile.query.filter(
        Profile.user_id == current_user.get_id()).first()
    if profile is None:
        form = ProfileForm()
        data = form.data

        new_profile = Profile(
            user_id=current_user.get_id(),
            height_in_inches=data['height_in_inches'],
            sex=data['sex'],
            birthday=data['birthday'],
            weight_in_pounds=data['weight_in_pounds'],
            body_fat=data['body_fat'],
            protein_ratio=data['protein_ratio'],
            carbohydrate_ratio=data['carbohydrate_ratio'],
            fat_ratio=data['fat_ratio'],
            activity_level=data['activity_level'],
            weight_goal=data['weight_goal'],
            weight_goal_rate=data['weight_goal_rate'],
        )

        db.session.add(new_profile)
        db.session.commit()
        profile = Profile.query.filter(
            Profile.user_id == current_user.get_id()).first()
        return profile.to_dict()
    return profile.to_dict()


@profile_routes.route('/', methods=['PUT'])
@login_required
def editProfile():
    profile = Profile.query.filter(
        Profile.user_id == current_user.get_id()).first()
    form = ProfileForm()
    data = form.data
    if data['sex'] == '':
        data['sex'] = None

    for key, value in data.items():
        if hasattr(profile, key) and value is not None:
            setattr(profile, key, value)
    db.session.commit()
    return profile.to_dict()


@profile_routes.route('/', methods=['DELETE'])
@login_required
def resetProfile():
    profile = Profile.query.filter(
        Profile.user_id == current_user.get_id()).first()
    db.session.delete(profile)
    db.session.commit()
    return profile.to_dict()

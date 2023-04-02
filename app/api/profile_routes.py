from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Profile

profile_routes = Blueprint('profiles', __name__)

@profile_routes.route('/')
@login_required
def userProfile():
    profile = Profile.query.filter(Profile.user_id == current_user.get_id()).first()
    return profile.to_dict()

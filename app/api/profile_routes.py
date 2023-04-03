from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Profile, db
from ..forms.profile_form import ProfileForm

profile_routes = Blueprint('profiles', __name__)

@profile_routes.route('/')
@login_required
def userProfile():
    profile = Profile.query.filter(Profile.user_id == current_user.get_id()).first()
    return profile.to_dict()


@profile_routes.route('/', methods=['PUT'])
@login_required
def editProfile():
    profile = Profile.query.filter(
        Profile.user_id == current_user.get_id()).first()
    form = ProfileForm()
    data = form.data
    if data['sex'] == '': data['sex'] = None
    print('printing data', data)
    for key, value in data.items():
        if hasattr(profile, key) and value is not None:
            print('printing key from route',key)
            setattr(profile, key, value)
    db.session.commit()
    return profile.to_dict()

from app.models import db, environment, SCHEMA, Profile
from datetime import datetime, date, time, timedelta

# Adds a demo user, you can add other users here if you want
def seed_user_profiles():
    user_1_profile = Profile(
        id = 1,
        user_id = 1,
        height_in_inches = 68,
        sex = 'female',
        birthday = date(1995, 1, 1),
        weight_in_pounds = 170,
        body_fat = 12.8,
        protein_ratio = 25,
        carbohydrate_ratio= 50,
        fat_ratio=25,
        activity_level='sedentary',
        weight_goal=180,
        weight_goal_rate=0.25
    )


    db.session.add(user_1_profile)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_seed_profiles():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.profiles RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM profiles")

    db.session.commit()

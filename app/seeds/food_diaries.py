from app.models import db, environment, SCHEMA, FoodDiary
from datetime import datetime, date, time, timedelta

# Adds a demo user, you can add other users here if you want
def seed_food_diaries():
    food_diary_1 = FoodDiary(
        id = 1,
        user_id = 1,
        date = date(2023, 3, 24)
    )
    food_diary_2 = FoodDiary(
        id = 2,
        user_id = 2,
        date = date(2023, 3, 23)
    )
    food_diary_3 = FoodDiary(
        id = 3,
        user_id = 1,
        date = date(2023, 3, 22)
    )


    db.session.add(food_diary_1)
    db.session.add(food_diary_2)
    db.session.add(food_diary_3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_seed_food_diaries():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.food_diaries RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM food_diaries")

    db.session.commit()

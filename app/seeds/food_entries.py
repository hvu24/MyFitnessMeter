from app.models import db, environment, SCHEMA, FoodEntry
from datetime import datetime, date, time, timedelta

# Adds a demo user, you can add other users here if you want
def seed_food_entries():
    food_entry_1 = FoodEntry(
        id = 1,
        food_diary_id = 1,
        name = 'banana',
        amount = 100,
        calories_per_gram = 0.89
    )
    food_entry_2 = FoodEntry(
        id = 2,
        food_diary_id = 1,
        name = 'beef',
        amount = 200,
        calories_per_gram = 2.59
    )
    food_entry_3 = FoodEntry(
        id = 3,
        food_diary_id = 2,
        name = 'banana',
        amount = 100,
        calories_per_gram = 0.89
    )
    food_entry_4 = FoodEntry(
        id = 4,
        food_diary_id = 2,
        name = 'beef',
        amount = 200,
        calories_per_gram = 2.59
    )


    db.session.add(food_entry_1)
    db.session.add(food_entry_2)
    db.session.add(food_entry_3)
    db.session.add(food_entry_4)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_seed_food_entries():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.food_entries RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM food_entries")

    db.session.commit()

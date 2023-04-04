from app.models import db, environment, SCHEMA, Exercise
from datetime import datetime, date, time, timedelta

# Adds a demo user, you can add other users here if you want


def seed_exercises():
    activities = [
        {'name': 'Canoeing leisurely', 'met': 2.5},
        {'name': 'Croquet', 'met': 2.5},
        {'name': 'Dancing, ballroom, slow', 'met': 2.9},
        {'name': 'Fishing, standing', 'met': 2.5},
        {'name': 'Golf with a cart', 'met': 2.5},
        {'name': 'Housework, light', 'met': 2.5},
        {'name': 'Playing catch', 'met': 2.5},
        {'name': 'Playing a piano', 'met': 2.5},
        {'name': 'Sitting quietly', 'met': 1.0},
        {'name': 'Stretching exercises, yoga', 'met': 2.5},
        {'name': 'Walking, 2 mph', 'met': 2.5},
        {'name': 'Aerobic dance, low impact', 'met': 5.0},
        {'name': 'Archery', 'met': 3.5},
        {'name': 'Badminton', 'met': 4.5},
        {'name': 'Baseball or softball', 'met': 5.0},
        {'name': 'Basketball, shooting baskets', 'met': 4.5},
        {'name': 'Bicycling, leisurely', 'met': 3.5},
        {'name': 'Bowling', 'met': 3.0},
        {'name': 'Calisthenics, light to moderate', 'met': 3.5},
        {'name': 'Canoeing, 3 mph', 'met': 3.0},
        {'name': 'Chopping wood', 'met': 6.0},
        {'name': 'Dancing, aerobic or ballet', 'met': 6.0},
        {'name': 'Dancing, modern, fast', 'met': 4.8},
        {'name': 'Fencing', 'met': 6.0},
        {'name': 'Fishing, walking and standing', 'met': 3.5},
        {'name': 'Foot bag, hacky sack', 'met': 4.0},
        {'name': 'Gardening, active', 'met': 4.0},
        {'name': 'Golf, walking', 'met': 4.4},
        {'name': 'Gymnastics', 'met': 4.0},
        {'name': 'Hiking cross country', 'met': 6.0},
        {'name': 'Horseback riding', 'met': 4.0},
        {'name': 'Ice skating', 'met': 5.5},
        {'name': 'Jumping on mini tramp', 'met': 4.5},
        {'name': 'Kayaking', 'met': 5.0},
        {'name': 'Mowing lawn, walking', 'met': 5.5},
        {'name': 'Raking the lawn', 'met': 4.0},
        {'name': 'Shoveling snow', 'met': 6.0},
        {'name': 'Skateboarding', 'met': 5.0},
        {'name': 'Skiing downhill, moderate', 'met': 6.0},
        {'name': 'Snorkeling', 'met': 5.0},
        {'name': 'Snowmobiling', 'met': 3.5},
        {'name': 'Surfing', 'met': 6.0},
        {'name': 'Swimming, moderate pace', 'met': 4.5},
        {'name': 'Table tennis', 'met': 4.0},
        {'name': 'Tai chi', 'met': 4.0},
        {'name': 'Tennis, doubles', 'met': 5.0},
        {'name': 'Trampoline', 'met': 3.5},
        {'name': 'Volleyball, noncompetitive', 'met': 3.0},
        {'name': 'Walking, 15 min/mile', 'met': 5.0},
        {'name': 'Walking, brisk up hills', 'met': 6.0},
        {'name': 'Water skiing', 'met': 6.0},
        {'name': 'Weight lifting, heavy workout', 'met': 6.0},
        {'name': 'Wrestling', 'met': 6.0},
        {'name': 'Aerobic dance', 'met': 6.5},
        {'name': 'Aerobic dance, high impact', 'met': 7.0},
        {'name': 'Aerobic stepping, 6-8 inches', 'met': 8.5},
        {'name': 'Backpacking', 'met': 7.0},
        {'name': 'Basketball game', 'met': 8.0},
        {'name': 'Bicycling, 12-13 mph', 'met': 8.0},
        {'name': 'Bicycling, 20+ mph', 'met': 16.0},
        {'name': 'Calisthenics, heavy, vigorous', 'met': 8.0},
        {'name': 'Canoeing, 5 mph or portaging', 'met': 7.0},
        {'name': 'Fishing in stream with waders', 'met': 6.5},
        {'name': 'Football, competitive', 'met': 9.0},
        {'name': 'Football, touch/flag', 'met': 8.0},
        {'name': 'Frisbee, ultimate', 'met': 8.0},
        {'name': 'Hockey, field or ice', 'met': 8.0},
        {'name': 'Ice skating, social', 'met': 7.0},
        {'name': 'Jogging, 12 min/mile', 'met': 8.0},
        {'name': 'Judo/karate/tae kwan do', 'met': 10.0},
        {'name': 'Lacrosse', 'met': 8.0},
        {'name': 'Logging/felling trees', 'met': 8.0},
        {'name': 'Mountain climbing', 'met': 8.0},
        {'name': 'Racquetball', 'met': 10.0},
        {'name': 'Racquetball, team', 'met': 8.0},
        {'name': 'Roller skating', 'met': 7.0},
        {'name': 'Rollerblading, fast', 'met': 12.0},
        {'name': 'Rope skipping, slow', 'met': 8.0},
        {'name': 'Rope skipping, fast', 'met': 12.0},
        {'name': 'Running, 10 min/mile', 'met': 10.0},
        {'name': 'Running, 6 min/mile', 'met': 16.0},
        {'name': 'Running, 7 min/mile', 'met': 14.0},
        {'name': 'Running, 8 min/mile', 'met': 12.5},
        {'name': 'Running, 9 min/mile', 'met': 11.0},
        {'name': 'Skiing cross country, slow', 'met': 7.0},
        {'name': 'Skiing cross country, moderate', 'met': 8.0},
        {'name': 'Skiing cross country, racing uphill', 'met': 16.5},
        {'name': 'Skiing cross country, vigorous', 'met': 9.0},
        {'name': 'Skiing down hill, vigorous', 'met': 8.0},
        {'name': 'Skin diving', 'met': 12.5},
        {'name': 'Snow shoeing', 'met': 8.0},
        {'name': 'Soccer, casual', 'met': 7.0},
        {'name': 'Soccer, competitive', 'met': 10.0},
        {'name': 'Swimming laps, fast', 'met': 10.0},
        {'name': 'Swimming laps, moderate pace', 'met': 7.0},
        {'name': 'Swimming laps, sidestroke', 'met': 8.0},
        {'name': 'Swimming recreational', 'met': 6.0},
        {'name': 'Tennis', 'met': 7.0},
        {'name': 'Volleyball, competitive/beach', 'met': 8.0},
        {'name': 'Walking, 11 min/mile', 'met': 11.0},
        {'name': 'Walking up stairs', 'met': 8.0},
        {'name': 'Water jogging', 'met': 8.0},
        {'name': 'Water polo', 'met': 10.0}
    ]

    for activity in activities:
        exercise = Exercise(name=activity['name'], met=activity['met'])
        db.session.add(exercise)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_seed_exercises():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.exercises RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM exercises")

    db.session.commit()

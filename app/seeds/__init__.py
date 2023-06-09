from flask.cli import AppGroup
from .users import seed_users, undo_users
from .food_diaries import seed_food_diaries, undo_seed_food_diaries
from .food_entries import seed_food_entries, undo_seed_food_entries
from .profiles import seed_user_profiles, undo_seed_profiles
from .exercises import seed_exercises, undo_seed_exercises

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_seed_exercises()
        undo_seed_profiles()
        undo_seed_food_entries()
        undo_seed_food_diaries()
        undo_users()
    seed_users()
    seed_food_diaries()
    seed_food_entries()
    seed_user_profiles()
    seed_exercises()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_seed_exercises()
    undo_seed_profiles()
    undo_seed_food_entries()
    undo_seed_food_diaries()
    undo_users()
    # Add other undo functions here

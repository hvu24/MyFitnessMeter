"""empty message

Revision ID: f891028cce04
Revises:
Create Date: 2023-04-10 17:08:38.526082

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'f891028cce04'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('exercises',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('met', sa.Float(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE exercises SET SCHEMA {SCHEMA};")

    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    # sa.Column('first_name', sa.String(length=255), nullable=False),
    # sa.Column('last_name', sa.String(length=255), nullable=False),
    # sa.Column('user_picture_url', sa.String(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")

    op.create_table('exercise_diaries',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE exercise_diaries SET SCHEMA {SCHEMA};")

    op.create_table('food_diaries',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE food_diaries SET SCHEMA {SCHEMA};")

    op.create_table('profiles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('height_in_inches', sa.Float(), nullable=False),
    sa.Column('sex', sa.String(length=255), nullable=False),
    sa.Column('birthday', sa.Date(), nullable=False),
    sa.Column('weight_in_pounds', sa.Float(), nullable=False),
    sa.Column('body_fat', sa.Float(), nullable=False),
    sa.Column('protein_ratio', sa.Integer(), nullable=False),
    sa.Column('carbohydrate_ratio', sa.Integer(), nullable=False),
    sa.Column('fat_ratio', sa.Integer(), nullable=False),
    sa.Column('activity_level', sa.String(length=255), nullable=False),
    sa.Column('weight_goal', sa.Float(), nullable=False),
    sa.Column('weight_goal_rate', sa.Float(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE profiles SET SCHEMA {SCHEMA};")

    op.create_table('exercise_entries',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('exercise_diary_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('amount', sa.Float(), nullable=False),
    # sa.Column('calories', sa.Float(), nullable=False),
    sa.Column('mets', sa.Float(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
    sa.ForeignKeyConstraint(['exercise_diary_id'], ['exercise_diaries.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE exercise_entries SET SCHEMA {SCHEMA};")

    op.create_table('food_entries',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('food_diary_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('amount', sa.Float(), nullable=False),
    sa.Column('calories_per_gram', sa.Float(), nullable=False),
    sa.Column('protein_per_gram', sa.Float(), nullable=False),
    sa.Column('fat_per_gram', sa.Float(), nullable=False),
    sa.Column('carb_per_gram', sa.Float(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
    sa.ForeignKeyConstraint(['food_diary_id'], ['food_diaries.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE food_entries SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('food_entries')
    op.drop_table('exercise_entries')
    op.drop_table('profiles')
    op.drop_table('food_diaries')
    op.drop_table('exercise_diaries')
    op.drop_table('users')
    op.drop_table('exercises')
    # ### end Alembic commands ###
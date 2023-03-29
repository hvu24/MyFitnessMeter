from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField, TextAreaField, DateField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange


class FoodEntryForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    amount = StringField('Amount', validators=[DataRequired()])

    class Meta:
        csrf=False

from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField, TextAreaField, DateField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange


class ExerciseEntryForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    amount = DecimalField('Amount', validators=[DataRequired()])
    # calories = DecimalField('Calories', validators=[DataRequired()])
    mets = DecimalField('Mets', validators=[DataRequired()])

    class Meta:
        csrf = False

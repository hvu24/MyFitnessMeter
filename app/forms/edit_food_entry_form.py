from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField, TextAreaField, DateField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange


class EditFoodEntryForm(FlaskForm):
    id = IntegerField('Id', validators=[DataRequired()])
    name = StringField('Name', validators=[DataRequired()])
    amount = DecimalField('Amount', validators=[DataRequired()])
    calories_per_gram = DecimalField('Calories per gram', validators=[DataRequired()])
    protein_per_gram = DecimalField('Protein per gram', validators=[DataRequired()])
    fat_per_gram = DecimalField('Fat per gram', validators=[DataRequired()])
    carb_per_gram = DecimalField('Carb per gram', validators=[DataRequired()])

    class Meta:
        csrf=False

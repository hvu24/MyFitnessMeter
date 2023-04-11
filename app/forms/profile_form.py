from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField, TextAreaField, DateField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange


class ProfileForm(FlaskForm):
    height_in_inches = DecimalField('Height', validators=[])
    sex = StringField('Sex', validators=[])
    birthday = DateField('Birthday', validators=[])
    weight_in_pounds = DecimalField('Weight in pounds', validators=[])
    body_fat = DecimalField('Body Fat', validators=[])
    weight_goal_rate = DecimalField('Weight Goal Rate', validators=[])
    activity_level = StringField('Activity Level', validators=[])
    weight_goal = DecimalField('Weight Goal', validators=[])
    protein_ratio = IntegerField('Protein Ratio', validators=[])
    carbohydrate_ratio = IntegerField('Carbohydrate Ratio', validators=[])
    fat_ratio = IntegerField('Fat Ratio', validators=[])

    class Meta:
        csrf=False

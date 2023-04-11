pipenv install --python "$PYENV_ROOT/versions/3.9.4/bin/python"

pipenv install click gunicorn itsdangerous python-dotenv six Flask Flask-Cors Flask-SQLAlchemy Flask-WTF Jinja2 MarkupSafe SQLAlchemy Werkzeug WTForms Flask-Migrate Flask-Login alembic python-dateutil python-editor greenlet Mako pycodestyle pylint psycopg2-binary email_validator

pipenv shell

#delete migration folder and instance folder before running the below commands
pipenv run flask db init
pipenv run flask db migrate
pipenv run flask db upgrade
flask seed all

flask run

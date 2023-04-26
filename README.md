# `<MyFitnessMeter>`
MyFitnessMeter is my attempt at creating a fitness tracking app which allows users to create food diaries, create exercise diaries, look up nutrition facts for different foods, and auto calculate recommended values for calories and nutrients.

### Screenshots
##### Food Diary Page
![FoodDiary]
##### Fitness Profile Page
![FitnessProfile]
##### Food Search Page
![FoodSearch]

[FoodDiary]: FoodDiary.PNG
[FitnessProfile]: FitnessProfile.PNG
[FoodSearch]: FoodSearch.PNG



### Features
* Food Diary
  * Create diary food entry
  * Show all food entries for a specific date
  * Edit existing food entry
  * Delete existing food entry
  * Clear diary all at once
  * Show details of a diary
  * Search database of foods then add to diary

* Exercise Diary
  * Create diary exercise entry
  * Show all exercise entries for a specific date
  * Edit existing exercise entry
  * Delete existing exercise entry
  * Clear diary all at once
  * Show details of a diary
  * Search database of exercises then add to diary

* Food Search
  * Search for foods by name
  * Show nutrition facts of a food
  * Show food's nutritional content compared to recommended daily intake via graph

* Fitness Profile
  * Create a fitness profile to calculate daily calorie goal
  * Edit fitness profile
  * Delete fitness profile
  * Set weight goal and auto calculate caloric requirement and timeline for reaching goal
  * Set macro nutrient value goals
  * Automatically updates food and exercise diary in relation to fitness profile

### Technologies Used
* Python
* Flask
* SQLAlchemy
* Sqlite3
* React
* Redux
* Html5
* Css
* Git
* Javascript
* MyPlot.js


### Setting up the application
* Click the green dropdown menu called "<> Code" and copy the url "https://github.com/hvu24/MyFitnessMeter.git"
* Open up a terminal and navigate to the folder you would like the files to be in
* Type git clone then hit space and paste the url "git clone https://github.com/hvu24/MyFitnessMeter.git" into your terminal and press enter
* Make a .env file in the root folder '/MyFitnessMeter/.env' and copy paste the following code or copy the .env.example file:
    ```json
        SECRET_KEY=lkasjdf09ajsdkfljalsiorj12n3490re9485309irefvn,u90818734902139489230
        DATABASE_URL=sqlite:///dev.db
        SCHEMA=flask_schema
    ```
* Navigate to frontend folder called '/MyFitnessMeter/react-app' through your terminal and type "npm install" then press enter
* Navigate to root folder called '/MyFitnessMeter' through your terminal and type "python --version" then press enter to check your current version of python
* Run the following command replacing 3.9.4 with your version number of python: pipenv install --python "$PYENV_ROOT/versions/3.9.4/bin/python"
* Then run this command: pipenv install click gunicorn itsdangerous python-dotenv six Flask Flask-Cors Flask-SQLAlchemy Flask-WTF Jinja2 MarkupSafe SQLAlchemy Werkzeug WTForms Flask-Migrate Flask-Login alembic python-dateutil python-editor greenlet Mako pycodestyle pylint psycopg2-binary email_validator
* Navigate to root folder through your terminal and type "pipenv shell" then press enter, then "flask run" and your backend should now be started
* Open a separate terminal and navigate to your frontend folder then type "npm start" to start your frontend

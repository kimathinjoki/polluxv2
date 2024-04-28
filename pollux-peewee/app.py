from flask import Flask, request
from flask_peewee.rest import RestAPI
from flask_peewee.db import Database

from models import User, Activity, Expense

app = Flask(__name__)
app.config.from_object(__name__)

db = Database(app)

# create a RestAPI container
api = RestAPI(app)

# Generate APIs for GET requests
api.register(User)      # /api/user/
api.register(Activity)  # /api/activity/
api.register(Expense)   # /api/expense/

api.setup()

if __name__ == '__main__':
    app.run()
from flask import Flask
from flask_peewee.rest import RestAPI

from flask_cors import CORS, cross_origin

from models import User, Activity, Expense

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config.from_object(__name__)

# create a RestAPI container
api = RestAPI(app)

api.register(User, )      # /api/user/
api.register(Activity)  # /api/activity/
api.register(Expense)   # /api/expense/

api.setup()

if __name__ == '__main__':
    app.run()
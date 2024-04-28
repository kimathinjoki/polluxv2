import datetime
from peewee import *

db = MySQLDatabase('pollux', host='localhost', port=3306, user='pollux', password='password')

class User(db.Model):
    username=TextField()
    first_name=TextField()
    last_name=TextField()
    created=DateTimeField(default=datetime.datetime.now)

    class Meta:
      database=db
      db_table='User'

class Activity(db.Model):
   description=TextField()
   created=DateTimeField(default=datetime.datetime.now)
   budget=FloatField()
   user=ForeignKeyField(User)
   
   class Meta:
      database=db
      db_table='Activity'

class Expense(db.Model):
   description=TextField()
   created=DateTimeField(default=datetime.datetime.now)
   activity=ForeignKeyField(Activity)
   paid_by=ForeignKeyField(User)
   
   class Meta:
      database=db
      db_table='Expense'
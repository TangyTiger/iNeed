from app import app
import random
from flask import request, session, jsonify, render_template
import logging

logger = logging.getLogger("werkzeug")
logger.setLevel(logging.ERROR)

users = {
        'sarthaklodha15@gmail.com': '1234567890'
        }

jobs = {}

@app.route('/ineed', methods=['GET'])
def ineed():
    if 'user' in session:
        return render_template('Homepage.html')
    return render_template('login.html')


@app.route('/login', methods=['PUT'])
def login():
    req = request.json
    if req['user'] in users:
        if req['pass'] == users[req['user']]:
            session['user'] = req['user']
            return jsonify({'response': 'you are logged in.'})
        else:
            return jsonify({'response': 'incorrect email or password'})
    else:
        return jsonify({'response': 'this account does not exist'})


@app.route('/createaccount', methods=['PUT'])
def create_account():
    req = request.json
    if req['user'] in users:
        return jsonify({'response': 'This email is already in use.'})
    users[req['user']] = req['pass']
    session['user'] = req['user']
    return jsonify({'response': 'Account Created!'})


@app.route('/postjob', methods=['PUT'])
def post_job():
    req = request.json
    pin = random.randint(10000, 99999)
    while pin in jobs:
        pin = random.randint(10000, 99999)
    job = {
        'title': req['title'],
        'description': req['description'],
        'tags': req['tags'],
        'location': req['location'],
        'name': req['employer'],
        'pin': pin
    }
    jobs[str(pin)] = job
    return "lash;dflkhjdso"


@app.route('/apply', methods=['PUT'])
def apply():
    req = request.json
    application = {
        'name': req['applicant'],
        'bio': req['bio'],
        'price': req['price'],
        'email': req['email'],
        'job': req['job']
    }
    return



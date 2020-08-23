from app import app
import random, json, os
from flask import request, session, jsonify, render_template
import logging

logger = logging.getLogger("werkzeug")
logger.setLevel(logging.ERROR)

userfile = 'users.json'

jobfile = 'jobs.json'


@app.route('/ineed', methods=['GET'])
def ineed():
    if 'email' in session:
        return render_template('Homepage.html')
    return render_template('login.html')


@app.route('/login', methods=['PUT'])
def login():
    req = request.json
    with open(userfile, 'r') as f:
        users = json.load(f)
        if req['email'] in users:
            if req['pass'] == users[req['email']]:
                session['email'] = req['email']
                return jsonify({'response': 'you are logged in.'})
            else:
                return jsonify({'response': 'incorrect email or password'})
        else:
            return jsonify({'response': 'this account does not exist'})


@app.route('/get-create', methods=['GET'])
def create_account():
    return render_template('createaccount.html')


@app.route('/createaccount', methods=['PUT'])
def createaccount():
    req = request.json
    with open(userfile, 'r+') as f:
        users = json.load(f)
        if req['email'] in users:
            return 'This email is already in use'
    users[req['email']] = req['pass']
    session['email'] = req['email']
    return 'Account Created!'


@app.route('/postjob', methods=['PUT'])
def post_job():
    req = request.json
    pin = random.randint(10000, 99999)
    with open(jobfile, 'r+') as f:
        jobs = json.load(f)
        while str(pin) in jobs:
            pin = random.randint(10000, 99999)
        job = {
            'title': req['title'],
            'description': req['description'],
            'county': req['county'],
            'name': session['email'],
            'pin': pin
        }
        jobs[str(pin)] = job
        f.seek(0)
        json.dump(jobs, f, indent=4)
    return "job created"


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



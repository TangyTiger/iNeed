from app import app
import random
from flask import request, session, jsonify, render_template
import logging

logger = logging.getLogger("werkzeug")
logger.setLevel(logging.ERROR)

users = {
    'sarthaklodha15@gmail.com': '1234567890',
    'aarush.uli@gmail.com': 'p00p'
}

jobs = {
    '1111': {'title': 'Plumbing Help Needed'},
    '2222': {'title': 'Plumber Needed'},
    '2212': {'title': 'Plumber Needed'},
    '2322': {'title': 'Plumber Needed'},
    '2223': {'title': 'Plumber Needed'}
}


@app.route('/ineed', methods=['GET'])
def ineed():
    if 'email' in session:
        titles = []
        for pin, job in jobs.items():
            titles.append(job['title'])
        return render_template('Homepage.html', job1=titles[0], job2=titles[1], job3=titles[2], job4=titles[3], job5=titles[4], jobs=jobs)
    session['jobs'] = {}
    return render_template('login.html')


@app.route('/login', methods=['PUT'])
def login():
    req = request.json
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

    if req['email'] in users:
        return 'This email is already in use'
    users[req['email']] = req['pass']
    session['email'] = req['email']
    return 'Account Created!'


@app.route('/postjob', methods=['PUT'])
def post_job():
    req = request.json
    pin = random.randint(10000, 99999)
    while str(pin) in jobs:
        pin = random.randint(10000, 99999)
        print(req)
    job = {
        'title': req['title'],
        'description': req['description'],
        'county': req['county'],
        'name': session['email'],
        'pin': str(pin)
    }
    jobs[str(pin)] = job
    session['jobs'][str(pin)] = job
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
    if application['job'] not in jobs:
        return 'Could not find the job you are applying for.'
    return "application created"


@app.route('/availablejobs', methods=['GET'])
def availablejobs():
    return render_template('AllJobs.html')


@app.route('/postajob', methods=['GET'])
def postajob():
    return render_template('postajob.html')

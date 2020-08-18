from app import app
import random
from flask import request, session, jsonify, render_template
import logging

logger = logging.getLogger("werkzeug")
logger.setLevel(logging.ERROR)

users = {
        'sarthaklodha15@gmail.com': '1234567890'
        }

@app.route('/ineed', methods=['GET'])
def ineed():
    if 'user' in session:
        return render_template('Homepage.html')
    return render_template('Test-Template.html')


@app.route('/login', methods=['PUT'])
def login():
    req = request.json
    if req['user'] in users:
        session['user'] = req['user']
        return jsonify({'response': 'you are logged in.'})

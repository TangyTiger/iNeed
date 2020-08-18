from app import app
import random
from flask import request, session, jsonify, render_template
import logging

logger = logging.getLogger("werkzeug")
logger.setLevel(logging.ERROR)


@app.route('/ineed', methods=['GET'])
def login():
    return render_template('Test-Template.html')
from app import app
from flask import request, session, jsonify, render_template
import logging

logger = logging.getLogger("werkzeug")
logger.setLevel(logging.ERROR)

@app.route('/PUT-URL-HERE', methods=['GET', 'PUT']) #choose either GET or PUT. GET for getting HTML to display, PUT for other communications.
def func_name_here():
    req = request.json   # only if a PUT request:
    '''
    blabalbalb
    blablabla
    PUT CODE/CALCULATIONS/CHANGES HERE
    blablablabla
    '''
    return render_template('Template_Name.html') or jsonify({'response': 'text here'})
    #              GET request ^^                            PUT request ^^

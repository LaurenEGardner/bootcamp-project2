import numpy as np
from flask import render_template
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################

engine = create_engine("sqlite:///Resources/data/importexport.db")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
export2019 = Base.classes.export2019
export2020 = Base.classes.export2020
import2019 = Base.classes.import2019
import2020 = Base.classes.import2020

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def home():
    # Return template and data
    return render_template("index.html")


@app.route("/export2019")
def export2019data():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all importexport data
    results = session.query(export2019.COUNTRY_NAME, export2019.COMMODITY).all()

    session.close()

# Create a dictionary from row of data and append to a list of dictionaries
    export2019_data = []
    for COUNTRY_NAME, COMMODITY in results:
        export2019_dict = {}
        export2019_dict["COUNTRY_NAME"] = Country
        export2019_dict["COMMODITY"] = Commodity
        country_commodity.append(export2019_dict)

    # turn the list of dicts into an array of objects
    return jsonify(pizzas_eaten)

# @app.route("/export2020")
# def export2020data():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     # Query all importexport data
#     results = session.query(export2020.COUNTRY_NAME, export2020.COMMODITY, export2019).all()

#     session.close()

# @app.route("/import2019")
# def import2019data():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     # Query all importexport data
#     results = session.query(import2019.COUNTRY_NAME, import2019.COMMODITY, export2019).all()

#     session.close()

# @app.route("/import2020")
# def import2020data():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     # Query all importexport data
#     results = session.query(import2020.COUNTRY_NAME, import2020.COMMODITY, export2019).all()

#     session.close()

    # Create a dictionary from row of data and append to a list of dictionaries
    export2019_data = []
    for COMMODITY, pizza in results:
        pizza_dict = {}
        pizza_dict["month"] = month
        pizza_dict["pizza"] = str(pizza)
        pizzas_eaten.append(pizza_dict)

    # turn the list of dicts into an array of objects
    return jsonify(pizzas_eaten)


if __name__ == '__main__':
    app.run(debug=True)

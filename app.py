import numpy as np
from flask import render_template
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, request, render_template


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
export2019Totals = Base.classes.export2019Totals
export2020Totals = Base.classes.export2020Totals
import2019Totals = Base.classes.import2019Totals
import2020Totals = Base.classes.import2020Totals
ImportExport = Base.classes.ImportExport
covid2020 = Base.classes.covid2020

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

@app.route("/importexport/")
def importexport():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all importexport data
    results = session.query(ImportExport.COMMODITY_DESCRIPTION,ImportExport.EXPORTS_2019,ImportExport.EXPORTS_2020,ImportExport.IMPORTS_2019,ImportExport.IMPORTS_2020)
    results = results.all()
    session.close()

#Create a dictionary from row of data and append to a list of dictionaries
    importexport_data = []
    for COMMODITY_DESCRIPTION,EXPORTS_2019,EXPORTS_2020,IMPORTS_2019,IMPORTS_2020 in results:
        importexport_dict = {}
        importexport_dict["COMMODITY_DESCRIPTION"] = COMMODITY_DESCRIPTION
        importexport_dict["EXPORTS_2019"] = EXPORTS_2019
        importexport_dict["EXPORTS_2020"] = EXPORTS_2020
        importexport_dict["IMPORTS_2019"] = IMPORTS_2019
        importexport_dict["IMPORTS_2020"] = IMPORTS_2020
        importexport_data.append(importexport_dict)

    # turn the list of dicts into an array of objects
    return jsonify(importexport_data)

@app.route("/export2019/<productCode>")
def export2019data(productCode):
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all importexport data
    results = session.query(export2019.COUNTRY_CODE, export2019.COUNTRY_NAME, export2019.DOMESTIC_FOREIGN_CODE, export2019.DISTRICT, export2019.DISTRICT_NAME, export2019.ALL_VALUES_MONTH, export2019.ALL_VALUES_YEAR, export2019.COMMODITY_DESCRIPTION, export2019.COMMODITY, export2019.YEAR, export2019.MONTH)

    # Filter by product 
    # If a user requested a code of 0, it would return all results
    if productCode != '0':
        results = results.filter(export2019.COMMODITY == productCode)

    results = results.all()

    session.close()

#Create a dictionary from row of data and append to a list of dictionaries
    export2019_data = []
    for COUNTRY_CODE, COUNTRY_NAME, DOMESTIC_FOREIGN_CODE, DISTRICT, DISTRICT_NAME, ALL_VALUES_MONTH, ALL_VALUES_YEAR, COMMODITY_DESCRIPTION, COMMODITY, YEAR, MONTH in results:
        export2019_dict = {}
        export2019_dict["COUNTRY_CODE"] = COUNTRY_CODE
        export2019_dict["COUNTRY_NAME"] = COUNTRY_NAME
        export2019_dict["DOMESTIC_FOREIGN_CODE"] = DOMESTIC_FOREIGN_CODE
        export2019_dict["DISTRICT"] = DISTRICT
        export2019_dict["DISTRICT_NAME"] = DISTRICT_NAME
        export2019_dict["ALL_VALUES_MONTH"] = ALL_VALUES_MONTH
        export2019_dict["ALL_VALUES_YEAR"] = ALL_VALUES_YEAR
        export2019_dict["COMMODITY_DESCRIPTION"] = COMMODITY_DESCRIPTION
        export2019_dict["COMMODITY"] = COMMODITY
        export2019_dict["YEAR"] = YEAR
        export2019_dict["MONTH"] = MONTH
        export2019_data.append(export2019_dict)

    # turn the list of dicts into an array of objects
    return jsonify(export2019_data)
    

@app.route("/export2020/<productCode>")
def export2020data(productCode):
#     # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all importexport data
    results = session.query(export2020.COUNTRY_CODE, export2020.COUNTRY_NAME, export2020.DOMESTIC_FOREIGN_CODE, export2020.DISTRICT, export2020.DISTRICT_NAME, export2020.ALL_VALUES_MONTH, export2020.ALL_VALUES_YEAR, export2020.COMMODITY_DESCRIPTION, export2020.COMMODITY, export2020.YEAR, export2020.MONTH)

    # Filter by product 
    # If a user requested a code of 0, it would return all results
    if productCode != '0':
        results = results.filter(export2020.COMMODITY == productCode)

    results = results.all()

    session.close()

#Create a dictionary from row of data and append to a list of dictionaries
    export2020_data = []
    for COUNTRY_CODE, COUNTRY_NAME, DOMESTIC_FOREIGN_CODE, DISTRICT, DISTRICT_NAME, ALL_VALUES_MONTH, ALL_VALUES_YEAR, COMMODITY_DESCRIPTION, COMMODITY, YEAR, MONTH in results:
        export2020_dict = {}
        export2020_dict["COUNTRY_CODE"] = COUNTRY_CODE
        export2020_dict["COUNTRY_NAME"] = COUNTRY_NAME
        export2020_dict["DOMESTIC_FOREIGN_CODE"] = DOMESTIC_FOREIGN_CODE
        export2020_dict["DISTRICT"] = DISTRICT
        export2020_dict["DISTRICT_NAME"] = DISTRICT_NAME
        export2020_dict["ALL_VALUES_MONTH"] = ALL_VALUES_MONTH
        export2020_dict["ALL_VALUES_YEAR"] = ALL_VALUES_YEAR
        export2020_dict["COMMODITY_DESCRIPTION"] = COMMODITY_DESCRIPTION
        export2020_dict["COMMODITY"] = COMMODITY
        export2020_dict["YEAR"] = YEAR
        export2020_dict["MONTH"] = MONTH
        export2020_data.append(export2020_dict)

    # turn the list of dicts into an array of objects
    return jsonify(export2020_data)

@app.route("/import2019/<productCode>")
def import2019data(productCode):
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all importexport data
    results = session.query(import2019.SUMMARY_LEVEL, import2019.SUMMARY_LEVEL_2, import2019.COUNTRY_CODE, import2019.COUNTRY_NAME, import2019.COUNTRY_SUBCODE, import2019.DISTRICT_NAME, import2019.COMMODITY, import2019.COMMODITY_DESCRIPTION, import2019.GENERAL_VALUES_MONTH, import2019.GENERAL_VALUES_YEAR, import2019.MONTHLY_CONSUMPTION_VALUE, import2019.YEARLY_CONSUMPTION_VALUE, import2019.YEAR, import2019.MONTH)
    
    # Filter by product 
    # If a user requested a code of 0, it would return all results
    if productCode != '0':
        results = results.filter(import2019.COMMODITY == productCode)

    results = results.all()
    
    session.close()

    #Create a dictionary from row of data and append to a list of dictionaries
    import2019_data = []
    for SUMMARY_LEVEL, SUMMARY_LEVEL_2, COUNTRY_CODE, COUNTRY_NAME, COUNTRY_SUBCODE, DISTRICT_NAME, COMMODITY, COMMODITY_DESCRIPTION, GENERAL_VALUES_MONTH, GENERAL_VALUES_YEAR, MONTHLY_CONSUMPTION_VALUE, YEARLY_CONSUMPTION_VALUE, YEAR, MONTH in results:
        import2019_dict = {}
        import2019_dict["SUMMARY_LEVEL"] = SUMMARY_LEVEL
        import2019_dict["SUMMARY_LEVEL_2"] = SUMMARY_LEVEL_2
        import2019_dict["COUNTRY_CODE"] = COUNTRY_CODE
        import2019_dict["COUNTRY_NAME"] = COUNTRY_NAME
        import2019_dict["COUNTRY_SUBCODE"] = COUNTRY_SUBCODE
        import2019_dict["DISTRICT_NAME"] = DISTRICT_NAME
        import2019_dict["COMMODITY"] = COMMODITY
        import2019_dict["COMMODITY_DESCRIPTION"] = COMMODITY_DESCRIPTION
        import2019_dict["GENERAL_VALUES_MONTH"] = GENERAL_VALUES_MONTH
        import2019_dict["GENERAL_VALUES_YEAR"] = GENERAL_VALUES_YEAR
        import2019_dict["MONTHLY_CONSUMPTION_VALUE"] = MONTHLY_CONSUMPTION_VALUE
        import2019_dict["YEARLY_CONSUMPTION_VALUE"] = YEARLY_CONSUMPTION_VALUE
        import2019_dict["YEAR"] = YEAR
        import2019_dict["MONTH"] = MONTH
        import2019_data.append(import2019_dict)

    return jsonify(import2019_data)
    

@app.route("/import2020/<productCode>")
def import2020data(productCode):
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all importexport data
    results = session.query(import2020.SUMMARY_LEVEL, import2020.SUMMARY_LEVEL_2, import2020.COUNTRY_CODE, import2020.COUNTRY_NAME, import2020.COUNTRY_SUBCODE, import2020.DISTRICT_NAME, import2020.COMMODITY, import2020.COMMODITY_DESCRIPTION, import2020.GENERAL_VALUES_MONTH, import2020.GENERAL_VALUES_YEAR, import2020.MONTHLY_CONSUMPTION_VALUE, import2020.YEARLY_CONSUMPTION_VALUE, import2020.YEAR, import2020.MONTH)
    
    # Filter by product 
    # If a user requested a code of 0, it would return all results
    if productCode != '0':
        results = results.filter(import2020.COMMODITY == productCode)

    results = results.all()
    
    session.close()

    #Create a dictionary from row of data and append to a list of dictionaries
    import2020_data = []
    for SUMMARY_LEVEL, SUMMARY_LEVEL_2, COUNTRY_CODE, COUNTRY_NAME, COUNTRY_SUBCODE,DISTRICT_NAME, COMMODITY, COMMODITY_DESCRIPTION, GENERAL_VALUES_MONTH, GENERAL_VALUES_YEAR, MONTHLY_CONSUMPTION_VALUE, YEARLY_CONSUMPTION_VALUE, YEAR, MONTH in results:
        import2020_dict = {}
        import2020_dict["SUMMARY_LEVEL"] = SUMMARY_LEVEL
        import2020_dict["SUMMARY_LEVEL_2"] = SUMMARY_LEVEL_2
        import2020_dict["COUNTRY_CODE"] = COUNTRY_CODE
        import2020_dict["COUNTRY_NAME"] = COUNTRY_NAME
        import2020_dict["COUNTRY_SUBCODE"] = COUNTRY_SUBCODE
        import2020_dict["DISTRICT_NAME"] = DISTRICT_NAME
        import2020_dict["COMMODITY"] = COMMODITY
        import2020_dict["COMMODITY_DESCRIPTION"] = COMMODITY_DESCRIPTION
        import2020_dict["GENERAL_VALUES_MONTH"] = GENERAL_VALUES_MONTH
        import2020_dict["GENERAL_VALUES_YEAR"] = GENERAL_VALUES_YEAR
        import2020_dict["MONTHLY_CONSUMPTION_VALUE"] = MONTHLY_CONSUMPTION_VALUE
        import2020_dict["YEARLY_CONSUMPTION_VALUE"] = YEARLY_CONSUMPTION_VALUE
        import2020_dict["YEAR"] = YEAR
        import2020_dict["MONTH"] = MONTH
        import2020_data.append(import2020_dict)

    return jsonify(import2020_data)

@app.route("/export2019totals/<productCode>")
def export2019Totalsdata(productCode):
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all importexport data
    results = session.query(export2019Totals.COUNTRY_CODE, export2019Totals.COUNTRY_NAME, export2019Totals.DOMESTIC_FOREIGN_CODE, export2019Totals.DISTRICT, export2019Totals.DISTRICT_NAME, export2019Totals.ALL_VALUES_MONTH, export2019Totals.ALL_VALUES_YEAR, export2019Totals.COMMODITY_DESCRIPTION, export2019Totals.COMMODITY, export2019Totals.YEAR, export2019Totals.MONTH)

    # Filter by product 
    # If a user requested a code of 0, it would return all results
    if productCode != '0':
        results = results.filter(export2019Totals.COMMODITY == productCode)

    # Filter so each month has only one value
    results = results.filter(export2019Totals.DOMESTIC_FOREIGN_CODE == '-')

    results = results.all()

    session.close()

#Create a dictionary from row of data and append to a list of dictionaries
    export2019_data = []
    for COUNTRY_CODE, COUNTRY_NAME, DOMESTIC_FOREIGN_CODE, DISTRICT, DISTRICT_NAME, ALL_VALUES_MONTH, ALL_VALUES_YEAR, COMMODITY_DESCRIPTION, COMMODITY, YEAR, MONTH in results:
        export2019_dict = {}
        export2019_dict["COUNTRY_CODE"] = COUNTRY_CODE
        export2019_dict["COUNTRY_NAME"] = COUNTRY_NAME
        export2019_dict["DOMESTIC_FOREIGN_CODE"] = DOMESTIC_FOREIGN_CODE
        export2019_dict["DISTRICT"] = DISTRICT
        export2019_dict["DISTRICT_NAME"] = DISTRICT_NAME
        export2019_dict["ALL_VALUES_MONTH"] = ALL_VALUES_MONTH
        export2019_dict["ALL_VALUES_YEAR"] = ALL_VALUES_YEAR
        export2019_dict["COMMODITY_DESCRIPTION"] = COMMODITY_DESCRIPTION
        export2019_dict["COMMODITY"] = COMMODITY
        export2019_dict["YEAR"] = YEAR
        export2019_dict["MONTH"] = MONTH
        export2019_data.append(export2019_dict)

    # turn the list of dicts into an array of objects
    return jsonify(export2019_data)
    

@app.route("/export2020totals/<productCode>")
def export2020Totalsdata(productCode):
#     # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all importexport data
    results = session.query(export2020Totals.COUNTRY_CODE, export2020Totals.COUNTRY_NAME, export2020Totals.DOMESTIC_FOREIGN_CODE, export2020Totals.DISTRICT, export2020Totals.DISTRICT_NAME, export2020Totals.ALL_VALUES_MONTH, export2020Totals.ALL_VALUES_YEAR, export2020Totals.COMMODITY_DESCRIPTION, export2020Totals.COMMODITY, export2020Totals.YEAR, export2020Totals.MONTH)

    # Filter by product 
    # If a user requested a code of 0, it would return all results
    if productCode != '0':
        results = results.filter(export2020Totals.COMMODITY == productCode)

    # Filter so each month has only one value
    results = results.filter(export2020Totals.DOMESTIC_FOREIGN_CODE == '-')

    results = results.all()

    session.close()

#Create a dictionary from row of data and append to a list of dictionaries
    export2020_data = []
    for COUNTRY_CODE, COUNTRY_NAME, DOMESTIC_FOREIGN_CODE, DISTRICT, DISTRICT_NAME, ALL_VALUES_MONTH, ALL_VALUES_YEAR, COMMODITY_DESCRIPTION, COMMODITY, YEAR, MONTH in results:
        export2020_dict = {}
        export2020_dict["COUNTRY_CODE"] = COUNTRY_CODE
        export2020_dict["COUNTRY_NAME"] = COUNTRY_NAME
        export2020_dict["DOMESTIC_FOREIGN_CODE"] = DOMESTIC_FOREIGN_CODE
        export2020_dict["DISTRICT"] = DISTRICT
        export2020_dict["DISTRICT_NAME"] = DISTRICT_NAME
        export2020_dict["ALL_VALUES_MONTH"] = ALL_VALUES_MONTH
        export2020_dict["ALL_VALUES_YEAR"] = ALL_VALUES_YEAR
        export2020_dict["COMMODITY_DESCRIPTION"] = COMMODITY_DESCRIPTION
        export2020_dict["COMMODITY"] = COMMODITY
        export2020_dict["YEAR"] = YEAR
        export2020_dict["MONTH"] = MONTH
        export2020_data.append(export2020_dict)

    # turn the list of dicts into an array of objects
    return jsonify(export2020_data)

@app.route("/import2019totals/<productCode>")
def import2019Totalsdata(productCode):
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all importexport data
    results = session.query(import2019Totals.SUMMARY_LEVEL, import2019Totals.SUMMARY_LEVEL_2, import2019Totals.COUNTRY_CODE, import2019Totals.COUNTRY_NAME, import2019Totals.COUNTRY_SUBCODE, import2019Totals.DISTRICT_NAME, import2019Totals.COMMODITY, import2019Totals.COMMODITY_DESCRIPTION, import2019Totals.GENERAL_VALUES_MONTH, import2019Totals.GENERAL_VALUES_YEAR, import2019Totals.MONTHLY_CONSUMPTION_VALUE, import2019Totals.YEARLY_CONSUMPTION_VALUE, import2019Totals.YEAR, import2019Totals.MONTH)
    
    # Filter by product 
    # If a user requested a code of 0, it would return all results
    if productCode != '0':
        results = results.filter(import2019Totals.COMMODITY == productCode)

    # Filter so each month has only one value
    results = results.filter(import2019Totals.SUMMARY_LEVEL_2 == 'HS')

    results = results.all()
    
    session.close()

    #Create a dictionary from row of data and append to a list of dictionaries
    import2019_data = []
    for SUMMARY_LEVEL, SUMMARY_LEVEL_2, COUNTRY_CODE, COUNTRY_NAME, COUNTRY_SUBCODE, DISTRICT_NAME, COMMODITY, COMMODITY_DESCRIPTION, GENERAL_VALUES_MONTH, GENERAL_VALUES_YEAR, MONTHLY_CONSUMPTION_VALUE, YEARLY_CONSUMPTION_VALUE, YEAR, MONTH in results:
        import2019_dict = {}
        import2019_dict["SUMMARY_LEVEL"] = SUMMARY_LEVEL
        import2019_dict["SUMMARY_LEVEL_2"] = SUMMARY_LEVEL_2
        import2019_dict["COUNTRY_CODE"] = COUNTRY_CODE
        import2019_dict["COUNTRY_NAME"] = COUNTRY_NAME
        import2019_dict["COUNTRY_SUBCODE"] = COUNTRY_SUBCODE
        import2019_dict["DISTRICT_NAME"] = DISTRICT_NAME
        import2019_dict["COMMODITY"] = COMMODITY
        import2019_dict["COMMODITY_DESCRIPTION"] = COMMODITY_DESCRIPTION
        import2019_dict["GENERAL_VALUES_MONTH"] = GENERAL_VALUES_MONTH
        import2019_dict["GENERAL_VALUES_YEAR"] = GENERAL_VALUES_YEAR
        import2019_dict["MONTHLY_CONSUMPTION_VALUE"] = MONTHLY_CONSUMPTION_VALUE
        import2019_dict["YEARLY_CONSUMPTION_VALUE"] = YEARLY_CONSUMPTION_VALUE
        import2019_dict["YEAR"] = YEAR
        import2019_dict["MONTH"] = MONTH
        import2019_data.append(import2019_dict)

    return jsonify(import2019_data)
    

@app.route("/import2020totals/<productCode>")
def import2020Totalsdata(productCode):
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all importexport data
    results = session.query(import2020Totals.SUMMARY_LEVEL, import2020Totals.SUMMARY_LEVEL_2, import2020Totals.COUNTRY_CODE, import2020Totals.COUNTRY_NAME, import2020Totals.COUNTRY_SUBCODE, import2020Totals.DISTRICT_NAME, import2020Totals.COMMODITY, import2020Totals.COMMODITY_DESCRIPTION, import2020Totals.GENERAL_VALUES_MONTH, import2020Totals.GENERAL_VALUES_YEAR, import2020Totals.MONTHLY_CONSUMPTION_VALUE, import2020Totals.YEARLY_CONSUMPTION_VALUE, import2020Totals.YEAR, import2020Totals.MONTH)
    
    # Filter by product 
    # If a user requested a code of 0, it would return all results
    if productCode != '0':
        results = results.filter(import2020Totals.COMMODITY == productCode)

    # Filter so each month has only one value
    results = results.filter(import2020Totals.SUMMARY_LEVEL_2 == 'HS')

    results = results.all()
    
    session.close()

    #Create a dictionary from row of data and append to a list of dictionaries
    import2020_data = []
    for SUMMARY_LEVEL, SUMMARY_LEVEL_2, COUNTRY_CODE, COUNTRY_NAME, COUNTRY_SUBCODE,DISTRICT_NAME, COMMODITY, COMMODITY_DESCRIPTION, GENERAL_VALUES_MONTH, GENERAL_VALUES_YEAR, MONTHLY_CONSUMPTION_VALUE, YEARLY_CONSUMPTION_VALUE, YEAR, MONTH in results:
        import2020_dict = {}
        import2020_dict["SUMMARY_LEVEL"] = SUMMARY_LEVEL
        import2020_dict["SUMMARY_LEVEL_2"] = SUMMARY_LEVEL_2
        import2020_dict["COUNTRY_CODE"] = COUNTRY_CODE
        import2020_dict["COUNTRY_NAME"] = COUNTRY_NAME
        import2020_dict["COUNTRY_SUBCODE"] = COUNTRY_SUBCODE
        import2020_dict["DISTRICT_NAME"] = DISTRICT_NAME
        import2020_dict["COMMODITY"] = COMMODITY
        import2020_dict["COMMODITY_DESCRIPTION"] = COMMODITY_DESCRIPTION
        import2020_dict["GENERAL_VALUES_MONTH"] = GENERAL_VALUES_MONTH
        import2020_dict["GENERAL_VALUES_YEAR"] = GENERAL_VALUES_YEAR
        import2020_dict["MONTHLY_CONSUMPTION_VALUE"] = MONTHLY_CONSUMPTION_VALUE
        import2020_dict["YEARLY_CONSUMPTION_VALUE"] = YEARLY_CONSUMPTION_VALUE
        import2020_dict["YEAR"] = YEAR
        import2020_dict["MONTH"] = MONTH
        import2020_data.append(import2020_dict)

    return jsonify(import2020_data)

@app.route("/covid2020")
def covid2020data():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all importexport data
    results = session.query(covid2020.month, covid2020.cases, covid2020.deaths).all()

    session.close()

    #Create a dictionary from row of data and append to a list of dictionaries
    covid2020_data = []
    for month, cases, deaths in results:
        covid2020_dict = {}
        covid2020_dict["month"] = month
        covid2020_dict["cases"] = cases
        covid2020_dict["deaths"] = deaths
        
        covid2020_data.append(covid2020_dict)

    return jsonify(covid2020_data)


if __name__ == '__main__':
    app.run(debug=True)

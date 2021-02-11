# Project 2

## Business Question

Seeking to build a story around the current sourcing for Pharmaceuticals and Medical supplies. Comparing US import/export data of specific commodities

How is the volume of imports/exports of Pharmaceuticals and Medical supplies effected by the pandemic? 
1. Evaluate changes in distribution: What was the volume/distr in 2019? 2020? 

2. Is there a correlation between changes in Pharmaceuticals and Medical supplies distribution vs Covid-19 cases?
    
3. Are there countries/places we should be concerned about the pandemic causing shortages in supply?
       

## Running the Project

Follow these instructions to run our project. We will include instructions for running all the way through the data pipeline, but you can skip to the instructions for launching the site if you'd like. 

### Building the Database
To get the data we used for our project:
1. Open our project in Jupyter Notebook.
2. Open and select Kernel > Restart and Run All for the following files:
    * exportAPI.ipynb
    * exportAPI2020.ipynb
    * importAPI.ipynb
    * importAPI2020.ipynb
    * COVID_Info.ipynb
3. Open write_data2.ipynb and select Kernel > Restart and Run All.

Result: You have retrieved the data and added it to the database. 

### Launching the Site
To launch our interactive dashboard:
1. Open the command line and run: python app.py
    
    Note: Mac users may need to run FLASK_APP=app.py flask run instead.
2. In an Incognito browser, navigate to http://127.0.0.1:5000.

Result: You are able to see and use the dashboard.

### Available API Routes
The following routes are available to retrieve JSON data:

Note: Available 4 digit Harmonized Tariff Schedule codes(HTS codes)[HTS codes](https://www.datamyne.com/whats-an-hs-or-hts-code/#:~:text=An%20HS%20or%20HTS%20code%20stands%20for%20Harmonized%20System%20or,and%20define%20internationally%20traded%20goods.&text=These%20codes%20go%20from%202,a%20specific%2010%2Ddigit%20code.)

 are: 3002, 3003, 3004, 3005, 3006

The following route returns the year over year quantity change over by product code for imports and exports
* /importexport

The following routes retrieve all data for a specific HTS code. Enter 0 to retrieve data for all codes.
* /export2019/{productCode}
* /import2019/{productCode}
* /export2020/{productCode}
* /import2020/{productCode}


The following routes retrieve monthly and yearly total data for a specific HTS code. Enter 0 to retrieve data for all codes.
* /export2019totals/{productCode}
* /import2019totals/{productCode}
* /export2020totals/{productCode}
* /import2020totals/{productCode}

The following route retrieves cumulative COVID data for the US for January 2020 - November 2020.
* /covid2020

## Group Contributions
* Courtney - Did research into PPE products, production and corresponding HTS codes. Created incial API call for the census data on PPE imports and Exports for 2019 and 2020. Sources can be found in the resource folder. (Resources-PPE_HTS)[http://localhost:8888/edit/Resources/PPE_HTS.csv]   
Added US latitude and Longitude coordinates for cities and states to be possiblely used for GEOjson chart.
* Danica - 
* Lauren - Added initial functionality to app.py for the original dataset to allow for the JSON calls. Built the Sankey diagram that displays the top 10 values of imports/exports and their source country/region & target country/region
* Siara - Retrieved and cleaned COVID data. Worked on the time series Plotly chart that displays COVID data vs. Import/Export data for 2020.
* Stacey - 

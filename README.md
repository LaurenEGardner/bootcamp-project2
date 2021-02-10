# Project 2

## Business Question

Seeking to build a story around the current sourcing of the materials (commodities) used for PPE gloves. Comparing US import/export data of specific commodities

How is the volume of imports/exports of gloves effected by the pandemic? 
1. Evaluate changes in distribution: What was the volume/distr in 2019? 2020? 
    time series - import: MONTHLY_CONSUMPTION_VALUE (aggregate by COMMODITY_DESCRIPTION or COMMODITY) by MONTH
                export: ALL_VALUES_MONTH (aggregate by COMMODITY_DESCRIPTION or COMMODITY) by MONTH)
    bar - import: COMMODITY by YEARLY_CONSUMPTION_VALUE - key by year
        export: COMMODITY by ALL_VALUES_YEAR
        make interactive by creating drop down to filter by commodity?

map - yearly vol by country/location? 

2. Is there a correlation between changes in PPE distribution vs Covid-19 cases?
    time series - compare total distr w/ total US cases/month
3. Are there countries/places we should be concerned about the pandemic causing shortages in supply?
    sankey graph    

Brainstorm:
    - What are import/export trends by geographical location?
    - foucs on country level
    - US region? 
    - country give name of product/origin location

Is there an export/import city we should be concerned about being hit by Covid etc
     - look at import/export values (policy standpoint)
     - look at highest volume
     - compare with Covid numbers

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
  
  This will retrieve, clean, and export the data to CSV files.
3. Open write_data.ipynb and select Kernel > Restart and Run All.

Result: You have retrieved the data and added it to the database. 

### Launching the Site
To launch our interactive dashboard:
1. Open the command line and run: python app.py
    Note: Mac users may need to run FLASK_APP=app.py flask run instead.
2. In an Incognito browser, navigate to http://127.0.0.1:5000.

Result: You are able to see and use the dashboard.

### Available API Routes
The following routes are available to retrieve JSON data:

Note: Available HTS codes are: 3002, 3003, 3004, 3005, 3006

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
* Courtney - 
* Danica - 
* Lauren - 
* Siara - Retrieved and cleaned COVID data. Worked on the time series Plotly chart that displays COVID data vs. Import/Export data for 2020.
* Stacey - 

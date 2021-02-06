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

## Tasks
* Pulling data - Courtney
* Feeding data to database - Siara

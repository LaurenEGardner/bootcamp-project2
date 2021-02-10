// Function when the PPE dropdown value changes
function productChanged(productCode) {
    console.log("Changed product", productCode);
    var infoType = d3.select("input[name='infoType']:checked").node().value;
    getData(productCode, infoType);
}

function infoTypeChanged() {
    var productCode = d3.select("#selProduct").node().value;
    var infoType = d3.select("input[name='infoType']:checked").node().value;
    console.log("Info change", productCode, infoType);
    getData(productCode, infoType);
}

// Function to build the time series chart for the selected product
function getData(productCode, infoType) {
    console.log(productCode, infoType);
    // Create variables to save the data to
    var productData = {};
    var covidData = {};
    var url = "";

    if (infoType == "Import") {
        url = "/import2020totals/" + productCode;
        console.log("Import URL", url);
    } else {
        url = "/export2020totals/" + productCode;
        console.log("Export URL", url)
    }

    // Read in Product data and save to variables
    d3.json(url).then((data) => {
        console.log(data, "Inside Product D3");
        productData = data;
    });

    // Read in COVID data and save to variables
    d3.json("/covid2020").then((data) => {
        console.log(data, "Inside COVID D3");
        covidData = data;
    });

    // Give API calls time
    setTimeout(() => { console.log(productData, "Outside Product D3"); }, 1500);
    setTimeout(() => { console.log(covidData, "Outside COVID D3"); }, 1500);
    setTimeout(() => { buildCovidChart(productCode, infoType, covidData, productData); }, 1500);
}

function buildCovidChart(productCode, infoType, covidData, productData) {
    // Create traces and layout
    console.log("Inside chart ", productData);

    // X axis values (Months will be the same for each graph.)
    var months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    // Get y values for product information
    var productYValues = [];
    if (infoType == "Import") {
        productYValues = productData.map(row => row.GENERAL_VALUES_MONTH);
    } else {
        productYValues = productData.map(row => row.ALL_VALUES_MONTH);
    }

    // Get product name
    var productName = productData[0].COMMODITY_DESCRIPTION;
    console.log("Product name from data: ", productName);

    var trace1 = {
        x: months,
        y: productYValues,
        name: `${productName} ${infoType}`,
        type: 'scatter'
      };
      
      var trace2 = {
        x: months,
        y: covidData.map(row => row.cases),
        name: 'COVID Cases',
        yaxis: 'y2',
        type: 'scatter'
      };
      
      var data = [trace1, trace2];
      
      var layout = {
        title: `COVID Cases vs. US ${infoType}s`,
        yaxis: {title: `${productName} ${infoType} Volume`},
        yaxis2: {
          title: 'COVID Cases',
          titlefont: {color: 'rgb(148, 103, 189)'},
          tickfont: {color: 'rgb(148, 103, 189)'},
          overlaying: 'y',
          side: 'right'
        }
      };

    // Build time series chart
    Plotly.newPlot('covidInfo', data, layout);
}

function init() {
    // Get filter information
    var radio = d3.select("input[name='infoType']:checked").node().value;

    // Populate drop down
    var productOptions = [{value: 3002, text: "Vaccines, Blood, and Immunological products"}, {value: 3003, text: "Medication (unmeasured doses)"}, {value: 3004, text: "Medication (measured doses)"}, {value: 3005, text: "Medically-treated Bandages"}, {value: 3006, text: "Surgical Equipment"}];

    var menuOptions = d3.select("#selProduct")
                        .selectAll("options")
                        .data(productOptions)
                        .enter()
                        .append("option")
                        .text(function (d) {return d.text})
                        .attr("value", function (d) {return d.value;})
                        

    // Build chart with default info
    getData(productOptions[0].value, radio);

}

init();
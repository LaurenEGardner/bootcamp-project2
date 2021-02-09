// Function when the PPE dropdown value changes
function productChanged(product) {
    var radio = d3.select("input[name='infoType']:checked").node().value;
    buildTimeChart(product, radio);
}

function infoTypeChanged() {
    var dropdown = d3.select("#selProduct").value;
    var radio = d3.select("input[name='infoType']:checked").node().value;
    buildTimeChart(dropdown, radio);
}

// Function to build the time series chart for the selected product
function buildTimeChart(product, infoType) {
    // Create variables to save the data to
    console.log(product);
    console.log(infoType);

    // Read in COVID data and save to variables

    // Read in Product data and save to variables

    // Create traces and layout

    // Build time series chart
}

function init() {
    //var dropdown = d3.select("#selProduct");
    //var radio = d3.select("input[name='infoType']:checked").node().value;

    console.log("You can see me.");
    // Figure out how to populate dropdown with unique values from data.
    ppeList = []

}

init();
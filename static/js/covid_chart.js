// Function when the PPE dropdown value changes
function optionChanged(product) {
    buildTimeChart(product);
}

// Function to build the time series chart for the selected product
function buildTimeChart(product) {
    // Create variables to save the data to

    // Read in COVID data and save to variables

    // Read in Product data and save to variables

    // Create traces and layout

    // Build time series chart
}

function init() {
    var dropdown = ds.select("selPPE");

    // Figure out how to populate dropdown with unique values from data.
    d3.json("127.0.0.1:5000/covid2020").then((data) => {
        console.log(data);
    })

}

init();
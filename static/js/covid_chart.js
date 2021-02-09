// Function when the PPE dropdown value changes
function productChanged(product) {
    var radio = d3.select("input[name='infoType']:checked").node().value;
    buildTimeChart(product, radio);
}

function infoTypeChanged() {
    var dropdown = d3.select("#selProduct").node().value;
    var radio = d3.select("input[name='infoType']:checked").node().value;
    buildTimeChart(dropdown, radio);
}

// Function to build the time series chart for the selected product
function buildTimeChart(product, infoType) {
    console.log(product, infoType);
    // Create variables to save the data to

    // Read in COVID data and save to variables

    // Read in Product data and save to variables

    // Create traces and layout

    // Build time series chart
}

function init() {
    // Get filter information
    var radio = d3.select("input[name='infoType']:checked").node().value;

    // Populate drop down
    var productOptions = [{value: 1, text: "One"}, {value: 2, text: "Two"}, {value: 3, text: "Three"}];

    var menuOptions = d3.select("#selProduct")
                        .selectAll("options")
                        .data(productOptions)
                        .enter()
                        .append("option")
                        .text(function (d) {return d.text})
                        .attr("value", function (d) {return d.value;})
                        

    // Build chart with default info
    buildTimeChart(productOptions[0], radio);

}

init();
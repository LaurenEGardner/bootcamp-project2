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
    var covidData = {};
    var impExpData = {};
    // Read in COVID data and save to variables
    d3.json("/covid2020/Washington").then((data) => {
        console.log(data);
        covidData = data;
    });
    // Read in Product data and save to variables
    if (infoType == "export") {
        d3.json("/export2020/2926100000").then((data) => {
            console.log(data);
            impExpData = data;
        });
    } else {
        d3.json("/import2020/3926201010").then((data) => {
            console.log(data);
            impExpData = data;
        });
    }

    // Create traces and layout
    var trace1 = {
        x: [1, 2, 3],
        y: [40, 50, 60],
        name: 'yaxis data',
        type: 'scatter'
      };
      
      var trace2 = {
        x: [2, 3, 4],
        y: [4, 5, 6],
        name: 'yaxis2 data',
        yaxis: 'y2',
        type: 'scatter'
      };
      
      var data = [trace1, trace2];
      
      var layout = {
        title: 'Double Y Axis Example',
        yaxis: {title: 'yaxis title'},
        yaxis2: {
          title: 'yaxis2 title',
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
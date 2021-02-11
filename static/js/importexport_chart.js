
// Exports Chart
function BuildExportsChart() {

    // read in JSON files
    d3.json('/importexport/').then(data =>{

        console.log(data);
        // get x vals
        var xValues = data.map(row => row.COMMODITY_DESCRIPTION);
        console.log(xValues,"xvals");       

        // get y1 values for 2019 exports
        var ex19Values = data.map(row => row.EXPORTS_2019);
        console.log(ex19Values,"ex19vals");
        //  get y2 values for 2020 exports
        var ex20Values = data.map(row => row.EXPORTS_2020);
        console.log(ex20Values,"ex20vals");

        // Get product name
        // var commodity = data[0].COMMODITY_DESCRIPTION;
        // console.log("Product name from data: ", commodity);

        // define labels
        labels = xValues

        // create traces
        var trace1 = {
            x: xValues,
            y: ex19Values,
            type: 'bar',
            name: '2019',
            // text: xValues.map(String),
            // textposition: 'auto',
            hoverinfo: 'y',
            // opacity: 0.5,
            marker: {
              color: 'rgb(49,130,189)',
              opacity: 0.9
            }
          };
          var trace2 = {
            x: xValues,
            y: ex20Values,
            type: 'bar',
            name: '2020',
            // text: xValues.map(String),
            // textposition: 'auto',
            hoverinfo: 'y',
            marker: {
              color: 'rgb(204,204,204)',
              opacity: 0.8
            }
          };
          var data = [trace1,trace2];

          var layout = {
            title: 'Yearly Change in US Exports (Pharmaceutical & Medical Equipment)',
            yaxis: {
                title: 'USD (Trillions)'
            },
            barmode:'group',
            bargap: 0.15,
            bargroupgap:0.1
          };
          
          Plotly.newPlot('distChange', data, layout);
    })
}
// BuildExportsChart();

// Imports Chart
function BuildImportsChart(){
    d3.json('/importexport/').then(data =>{

        console.log(data);
        // get x vals
        var xValues = data.map(row => row.COMMODITY_DESCRIPTION);
        console.log(xValues,"xvals");       

        // get y1 values for 2019 imports
        var im19Values = data.map(row => row.IMPORTS_2019);
        console.log(im19Values,"im19vals");
        //  get y2 values for 2020 exports
        var im20Values = data.map(row => row.IMPORTS_2020);
        console.log(im20Values,"im20vals");

        // Get product name
        // var commodity = data[0].COMMODITY_DESCRIPTION;
        // console.log("Product name from data: ", commodity);

        // define labels
        labels = xValues

        // create traces
        var trace3 = {
            x: xValues,
            y: im19Values,
            type: 'bar',
            name: '2019',
            // text: xValues.map(String),
            // textposition: 'auto',
            hoverinfo: 'y',
            // opacity: 0.5,
            marker: {
              color: 'rgb(49,130,189)',
              opacity: 0.9
            }
          };
          var trace4 = {
            x: xValues,
            y: im20Values,
            type: 'bar',
            name: '2020',
            // text: xValues.map(String),
            // textposition: 'auto',
            hoverinfo: 'y',
            marker: {
              color: 'rgb(204,204,204)',
              opacity: 0.8
            }
          };
          var data = [trace3,trace4];

          var layout = {
            title: 'Yearly Change in US Imports (Pharmaceutical & Medical Equipment)',
            yaxis: {
                title: 'USD (Trillions)'
            },
            barmode:'group',
            bargap: 0.15,
            bargroupgap:0.1
          };
          
          Plotly.newPlot('distChange', data, layout);
    })
}
// BuildImportsChart();
function BuildChart(dataType){
    if (dataType == "Import") {
        BuildImportsChart();
    } else {
        BuildExportsChart();
    }

}

// Function when the product dropdown value changes
function dataTypeChanged() {
    var dataType = d3.select("input[name='dataType']:checked").node().value;
    console.log("dataType",dataType);
    BuildChart(dataType);
}

function init() {
    var radio = d3.select("input[name='dataType']:checked").node().value;
    console.log("Inside init", radio);
    BuildChart(radio);
}

init();

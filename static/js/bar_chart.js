// Create bar chart of yearly distr change
// x bars should be different types of commodity
// y values would be total yearly value of each commodity

// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 150, left: 100},
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#distChange")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Function when the product dropdown value changes
function dataTypeChanged() {
  var dataType = d3.select("input[name='dataType']:checked").node().value;
  getProductData(dataType);
}

function getProductData(dataType) {
  // Declare variables
  var url_19 = "";
  var url_20 = "";
  var data19 = {};
  var data20 = {};

  // Determine if we need import or export data
  if (dataType == "Import") {
    url_19 = "/import2019/0";
    url_20 = "/import2020/0";
  } else {
    url_19 = "/export2019/0";
    url_20 = "/export2020/0";
  }

  // Get and save the data
  d3.json(url_19).then((data) => {
    console.log(data, "Inside 2019 D3");
    data19 = data;
  });
  d3.json(url_20).then((data) => {
    console.log(data, "Inside 2020 D3");
    data20 = data;
  });

  // Call the function to build the chart
  // Put on timeout to give APIs time
  setTimeout(() => { console.log(data19, "Outside 2019 D3"); }, 1500);
  setTimeout(() => { console.log(data20, "Outside 2020 D3"); }, 1500);
  setTimeout(() => { buildChart(dataType, data19, data20); }, 1500);
}

// Function to build the time series chart for the selected product
function buildChart(dataType, data19, data20) {
  console.log("Inside bar chart", data20);

  var e20 = d3.nest()
    .key(function(d){return data20.COMMODITY_DESCRIPTION;})
    .rollup(function(v){return d3.sum(v, function (d){return d.ALL_VALUES_YEAR;});
    })
    .entries(data20);

  console.log(JSON.stringify(e20),"e20 keyvalue data");
  console.log(data20.COMMODITY_DESCRIPTION,"test");

          // X axis
          var x = d3.scaleBand()
            .range([ 0, width ])
            .domain(e20.map(function(e20) { return e20.key; }))
            .padding(0.2);
          svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
              .attr("transform", "translate(-10,0)rotate(-45)")
              .style("text-anchor", "end");

          // Add Y axis
          var y = d3.scaleLinear()
            .domain([0, d3.max(e20, function(e20) {return e20.value})])
            .range([ height, 0]);
          svg.append("g")
            .call(d3.axisLeft(y));

          // Bars
          svg.selectAll(".bar")
            .data(data20)
            .enter()
            .append("rect")
              .attr("x", function(e20) { return x(e20.key); })
              .attr("y", function(e20) { return y(e20.value); })
              .attr("width", x.bandwidth())
              .attr("height", function(e20) { return height - y(e20.value); })    
              .attr("fill", "#69b3a2")

}

function init() {
  // Get filter information
  var radio = d3.select("input[name='dataType']:checked").node().value;

  getProductData(radio);
}

init();

// // graph 2019 exports
// //url for export 2019
// url_e19 = "http://127.0.0.1:5000/export2019/0"

// // read in json files
// var e19_data={}
// d3.json(url_e19).then(function(data){
//         console.log(data);
//         // e19_data = data})

//         var e19 = d3.nest()
//             .key(function(d){return d.COMMODITY_DESCRIPTION;})
//             .rollup(function(v){return d3.sum(v, function (d){return d.ALL_VALUES_YEAR;});
//             })
//             .entries(data);
//         console.log(JSON.stringify(e19));

//         // var commodities = e19.map(function(e19){return e19.key;});
//         // console.log(commodities);
//         // var c_totals = e19.map(function(e19){return e19.value;});
//         // console.log(c_totals);

//         // X axis
//         var x = d3.scaleBand()
//           .range([ 0, width ])
//         //   .domain(commodities)
//           .domain(e19.map(function(e19) { return e19.key; }))
//           .padding(0.2);
//         svg.append("g")
//           .attr("transform", "translate(0," + height + ")")
//           .call(d3.axisBottom(x))
//           .selectAll("text")
//             .attr("transform", "translate(-10,0)rotate(-45)")
//             .style("text-anchor", "end");

//         // Add Y axis
//         var y = d3.scaleLinear()
//           .domain([0, d3.max(e19, function(e19) {return e19.value})])
//           .range([ height, 0]);
//         svg.append("g")
//           .call(d3.axisLeft(y));

//         // Bars
//         svg.selectAll(".bar")
//           .data(e19)
//           .enter()
//           .append("rect")
//             .attr("x", function(e19) { return x(e19.key); })
//             .attr("y", function(e19) { return y(e19.value); })
//             .attr("width", x.bandwidth())
//             .attr("height", function(e19) { return height - y(e19.value); })    
//             .attr("fill", "#69b3a2")

//         })
// // graph 2020 exports
// //url for export 2020
// url_e20 = "http://127.0.0.1:5000/export2020/0"

// // read in json files
// d3.json(url_e20).then(function(data){
//         console.log(data);
//         // e19_data = data})

//         var e20 = d3.nest()
//             .key(function(d){return d.COMMODITY_DESCRIPTION;})
//             .rollup(function(v){return d3.sum(v, function (d){return d.ALL_VALUES_YEAR;});
//             })
//             .entries(data);
//         console.log(JSON.stringify(e20));

//         // X axis
//         var x = d3.scaleBand()
//           .range([ 0, width ])
//           .domain(e20.map(function(e20) { return e20.key; }))
//           .padding(0.2);
//         svg.append("g")
//           .attr("transform", "translate(0," + height + ")")
//           .call(d3.axisBottom(x))
//           .selectAll("text")
//             .attr("transform", "translate(-10,0)rotate(-45)")
//             .style("text-anchor", "end");

//         // Add Y axis
//         var y = d3.scaleLinear()
//           .domain([0, d3.max(e20, function(e19) {return e20.value})])
//           .range([ height, 0]);
//         svg.append("g")
//           .call(d3.axisLeft(y));

//         // Bars
//         svg.selectAll(".bar")
//           .data(e20)
//           .enter()
//           .append("rect")
//             .attr("x", function(e20) { return x(e20.key); })
//             .attr("y", function(e20) { return y(e20.value); })
//             .attr("width", x.bandwidth())
//             .attr("height", function(e20) { return height - y(e20.value); })    
//             .attr("fill", "#69b3a2")

//         })


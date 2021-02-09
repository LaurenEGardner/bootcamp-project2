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

//url for export 2020
url_e19 = "http://127.0.0.1:5000/export2019/0"

// read in json files
var e19_data={}
d3.json(url_e19).then(function(data){
        console.log(data);
        // e19_data = data})

        var e19 = d3.nest()
            .key(function(d){return d.COMMODITY_DESCRIPTION;})
            .rollup(function(v){return d3.sum(v, function (d){return d.ALL_VALUES_YEAR;});
            })
            .entries(data);
        console.log(JSON.stringify(e19));

        // var commodities = e19.map(function(e19){return e19.key;});
        // console.log(commodities);
        // var c_totals = e19.map(function(e19){return e19.value;});
        // console.log(c_totals);

        // X axis
        var x = d3.scaleBand()
          .range([ 0, width ])
        //   .domain(commodities)
          .domain(e19.map(function(e19) { return e19.key; }))
          .padding(0.2);
        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x))
          .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        // Add Y axis
        var y = d3.scaleLinear()
        //   .domain([0, d3.max(c_totals)])
          .domain([0, d3.max(e19, function(e19) {return e19.value})])
          .range([ height, 0]);
        svg.append("g")
          .call(d3.axisLeft(y));

        // Bars
        svg.selectAll(".bar")
          .data(e19)
          .enter()
          .append("rect")
            // .attr("x", x(commodities))
            .attr("x", function(e19) { return x(e19.key); })
            // .attr("y", function (c_totals) {return y(c_totals);})
            .attr("y", function(e19) { return y(e19.value); })
            .attr("width", x.bandwidth())
            .attr("height", function(e19) { return height - y(e19.value); })    
            // .attr("height", height - y(c_totals))       
            // .attr("height", function(d) { return height - y(d.ALL_VALUES_YEAR); })
            .attr("fill", "#69b3a2")

        })


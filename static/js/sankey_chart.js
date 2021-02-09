
//working on sankey
// set the dimensions and margins of the graph
var margin = { top: 10, right: 10, bottom: 10, left: 10 },
    width = 450 - margin.left - margin.right,
    height = 480 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("sankey").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Color scale used
var color = d3.scaleOrdinal(d3.schemeCategory20);

// Set the sankey diagram properties
var sankey = d3.sankey()
    .nodeWidth(36)
    .nodePadding(290)
    .size([width, height]);

/////-----TESTING WITH DUMBIE DATA JUST TO GET IT TO WORK
// load the data
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_sankey.json", function(error, graph) {

  // Constructs a new Sankey generator with the default settings.
  sankey
      .nodes(graph.nodes)
      .links(graph.links)
      .layout(1);

  // add in the links
  var link = svg.append("g")
    .selectAll(".link")
    .data(graph.links)
    .enter()
    .append("path")
      .attr("class", "link")
      .attr("d", sankey.link() )
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
      .sort(function(a, b) { return b.dy - a.dy; });

  // add in the nodes
  var node = svg.append("g")
    .selectAll(".node")
    .data(graph.nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .call(d3.drag()
        .subject(function(d) { return d; })
        .on("start", function() { this.parentNode.appendChild(this); })
        .on("drag", dragmove));

  // add the rectangles for the nodes
  node
    .append("rect")
      .attr("height", function(d) { return d.dy; })
      .attr("width", sankey.nodeWidth())
      .style("fill", function(d) { return d.color = color(d.name.replace(/ .*/, "")); })
      .style("stroke", function(d) { return d3.rgb(d.color).darker(2); })
    // Add hover text
    .append("title")
      .text(function(d) { return d.name + "\n" + "There is " + d.value + " stuff in this node"; });

  // add in the title for the nodes
    node
      .append("text")
        .attr("x", -6)
        .attr("y", function(d) { return d.dy / 2; })
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("transform", null)
        .text(function(d) { return d.name; })
      .filter(function(d) { return d.x < width / 2; })
        .attr("x", 6 + sankey.nodeWidth())
        .attr("text-anchor", "start");

  // the function for moving the nodes
  function dragmove(d) {
    d3.select(this)
      .attr("transform",
            "translate("
               + d.x + ","
               + (d.y = Math.max(
                  0, Math.min(height - d.dy, d3.event.y))
                 ) + ")");
    sankey.relayout();
    link.attr("d", sankey.link() );
  }

});

////////-----END OF DUMBIE DATA TEST

// testing how to return only unique values in a list
// const manyNames = ["abbie", "delilah", "sue", "abbie"]
// const nameSet = new Set(manyNames)
// const names = [...nameSet]
// console.log(names);

// //url for acrylonitrile export 2020
// var url_e20 = "http://127.0.0.1:5000/export2020/2926100000"

// //load the data
// d3.json(url_e20).then(function (data) {
//     console.log(data);

//     //set up graph in same style as original example but empty

//     allNodes = [] //a list of all DISTRICT_NAME & COUNTRY_NAME
//     links = [] //a list of objects export:{source:DISTRICT_NAME, target: COUNTRY_NAME, value: +=ALL_VALUES_MONTH(cumulative)}
//     //import:{source:COUNTRY_NAME, target: DISTRICT_NAME, value: +=MONTHLY_CONSUMPTION_VALUE(cumulative)}

//     //pull data from json and append to the lists
//     data.forEach(function (d) {
//         //figure out a neater way to do this unique thing. This is ugly
//         var found = false;
//         var found2 = false;
//         var found3 = false;
//         //add district name to list
//         allNodes.push({ "name": d.DISTRICT_NAME });

//         //add country name to list
//         allNodes.push({ "name": d.COUNTRY_NAME });

//         //check if source is in the link list, if not, add it. If so, add to monthly total
//         for (index in links) {
//             if (links[index].source === d.DISTRICT_NAME) {
//                 links[index].value += d.ALL_VALUES_MONTH;
//                 found3 = true;
//                 break;
//             }
//         }
//         if (!found) {
//             links.push({
//                 "source": DISTRICT_NAME,
//                 "target": COUNTRY_NAME,
//                 "value": +d.ALL_VALUES_MONTH
//             });
//         }

//     });
//     console.log(allNodes);
//     const nodeSet = new Set(allNodes)
//     const nodes = [...nodeSet]

//     //printing links&nodes to see if it's working
//     console.log(links)
//     console.log(nodes)

//     // return only the distinct / unique nodes
//     graph.nodes = d3.keys(d3.nest()
//         .key(function (d) { return d.name; })
//         .object(graph.nodes));


//     // loop through each link replacing the text with its index from node
//     graph.links.forEach(function (d, i) {
//         graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
//         graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
//     });

//     // now loop through each nodes to make nodes an array of objects

//     // rather than an array of strings
//     graph.nodes.forEach(function (d, i) {
//         graph.nodes[i] = { "name": d };
//     });


//     sankey
//         .nodes(graph.nodes)
//         .links(graph.links)
//         .layout(32);

//     // add in the links
//     var link = svg.append("g").selectAll(".link")
//         .data(graph.links)
//         .enter().append("path")
//         .attr("class", "link")
//         .attr("d", path)
//         .style("stroke-width", function (d) { return Math.max(1, d.dy); })
//         .sort(function (a, b) { return b.dy - a.dy; });

//     // add the link titles
//     link.append("title")
//         .text(function (d) {
//             return d.source.name + " → " +
//                 d.target.name + "\n" + format(d.value);
//         });

//     // add in the nodes
//     var node = svg.append("g").selectAll(".node")
//         .data(graph.nodes)
//         .enter().append("g")
//         .attr("class", "node")
//         .attr("transform", function (d) {
//             return "translate(" + d.x + "," + d.y + ")";
//         })
//         .call(d3.drag()
//             .subject(function (d) {
//                 return d;
//             })
//             .on("start", function () {
//                 this.parentNode.appendChild(this);
//             })
//             .on("drag", dragmove));

//     // add the rectangles for the nodes
//     node.append("rect")
//         .attr("height", function (d) { return d.dy; })
//         .attr("width", sankey.nodeWidth())
//         .style("fill", function (d) {
//             return d.color = color(d.name.replace(/ .*/, ""));
//         })
//         .style("stroke", function (d) {
//             return d3.rgb(d.color).darker(2);
//         })
//         .append("title")
//         .text(function (d) {
//             return d.name + "\n" + format(d.value);
//         });

//     // add in the title for the nodes
//     node.append("text")
//         .attr("x", -6)
//         .attr("y", function (d) { return d.dy / 2; })
//         .attr("dy", ".35em")
//         .attr("text-anchor", "end")
//         .attr("transform", null)
//         .text(function (d) { return d.name; })
//         .filter(function (d) { return d.x < width / 2; })
//         .attr("x", 6 + sankey.nodeWidth())
//         .attr("text-anchor", "start");

//     // the function for moving the nodes
//     function dragmove(d) {
//         d3.select(this)
//             .attr("transform",
//                 "translate("
//                 + d.x + ","
//                 + (d.y = Math.max(
//                     0, Math.min(height - d.dy, d3.event.y))
//                 ) + ")");
//         sankey.relayout();
//         link.attr("d", path);
//     }
// })


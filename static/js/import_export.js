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

//url for export 2019
url_e19 = "http://127.0.0.1:5000/export2019"

//load the data
d3.json(url_e19).then(function (data) {
    console.log(data);

    //set up graph in same style as original example but empty

    nodes = [] //a list of each unique DISTRICT_NAME & COUNTRY_NAME
    links = [] //a list of objects export:{source:DISTRICT_NAME, target: COUNTRY_NAME, value: +=ALL_VALUES_MONTH(cumulative)}
    //import:{source:COUNTRY_NAME, target: DISTRICT_NAME, value: +=MONTHLY_CONSUMPTION_VALUE(cumulative)}

    //pull data from json and append to the lists
    data.forEach(function (d) {
        var found = false;
        var found2 = false;
        var found3 = false;
        //check if district name is in the nodes list, if not, add it
        for (index in nodes) {
            if (nodes[index].DISTRICT_NAME === d.DISTRICT_NAME) {
                found = true;
                break;
            }
        }
        if (!found) {
            nodes.push({ "name": d.DISTRICT_NAME });
        }
        //check if country name is in the nodes list, if not, add it
        for (index in nodes) {
            if (nodes[index].COUNTRY_NAME === d.COUNTRY_NAME) {
                found2 = true;
                break;
            }
        }
        if (!found) {
            nodes.push({ "name": d.COUNTRY_NAME });
        }
        //check if source is in the link list, if not, add it. If so, add to monthly total
        for (index in links) {
            if (links[index].source === d.DISTRICT_NAME) {
                links[index].value += d.ALL_VALUES_MONTH;
                found3 = true;
                break;
            }
        }
        if (!found) {
            links.push({
                "source": DISTRICT_NAME,
                "target": COUNTRY_NAME,
                "value": +d.ALL_VALUES_MONTH
            });
        }

    });
    console.log(links)
    console.log(nodes)

    graph = {
        "links": links,
        "nodes": nodes
    }
    // return only the distinct / unique nodes
    graph.nodes = d3.keys(d3.nest()
        .key(function (d) { return d.name; })
        .map(graph.nodes));

    // loop through each link replacing the text with its index from node
    graph.links.forEach(function (d, i) {
        graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
        graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
    });

    //now loop through each nodes to make nodes an array of objects
    // rather than an array of strings
    graph.nodes.forEach(function (d, i) {
        graph.nodes[i] = { "name": d };
    });

})
// Function when the product dropdown value changes
function productChanged(productCode) {
    //console.log("Changed product", productCode);
    var infoType = d3.select("input[name='infoType']:checked").node().value;
    var yearValue = d3.select("input[name='yearInfoType']:checked").node().value;
    getData(productCode, infoType, yearValue);
}

function infoTypeChanged() {
    var productCode = d3.select("#selProduct").node().value;
    var infoType = d3.select("input[name='infoType']:checked").node().value;
    var yearValue = d3.select("input[name='yearInfoType']:checked").node().value;
    //console.log("Info change", productCode, infoType);
    getData(productCode, infoType, yearValue);
}

function yearChanged() {
    var productCode = d3.select("#selProduct").node().value;
    var infoType = d3.select("input[name='infoType']:checked").node().value;
    var yearValue = d3.select("input[name='yearInfoType']:checked").node().value;
    getData(productCode, infoType, yearValue);
}

// Function to build the sankey chart for the selected product
function getData(productCode, infoType, yearValue) {
    console.log(productCode, infoType, yearValue);
    // Create variables to save the data to
    var productData = {};
    var url = "";

    if (infoType == "Import") {
        url = `/import${yearValue}/` + productCode;
        console.log("Import URL", url);
    } else {
        url = `/export${yearValue}/` + productCode;
        console.log("Export URL", url)
    }

    // Read in Product data and save to variables
    d3.json(url).then((data) => {
        //console.log(data, "Inside Product D3");
        productData = data;
    });

    // Give API calls time
    setTimeout(() => { buildSankeyChart(infoType, productData); }, 1500);
}

function buildSankeyChart(infoType, productData) {
    //set up graph in same style as original example but empty
    d3.select("svg").remove();
    //set basic chart
    var units = "Dollars";
    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 10, bottom: 10, left: 10 },
        width = 800 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // format variables
    var formatNumber = d3.format(",.0f"),    // zero decimal places
        format = function (d) { return formatNumber(d) + " " + units; },
        color = d3.scaleOrdinal(d3.schemeCategory10);

    // append the svg object to the body of the page
    var svg = d3.select("#sankey").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Set the sankey diagram properties
    var sankey = d3.sankey()
        .nodeWidth(15)
        .nodePadding(2)
        .size([width, height]);

    var path = sankey.link();

    graph = { "nodes": [], "links": [] };
    allNodes = []
    uniqLinks = [] //a list of the unique links

    if (infoType == "Import") { //value = MONTHLY_CONSUMPTION_VALUE
        productData.forEach(function (d) {
            allNodes.push({ "name": d.DISTRICT_NAME });
            allNodes.push({ "name": d.COUNTRY_NAME });
            //check if source is in the link list, if not, add it. If so, add to monthly total
            var found = false;
            for (index in uniqLinks) {
                if (uniqLinks[index].target === d.DISTRICT_NAME) {
                    uniqLinks[index].value += d.MONTHLY_CONSUMPTION_VALUE;
                    found = true;
                    break;
                }
            }
            if (!found) {
                uniqLinks.push({
                    "source": d.DISTRICT_NAME,
                    "target": d.COUNTRY_NAME,
                    "value": +d.MONTHLY_CONSUMPTION_VALUE
                });
            }
        });

    } else { //export value = ALL_VALUES_MONTH
        data.forEach(function (d) {
            allNodes.push({ "name": d.DISTRICT_NAME });
            allNodes.push({ "name": d.COUNTRY_NAME });
            //check if source is in the link list, if not, add it. If so, add to monthly total
            var found = false;
            for (index in uniqLinks) {
                if (uniqLinks[index].target === d.COUNTRY_NAME) {
                    uniqLinks[index].value += d.ALL_VALUES_MONTH;
                    found = true;
                    break;
                }
            }
            if (!found) {
                uniqLinks.push({
                    "source": d.DISTRICT_NAME,
                    "target": d.COUNTRY_NAME,
                    "value": +d.ALL_VALUES_MONTH
                });
            }
        });
    }

    //only put unique node values into nodes
    manyNodes = []
    const map = new Map();
    for (const item of allNodes) {
        if (!map.has(item.name)) {
            map.set(item.name, true);    // set any value to Map
            graph.nodes.push({
                name: item.name,
            });
        }
    }

    //trying to sort and only pull the top 10 values out of the links
    uniqLinks.sort((a, b) => (a.value > b.value) ? 1 : -1);
    uniqLinks.reverse();
    console.log(uniqLinks);
    graph.links = uniqLinks.slice(0, 10);
    console.log(graph.links)

    // return only the distinct / unique nodes
    graph.nodes = d3.keys(d3.nest()
        .key(function (d) { return d.name; })
        .object(graph.nodes));

    // loop through each link replacing the text with its index from node
    graph.links.forEach(function (d, i) {
        graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
        graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
    });


    //add only nodes that are actually needed in the chart into graph.nodes
    // for (index in graph.nodes) {
    //     graph.nodes.push({
    //         name: graph.links.source.name,
    //     })
    //     graph.nodes.push({
    //         name: graph.links.target.name
    //     })
    // }
    console.log(graph.nodes)

    // now loop through each nodes to make nodes an array of objects
    // rather than an array of strings
    graph.nodes.forEach(function (d, i) {
        graph.nodes[i] = { "name": d };
    });

    sankey
        .nodes(graph.nodes)
        .links(graph.links)
        .layout(32);

    // add in the links
    var link = svg.append("g").selectAll(".link")
        .data(graph.links)
        .enter().append("path")
        .attr("class", "link")
        .attr("d", path)
        .style("stroke-width", function (d) { return Math.max(1, d.dy); })
        .sort(function (a, b) { return b.dy - a.dy; });

    // add the link titles
    link.append("title")
        .text(function (d) {
            return d.source.name + " → " +
                d.target.name + "\n" + format(d.value);
        });

    // add in the nodes
    var node = svg.append("g").selectAll(".node")
        .data(graph.nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        })
        .call(d3.drag()
            .subject(function (d) {
                return d;
            })
            .on("start", function () {
                this.parentNode.appendChild(this);
            })
            .on("drag", dragmove));



    // add the rectangles for the nodes
    node.append("rect")
        .attr("height", function (d) { return d.dy; })
        .attr("width", sankey.nodeWidth())
        .style("fill", function (d) {
            return d.color = color(d.name.replace(/ .*/, ""));
        })
        .style("stroke", function (d) {
            return d3.rgb(d.color).darker(2);
        })
        .append("title")
        .text(function (d) {
            return d.name + "\n" + format(d.value);
        });

    // add in the title for the nodes
    node.append("text")
        .attr("x", -6)
        .attr("y", function (d) { return d.dy / 2; })
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("transform", null)
        .text(function (d) { return d.name; })
        .filter(function (d) { return d.x < width / 2; })
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
        link.attr("d", path);
    }
}

function init() {
    // Get filter information
    var radio = d3.select("input[name='infoType']:checked").node().value;

    // Populate drop down
    var productOptions = [{ value: 3002, text: "Vaccines, Blood, and Immunological products" }, { value: 3003, text: "Medication (unmeasured doses)" }, { value: 3004, text: "Medication (measured doses)" }, { value: 3005, text: "Medically-treated Bandages" }, { value: 3006, text: "Surgical Equipment" }];

    var menuOptions = d3.select("#selProduct")
        .selectAll("options")
        .data(productOptions)
        .enter()
        .append("option")
        .text(function (d) { return d.text })
        .attr("value", function (d) { return d.value; })

    // Get selected year
    var year = d3.select("input[name='yearInfoType']:checked").node().value;


    // Build chart with default info
    getData(productOptions[0].value, radio, year);

}

init();
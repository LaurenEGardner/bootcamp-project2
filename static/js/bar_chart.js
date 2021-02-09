// Create function for Data plotting (Bar, bubble)
// function DataPlots(bar_chart) {

//url for export 2020
url_e19 = "http://127.0.0.1:5000/export2019/0"

// read in json files
d3.json(url_e19).then(function(data){
        console.log(data);

        var commodity_list = [];
        var commodity = data.map(function(d){
            return{
                commodity = d.COMMODITY_DESCRIPTION,
                commodity_list = commodity_list + commodity
            };
        });
        console.log(commodity_list);
        // data.forEach(function(d){
        //     return{
        //         commodity: d.COMMODITY_DESCRIPTION,
        //         year: d.YEAR,
        //         month: d.MONTH,
        //         country: d.COUNTRY_NAME,
        //         total_export: +d.ALL_VALUES_YEAR}
            
        //     })
        // console.log(data.length)
})

    // log list of names
    // var commodities = data.map(data=>data.COMMODITY_DESCRIPTION);
    // console.log("commodities",commodities);

// d3.json(url_e19).then(function (d) {
// //     // d3.csv("Resources/data/exportData2020.csv").then(function(exportdata){
//     console.log(d);
//     return{
//         commodity: d.COMMODITY_DESCRIPTION,
//         year: d.YEAR,
//         month: d.MONTH,
//         country: d.COUNTRY_NAME,
//         total_export: +d.ALL_VALUES_YEAR

    // // log list of names
    // var commodities = data.map(data=>data.COMMODITY_DESCRIPTION);
    // console.log("commodities",commodities);






        // log list of names
        // var commodities = data.map(data=>data.COMMODITY_DESCRIPTION);
        // console.log("commodities",commodities);


// x vals = ImportExport.COMMODITY_DESCRIPTION = [a,b,c,d,e]
// yval1= ImportExport.EXPORTS_2019 = []
// yval2 = ImportExport.EXPORTS_2020
// yval3 = ImportExport.IMPORTS_2019
// yval4 = ImportExport.IMPORTS_2020

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
            text: ex19Values.map(String),
            textposition: 'auto',
            hoverinfo: 'none',
            opacity: 0.5,
            marker: {
              color: 'rgb(158,202,225)',
              line: {
                color: 'rgb(8,48,107)',
                width: 1.5
              }
            }
          };
          var trace2 = {
            x: xValues,
            y: ex20Values,
            type: 'bar',
            text: ex20Values.map(String),
            textposition: 'auto',
            hoverinfo: 'none',
            marker: {
              color: 'rgba(58,200,225,.5)',
              line: {
                color: 'rgb(8,48,107)',
                width: 1.5
              }
            }
          };
          var data = [trace1,trace2];

          var layout = {
            title: 'Exports'
          };
          
          Plotly.newPlot('distChange', data, layout);
    })
}
BuildExportsChart();

// // Imports Chart
// function BuildImportsChart(){
//     // read in JSON files
//     d3.json('/importexport/').then(data =>{

//         console.log(data);
//         // get x vals
//         var xValues = data.map(row => row.COMMODITY_DESCRIPTION);
//         console.log(xValues,"xvals");       

//         // get y1 values for 2019 imports
//         var im19Values = data.map(row => row.IMPORTS_2019);
//         console.log(im19Values,"im19vals");
//         //  get y2 values for 2020 imports
//         var im20Values = data.map(row => row.IMPORTS_2020);
//         console.log(im20Values,"im20vals");

//         // Get product name
//         // var commodity = data[0].COMMODITY_DESCRIPTION;
//         // console.log("Product name from data: ", commodity);

//         // define labels
//         labels = xValues

//         // create traces
//         var trace1 = {
//             x: xValues,
//             y: im19Values,
//             type: 'bar',
//             text: im19Values.map(String),
//             textposition: 'auto',
//             hoverinfo: 'none',
//             opacity: 0.5,
//             marker: {
//               color: 'rgb(158,202,225)',
//               line: {
//                 color: 'rgb(8,48,107)',
//                 width: 1.5
//               }
//             }
//           };
//           var trace2 = {
//             x: xValues,
//             y: im20Values,
//             type: 'bar',
//             text: im20Values.map(String),
//             textposition: 'auto',
//             hoverinfo: 'none',
//             marker: {
//               color: 'rgba(58,200,225,.5)',
//               line: {
//                 color: 'rgb(8,48,107)',
//                 width: 1.5
//               }
//             }
//           };
//           var data = [trace1,trace2];

//           var layout = {
//             title: 'Imports'
//           };
      
//           Plotly.newPlot('distChange', data, layout);
//     })
// }
// BuildImportsChart();




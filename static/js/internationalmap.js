//what url do I use here?
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"


// Creating map object
var myMap = L.map("mapid", {
    center: [34.0522, -118.2437],
    zoom: 3
  });
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // Grab data with d3
  d3.json(url).then(function(quakeData) {
    
    console.log(quakeData);


    function getColor(quakeData) {
      console.log(quakeData)
      if (quakeData > 110 ) return '#800026'
       else if  (quakeData > 90  ) return '#BD0026'
       else if  (quakeData > 70  ) return '#E31A1C' 
       else if  (quakeData > 50  ) return '#FC4E2A' 
       else if  (quakeData > 30  ) return '#FD8D3C' 
       else if  (quakeData > 10  ) return '#FEB24C' 
       else return '#FED976';
    }
  

    // // Add popup to each quake point
    L.geoJson(quakeData, {
      onEachFeature: function (feature, marker) {

        marker.bindPopup('<h2>Magnitude: '+feature.properties.mag+'</h2><p>Location: '+feature.properties.place+'</p>');
      },
        pointToLayer:function(feature, latlong) {
          return L.circleMarker(latlong)
        },
        style: function(feature) {
          return{
            fillColor: getColor(feature.geometry.coordinates[2]),
            fillOpacity: 1,
            color: 'white',
            radius: feature.properties.mag*4
          }
        }
    }).addTo(myMap);
  
  //LEGEND
  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (myMap) {
  
      var div = L.DomUtil.create('div', 'info legend'),
          grades = [-10, 10, 30, 50, 70, 90, 110],
          labels = [];
  
      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }
  
      return div;
  };
  
  legend.addTo(myMap);

  });
// Define earthquake data url and tectonic plates url
const earthquakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
const platesUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

// Define a function to set the style of the earthquakes layer
function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.geometry.coordinates[2]),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
    };
}

// Define a function to determine the color of the marker based on the depth of the earthquake
function getColor(depth) {
    switch (true) {
        case depth > 90:
            return "#ea2c2c";
        case depth > 70:
            return "#ea822c";
        case depth > 50:
            return "#ee9c00";
        case depth > 30:
            return "#eecc00";
        case depth > 10:
            return "#d4ee00";
        default:
            return "#98ee00";
    }
}

// Define a function to determine the radius of the marker based on the magnitude of the earthquake
function getRadius(magnitude) {
    if (magnitude === 0) {
        return 1;
    }
    return magnitude * 4;
}

// Define streetmap and satellite layers
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
});

let satelliteMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
});

// Define a map object
let map = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [streetmap]
});

// Create a GeoJSON layer containing the features array on the earthquakeData object
d3.json(earthquakeUrl).then(function(earthquakeData) {
    let earthquakes = L.geoJson(earthquakeData, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: styleInfo,
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place + "<br>Depth: " + feature.geometry.coordinates[2]);
        }
    }).addTo(map);

    // Add legend to the map
    let legend = L.control({position: "bottomright"});
    legend.onAdd = function() {
        let div = L.DomUtil.create("div", "info legend");
        let depth = [-10, 10, 30, 50, 70, 90];

        for (let i = 0; i < depth.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(depth[i] + 1) + '"></i> ' +
                depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] : '+') + '<br>';
        }
        return div;
    };
    legend.addTo(map);

    // Create a GeoJSON layer for the tectonic plates data
    d3.json(platesUrl).then(function(plateData) {
        let plates = L.geoJson(plateData, {
            color: "#DC143C",
            weight: 2
        }).addTo(map);

        // Create a baseMaps object
        let baseMaps = {
            "Street Map": streetmap,
            "Satellite Map": satelliteMap
        };

        // Create an overlay object
        let overlayMaps = {
            Earthquakes: earthquakes,
            "Tectonic Plates": plates
        };

        // Add a control to the map that will allow the user to change which layers are visible
        L.control.layers(baseMaps, overlayMaps, {
            collapsed: false
        }).addTo(map);
    });
});

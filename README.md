
# Earthquake Data Visualization with Leaflet

This project uses Leaflet.js to create a map that visualizes earthquake data. It fetches data from the United States Geological Survey (USGS), which provides earthquake data in a number of different formats, updated every minute.

The map presents the earthquakes that happened in the last month. The earthquakes are represented as circles, with the size of the circle corresponding to the magnitude of the earthquake, and the color representing the depth of the earthquake.

## Features
- Interactive map with two base layers: Street Map and Satellite Map
- Overlay layers: Earthquakes and Tectonic Plates
- Earthquakes are represented by circles, where the size corresponds to the magnitude and the color corresponds to the depth of the earthquake
- Tectonic plate boundaries are shown as lines on the map
- Each earthquake circle has a tooltip displaying the magnitude, location, and depth of the earthquake
- A legend that explains the depth color coding of the earthquake circles

## Data Sources
- Earthquake data: [USGS Earthquake Hazards Program](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson)
- Tectonic Plates data: [fraxen's tectonicplates GitHub repository](https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json)

## How to Run
Open the `index.html` file in a web browser to view the map. Make sure to have an internet connection as the data and some resources are loaded from external sources.

## Libraries Used
- Leaflet.js for mapping
- D3.js for data loading


import React from 'react';
import {GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import CardScreen from './CardScreen.js';
import Bell from '../components/BellButton.jsx';

const center = {lat: 30.6212316, lng: -96.3403778};

function MapScreen() {
  //pass in list from backend
  const renderList = [{ position: { lat: 30.6212316, lng: -96.3403778 }, rank: 1, name: "good food"},
                      { position: { lat: 30.620000, lng: -96.35900 }, rank: 2 },
                     ];
  // Sort the list by rank
  
  const renderMarkers = () => {
    const markers = [];

    for (let i = 0; i < renderList.length; ++i) {
      const icon_obj = { url: (i === 0) ? "Images/goldPin.png" : "Images/orangePin.png", scaledSize: { width: 50, height: 50 }, }
      markers.push(<MarkerF position={renderList[i].position} icon={icon_obj}></MarkerF>);
    }

    return markers;
  }

  //Map styling - hella long
  const MapStyling = [
    {
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#58758a"
        },
        {
          "lightness": "-10"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#a0a4a5"
        }
      ]
    },
    {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#62838e"
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#dde3e3"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#3f4a51"
        },
        {
          "weight": "0.30"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "simplified"
        }
      ]
    },
    {
      "featureType": "poi.attraction",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "poi.business",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.government",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "poi.place_of_worship",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.school",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.sports_complex",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "all",
      "stylers": [
        {
          "saturation": "-100"
        },
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#bbcacf"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "lightness": "0"
        },
        {
          "color": "#bbcacf"
        },
        {
          "weight": "0.50"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#a9b4b8"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.icon",
      "stylers": [
        {
          "invert_lightness": true
        },
        {
          "saturation": "-7"
        },
        {
          "lightness": "3"
        },
        {
          "gamma": "1.80"
        },
        {
          "weight": "0.01"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#a3c7df"
        }
      ]
    }
  ]

  
  return (     
    <div>button
    <br></br><br></br><br></br><br></br><br></br><br></br>
    <Bell/>
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap center={center} zoom={15} mapContainerStyle={{width: '1000px', height: '500px'}} options={{styles:MapStyling}}>
          {renderMarkers()}
      </GoogleMap>
    </LoadScript>
    <CardScreen/>
    </div>
  )
}

export default MapScreen
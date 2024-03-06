import React from 'react';
 import {GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

const center = {lat: 30.6212316, lng: -96.3403778};

function MapScreen() {
  //pass in list from backend
  const renderList = [{ position: { lat: 30.6212316, lng: -96.3403778 }, rank: 1 },
                      { position: { lat: 30, lng: -96 }, rank: 2 },
                     ];
  // Sort the list by rank
  renderList.sort((a, b) => a.rank - b.rank);

  // Assign images based on rank
  renderList.forEach((item, index) => {
    if (index === 0) {
      // Assign specific picture to rank 1
      item.image = "/Images/goldPin.png";
    } else {
      // Assign another image for other ranks
      item.image = "/Images/orangePin.png";
    }
  });
  
  const renderMarkers = () => {
    const markers = [];
    for (let i = 0; i < renderList.length; ++i) {
      markers.push(<MarkerF position={renderList[i].position} icon={{ url: renderList[i].icon }}></MarkerF>);
    }

    return markers;
  }
  
  return (     
    <div>FX 
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap center={center} zoom={18} mapContainerStyle={{width: '1000px', height: '500px'}}>
          {renderMarkers()}
      </GoogleMap>
    </LoadScript>
    </div>
  )
}

export default MapScreen
import React from 'react';
// import {GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

const center = {lat: 30.6212316, lng: -96.3403778}

function MapScreen() {
  return (        
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <Map center={center} zoom={18} style={{width: '1000px', height: '500px'}}>
        <Marker latitude={center.lat} longitude={center.lng}></Marker>
      </Map>
    </APIProvider>
  )

  // return (        
  //   <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
  //     <GoogleMap center={center} zoom={18} mapContainerStyle={{width: '1000px', height: '500px'}}>
  //       <></>
  //     </GoogleMap>
  //   </LoadScript>
  // )
}

export default MapScreen
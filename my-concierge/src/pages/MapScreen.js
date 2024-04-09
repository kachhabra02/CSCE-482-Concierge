import { React, useState, useRef, useEffect, useReducer } from 'react';
import axios from 'axios';
import {GoogleMap, LoadScript, MarkerF, InfoBoxF } from '@react-google-maps/api';
import CardScreen from './CardScreen.js';
import Bell from '../components/BellButton.jsx';
import '../css/MapScreen.css';
import ShoppingCart from "../components/ShoppingCart";

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  timeout: 15000 // 15 second timeout
});

const center = {lat: 39.8283, lng: -98.5795};

function MapScreen({city, UPV}) {

  const [_, forceUpdate] = useReducer((x) => x + 1, 0); // Force re-render for card slide (From React Hooks FAQ)
  const [favItems, setFavItems] = useState([]);
  const [showShoppingCart, setShowShoppingCart] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [highlighted, setHighlighted] = useState(-1);

  // Fetch recommendations from back-end
  useEffect(() => {
    API.get(`/recommendation?location=${city}&user_preference_vector=${UPV.join('-')}`)
        .then((res) => {
          if (res.status < 300 && restaurants.length === 0) { // Only set if restaurants are not yet set
            setRestaurants(res.data["recommended_restaurants"]);
          }
          else {
            console.log(`Error: Status code ${res.status} when retrieving restaurant recommendations`);
          }
          console.log(res.data);
        })
        .catch((error) => {
          console.log("Error when retrieving restaurant recommendations:");
          console.log(error);
        })
  }, [])



  // Render markers based on restaurants
  const renderMarkers = () => {
    const markers = [];

    for (let i = 0; i < restaurants.length; ++i) {
      const icon_obj = { url: (restaurants[i].rank === 0) ? "Images/goldPin.png" : "Images/orangePin.png",
        scaledSize: { width: (restaurants[i].rank === highlighted) ? 54 : 45, height: (restaurants[i].rank === highlighted) ? 60 : 50 }, }
      markers.push(<MarkerF key={`restaurant-${restaurants[i].rank}`} position={ { lat: restaurants[i].latitude, lng: restaurants[i].longitude } } icon={icon_obj} onClick={() => {
        if (highlighted !== restaurants[i].rank) {
          setHighlighted(restaurants[i].rank);
        }
      }}>
        {/*highlighted === restaurants[i].rank ? (
          <InfoBoxF onCloseClick={() => setHighlighted(-1)}>
            <div>{restaurants[i].name}</div>
          </InfoBoxF>
        ) : null*/}
      </MarkerF>);
    }

    return markers;
  }


  // Fit bounds function
  const mapRef = useRef(null);

  useEffect(() => {
    if (restaurants.length === 0) {
        return;
    }

    const bounds = new window.google.maps.LatLngBounds();
    restaurants.map(restaurant => {
      bounds.extend({ lat: restaurant.latitude, lng: restaurant.longitude });
      return restaurant.rank
    });
    mapRef?.current.state.map.fitBounds(bounds);
  }, [restaurants]); // Fit bounds on load and change of restaurants

  
  // Map styling - hella long
  const MapStyling = [
    {
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#7c93a3"
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
          "color": "#eff0f1"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "color": "#62838e"
        },

      ]
    },

    {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "simplified"
        },
        {
          "hue": "-50"
        }
      ]
    },
    {
      "featureType": "poi.attraction",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "saturation": "-80"
        },
        {
          "hue": "#62838e"
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
      "featureType": "poi.medical",
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
          "visibility": "on"
        },
        {
          "hue": "#750e15"
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
          "color": "#83a5b0"
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
          "color": "#83a5b0"
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
          "color": "#58758A"
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
    },
    // {
    //   "featureType": "border",
    //   "elementType": "geometry.stroke",
    //   "stylers": [
    //     {
    //       "color": "#8ca1a8"
    //     }
    //   ]
    // }
  ]

  
  return (
      
    <div>   

      {favItems.length > 0 && (
        <div className="button-container">
          <div className="position-fixed" style={{zIndex: 99}}>
            <button
              className="button-effect"
              onClick={() => setShowShoppingCart(true)}
            >
              <span>Shopping Cart - {favItems.length}</span>
            </button>
          </div>
        </div>
      )}

      <Bell/>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          ref={mapRef}
          center={center} 
          zoom={4} 
          mapContainerStyle={{width: '76%', height: '600px', marginLeft: "12%", borderRadius:'2%'}}
          options={{styles:MapStyling}}
          onClick={() => { if (highlighted !== -1) { setHighlighted(-1); } }}
          >
          {renderMarkers()}
        </GoogleMap>
      </LoadScript>

      <CardScreen 
        restaurants={restaurants}
        favItems={favItems}
        setFavItems={setFavItems}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
        forceUpdate={forceUpdate}
      />


    {showShoppingCart && (
        <ShoppingCart
          favItems={favItems}
          setFavItems={setFavItems}
          setShowModal={setShowShoppingCart}
        />
      )}
    </div>
  )
}

export default MapScreen
import { React } from 'react';
import {GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import CardScreen from './CardScreen.js';
import Bell from '../components/BellButton.jsx';
import '../css/MapScreen.css';
// import ShoppingCart from "../components/ShoppingCart";

const center = {lat: 30.6212316, lng: -96.3403778};

function MapScreen() {

  // const [favItems, setFavItems] = useState([]);
  // const [showShoppingCart, setShowShoppingCart] = useState(false);
  // Get Business Data here and send to CardScreen

  //pass in list from backend
  const renderList = [{ position: { lat: 30.6212316, lng: -96.3403778 }, rank: 1, name: "good food"},
                      { position: { lat: 30.620000, lng: -96.35900 }, rank: 2 },
                     ];
  
  const renderMarkers = () => {
    const markers = [];

    for (let i = 0; i < renderList.length; ++i) {
      const icon_obj = { url: (i === 0) ? "Images/goldPin.png" : "Images/orangePin.png", scaledSize: { width: 45, height: 50 }, }
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
    {
      "featureType": "border",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#8ca1a8"
        }
      ]
    }
    
  ]
  
  return (     
    <div>

     
      {/* <div>
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
        </div> */}
      <Bell/>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap 
          center={center} 
          zoom={12} 
          mapContainerStyle={{width: '76%', height: '600px', marginLeft: "12%", borderRadius:'2%', borderWidth:'50px', borderColor:'#0F5B7C'}}
          options={{styles:MapStyling}}
          >
          {renderMarkers()}
        </GoogleMap>
      </LoadScript>

      <CardScreen/>

    {/* <CardScreen favItems={favItems}
          setFavItems={setFavItems}/> */}

    {/* {showShoppingCart && (
        <ShoppingCart
          favItems={favItems}
          setFavItems={setFavItems}
          setShowModal={setShowShoppingCart}
        />
      )} */}
    </div>
  )
}

export default MapScreen
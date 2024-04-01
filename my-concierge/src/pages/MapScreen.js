import React from 'react'; //for favItems import CardScreen
 import {GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import CardScreen from './CardScreen';
// import ShoppingCart from "../components/ShoppingCart";


const center = {lat: 30.6212316, lng: -96.3403778};

function MapScreen() {

  // const [favItems, setFavItems] = useState([]);
  // const [showShoppingCart, setShowShoppingCart] = useState(false);
  // Get Business Data here and send to CardScreen

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
            
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap center={center} zoom={18} mapContainerStyle={{width: '1000px', height: '500px'}}>
          {renderMarkers()}
      </GoogleMap>
    </LoadScript>

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
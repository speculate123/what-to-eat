import React, { useEffect, useState } from 'react';
import 'react-luckydraw/lib/LuckyDraw.css';

import ReactDOM from "react-dom";
import List from "./List";

function App() {

  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [query, setQuery] = useState(null);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLat(latitude);
    setLon(longitude);
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  useEffect(() => {
    var srcBase = "https://www.google.com/maps/embed/v1/search?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&zoom=15";
    if (!query) {
      srcBase += "&q=餐廳";
    } else {
      srcBase += `&q=${query}`;
    }
    if (lat && lon) {
      srcBase += `&center=${lat},${lon}`;
    }
    document.getElementById("google-map").src = srcBase;
  }, [lat, lon, query]);
  
  function queryCallback(query) {
    setQuery(query);
  }

  return (
    getLocation(),
    <div style={{ 'padding-left': '2rem', 'padding-right': '2rem' }}>
        <h1>What to Eat</h1>
       
        <List queryCallback={queryCallback} />
        <br />
        <div>
        <iframe
            id="google-map"
            src="https://www.google.com/maps/embed/v1/search?q=餐廳&zoom=15&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
            width="100%"
            max-width="900"
            height="450"
            frameborder="0"
            style={{ border: 0 }}
            allowfullscreen=""
            aria-hidden="false"
            tabindex="0"
        />
        </div>
        
    </div>
  );
}

ReactDOM.render(<App/>,document.getElementById('root'));

export default App;
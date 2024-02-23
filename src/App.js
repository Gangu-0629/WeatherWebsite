import logo from './logo.svg';
import './App.css';
import Forecast from './Components/Forecast';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
function App() {
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  const detectlocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
    else {
      console.log("GeoLocation not support");
    }
  }
  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    navigate("/forecast", { state: { city, latitude, longitude, usingeo: true } });
  }

  function error() {
    console.log("Unable to retrieve your location");
  }
  return (
    <>
      <div className="Maincon">
        <div className="cont">
          <input type="text" placeholder="Enter the city Name" value={city} onChange={(e) => { setCity(e.target.value) }} />
          <button className="button-86" onClick={() => {
            navigate("/forecast", { state: { city, usingeo: true } });
          }} >Forecast</button>
          <button className="button-86 custombutton" onClick={detectlocation} >Detect Location</button>
        </div>

      </div>
    </>
  );
}

export default App;

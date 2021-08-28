import React, { useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import Pins from "./Pins";

const CreateMap = (pinData) => {
  const startZoom = 3;

  const mapStyles = {        
    height: "88vh",
    width: "100%"};
  
  const [defaultCenter, setDefaultCenter] = useState({
    lat: 0, lng: 90
  });
  
  return (
     <LoadScript
       googleMapsApiKey='thisIsNotTheKey'>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={startZoom}
          center={defaultCenter}
        >
          <Pins
            pinData={pinData}
          />
        </GoogleMap>
     </LoadScript>
  )
}

export default CreateMap;

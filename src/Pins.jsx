import React, { useState, useEffect } from 'react';
import { Marker, InfoWindow, useGoogleMap } from '@react-google-maps/api';

export default function Pins(pinData) {
  const [ selected, setSelected ] = useState({});
  const [ localPinData, setLocalPinData ] = useState([]);
  const maxZoom = 15;

  const map = useGoogleMap();

  useEffect(() => {
    setLocalPinData(pinData.pinData);
  }, [pinData])

  const onSelect = item => {
    setSelected(item);
    const currZoom = map.getZoom();
    if (currZoom < maxZoom) {
      map.setZoom(Math.min(currZoom + 3, maxZoom));
    }
    map.panTo({ lat: Number(item.lat), lng: Number(item.lng) })
  }

  return (
  <>
  {localPinData.pinData?.map(item => {
    if (item.lat !== "0") {
      if (item.img_href !== "0") {
        return (
        <Marker
          key={item.name + "_" + item.lat + "," + item.lng + item.img_href}
          position={{ lat: Number(item.lat), lng: Number(item.lng) }}
          onClick={() => {
            onSelect(item)
          }}
        />
        )
      } else {
        return (
          <Marker
            key={item.name + "_" + item.lat + "," + item.lng}
            position={{ lat: Number(item.lat), lng: Number(item.lng) }}
            clickable={true}
            onClick={() => {
              onSelect(item)
            }}
          />
          )
      }
    } else return undefined;
    })
 }
 {selected.lat &&
   <InfoWindow
    position={{ lat: Number(selected.lat), lng: Number(selected.lng) }}
    clickable={true}
    onCloseClick={() => setSelected({})}
    options={{ pixelOffset: { height: -35, width: 0 } }}
  >
    {selected.img_href !== "0" ?
      <img
      src={selected.img_href}
      alt=""
      style={{ maxHeight: "200px", maxWidth: "200px"}}
    /> :
    <div>
      No image available
    </div>
    }
  </InfoWindow>}
 </>);
}
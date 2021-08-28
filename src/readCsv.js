import { useEffect, useState } from "react";
import Tabletop from "tabletop";

export default function ReadCsv() {
  const defaultPin = {
    lat: 0,
    lng: 0,
    img_href: "",
    name: ""
  }
  const [pinData, setPinData] = useState([]);

  const url = "https://docs.google.com/spreadsheets/d/1T1AFJ1kQPjp2BAxSrQyyr78ZogArOz6Q3IgqhNF4drI/edit?usp=sharing";

  useEffect(() => {
    Tabletop.init({
      key: url,
      callback: showInfo,
      simpleSheet: true
    })
      // .then(data => setData(data))
      // .catch(err => console.warn(err));
  }, []);

  function showInfo(data, tabletop) {
    let outPinArr = [];
    let i = 0;
    let prop;
    let pin;
    for (i = 0; i < data.length ; i++ ) {
      pin = defaultPin;
      for (prop in data[i]) {
        pin[prop] = data[i][prop];
      }
      outPinArr.push({ ...pin });
    }
    setPinData(outPinArr);
  }

  return (
    pinData
  );
}
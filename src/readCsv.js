import { useEffect, useState } from "react";
import Papa from "tabletop";

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
    // Tabletop.init({
    //   key: url,
    //   callback: showInfo,
    //   simpleSheet: true
    // })
    // Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vRB4E_6RnpLP1wWMjqcwsUvotNATB8Np3OntlXb7066ULcAHI9oqqRhucltFifPTYNd7DRNRE56oTdt/pub?output=csv', {
    Papa.parse(url, {
      // download: true,
      header: true,
      complete: function(results) {
        var data = results.data
        console.log(data)
      }
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
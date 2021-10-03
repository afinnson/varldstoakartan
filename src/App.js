import './App.css';
import CreateMap from './mapContainer';
import State from './state';
import { pinData } from './pin_data'

function App() {
  let state = State();

  state.pinData = pinData;

  const ratio = 19.04;
  const factor = 1.5;

  return (
    <>
    <div className="App">
      <header className="App-header">
        <div>
          <a href="https://www.toaletterutangranser.se/">
          <img
            src={process.env.PUBLIC_URL + "/TUG_logo_with_text.png"}
            alt="logo"
            style={{
              width:  factor * ratio + "rem",
              height:  factor + "rem",
              resizeMode:   "contain"
            }}
          />
          </a>
        </div>
        {/* <div>
          Världstoakartan
        </div> */}
      </header>
    </div>
    {state.pinData.length ? 
    <CreateMap
      pinData={state.pinData}
    /> :
    <div
      style={{
        backgroundColor: "#282c34",
        color: "white", 
        height: "100vh",
        width: "100%",
        textAlign: "center",
        alignContent: "center",
        paddingTop: "10%",
        fontSize: "20px"
      }}
    >
      Loading...
    </div>
    }
    <div>
      <footer className="App-footer"> © 2021 All Rights Reserved | Toaletter Utan Gränser </footer>
    </div>
    </>
  );
}

export default App;

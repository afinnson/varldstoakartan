import './App.css';
import CreateMap from './mapContainer';
import State from './state';
import { pinData } from './pin_data'

function App() {
  let state = State();

  state.pinData = pinData;

  return (
    <>
    <div className="App">
      <header className="App-header">
        <p>
          Världstoakartan – Toaletter utan gränser
        </p>
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
    </>
  );
}

export default App;

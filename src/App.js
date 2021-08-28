import './App.css';
import CreateMap from './mapContainer';
import State from './state';
import ReadCsv from "./readCsv";

function App() {
  let state = State();

  console.log("hej2")
  // state.pinData = ReadCsv();
  state.pinData = [];

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

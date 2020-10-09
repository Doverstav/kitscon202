import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import Ads from "./components/Ads/Ads";
import ExclusiveContent from "./components/ExclusiveContent/ExclusiveContent";
import WebMonetizationSpoofer from "./components/WebMonetizationSpoofer/WebMonetizationSpoofer";

const ADS = "Ads";
const EXCLUSIVE_CONTENT = "ExclusiveContent";
const HOME = "Home";

function App() {
  const [activePage, setActivePage] = useState("");
  const [displayedComponent, setDisplayedComponent] = useState(<Home />);

  useEffect(() => {
    if (activePage === ADS) {
      setDisplayedComponent(<Ads />);
    } else if (activePage === EXCLUSIVE_CONTENT) {
      setDisplayedComponent(<ExclusiveContent />);
    } else {
      setDisplayedComponent(<Home />);
    }
  }, [activePage]);

  return (
    <div className="App">
      <button onClick={() => setActivePage(HOME)}>Home</button>
      <button onClick={() => setActivePage(ADS)}>Ads</button>
      <button onClick={() => setActivePage(EXCLUSIVE_CONTENT)}>
        ExclusiveContent
      </button>
      {displayedComponent}
      <WebMonetizationSpoofer />
    </div>
  );
}

export default App;

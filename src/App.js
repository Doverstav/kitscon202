import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import Ads from "./pages/Ads";
import ExclusiveContent from "./pages/ExclusiveContent";

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
    <button onClick={() => setActivePage(EXCLUSIVE_CONTENT)}>ExclusiveContent</button>
    {displayedComponent}
    </div>)
  ;
}

export default App;

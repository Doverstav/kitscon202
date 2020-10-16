import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import Ads from "./components/Ads/Ads";
import ExclusiveContent from "./components/ExclusiveContent/ExclusiveContent";
import WebMonetizationSpoofer from "./components/WebMonetizationSpoofer/WebMonetizationSpoofer";
import Button from "./components/common/Button";
import Separator from "./components/common/Separator";

const ADS = "Ads";
const EXCLUSIVE_CONTENT = "ExclusiveContent";
const HOME = "Home";

function App() {
  const [activePage, setActivePage] = useState(HOME);
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
      <div className="sidebar">
        <Button
          onClick={() => setActivePage(HOME)}
          text={"Home"}
          active={activePage === HOME}
        />
        <Button
          onClick={() => setActivePage(ADS)}
          text={"Ads"}
          active={activePage === ADS}
        />
        <Button
          onClick={() => setActivePage(EXCLUSIVE_CONTENT)}
          text={"Exclusive Content"}
          active={activePage === EXCLUSIVE_CONTENT}
        />
        <Separator />
        <WebMonetizationSpoofer />
      </div>
      <div className="content">
        <div className="content-inner">{displayedComponent}</div>
      </div>
    </div>
  );
}

export default App;

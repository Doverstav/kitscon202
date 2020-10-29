import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./components/Home";
import Ads from "./components/Ads/Ads";
import MonetizedContent from "./components/MonetizedContent/MonetizedContent";
import WebMonetizationSpoofer from "./components/WebMonetizationSpoofer/WebMonetizationSpoofer";
import Button from "./components/common/Button";
import Separator from "./components/common/Separator";

const ADS = "Ads";
const MONETIZED_CONTENT = "MonetizedContent";
const HOME = "Home";

function App() {
  const [isSpoofing, setIsSpoofing] = useState(false);
  const [activePage, setActivePage] = useState(HOME);
  const [displayedComponent, setDisplayedComponent] = useState(
    <Home spoofState={isSpoofing} />
  );

  useEffect(() => {
    if (activePage === ADS) {
      setDisplayedComponent(<Ads spoofState={isSpoofing} />);
    } else if (activePage === MONETIZED_CONTENT) {
      setDisplayedComponent(<MonetizedContent spoofState={isSpoofing} />);
    } else {
      setDisplayedComponent(<Home spoofState={isSpoofing} />);
    }
  }, [activePage, isSpoofing]);

  return (
    <div className="App">
      <div className="sidebar">
        <Button
          onClick={() => setActivePage(HOME)}
          text={"Home"}
          active={activePage === HOME}
          leftAlign={true}
        />
        <Button
          onClick={() => setActivePage(ADS)}
          text={"Ads"}
          active={activePage === ADS}
          leftAlign={true}
        />
        <Button
          onClick={() => setActivePage(MONETIZED_CONTENT)}
          text={"Monetized Content"}
          active={activePage === MONETIZED_CONTENT}
          leftAlign={true}
        />
        <Separator />
        <WebMonetizationSpoofer
          setSpoofState={(spoofState) => setIsSpoofing(spoofState)}
        />
      </div>
      <div className="content">
        <div className="content-inner">{displayedComponent}</div>
      </div>
    </div>
  );
}

export default App;
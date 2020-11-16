import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Home from "./components/Home";
import Ads from "./components/Ads/Ads";
import MonetizedContent from "./components/MonetizedContent/MonetizedContent";
import WebMonetizationSpoofer from "./components/WebMonetizationSpoofer/WebMonetizationSpoofer";
import Button from "./components/common/Button";
import Separator from "./components/common/Separator";
import About from "./components/About/About";

const ABOUT = "About";
const ADS = "Ads";
const HOME = "Home";
const MONETIZED_CONTENT = "MonetizedContent";

function App() {
  const [isSpoofing, setIsSpoofing] = useState(false);
  const [activePage, setActivePage] = useState(HOME);
  const [displayedComponent, setDisplayedComponent] = useState(
    <Home spoofState={isSpoofing} />
  );
  const sidebar = useRef();

  const hideSidebar = () => {
    sidebar.current.style.transform = "translateX(-100%)";
  };

  const showSidebar = () => {
    sidebar.current.style.transform = "translateX(0)";
  };

  useEffect(() => {
    // Reset local style when mediq query changes
    // If this isn't done, effet from opening/closing
    // the menu will persist and break the site
    window.matchMedia("(min-width: 992px)").addEventListener("change", () => {
      sidebar.current.style.transform = "";
    });
  }, []);

  useEffect(() => {
    if (activePage === ADS) {
      setDisplayedComponent(<Ads spoofState={isSpoofing} />);
    } else if (activePage === MONETIZED_CONTENT) {
      setDisplayedComponent(<MonetizedContent spoofState={isSpoofing} />);
    } else if (activePage === ABOUT) {
      setDisplayedComponent(<About />);
    } else {
      setDisplayedComponent(<Home spoofState={isSpoofing} />);
    }
  }, [activePage, isSpoofing]);

  return (
    <div className="App">
      <div ref={sidebar} className="sidebar">
        <span className="App-menu-close" onClick={() => hideSidebar()}>
          &times;
        </span>
        <h1 className="sidebar-header">Navigation</h1>
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
        <Button
          onClick={() => setActivePage(ABOUT)}
          text={"About"}
          active={activePage === ABOUT}
          leftAlign={true}
        />
        <Separator />
        <h1 className="sidebar-header">Dashboard</h1>
        <WebMonetizationSpoofer
          setSpoofState={(spoofState) => setIsSpoofing(spoofState)}
        />
      </div>
      <div className="content">
        <span className="App-menu-open" onClick={() => showSidebar()}>
          &gt;
        </span>
        {displayedComponent}
      </div>
    </div>
  );
}

export default App;

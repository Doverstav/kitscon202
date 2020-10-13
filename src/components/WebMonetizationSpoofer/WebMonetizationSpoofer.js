import React, { useEffect, useRef, useState } from "react";
import "../../WMSpoofer.css";

const WM_STATE_STOPPED = "stopped";
const WM_STATE_PENDING = "pending";
const WM_STATE_STARTED = "started";
const WM_EVENT_STOPPED = "monetizationstop";
const WM_EVENT_STARTED = "monetizationstart";
const WM_EVENT_PENDING = "monetizationpending";
const WM_EVENT_PROGRESS = "monetizationprogress";

export default function WebMonetizationSpoofer(props) {
  // User-facing state
  const [sliderValue, setSliderValue] = useState(10);
  const [isWebMonetized, setIsWebMonetized] = useState(false);
  const [wmStatus, setWMStatus] = useState("");

  // Internal WM state
  const wmTag = useRef();
  const startWMTimer = useRef();
  const wmInterval = useRef();
  const requestId = useRef();

  const dispatchWMProgressEvent = () => {
    const progressEvent = new CustomEvent(WM_EVENT_PROGRESS, {
      detail: {
        requestId: requestId.current,
        paymentPointer: wmTag.current,
        amount: 1,
        assetCode: "SEK",
        assetScale: 2,
      },
    });

    document.monetization.dispatchEvent(progressEvent);
  };

  const dispatchWMStateEvent = (wmEvent) => {
    const stateEvent = new CustomEvent(wmEvent, {
      detail: {
        requestId: requestId.current,
        paymentPointer: wmTag.current,
        finalized: wmEvent === WM_EVENT_STOPPED ? true : undefined, // Should payment not be final?
      },
    });

    document.monetization.dispatchEvent(stateEvent);
  };

  const generateId = () => {
    console.log("Generating id");
    requestId.current =
      Math.random().toString(36).substring(2) + Date.now().toString(36);
  };

  const pendingWM = () => {
    console.log("Pending WM");

    setWMState(WM_STATE_PENDING);
    dispatchWMStateEvent(WM_EVENT_PENDING);

    generateId(); // Should this only be generated once?
    startWMTimer.current = setTimeout(startWM, 1000);
  };

  const setWMState = (state) => {
    setWMStatus(state);
    document.monetization.state = state;
  };

  const startWM = () => {
    console.log(`Starting WM with id ${requestId.current}`);

    setWMState(WM_STATE_STARTED);
    dispatchWMStateEvent(WM_EVENT_STARTED);

    // Send one instance of money directly
    dispatchWMProgressEvent();
    wmInterval.current = setInterval(() => {
      console.log(`Sending money! id: ${requestId.current}`);
      dispatchWMProgressEvent();
    }, 1000);
  };

  const stopWM = () => {
    console.log("Stopping WM");

    setWMState(WM_STATE_STOPPED);
    dispatchWMStateEvent(WM_EVENT_STOPPED);

    // Clear timer & interval
    clearTimeout(startWMTimer.current);
    clearInterval(wmInterval.current);
  };

  const toggleWM = () => {
    if (wmStatus === WM_STATE_STARTED || wmStatus === WM_STATE_PENDING) {
      stopWM();
    } else {
      pendingWM();
    }
  };

  useEffect(() => {
    console.log("setting WM");
    document.monetization = document.createElement("div");
    setWMState(WM_STATE_STOPPED);
  }, []);

  useEffect(() => {
    wmTag.current = document.head.querySelector(
      'meta[name="monetization"]'
    ).content;
    setIsWebMonetized(!!wmTag.current);
  }, []); // Should run more often than mount/unmount

  return (
    <div className="container">
      <p>Here we can show some status about WM</p>
      <p>
        Web Monetization tag: {isWebMonetized ? "Exists" : "Does not exist"}
      </p>
      <p>Web Monetization is: {wmStatus}</p>
      <p>Maybe show money sent here, with an option to reset!</p>
      <button onClick={() => toggleWM()}>Click me to start/stop WM</button>
      <button>I am another button</button>
      <label>Some slidervalue: {sliderValue}</label>
      <input
        type="range"
        min="0"
        max="50"
        value={sliderValue}
        onChange={(event) => setSliderValue(event.target.value)}
      />
    </div>
  );
}

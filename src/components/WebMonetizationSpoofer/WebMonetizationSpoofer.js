import React, { useEffect, useRef, useState } from "react";
import "./WMSpoofer.css";
import Button from "../common/Button";

const WM_STATE_STOPPED = "stopped";
const WM_STATE_PENDING = "pending";
const WM_STATE_STARTED = "started";
const WM_EVENT_STOPPED = "monetizationstop";
const WM_EVENT_STARTED = "monetizationstart";
const WM_EVENT_PENDING = "monetizationpending";
const WM_EVENT_PROGRESS = "monetizationprogress";

export default function WebMonetizationSpoofer(props) {
  // User-facing state
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
        assetScale: 3,
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
      generateId();
      pendingWM();
    }
  };

  useEffect(() => {
    console.log("setting WM");
    document.monetization = document.createElement("div");
    setWMState(WM_STATE_STOPPED);
  }, []);

  useEffect(() => {
    // Set initial state of wmTag
    wmTag.current = document.head.querySelector(
      'meta[name="monetization"]'
    ).content;
    setIsWebMonetized(!!wmTag.current);

    // Observe further changes
    const headObserver = new MutationObserver((mutations) => {
      const mutatedWMTag = document.head.querySelector(
        'meta[name="monetization"]'
      );

      // Stop and start WM intelligently here!!
      if (mutatedWMTag) {
        console.log(`New wmTag: ${mutatedWMTag.content}`);
        wmTag.current = mutatedWMTag.content;
        setIsWebMonetized(true);
        // Resume WM if it ws started by user previously, otherwise do nothing
      } else {
        console.log("wmTag removed");
        wmTag.current = undefined;
        setIsWebMonetized(false);
        // Stop WM
      }
    });

    headObserver.observe(document.head, { childList: true });
  }, []);

  return (
    <div className="WMSpoofer-container">
      <Button
        onClick={() => toggleWM()}
        text={`${
          wmStatus === WM_STATE_STOPPED ? "Start" : "Stop"
        } Web Monetization`}
        active={wmStatus === WM_STATE_STOPPED}
      />
      <p>Here we can show some status about WM</p>
      <p>
        Web Monetization tag: {isWebMonetized ? "Exists" : "Does not exist"}
      </p>
      <p>Web Monetization is: {wmStatus}</p>
      <p>Maybe show money sent here, with an option to reset!</p>
    </div>
  );
}

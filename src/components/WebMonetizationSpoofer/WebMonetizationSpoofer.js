import React, { useCallback, useEffect, useRef, useState } from "react";
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
  const [totalMoneySent, setTotalMoneySent] = useState(0);
  const [isWebMonetized, setIsWebMonetized] = useState(false);
  const [wmStatus, setWMStatus] = useState(undefined);

  // Internal WM state
  const wmTag = useRef();
  const startWMTimer = useRef();
  const wmInterval = useRef();
  const requestId = useRef();

  const attachWM = () => {
    console.log("setting WM");

    document.monetization = document.createElement("div");
    setWMState(WM_STATE_STOPPED);
    dispatchWMStateEvent(WM_EVENT_STOPPED);
  };

  const detachWM = () => {
    console.log("unsetting WM");

    setWMState(undefined);
    dispatchWMStateEvent(WM_EVENT_STOPPED);
    delete document.monetization;
  };

  const dispatchWMProgressEvent = () => {
    console.log("Progress event!");
    const progressEvent = new CustomEvent(WM_EVENT_PROGRESS, {
      detail: {
        requestId: requestId.current,
        paymentPointer: wmTag.current,
        amount: 1,
        assetCode: "SEK",
        assetScale: 3,
      },
    });

    setTotalMoneySent((totalMoneySent) =>
      parseFloat((totalMoneySent + 1 / 10 ** 3).toFixed(3))
    );

    document.monetization.dispatchEvent(progressEvent);
  };

  const dispatchWMStateEvent = (wmEvent) => {
    console.log(`State event: ${wmEvent}`);
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

  const pendingWM = useCallback(() => {
    console.log("Pending WM");

    const startWM = () => {
      console.log(`Starting WM`);

      setWMState(WM_STATE_STARTED);
      dispatchWMStateEvent(WM_EVENT_STARTED);

      dispatchWMProgressEvent();
      wmInterval.current = setInterval(() => {
        dispatchWMProgressEvent();
      }, 1000);
    };

    setWMState(WM_STATE_PENDING);
    dispatchWMStateEvent(WM_EVENT_PENDING);

    startWMTimer.current = setTimeout(startWM, 1000);
  }, [startWMTimer, wmInterval]);

  const setWMState = (state) => {
    setWMStatus(state);
    document.monetization.state = state;
  };

  const stopWM = useCallback(() => {
    console.log("Stopping WM");

    setWMState(WM_STATE_STOPPED);
    dispatchWMStateEvent(WM_EVENT_STOPPED);

    // Clear timer & interval
    clearTimeout(startWMTimer.current);
    clearInterval(wmInterval.current);
  }, [startWMTimer, wmInterval]);

  const toggleWM = () => {
    if (wmStatus) {
      stopWM();
      detachWM();
    } else {
      attachWM();
      if (isWebMonetized) {
        pendingWM();
      }
    }
  };

  const handleMutatedWMTag = useCallback(() => {
    const mutatedWMTag = document.head.querySelector(
      'meta[name="monetization"]'
    );

    if (mutatedWMTag) {
      console.log(`New wmTag: ${mutatedWMTag.content}`);
      wmTag.current = mutatedWMTag.content;
      setIsWebMonetized(true);

      if (wmStatus !== undefined) {
        pendingWM();
      }
    } else {
      console.log("wmTag removed");
      wmTag.current = undefined;
      setIsWebMonetized(false);
      
      if(wmStatus !== undefined) {
        stopWM();
      }
    }
  }, [pendingWM, stopWM, wmStatus]);

  useEffect(() => {
    generateId();

    // Set initial state of wmTag
    const currentWMTag = document.head.querySelector(
      'meta[name="monetization"]'
    );
    wmTag.current = currentWMTag ? currentWMTag.content : undefined;
    setIsWebMonetized(!!wmTag.current);
  }, []);

  useEffect(() => {
    // Observe further changes
    const headObserver = new MutationObserver((mutations) => {
      handleMutatedWMTag();
    });

    headObserver.observe(document.head, { childList: true });

    return () => {
      headObserver.disconnect()
    }
  }, [handleMutatedWMTag])

  return (
    <div className="WMSpoofer-container">
      <Button
        onClick={() => toggleWM()}
        text={`${!wmStatus ? "Spoof" : "Unspoof"} Web Monetization`}
        active={!wmStatus}
      />
      <p>Here we can show some status about WM</p>
      <p>
        Web Monetization tag: {isWebMonetized ? "Exists" : "Does not exist"}
      </p>
      <p>Web Monetization is: {wmStatus}</p>
      <p>Money sent: {totalMoneySent}</p>
      <p>Maybe show money sent here, with an option to reset!</p>
    </div>
  );
}

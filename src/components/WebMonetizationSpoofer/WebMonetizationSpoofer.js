import React, { useCallback, useEffect, useRef, useState } from "react";
import "./WMSpoofer.css";
import Button from "../common/Button";

export const WM_STATE_STOPPED = "stopped";
export const WM_STATE_PENDING = "pending";
export const WM_STATE_STARTED = "started";
export const WM_EVENT_STOPPED = "monetizationstop";
export const WM_EVENT_STARTED = "monetizationstart";
export const WM_EVENT_PENDING = "monetizationpending";
export const WM_EVENT_PROGRESS = "monetizationprogress";

export default function WebMonetizationSpoofer(props) {
  // User-facing state
  const [totalMoneySent, setTotalMoneySent] = useState(0);
  const [isWebMonetized, setIsWebMonetized] = useState(false);
  // Is undefined when we are not spoofing Web Monetization,
  // otherwise is one of the three state constants defined above
  const [wmStatus, setWMStatus] = useState(undefined);

  // Internal WM state
  const wmTag = useRef();
  const startWMTimer = useRef();
  const wmInterval = useRef();
  const requestId = useRef();

  // DOM refs
  const moneyCounter = useRef();
  const WMStatusElement = useRef();

  const attachWM = () => {
    document.monetization = document.createElement("div");
    setWMState(WM_STATE_STOPPED);
    dispatchWMStateEvent(WM_EVENT_STOPPED);
  };

  const detachWM = () => {
    setWMState(undefined);
    dispatchWMStateEvent(WM_EVENT_STOPPED);
    delete document.monetization;
  };

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

    setTotalMoneySent((totalMoneySent) =>
      parseFloat((totalMoneySent + 1 / 10 ** 3).toFixed(3))
    );

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
    requestId.current =
      Math.random().toString(36).substring(2) + Date.now().toString(36);
  };

  const pendingWM = useCallback(() => {
    const startWM = () => {
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
    setWMState(WM_STATE_STOPPED);
    dispatchWMStateEvent(WM_EVENT_STOPPED);

    // Clear timer & interval
    clearTimeout(startWMTimer.current);
    clearInterval(wmInterval.current);
  }, [startWMTimer, wmInterval]);

  const toggleWM = () => {
    if (wmStatus) {
      stopWM();
      props.setSpoofState(false);
      detachWM();
    } else {
      attachWM();
      props.setSpoofState(true);
      if (isWebMonetized) {
        // Give components some time to update kekW
        setTimeout(() => pendingWM(), 100);
      }
    }
  };

  const handleMutatedWMTag = useCallback(() => {
    const mutatedWMTag = document.head.querySelector(
      'meta[name="monetization"]'
    );

    if (mutatedWMTag) {
      wmTag.current = mutatedWMTag.content;
      setIsWebMonetized(true);

      // Only start if we are currently spoofing and are stopped
      // If we are not spoofing, things will crash when starting
      // If we are not stopped, we will fire multiple progression events
      // which will send money quicker than intended
      if (wmStatus === WM_STATE_STOPPED) {
        pendingWM();
      }
    } else {
      wmTag.current = undefined;
      setIsWebMonetized(false);

      if (wmStatus !== undefined) {
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
      headObserver.disconnect();
    };
  }, [handleMutatedWMTag]);

  useEffect(() => {
    if (wmStatus === WM_STATE_STOPPED) {
      WMStatusElement.current.style.borderLeftColor = "red";
    } else if (wmStatus === WM_STATE_PENDING) {
      WMStatusElement.current.style.borderLeftColor = "yellow";
    } else if (wmStatus === WM_STATE_STARTED) {
      WMStatusElement.current.style.borderLeftColor = "green";
    } else {
      WMStatusElement.current.style.borderLeftColor = "gray";
    }
  }, [wmStatus]);

  return (
    <div className="WMSpoofer-container">
      <Button
        onClick={() => toggleWM()}
        text={`${!wmStatus ? "Start" : "Stop"} Web Monetization`}
        active={!wmStatus}
      />
      <p>Here we can show some status about WM</p>
      <p>
        Web Monetization tag: {isWebMonetized ? "Exists" : "Does not exist"}
      </p>
      <p className="WMSpoofer-border WMSpoofer-status" ref={WMStatusElement}>
        Web Monetization is: {wmStatus ? wmStatus : "undefined"}
      </p>
      <p>
        Money sent: <span ref={moneyCounter}>{totalMoneySent}</span>
      </p>
      <p>Maybe show money sent here, with an option to reset!</p>
    </div>
  );
}

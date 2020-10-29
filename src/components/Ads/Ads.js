import React, { useEffect, useState } from "react";
import {
  WM_EVENT_PENDING,
  WM_EVENT_STARTED,
  WM_EVENT_STOPPED,
  WM_STATE_PENDING,
  WM_STATE_STARTED,
  WM_STATE_STOPPED,
} from "../WebMonetizationSpoofer/WebMonetizationSpoofer";

import "./Ads.css";
import Ad160x600 from "../../res/ad160x600.png";
import Ad250x300 from "../../res/ad250x300.png";
import Ad728x90 from "../../res/ad728x90.png";

export default function Home(props) {
  const [monetizationState, setMonetizationState] = useState(undefined);

  useEffect(() => {
    if (props.spoofState) {
      // Get current monetization state
      setMonetizationState(document.monetization.state);

      let monetizationObject = document.monetization;

      // Set up listeners to respond to state changes
      const setStateToStarted = () => setMonetizationState(WM_STATE_STARTED);
      const setStateToPending = () => setMonetizationState(WM_STATE_PENDING);
      const setStateToStopped = () => setMonetizationState(WM_STATE_STOPPED);

      monetizationObject.addEventListener(WM_EVENT_STARTED, setStateToStarted);
      monetizationObject.addEventListener(WM_EVENT_PENDING, setStateToPending);
      monetizationObject.addEventListener(WM_EVENT_STOPPED, setStateToStopped);

      return () => {
        // Remove listeners when unmounting
        monetizationObject.removeEventListener(
          WM_EVENT_STARTED,
          setStateToStarted
        );
        monetizationObject.removeEventListener(
          WM_EVENT_PENDING,
          setStateToPending
        );
        monetizationObject.removeEventListener(
          WM_EVENT_STOPPED,
          setStateToStopped
        );
      };
    } else {
      setMonetizationState(undefined);
    }
  }, [props.spoofState]);

  return (
    <div className="Ads-container">
      <img className="Ads-ad-side" src={Ad160x600} alt="" />
      <div className="Ads-content">
        <img className="Ads-ad-banner" src={Ad728x90} alt="" />
        {monetizationState}
        <h1>Removable ads</h1>
        <p>
          Allow the user to choose! Either they can pay you directly using Web
          Monetization, or you can serve them some ads if they do not use it.
        </p>
        <img className="Ads-ad-box" src={Ad250x300} alt="" />
        <p>It's getting out of hand with all these ads!!</p>
        <img className="Ads-ad-box" src={Ad250x300} alt="" />
        <p>Toogle Web monetization on and off to see the difference.</p>
        <img className="Ads-ad-banner" src={Ad728x90} alt="" />
      </div>
      <img className="Ads-ad-side" src={Ad160x600} alt="" />
    </div>
  );
}

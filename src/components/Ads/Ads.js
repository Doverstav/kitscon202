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
  // Init this to WM_STATE_STARTED to avoid the "ads" flashing when navigating to page
  const [monetizationState, setMonetizationState] = useState(WM_STATE_STARTED);

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
      {monetizationState !== WM_STATE_STARTED ? (
        <img className="Ads-ad-side" src={Ad160x600} alt="" />
      ) : null}
      <div className="Ads-content">
        <h1>Double dipping in revenue streams</h1>
        {monetizationState !== WM_STATE_STARTED ? (
          <img className="Ads-ad-banner" src={Ad728x90} alt="" />
        ) : null}
        <p style={{ fontWeight: "500" }}>
          You don't have to put all your eggs in the Web Monetization-basket! It
          is easy to combine a more traditional, ad-driven revenue stream with
          Web Monetization. A monetized user won't have to their page bogged
          down with advertisements, and a non-paying user will instead pay for
          themselves by viewing your tastefully inserted ads.
        </p>
        {monetizationState !== WM_STATE_STARTED ? (
          <img className="Ads-ad-box" src={Ad250x300} alt="" />
        ) : null}
        <h2>Get the ad free experience</h2>
        <p>
          To remove the ads, turn on Web Monetization. After a second, when the
          Web Monetization status has gone from pending to started, the ads will
          disappear! To bring them back, simply stop the Web Monetization again,
          and the ads will pop back in!
        </p>
        {monetizationState !== WM_STATE_STARTED ? (
          <img className="Ads-ad-banner" src={Ad728x90} alt="" />
        ) : null}
      </div>
      {monetizationState !== WM_STATE_STARTED ? (
        <img className="Ads-ad-side" src={Ad160x600} alt="" />
      ) : null}
    </div>
  );
}

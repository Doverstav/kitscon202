import React, { useEffect, useState } from "react";
import {
  WM_EVENT_PENDING,
  WM_STATE_STOPPED,
  WM_EVENT_STARTED,
  WM_EVENT_STOPPED,
  WM_STATE_PENDING,
  WM_STATE_STARTED,
} from "./WebMonetizationSpoofer/WebMonetizationSpoofer";

import Link from "./common/Link";
import Separator from "./common/Separator";

import BananaGif from "../res/giphy.gif";
import "./Home.css";

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
    <div>
      <h1>Here's a nice lil headline!</h1>
      <p>
        Welcome home! This page should probably work as an expaliner for what
        this site is trying to do. I could probably bake the "Exclusive
        Content"-demo into this page as well.
      </p>
      <p>
        Look at this text that is ended with a nice looking link:{" "}
        <Link href="/" text="Click me!" />
      </p>
      <Separator />
      <p>
        {(!monetizationState || monetizationState === WM_STATE_STOPPED) &&
          "Start Web Monetization to unlock exclusive content!"}
        {monetizationState === WM_STATE_PENDING && "Loading..."}
        {monetizationState === WM_STATE_STARTED &&
          "Very nice! Please enjoy your exlusive content."}
      </p>
      {monetizationState === "started" ? (
        <div>
          <img src={BananaGif} alt="BananaGif" />
          <p className="Home-text-small">
            Gif taken from <Link href="http://gph.is/2o30x8S" text="here" />
          </p>
        </div>
      ) : null}
    </div>
  );
}

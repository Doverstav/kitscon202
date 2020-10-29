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
      <h1>Web Monetization Demo</h1>
      <p>
        <Link href="https://webmonetization.org/" text="Web Monetization" /> is
        a browser API that allows the creation of a payment stream from the user
        agent to a website. This website contains simple examples of how Web
        Monetization can be used, and tries to show that it is rather simple to
        create a Web Monetized website.
      </p>
      <p>
        As Web Monetization is a proposed standard, it is not part of any
        browser today. Instead, users must have a Web Monetization provider, of
        which there today exists only one,{" "}
        <Link href="https://coil.com/" text="Coil" />. So, in order to make this
        website usable by anyone, it allows the user to inject a fake Web
        Monetization provider. This provider can also easily be removed to
        easily compare between monetized and non-monetized versions.
      </p>
      <p>
        This startpage demonstrates the so called{" "}
        <Link
          href="https://coil.com/p/coil/The-100-20-Rule-for-Premium-Content/3l1ALJ3M6"
          text="100+20 rule"
        />{" "}
        for written content, where the free content is a complete article, but
        monetized users can view some extra content.{" "}
        {/*As an example, when reading
        a recipe, the additional content may be variations on the recipe, or the
        recipe to some side dish that goes great with the main recipe.*/}
      </p>
      <p>
        The bonus content for this page can be seen at the bottom. Click the
        "Start Web Monetization" to inject the monetization object and access
        the exclusive content! Below that button you will also find whether the
        current page has a Web Monetization tag, the current monetization state
        and how much (fake) money has been sent during this session.
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
        <p>
          So this is the exlusive content you were promised! It's not a lot, but
          here it is. I can't give you much, but I can give you this advice.
          Explore the other pages on this site via the navigation the your left
          to see more examples! And visit the "About" page for more details on
          how this all works.
        </p>
      ) : null}
    </div>
  );
}

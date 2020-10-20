import React from "react";
import { useMonetizationState } from "react-web-monetization";

import Link from "./common/Link";
import Separator from "./common/Separator";

import BananaGif from "../res/giphy.gif";
import "./Home.css"

export default function Home(props) {
  const monetization = useMonetizationState();

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
        {(!monetization.state || monetization.state === "stopped") &&
          "Start Web Monetization to unlock exclusive content!"}
        {monetization.state === "pending" && "Loading..."}
        {monetization.state === "started" && "Very nice! Please enjoy your exlusive content."}
      </p>
      {monetization.state === "started" ? (
        <div>
          <img src={BananaGif} alt="BananaGif" />
          <p className="Home-text-small">
            Gif taken from{" "}
            <Link href="http://gph.is/2o30x8S" text="here" />
          </p>
        </div>
      ) : null}
    </div>
  );
}

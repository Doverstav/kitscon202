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

import "./Home.css";
import Preamble from "./common/Preamble";
import Code from "./common/Code";

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
    <div className="Home-container">
      <h1>Web Monetization Demo</h1>
      <Preamble>
        <Link href="https://webmonetization.org/">Web Monetization</Link> is a
        browser API that allows the creation of a payment stream from the user
        agent to a website. This website contains simple examples of how Web
        Monetization can be used, and tries to show that it is rather simple to
        create a Web Monetized website.
      </Preamble>
      <h2>
        Websites working with <Code>{"<meta>"}</Code>
      </h2>
      <p>
        In the <Code>{"<head>"}</Code> of this site I've added a{" "}
        <Link href="">payment pointer</Link> inside a meta tag, like this{" "}
        <Code>
          {'<meta name="monetization" content="$alice.wallet.example" />'}
        </Code>
        . Simply doing this is enough to receive money using Web Monetization!
        The payment pointer used here doesn't point to an actual wallet, but
        getting a real pointer is{" "}
        <Link href="https://webmonetization.org/docs/ilp-wallets/">
          fairly easy
        </Link>
        .
      </p>
      <h2>Making things interesting</h2>
      <p>
        However, simply receiving money doesn't make for a very interesting
        website. In order to create some value for monetized visitors, you have
        to use the{" "}
        <Link href="https://webmonetization.org/docs/api">Javascript API</Link>.
        Doing this consists mostly of listening to events emitted from{" "}
        <Code>document.monetization</Code>, such as{" "}
        <Code>monetizationstart</Code> or <Code>monetizationstop</Code>.
      </p>
      <h2>The 100+20 rule</h2>
      <p>
        So what interesting things can be done with a Web Monetized site? One
        example is the{" "}
        <Link href="https://coil.com/p/coil/The-100-20-Rule-for-Premium-Content/3l1ALJ3M6">
          100+20 rule
        </Link>{" "}
        where you have some free content available for all visitors, but
        monetized users will see some extra content, the bonus 20 percent, which
        should ideally be worth both their time and money.
      </p>
      <p>
        The bonus content for this page can be found at the bottom. Click "Start
        Web Monetization" to mock <Code>document.monetization</Code> and gain
        access to the exclusive content! Below the button you will find a
        rudimentary dashboard displaying whether the current page has a Web
        Monetization tag, the current monetization state and how much money has
        been sent during this session.
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
        <>
          <h2>Exclusive content</h2>
          <p>
            Here is your exclusive content, as promised! Hopefully, you'll feel
            that it is worth your hard earned money! Now, go explore the other
            pages on this site via the navigation the your left to see more
            examples!
          </p>
        </>
      ) : null}
    </div>
  );
}

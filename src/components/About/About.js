import React from "react";
import Code from "../common/Code";
import Link from "../common/Link";
import Preamble from "../common/Preamble";

import "./About.css";

export default function About(props) {
  return (
    <div className="About-container">
      <h1>About</h1>
      <Preamble>
        This page contains some information about about the more technical
        aspects of this site, and at the end there's a short list of links with
        additional information about Web Monetization and related topics.
      </Preamble>
      <h2>Some technicalities</h2>
      <h3>Checking out the code</h3>
      <p>
        For those interested, the code for this website can be found on{" "}
        <Link href="https://github.com/Doverstav/kitscon202">GitHub</Link>.
      </p>
      <h3>Behind the curtain</h3>
      <p>
        Made in React, as initially this was thought to be a good idea. As the
        project progressed, it turns out that maybe it wasn't. For someone not
        familiar with React it can be harder to pick out what part of the
        implementation is React specific and what is Web Monetization specific,
        lessening it's value as an informative resource. Some problems got
        harder to solve than necesary when wrestling with React lifecycles, such
        as mocking and unmocking <Code>document.monetization</Code>, and adding
        and removing the Web Moentization tag based on user interactions.
      </p>
      <h3>
        Mocking <Code>document.monetization</Code>
      </h3>
      <p>
        Implementation is based on the{" "}
        <Link href="https://webmonetization.org/docs/api/">JavaScript API</Link>{" "}
        and inspired by the{" "}
        <Link href="https://glitch.com/edit/#!/wm-exclusive-content-basic?path=wm-previewer.js%3A156%3A1">
          official examples
        </Link>
        . From the documentation, the <Code>document.monetization</Code> DOM
        object must implement{" "}
        <Link href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget">
          EventTarget
        </Link>{" "}
        in addition to having a read-only <Code>state</Code> property. Instead
        of creating a custom object that implements <Code>EventTarget</Code>,
        you can simply assign <Code>document.monetization</Code> a div, which
        implements <Code>EventTarget</Code>. From there, it is simple to
        dispatch <Code>CustomEvents</Code> when appropriate.
      </p>
      <p>
        Other issues arose when adding some more dynamic behavior, such as
        supporting a Web Monetization being added and removed and having{" "}
        <Code>document.monetization</Code> behave as expected, i.e. set the
        correct state and send the correct events. This is one area where the
        choice of React might have hindered more than helped, as there were some
        issues with re-renderings setting severals timers/intervals, and
        attaching/detaching observers.
      </p>
      <h2>Further reading</h2>
      <p>
        <Link href="https://webmonetization.org/">Web Monetization</Link> - The
        Web Monetization webpage containing the docs, the spec and information
        about wallets, providers and tools
      </p>
      <p>
        <Link href="https://github.com/WICG/webmonetization/issues/32">
          Specifying rate
        </Link>{" "}
        - An interesting discussion regarding why the Web Monetization
        specification does not allow for specifying a rate, and for what types
        of monetization Web Monetization is useful
      </p>
      <p>
        <Link href="https://github.com/WICG/webmonetization/issues/19">
          {"<link>"} vs {"<meta>"}
        </Link>{" "}
        - Discussion about whether to use {"<link>"} or {"<meta>"} to place Web
        Monetization information
      </p>
      <p>
        <Link href="https://interledger.org/">Interledger</Link> - Information
        about Interledger, the protocol used by Web Monetization to send
        micropayments
      </p>
      <p>
        <Link href="">Open payments</Link> - An inter-wallet payments protocol,
        for sending larger payments over Interledger
      </p>
      <p>
        <Link href="https://www.grantfortheweb.org/">Grant for the web</Link> -
        A $100M fund to boost innovation in Web Monetization, backed by Coil,
        Mozilla and Creative Commons
      </p>
    </div>
  );
}

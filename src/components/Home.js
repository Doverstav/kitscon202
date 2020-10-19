import React from "react";
import Link from "./common/Link";

export default function Home(props) {
  return (
    <div>
      <h1>Here's a nice lil headline!</h1>
      <p>
        Welcome home! This page should probably work as an expaliner for what
        this site is trying to do. I could probably bake the "Exclusive
        Content"-demo into this page as well.
      </p>
      <p>Lokk at this text that is ended with a nice looking lin: <Link href="/" text="Click me!" /></p>
    </div>
  );
}

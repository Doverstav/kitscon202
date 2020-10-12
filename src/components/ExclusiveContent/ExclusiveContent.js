import React from "react";
import { useMonetizationState } from "react-web-monetization";

export default function Home(props) {
  const monetization = useMonetizationState();

  return (
    <div>
      <p>
        Here is some content that is available for everyone! Inspired by the 100
        + 20 rule (add link to coil blogpost here)
      </p>
      {monetization.state === "pending" ? (
        <p>Loading your exclusive content</p>
      ) : null}
      {monetization.state === "started" ? (
        <p>This is your exclusive content! Wow, totally worth it.</p>
      ) : null}
      {!monetization.state || monetization.state === "stopped" ? (
        <p>Unlock this content by signing up with Coil</p>
      ) : null}
    </div>
  );
}

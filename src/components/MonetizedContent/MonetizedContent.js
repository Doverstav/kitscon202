import React, { useEffect, useRef } from "react";
import SweetTune from "../../res/song.mp3";

export default function MonetizedContent(props) {
  let audioPlayer = useRef();

  useEffect(() => {
    let monetizationTag = document.head.querySelector(
      'meta[name="monetization"]'
    );

    document.head.removeChild(monetizationTag);

    audioPlayer.current.addEventListener("play", () => {
      document.head.appendChild(monetizationTag);
    });

    audioPlayer.current.addEventListener("pause", () => {
      document.head.removeChild(monetizationTag);
    });

    return () => {
      document.head.appendChild(monetizationTag);
    };
  }, []);

  return (
    <div>
      <h1>Monetized Content</h1>
      <p>
        Monetize playback of your content! This page has no monetization tag by
        defualt, it is instead added when you start playing the song below. Whne
        you pause, or hte song ends, the monetization tag is removed. This menas
        that you will only pay for the amount of time spent listening!
      </p>
      <audio controls ref={audioPlayer}>
        <source src={SweetTune} type="audio/mpeg" />
      </audio>
    </div>
  );
}

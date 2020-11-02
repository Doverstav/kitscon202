import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "../common/Link";
import SweetTune from "../../res/song.mp3";
import "./MonetizedContent.css";
import {
  WM_EVENT_PENDING,
  WM_EVENT_STARTED,
  WM_EVENT_STOPPED,
  WM_STATE_PENDING,
  WM_STATE_STARTED,
  WM_STATE_STOPPED,
} from "../WebMonetizationSpoofer/WebMonetizationSpoofer";
import Separator from "../common/Separator";

export default function MonetizedContent(props) {
  const audioPlayer = useRef();
  const [monetizationTag, setMonetizationTag] = useState();
  const [monetizationState, setMonetizationState] = useState(undefined);
  // Keep track of past states so we know when to reload audio element
  const previousMonetizationState = useRef();

  const appendMonetizationTag = useCallback(() => {
    if (monetizationTag) {
      document.head.appendChild(monetizationTag);
    }
  }, [monetizationTag]);

  const removeMonetizationTag = useCallback(() => {
    if (monetizationTag) {
      document.head.removeChild(monetizationTag);
    }
  }, [monetizationTag]);

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

  useEffect(() => {
    let audioPlayerRef = audioPlayer.current;

    setMonetizationTag(
      document.head.querySelector('meta[name="monetization"]')
    );

    removeMonetizationTag();

    audioPlayerRef.addEventListener("play", appendMonetizationTag);
    audioPlayerRef.addEventListener("pause", removeMonetizationTag);

    return () => {
      audioPlayerRef.removeEventListener("play", appendMonetizationTag);
      audioPlayerRef.removeEventListener("pause", removeMonetizationTag);

      appendMonetizationTag();
    };
  }, [appendMonetizationTag, removeMonetizationTag]);

  useEffect(() => {
    if (monetizationState === undefined && previousMonetizationState.current) {
      // Reload when removing web monetization to remove audio track
      // Also remove WM tag here if it is inserted to properly stop Web Monetization
      if (document.head.contains(monetizationTag)) {
        removeMonetizationTag();
      }
      audioPlayer.current.load();
    } else if (
      previousMonetizationState.current === undefined &&
      monetizationState === WM_STATE_STOPPED
    ) {
      // Reload when adding web monetization to add audio track
      audioPlayer.current.load();
    }
  }, [monetizationState, appendMonetizationTag, removeMonetizationTag, monetizationTag]);

  useEffect(() => {
    previousMonetizationState.current = monetizationState;
  });

  return (
    <div>
      <h1>Monetized Content</h1>
      <p>
        For some services, it may only make sense for the user to pay while they
        are consuming content. Examples of such services are Spotify and
        Youtube. So instead of the user streaming payments by visiting the site,
        they are instead streaming payments for every second of content enjoyed.
      </p>
      <p>
        Viewing this page with Web Monetization enabled will allow you to play a
        song. Notice that while the sing is not playing, Web Monetization is
        stopped, and the website does not have a Web Monetization tag. When
        clicking play, a tag is inserted and Web Monetization start
        automatically, sending money while the song is playing. Pausing removes
        the tag again and Web Monetization automatically stops.
      </p>
      <Separator />
      <audio controls ref={audioPlayer}>
        {monetizationState !== undefined ? (
          <source src={SweetTune} type="audio/mpeg" />
        ) : null}
      </audio>
      {monetizationState !== undefined ? (
        <p className="Monetized-Content-text-small">
          Song is{" "}
          <Link
            href="https://www.youtube.com/watch?v=FEciLhiKcQA"
            text="Lonely Troutman II by Will Rosati"
          />
        </p>
      ) : null}
    </div>
  );
}

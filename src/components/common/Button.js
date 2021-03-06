import React from "react";
import "./Button.css";

export default function Button(props) {
  let classNames = `Button ${props.active ? "Button-active" : ""} ${props.leftAlign ? "Button-leftalign" : ""}`;
  return (
    <div className={classNames} onClick={props.onClick}>
      {props.text}
    </div>
  );
}

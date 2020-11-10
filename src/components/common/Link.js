import React from "react"
import "./Link.css"
export default function Link(props) {
  return (
    <a className="Link" href={props.href}>{props.children}</a>
  )
}
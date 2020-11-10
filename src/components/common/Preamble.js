import React from 'react'
import "./Preamble.css"

export default function Preamble(props) {
  return (
    <p className="Preamble">{props.children}</p>
  )
}
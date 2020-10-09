import React, { useState } from "react";
import "../../WMSpoofer.css";

export default function WebMonetizationSpoofer(props) {
  const [sliderValue, setSliderValue] = useState(10)

  return (
    <div className="container">
      <p>Here we can show some status about WM</p>
      <button>Click me to start/stop WM</button>
      <button>I am another button</button>
      <label>Some slidervalue: {sliderValue}</label>
      <input type="range" min="0" max="50" value={sliderValue} onChange={(event) => setSliderValue(event.target.value)} />
    </div>
  );
}

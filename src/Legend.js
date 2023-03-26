import React from "react"
import "./Legend.css"

const Legend = ({ labels, colorScale, setContinent, continent }) => {
  return (
    <div className="legend-container">
      {labels.map((l) => {
        return (
          <div
            style={{ fontWeight: continent === l ? 700 : 400 }}
            className="legend-row"
          >
            <div
              style={{ backgroundColor: colorScale(l) }}
              onClick={() => setContinent(l)}
              className="legend-marker"
            ></div>
            <p className="legend-label">{l}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Legend

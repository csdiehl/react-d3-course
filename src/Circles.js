import { select } from "d3"
import { useEffect, useRef } from "react"
import { drawChart } from "./drawChart"
import data from "./gapminder_data.json"
import "./index.css"

// https://observablehq.com/@uwdata/introduction-to-d3-part-2

const margin = { left: 50, right: 20, top: 30, bottom: 50 }

function Circles({ width, height, year, colorScale, selectedContinent }) {
  // this just attaches circles to the DOM - it doesn't actually set their size, color, or position
  return <svg viewBox={`0 0 ${width} ${height}`}></svg>
}

export default Circles

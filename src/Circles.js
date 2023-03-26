import { select } from "d3"
import { useEffect, useRef } from "react"
import { drawChart } from "./drawChart"
import data from "./gapminder_data.json"
import "./index.css"

// https://observablehq.com/@uwdata/introduction-to-d3-part-2

const margin = { left: 50, right: 20, top: 30, bottom: 50 }

function Circles({ width, height, year, colorScale, selectedContinent }) {
  // filter the data to the selected year
  const chartData = data.filter((d) => d.year === year)
  // store a Ref to the SVG that will allow d3 to access the DOM element
  const svgRef = useRef()

  // when data or dimensions change, update the circle attributes - color, size, and position
  useEffect(() => {
    const SVG = select(svgRef.current)
    // scales
    drawChart(
      SVG,
      chartData,
      data,
      height,
      width,
      margin,
      colorScale,
      selectedContinent
    )
  }, [chartData, height, width, colorScale, selectedContinent])

  // this just attaches circles to the DOM - it doesn't actually set their size, color, or position
  return (
    <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`}>
      <line stroke="lightgrey" strokeDasharray={"10 2"} className="life-avg" />
      <line stroke="lightgrey" strokeDasharray={"10 2"} className="gdp-avg" />
      {chartData.map((d) => (
        <circle key={d.country} fill="#FFF" />
      ))}
      <text
        fontSize="48px"
        x={width - margin.right - 150}
        y={height - margin.bottom - 50}
      >
        {year}
      </text>
      <text y={height - 20} x={20} fill="grey">
        GDP per Capita
      </text>
      <text
        fill="grey"
        transform={`translate(${20},${margin.top + 100}) rotate(-90)`}
      >
        Life Expectancy
      </text>
    </svg>
  )
}

export default Circles

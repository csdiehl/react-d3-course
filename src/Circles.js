import "./index.css"
import data from "./gapminder_data.json"
import {
  scaleLinear,
  select,
  extent,
  scaleSqrt,
  scaleLog,
  axisLeft,
  axisBottom,
  mean,
} from "d3"
import { useEffect, useRef } from "react"

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
    let maxRadius = 40
    let xScale = scaleLog()
      .domain(extent(data, (d) => d.gdp_cap))
      .range([margin.left, width - margin.right])
    let yScale = scaleLinear()
      .domain(extent(data, (d) => d.life_exp))
      .range([height - margin.bottom, margin.top])
    let rScale = scaleSqrt()
      .domain(extent(data, (d) => d.population))
      .range([1, maxRadius])

    function colorPoint(continent) {
      return selectedContinent === continent || selectedContinent === "all"
    }

    // average lines
    SVG.select(".life-avg")
      .transition()
      .duration(500)
      .attr("x1", margin.left)
      .attr("x2", width - margin.right)
      .attr(
        "y1",
        mean(chartData, (d) => yScale(d.life_exp))
      )
      .attr(
        "y2",
        mean(chartData, (d) => yScale(d.life_exp))
      )

    SVG.select(".gdp-avg")
      .transition()
      .duration(500)
      .attr("y1", margin.top)
      .attr("y2", height - margin.bottom)
      .attr(
        "x1",
        mean(chartData, (d) => xScale(d.gdp_cap))
      )
      .attr(
        "x2",
        mean(chartData, (d) => xScale(d.gdp_cap))
      )

    // circles
    SVG.selectAll("circle")
      .data(chartData)
      .transition()
      .duration(500)
      .attr("cx", (d) => xScale(d.gdp_cap))
      .attr("cy", (d) => yScale(d.life_exp))
      .attr("r", (d) => rScale(d.population))
      .attr("opacity", (d) => (colorPoint(d.continent) ? 1 : 0.5))
      .style("fill", (d) =>
        colorPoint(d.continent) ? colorScale(d.continent) : "lightgrey"
      )

    SVG.append("g")
      .call(axisLeft(yScale).ticks(5))
      .attr("transform", `translate(${margin.left},0)`)
      .call((g) => g.select(".domain").remove())
    SVG.append("g")
      .call(axisBottom(xScale).ticks(5))
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call((g) => g.select(".domain").remove())
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

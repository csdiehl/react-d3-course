import './index.css'
import data from './gapminder_data.json'
import {
  scaleLinear,
  select,
  extent,
  scaleSqrt,
  scaleLog,
  axisLeft,
  axisBottom,
} from 'd3'
import { useEffect, useRef } from 'react'

// https://observablehq.com/@uwdata/introduction-to-d3-part-2

const margin = { left: 20, right: 20, top: 30, bottom: 30 }

function Circles({ width, height, year, colorScale }) {
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

  // filter the data to the selected year
  const chartData = data.filter((d) => d.year === year)
  // store a Ref to the SVG that will allow d3 to access the DOM element
  const svgRef = useRef()

  // when data or dimensions change, update the circle attributes - color, size, and position
  useEffect(() => {
    const SVG = select(svgRef.current)

    // circles
    SVG.selectAll('circle')
      .data(chartData)
      .transition()
      .duration(500)
      .attr('cx', (d) => xScale(d.gdp_cap))
      .attr('cy', (d) => yScale(d.life_exp))
      .attr('r', (d) => rScale(d.population))
      .style('fill', (d) => colorScale(d.continent))
  }, [data, height, width, colorScale, xScale, yScale, rScale])

  useEffect(() => {
    const SVG = select(svgRef.current)

    SVG.append('g')
      .call(axisLeft(yScale).ticks(5))
      .attr('transform', `translate(${margin.left},0)`)
      .call((g) => g.select('.domain').remove())
    SVG.append('g')
      .call(axisBottom(xScale).ticks(5))
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call((g) => g.select('.domain').remove())
  }, [height])

  // this just attaches circles to the DOM - it doesn't actually set their size, color, or position
  return (
    <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`}>
      {chartData.map((d) => (
        <circle key={d.country} fill='#FFF' />
      ))}
      <text
        fontSize='48px'
        x={width - margin.right - 150}
        y={height - margin.bottom - 50}
      >
        {year}
      </text>
    </svg>
  )
}

export default Circles

import React, { useRef } from 'react'
import { scaleLinear, scaleBand, max } from 'd3'

const BarChart = ({ width, height, data }) => {
  const svgRef = useRef()

  const lines = [10, 20, 30, 40]

  // scales
  const margin = 10
  const xScale = scaleLinear()
    .domain([0, max(data, (d) => d.sunshine)])
    .range([0, width - 2 * margin])
  const yScale = scaleBand()
    .domain(data)
    .range([height - 2 * margin, 0])

  const rectangles = data.map((d) => (
    <rect
      x={margin}
      y={yScale(d)}
      height={yScale.bandwidth()}
      width={xScale(d.sunshine)}
      key={d.city}
      fill='darkorange'
      stroke='#FFF'
      strokeWidth={0.5}
    ></rect>
  ))

  const labels = data.map((d) => (
    <text
      textAnchor='end'
      fontSize='12px'
      x={xScale(d.sunshine) - 10}
      y={yScale(d) - 10}
      key={d.city}
      fill='#FFF'
    >
      {d.city}
    </text>
  ))

  const gridLines = lines.map((l) => (
    <g>
      <line
        stroke='#FFF'
        x1={xScale(l)}
        x2={xScale(l)}
        y1={0}
        y2={height - margin}
      ></line>
      <text textAnchor='middle' fontSize={12} x={xScale(l)} y={height - margin}>
        {l}
      </text>
    </g>
  ))

  return (
    <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`}>
      {rectangles}
      {gridLines}
      {labels}
    </svg>
  )
}

export default BarChart

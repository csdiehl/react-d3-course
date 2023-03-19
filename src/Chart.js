import React from 'react'
import { scaleLinear, scaleBand, max } from 'd3'

const BarChart = ({ width, height, data }) => {
  // scales
  const margin = 10
  const xScale = scaleLinear()
    .domain([0, max(data, (d) => d.sunshine)])
    .range([0, width - 2 * margin])
  const yScale = scaleBand()
    .domain(data)
    .range([height - 2 * margin, 0])

  console.log(yScale(10))
  console.log(xScale(data[0]))

  return <svg viewBox={`0 0 ${width} ${height}`}></svg>
}

export default BarChart

import './index.css'
import { scaleLinear, select, max, extent, scaleSqrt } from 'd3'
import { useEffect, useRef } from 'react'

// https://observablehq.com/@uwdata/introduction-to-d3-part-2

const margin = { left: 20, right: 20, top: 30, bottom: 30 }

function Circles({ width, height, data, colorScale }) {
  // store the data in state

  // store a Ref to the SVG that will allow d3 to access the DOM element
  const svgRef = useRef()

  // when data or dimensions change, update the circle attributes - color, size, and position
  useEffect(() => {
    let maxRadius = 40
    let xScale = scaleLinear()
      .domain([0, max(data, (d) => d.gdp_cap)])
      .range([margin.left, width - margin.right])
    let yScale = scaleLinear()
      .domain([margin.top, max(data, (d) => d.life_exp)])
      .range([height - margin.bottom, margin.top])
    let rScale = scaleSqrt()
      .domain(extent(data, (d) => d.population))
      .range([1, maxRadius])

    select(svgRef.current)
      .selectAll('circle')
      .data(data)
      .transition()
      .duration(500)
      .attr('cx', (d) => xScale(d.gdp_cap))
      .attr('cy', (d) => yScale(d.life_exp))
      .attr('r', (d) => rScale(d.population))
      .style('fill', (d) => colorScale(d.continent))
  }, [data, height, width, colorScale])

  // this just attaches circles to the DOM - it doesn't actually set their size, color, or position
  return (
    <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`}>
      {data.map((d) => (
        <circle key={d.country} fill='#FFF' />
      ))}
    </svg>
  )
}

export default Circles

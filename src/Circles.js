import './index.css'
import { scaleLinear, select } from 'd3'
import { useEffect, useState, useRef } from 'react'
import { getData } from './utils'

let colors = ['#2176ae', '#57b8ff', '#b66d0d', '#fbb13c', '#fe6847']

function Circles({ width, height }) {
  // store the data in state
  const [data, setData] = useState(getData())

  // store a Ref to the SVG that will allow d3 to access the DOM element
  const svgRef = useRef()

  // when button clicked, randomly update the data stored in state, triggering a re-render
  const handleClick = () => setData(getData())

  // when data or dimensions change, update the circle attributes - color, size, and position
  useEffect(() => {
    let maxRadius = 40
    let xScale = scaleLinear().domain([0, 1]).range([0, width])
    let yScale = scaleLinear().domain([0, 1]).range([0, height])
    let rScale = scaleLinear().domain([0, 1]).range([0, maxRadius])

    select(svgRef.current)
      .selectAll('circle')
      .data(data)
      .transition()
      .duration(1000)
      .attr('cx', (d) => xScale(d.x))
      .attr('cy', (d) => yScale(d.y))
      .attr('r', (d) => rScale(d.r))
      .style('fill', (d) => colors[d.color])
  }, [data, height, width])

  // this just attaches circles to the DOM - it doesn't actually set their size, color, or position
  return (
    <div>
      <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`}>
        {data.map((d) => (
          <circle fill='#FFF' />
        ))}
      </svg>
      <div>
        <button onClick={handleClick}>Refresh Data</button>
      </div>
    </div>
  )
}

export default Circles

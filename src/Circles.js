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

  // when data or dimensions change, update the circle attributes - color, size, and position
  useEffect(() => {
    let xScale = scaleLinear().domain([0, 1]).range([0, width])
    let yScale = scaleLinear().domain([0, 1]).range([0, height])

    select(svgRef.current)
      .selectAll('circle')
      .data(data)
      .attr('cx', (d) => xScale(d.x))
      .attr('cy', (d) => yScale(d.y))
      .attr('r', 5)
      .style('fill', 'black')
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
        <button>Refresh Data</button>
      </div>
    </div>
  )
}

export default Circles

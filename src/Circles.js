import { useRef } from 'react'
import './index.css'

let colors = ['#2176ae', '#57b8ff', '#b66d0d', '#fbb13c', '#fe6847']

function Circles({ width, height }) {
  // store a Ref to the SVG that will allow d3 to access the DOM element
  const svgRef = useRef()

  // this just attaches circles to the DOM - it doesn't actually set their size, color, or position
  return (
    <div>
      <svg ref={svgRef} width={width} height={height}></svg>
      <div>
        <button>Refresh Data</button>
      </div>
    </div>
  )
}

export default Circles

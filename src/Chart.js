import React from 'react'

const BarChart = ({ width, height, data }) => {
  const rectangles = data.map((d, i) => <rect key={i}></rect>)
  return (
    <svg width={width} height={height}>
      {rectangles}
    </svg>
  )
}

export default BarChart

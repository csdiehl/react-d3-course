import React, { useEffect, useState, useRef } from 'react'

const Chart = ({ width, height, data }) => {
  const svgRef = useRef()

  return <svg ref={svgRef} width={width} height={height}></svg>
}

export default Chart

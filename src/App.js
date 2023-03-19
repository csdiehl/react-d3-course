import './App.css'
import Circles from './Circles'
import data from './gapminder_data.json'
import { useState } from 'react'
import Slider from 'react-input-slider'
import { scaleOrdinal, schemeTableau10 } from 'd3'

const width = 960
const height = 500
let colors = ['#2176ae', '#57b8ff', '#b66d0d', '#fbb13c', '#fe6847']

function App() {
  const [state, setState] = useState({ x: 1957 })
  const filteredData = data.filter((d) => d.year === state.x)
  const continents = [...new Set(data.map((d) => d.continent))]

  const color = scaleOrdinal().domain(continents).range(schemeTableau10)

  return (
    <div className='App'>
      <h1>Gapminder Chart</h1>
      <Circles
        width={width}
        height={height}
        data={filteredData}
        colorScale={color}
      />
      <h2>{state.x}</h2>
      <Slider
        axis='x'
        xmin={1957}
        xmax={2007}
        xstep={5}
        x={state.x}
        onChange={({ x }) => setState((state) => ({ ...state, x }))}
      />
    </div>
  )
}

export default App

import "./App.css"
import Circles from "./Circles"
import data from "./gapminder_data.json"
import { useState } from "react"
import Slider from "react-input-slider"
import { scaleOrdinal, schemeTableau10 } from "d3"
import Legend from "./Legend"

const width = 960
const height = 500

function App() {
  const [year, setYear] = useState({ x: 1957 })
  const [selectedContinent, setSelectedContinent] = useState("all")
  const continents = [...new Set(data.map((d) => d.continent))]

  const color = scaleOrdinal().domain(continents).range(schemeTableau10)

  function handleLegendClick(continent) {
    setSelectedContinent((prevState) =>
      prevState === continent ? "all" : continent
    )
  }

  return (
    <div className="App">
      <h1 className="header">Gapminder Chart</h1>
      <div className="slider">
        <p>{year.x}</p>
        <Slider
          axis="x"
          xmin={1957}
          xmax={2007}
          xstep={5}
          x={year.x}
          onChange={({ x }) => setYear((state) => ({ ...state, x }))}
        />
      </div>
      <Legend
        setContinent={handleLegendClick}
        continent={selectedContinent}
        colorScale={color}
        labels={continents}
        className="legend"
      />
      <div className="chart">
        <Circles
          width={width}
          height={height}
          year={year.x}
          colorScale={color}
          selectedContinent={selectedContinent}
        />
      </div>
    </div>
  )
}

export default App

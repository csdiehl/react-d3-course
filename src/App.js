import "./App.css"
import Circles from "./Circles"
import data from "./gapminder_data.json"
import Slider from "react-input-slider"
import { scaleOrdinal, schemeTableau10 } from "d3"

const width = 960
const height = 500

function App() {
  const continents = [...new Set(data.map((d) => d.continent))]

  const color = scaleOrdinal().domain(continents).range(schemeTableau10)

  return (
    <div className="App">
      <h1 className="header">Gapminder Chart</h1>
      <div className="slider"></div>

      <div className="chart">
        <Circles year={1957} width={width} height={height} colorScale={color} />
      </div>
    </div>
  )
}

export default App

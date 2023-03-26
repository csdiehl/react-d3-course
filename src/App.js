import "./App.css"
import Circles from "./Circles"

const width = 960
const height = 500

function App() {
  return (
    <div className="App">
      <h1 className="header">Gapminder Chart</h1>
      <div className="slider"></div>
      <div className="chart">
        <Circles year={1957} width={width} height={height} />
      </div>
    </div>
  )
}

export default App

import Chart from './Chart'
import sunshine from './sunshine.json'

function App() {
  const data = sunshine
    .map((d) => {
      return { city: d.CITY, sunshine: d['JUL'] }
    })
    .sort((a, b) => a.sunshine - b.sunshine)
    .slice(0, 20)

  return (
    <div className='App'>
      <div className='container'>
        <div className='header'></div>

        <Chart data={data} width={700} height={500} />
      </div>
    </div>
  )
}

export default App

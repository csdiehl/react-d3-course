import Chart from './Chart'

const data = [40, 20, 57, 68, 90, 160, 150]

function App() {
  return (
    <div className='App'>
      <Chart data={data} width={700} height={300} />
    </div>
  )
}

export default App

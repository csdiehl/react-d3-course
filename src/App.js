import Chart from './Chart'

const data = [10, 50, 20]

function App() {
  return (
    <div className='App'>
      <Chart data={data} width={700} height={600} />
    </div>
  )
}

export default App

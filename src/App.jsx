import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ShipForm from './components/ShipForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Embarkation Tool</h1>
      <ShipForm />
      <p className="read-the-docs">
        &copy; 2024 Powering ITO's via Automation
      </p>
    </>
  )
}

export default App

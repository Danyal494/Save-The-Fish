import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Fish from './components/Fish'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex justify-center items-center h-screen bg-[#eb80b1]'>
    <Fish/>
    </div>
  )
}

export default App

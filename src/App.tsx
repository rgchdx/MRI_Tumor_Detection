import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TopBar from './components/TopBar'
import Hero from './components/Hero'
import BottomBar from './components/BottomBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <TopBar />
        <Hero />
        <BottomBar />
      </div>
    </>
  )
}

export default App

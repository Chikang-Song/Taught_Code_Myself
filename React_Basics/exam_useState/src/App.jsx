import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


  


function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  function clickHandler() {
    
    
    setUserLoggedIn(!userLoggedIn);
  }


  return (
    <>
      <p>User logged in: {userLoggedIn ? "Yes" : "No"}</p>
      <button onClick = {clickHandler}>Click me to toggle</button>
    </>  
  )
}

export default App

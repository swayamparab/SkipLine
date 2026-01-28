import './App.css'
import { useState } from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
import Landingpage from './components/Landingpage'

function App() {
  const [screen, setScreen] = useState("home");

  return (
    <>
      {screen === "home" && <Landingpage setScreen={setScreen} />}
      {screen === "login" && <Login setScreen={setScreen} />}
      {screen === "signup" && <Signup setScreen={setScreen} />}
    </>
  );
}

export default App

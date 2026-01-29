import { useState } from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
import Landingpage from './components/Landingpage'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [screen, setScreen] = useState("landingpage");

  return (
    <>
      {screen === "landingpage" && <Landingpage setScreen={setScreen} />}
      {screen === "login" && <Login setScreen={setScreen} />}
      {screen === "signup" && <Signup setScreen={setScreen} />}
      {screen === "dashboard" && <Dashboard setScreen={setScreen} />}
    </>
  );
}

export default App

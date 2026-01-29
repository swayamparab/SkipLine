import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import Login from './components/Login'
import Signup from './components/Signup'
import Landingpage from './components/Landingpage'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [screen, setScreen] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setScreen("dashboard");
      } else {
        setScreen("landingpage");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

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

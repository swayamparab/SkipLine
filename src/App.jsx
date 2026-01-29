import React, { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Landingpage from "./components/Landingpage";

function App() {
  const [screen, setScreen] = useState("login");

  return (
    <div>
      {screen === "login" && <Login setScreen={setScreen} />}
      {screen === "signup" && <Signup setScreen={setScreen} />}
      {screen === "home" && <h1>Welcome Home!</h1>}
    </div>
  );
}

export default App;

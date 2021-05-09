import { Alert } from './components/Alert/Alert';
import React, { useState } from 'react';
import Context from "./Context";
import { Routes } from './Routes';

function App() {
  const [user, setUser] = useState(null);
  const [recentRecipes, setRecentRecipes] = useState(null);
  const [alert, setAlert] = useState(null);

  const alertPopup = (header, text, type, timeout) => {
    setAlert({header, text, type});
    setTimeout(() => {
      setAlert(null);
    }, timeout);
  };

  const states = {
    user: {
      get: user,
      set: setUser,
    },
    recentRecipes: {
      get: recentRecipes,
      set: setRecentRecipes,
    },
    alertPopup: alertPopup
  };

  return (
    <div className="App">
      <Context.Provider value={states}>
        {alert && <Alert details={alert}/>}
        <Routes/>
      </Context.Provider>
    </div>
  );
}

export default App;

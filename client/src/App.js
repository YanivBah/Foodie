import { useState } from 'react';
import Routes from "./Routes";
import Context from "./Context";
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [recentRecipes, setRecentRecipes] = useState(null);

  const states = {
    user: {
      get: user,
      set: setUser,
    },
    recentRecipes: {
      get: recentRecipes,
      set: setRecentRecipes,
    },
  };

  return (
      <>
        <Context.Provider value={states}>
          <Routes/>
        </Context.Provider>
      </>
  );
}

export default App;

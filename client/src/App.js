import { useState } from 'react';
import Routes from "./Routes";
import Context from "./Context";
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  return (
      <>
        <Context.Provider value={{user, setUser}}>
          <Routes/>
        </Context.Provider>
      </>
  );
}

export default App;

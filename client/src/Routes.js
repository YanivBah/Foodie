import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { useContext } from 'react';
import Login from './pages/Login'
import Signup from './pages/Signup';
import Profile from "./pages/Profile";
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Context from "./Context";

const Routes = () => {
  const states = useContext(Context);
  return (
    <Router>
      <Navbar />

      <Switch>
        <Route path="/" exact children={<Home />} />

        <Route path="/login" exact>
          {!states.user.get ? <Login /> : <Redirect path="/" />}
        </Route>

        <Route path="/signup" exact>
          {!states.user.get ? <Signup /> : <Redirect path="/" />}
        </Route>
        <Route path="/profile/:username" exact children={<Profile />} />

        <Route path="/recipe/:recipeID" exact>
          <div>Recipe</div>
        </Route>

        <Route path="/profile/:username" exact>
          Profile
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;

import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { useContext } from 'react';
import Profile from "./pages/Profile";
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Context from "./Context";
import AddRecipe from './components/AddRecipe/AddRecipe';

const Routes = () => {
  const states = useContext(Context);

  return (
    <Router>
      <Navbar />

      <Switch>
        <Route path="/" exact children={<Home />} />

        <Route path="/login" exact>
          {!states.user.get ? <Login /> : <Redirect to="/" />}
        </Route>

        <Route path="/signup" exact>
          {!states.user.get ? <Signup /> : <Redirect to="/" />}
        </Route>

        <Route path="/add-recipe" exact>
          {states.user.get ? <AddRecipe /> : <Redirect to="/" />}
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

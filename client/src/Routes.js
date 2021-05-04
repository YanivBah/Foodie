import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup';
import Profile from "./pages/Profile";
import Navbar from './components/Navbar/Navbar';

const Routes = () => {
  return (
    <Router>
      <Navbar/>
      
      <div>
        <NavLink to="/">Homepage</NavLink>
        <br />
        <NavLink to="/login">Login</NavLink>
        <br />
        <NavLink to="/signup">Signup</NavLink>
        <br />
        <NavLink to="/profile/">Profile</NavLink>
      </div>
      <Switch>
        <Route path="/" exact children={<h2>Homepage</h2>} />
        <Route path="/login" exact children={<Login />} />
        <Route path="/signup" exact children={<Signup />} />
        <Route path="/profile/:username" exact children={<Profile />} />

        <Route path="/profile/:username" exact>
          Profile
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;

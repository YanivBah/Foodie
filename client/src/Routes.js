import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom'
import Login from './pages/Login'

const Routes = () => {
  return (
    <Router>
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
        <Route path="/" exact>
          Homepage
        </Route>

        <Route path="/login" exact>
          <Login />
        </Route>
        
        <Route path="/login" exact children={<Login />} />

        <Route path="/signup" exact>
          Signup
        </Route>

        <Route path="/profile/:username" exact>
          Profile
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;

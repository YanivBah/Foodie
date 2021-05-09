import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Homepage } from './pages/Homepage/Homepage'
import { Login } from './pages/Login/Login'
import { Signup } from './pages/Signup/Signup'
import { Recipe } from './pages/Recipe/Recipe'
import { Profile } from './pages/Profile/Profile'
import { Navbar } from './components/Navbar/Navbar'
import { AddRecipe } from './pages/AddRecipe/AddRecipe'

export const Routes = () => {
  return (
    <Router>
      <Navbar/>
      <Switch>

        {/* Homepage */}
        <Route path="/" exact>
          <Homepage/>
        </Route>

        {/* Login */}
        <Route path="/login" exact>
          <Login/>
        </Route>

        {/* Signup */}
        <Route path="/signup" exact>
          <Signup/>
        </Route>

        {/* Recipe */}
        <Route path="/recipe/:recipeID" exact>
          <Recipe/>
        </Route>

        {/* Recipe */}
        <Route path="/add-recipe/" exact>
          <AddRecipe/>
        </Route>

        {/* Profile */}
        <Route path="/profile/:username" exact>
          <Profile/>
        </Route>

      </Switch>
    </Router>
  )
}

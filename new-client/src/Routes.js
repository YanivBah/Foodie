import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Homepage } from './pages/Homepage/Homepage'
import { Login } from './pages/Login/Login'
import { Signup } from './pages/Signup/Signup'
import { Recipe } from './pages/Recipe/Recipe'
import { Profile } from './pages/Profile/Profile'
import { Navbar } from './components/Navbar/Navbar'
import { AddRecipe } from './pages/AddRecipe/AddRecipe'
import { AllRecipes } from './pages/AllRecipes/AllRecipes'
import { Search } from './pages/Search/Search'
import { Dashboard } from './pages/Dashboard/Dashboard'
import { Footer } from './components/Footer/Footer'

export const Routes = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        {/* Homepage */}
        <Route path="/" exact>
          <Homepage />
        </Route>

        {/* Login */}
        <Route path="/login" exact>
          <Login />
        </Route>

        {/* Signup */}
        <Route path="/signup" exact>
          <Signup />
        </Route>

        {/* Recipe */}
        <Route path="/recipe/:recipeID" exact>
          <Recipe />
        </Route>

        {/* All Recipes */}
        <Route path="/recipes" exact>
          <AllRecipes />
        </Route>

        {/* Add New Recipe */}
        <Route path="/add-recipe/" exact>
          <AddRecipe />
        </Route>

        {/* User Profile */}
        <Route path="/profile/:username" exact>
          <Profile />
        </Route>

        {/* Search */}
        <Route path="/search" exact>
          <Search />
        </Route>

        {/* Dashboard */}
        <Route path="/dashboard" exact>
          <Dashboard />
        </Route>


      </Switch>
      <Footer/>
    </Router>
  );
}

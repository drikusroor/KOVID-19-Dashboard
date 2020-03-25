import React from 'react'
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom'
import ChartPage from './pages/chart-page'
import About from './pages/about'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard/:type/:country">
          <ChartPage />
        </Route>
        <Route path="/dashboard/:type">
          <ChartPage />
        </Route>
        <Route path="/dashboard">
          <ChartPage />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <Redirect to="/dashboard" />
        </Route>
      </Switch>
    </Router>
  )
}

export default App

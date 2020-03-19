import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import ChartPage from './pages/chart-page'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/charts/:type/:country">
          <ChartPage />
        </Route>
        <Route path="/charts/:type">
          <ChartPage />
        </Route>
        <Route path="/charts">
          <ChartPage />
        </Route>
        <Route path="/">
          <ChartPage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App

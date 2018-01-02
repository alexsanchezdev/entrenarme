import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import NotFound from './components/NotFound'

const App = () => (
  <div style={styles.container}>
    <Switch>
      <Route exact path='/' render={() => <Redirect to='/search'/>}/>
      <Route path='/search' render={() => <p>Search component</p>}/>
      <Route path='/new' render={() => <p>New component</p>}/>
      <Route path='/question/:id' render={() => <p>Question component</p>}/>
      <Route path='/404' component={NotFound}/>
      <Redirect to='/404'/>
    </Switch>
  </div>
)

const styles = {
  container: {
    height: '100%'
  }
}

export default App

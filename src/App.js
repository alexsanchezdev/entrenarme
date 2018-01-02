import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import NotFound from './components/NotFound'
import Search from './components/Search'
import New from './components/New'
import styled from 'styled-components'


const App = () => (
  <FullHeightWrapper>
    <Switch>
      <Route exact path='/' render={() => <Redirect to='/search'/>}/>
      <Route path='/search' component={Search}/>
      <Route path='/new' component={New}/>
      <Route path='/question/:id' render={() => <p>Question component</p>}/>
      <Route path='/404' component={NotFound}/>
      <Redirect to='/404'/>
    </Switch>
  </FullHeightWrapper>
)

const FullHeightWrapper = styled.div `
  height: 100%
`;

export default App

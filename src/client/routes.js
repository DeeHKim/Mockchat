import React from 'react'
import {Router, Route, IndexRoute, IndexRedirect} from 'react-router'

import App from './components/App'
import WelcomePage from './components/WelcomePage'
import EventPage from './components/EventPage'
import ChatPage from './components/ChatPage'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={WelcomePage}/>
    <Route path="/events" component={EventPage}/>
    <Route path="/chat" component={ChatPage}/>
  </Route>
)

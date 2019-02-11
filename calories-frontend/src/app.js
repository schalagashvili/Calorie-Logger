import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import history from './history'
import { Login, SignUp, Logs, Users } from './pages'
import { AuthProvider } from './AuthContext'
import ProtectedRoute from './ProtectedRoute'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'

library.add(faIgloo)

const App = () => (
  <div>
    <Router history={history}>
      <AuthProvider>
        <Switch>
          <Route path='/signUp' component={SignUp} />
          <ProtectedRoute path='/logs/:userId?' component={Logs} />
          <ProtectedRoute path='/users' component={Users} />
          <Route path='/login' component={Login} />
          <Redirect from='/*' exact to='/login' />
        </Switch>
      </AuthProvider>
    </Router>
  </div>
)

export default App

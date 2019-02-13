import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthConsumer } from './AuthContext'

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ isAuth, role, token }) => (
      <Route
        render={props =>
          isAuth ? <Component role={role} token={token} {...props} /> : <Redirect to="/" />
        }
        {...rest}
      />
    )}
  </AuthConsumer>
)

export default ProtectedRoute

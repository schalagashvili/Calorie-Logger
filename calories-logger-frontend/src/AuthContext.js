import React from 'react'
import history from './history'

const AuthContext = React.createContext()

class AuthProvider extends React.Component {
  state = { isAuth: false, role: null, token: null, email: null }

  constructor() {
    super()
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    const email = localStorage.getItem('email')
    this.state = {
      token,
      role,
      email,
      isAuth: token != null ? true : false
    }
  }

  login(role, token, email) {
    localStorage.setItem('token', token)
    localStorage.setItem('role', role)
    localStorage.setItem('email', email)
    this.setState({ role, token, isAuth: true, email }, () => {
      if (role === 'regular') {
        history.push('/logs')
      } else if (role === 'admin' || role === 'manager') {
        history.push('/users')
      }
    })
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('email')
    this.setState({ isAuth: false, role: null, token: null, email: null })
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          role: this.state.role,
          token: this.state.token,
          email: this.state.email,
          login: this.login,
          logout: this.logout
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }

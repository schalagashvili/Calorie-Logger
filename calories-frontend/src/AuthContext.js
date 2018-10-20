import React from 'react'
import history from './history'

const AuthContext = React.createContext()

class AuthProvider extends React.Component {
  state = { isAuth: false, role: null, token: null }

  constructor() {
    super()
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    this.state = {
      token,
      role,
      isAuth: token != null ? true : false
    }
  }

  login(role, token) {
    localStorage.setItem('token', token)
    localStorage.setItem('role', role)
    this.setState({ role, token, isAuth: true }, () => {
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
    this.setState({ isAuth: false, role: null, token: null })
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          role: this.state.role,
          token: this.state.token,
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

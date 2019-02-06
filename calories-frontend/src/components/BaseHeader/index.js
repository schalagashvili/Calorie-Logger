import React from 'react'
import logo from '../../assets/logos/brand-logo.png'
import { Header, Button } from '../../pages/Logs/styles'
import history from '../../history'

export default class BaseHeader extends React.Component {
  onLogout() {
    this.props.onLogout()
  }

  render() {
    return (
      <Header>
        {/* <div onClick={() => {
          this.props.role == 'admin' || this.props.role == 'manager' ? history.push('/users') : history.push('logs')
        }}>
          <img src={logo} alt="logo" style={{ width: 180, cursor: 'pointer' }} />
        </div>{' '} */}
        <Button onClick={() => this.onLogout()} logout color='rgba(0, 0, 0, 0.5)'>
          Logout
        </Button>
      </Header>
    )
  }
}

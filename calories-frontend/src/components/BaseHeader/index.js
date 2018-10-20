import React from 'react'
import logo from '../../assets/logos/brand-logo.png'
import { Header, Button } from '../../pages/Logs/styles'

export default class BaseHeader extends React.Component {
  onLogout() {
    this.props.onLogout()
  }

  render() {
    return (
      <Header>
        <div>
          <img src={logo} alt="logo" style={{ width: 180, cursor: 'pointer' }} />
        </div>{' '}
        <Button onClick={() => this.onLogout()} logout>
          Logout
        </Button>
      </Header>
    )
  }
}

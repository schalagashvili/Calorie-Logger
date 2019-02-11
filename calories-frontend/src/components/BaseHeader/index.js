import React from 'react'
import { Header } from '../../pages/Logs/styles'
import history from '../../history'
import { Button } from '../../styles/mixins'

export default class BaseHeader extends React.Component {
  onLogout() {
    this.props.onLogout()
  }

  render() {
    const { role } = this.props

    return (
      <Header>
        <div
          onClick={() => {
            role === 'admin' || role === 'manager' ? history.push('/users') : history.push('logs')
          }}
        >
          Home
        </div>{' '}
        <Button onClick={() => this.onLogout()} logout color='rgba(0, 0, 0, 0.5)'>
          Logout
        </Button>
      </Header>
    )
  }
}

import React, { Component } from 'react'
import { InputField } from './styles'

class TextField extends Component {
  render() {
    const { placeholder, label, type } = this.props

    return (
      <form noValidate autoComplete="off">
        <InputField
          id="outlined-with-placeholder"
          label={label}
          placeholder={placeholder}
          margin="normal"
          variant="outlined"
          type={type}
        />
      </form>
    )
  }
}

export default TextField

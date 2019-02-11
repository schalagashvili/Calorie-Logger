import React, { Component } from 'react'
import { Wrapper } from './styles'

class TableHeader extends Component {
  render() {

    return (
      <Wrapper>
        <div>Meal</div>
        <div>Calories</div>
        <div>Date</div>
        <div>Time</div>
      </Wrapper>
    )
  }
}

export default TableHeader

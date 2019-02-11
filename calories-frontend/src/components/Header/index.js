import React, { Component } from 'react'
import { Button } from '../../styles/mixins'
import {Wrapper, ButtonsWrapper, CalorieInfo} from './styles'

class Header extends Component {
  render() {
    const {
      totalCalories,
      expectedCalories,
      editOpenHandler,
      toggleDrawer,
    } = this.props

    return (
      <Wrapper>
        <ButtonsWrapper>
          <Button
            color='#5FBA7D'
            onClick={() => {
              editOpenHandler(true)
              toggleDrawer('addBottom', true)
            }}
          >
            Add
          </Button>
          <Button
            color='#2196f3'
            onClick={() => {
              toggleDrawer('filterBottom', true)
            }}
          >
            Filter
          </Button>
          <Button
            color='rgb(225, 0, 80)'
            onClick={() => {
              toggleDrawer('settingsBottom', true)
            }}
          >
            Settings
          </Button>
        </ButtonsWrapper>
        <CalorieInfo>
          <div style={{ fontSize: 13, color: 'grey' }}>
            Expected Calories: {expectedCalories}
          </div>
          <div style={{ fontSize: 13, color: 'grey', borderLeft: '1px solid grey' }}>
            Total: {totalCalories}
          </div>
        </CalorieInfo>
      </Wrapper>
    )
  }
}

export default Header

import React, { Component } from 'react'
import { Button } from '../../styles/mixins'
import { Wrapper, ButtonsWrapper, CalorieInfo } from './styles'
import moment from 'moment-timezone'
import colors from '../../styles/colors'

class Header extends Component {
  render() {
    const { totalCalories, expectedCalories, editOpenHandler, toggleDrawer, fromTime, toTime, fromDate, toDate } = this.props

    return (
      <Wrapper>
        <ButtonsWrapper>
          <Button
            color={colors.green}
            onClick={() => {
              editOpenHandler(true)
              toggleDrawer('addBottom', true)
            }}
          >
            Add
          </Button>
          <Button
            color={colors.blue}
            onClick={() => {
              toggleDrawer('filterBottom', true)
            }}
          >
            Filter
          </Button>
          <Button
            color={colors.pink}
            onClick={() => {
              toggleDrawer('settingsBottom', true)
            }}
          >
            Settings
          </Button>
        </ButtonsWrapper>
        <CalorieInfo>
          <div>
            From time {moment(fromDate).format('DD MMM YYYY')} {fromTime} to date {moment(toDate).format('DD MMM YYYY')}
          </div>
          <div>
            from time {fromTime} to time {toTime}
          </div>
          <div style={{ fontSize: 13, color: 'grey' }}>Expected Calories: {expectedCalories}</div>
          <div style={{ fontSize: 13, color: 'grey', borderLeft: '1px solid grey' }}>Total: {totalCalories}</div>
        </CalorieInfo>
      </Wrapper>
    )
  }
}

export default Header

import React, { Component } from 'react'
import Drawer from '@material-ui/core/Drawer'
import { CalorieSettings, ExpectedCalories, TotalCalories, TotalWrapper } from './styles'
import { Input, Button } from '../../styles/mixins'
import colors from '../../styles/colors'

class Settings extends Component {
  render() {
    const {
      onExpectedCaloriesChange,
      expectedCalories,
      handleChange,
      totalCalories,
      settingsBottom,
      dietBroken,
      updateExpectedCalories
    } = this.props

    return (
      <Drawer anchor='bottom' open={settingsBottom}>
        <CalorieSettings>
          <ExpectedCalories>Expected Calories:</ExpectedCalories>
          <Input
            type='number'
            onChange={e => onExpectedCaloriesChange(e.target.value)}
            value={expectedCalories}
            placeholder='Expected Calories Today'
          />
          <Button
            onClick={() => {
              updateExpectedCalories()
              handleChange('settingsBottom', false)
            }}
            color={colors.green}
          >
            Update
          </Button>
          <Button onClick={() => handleChange('settingsBottom', false)} color={colors.grey}>
            Cancel
          </Button>
          <TotalWrapper>
            Total calories : <TotalCalories color={dietBroken ? colors.red : colors.silver }> {totalCalories}</TotalCalories>
          </TotalWrapper>
        </CalorieSettings>
      </Drawer>
    )
  }
}

export default Settings

import React, { Component } from 'react'
import Drawer from '@material-ui/core/Drawer'
import { CalorieSettings, ExpectedCalories, TotalCalories, TotalWrapper } from './styles'
import { Input, Button } from '../../styles/mixins'

class Settings extends Component {
  render() {
    const {
      onExpectedCaloriesChange,
      expectedCalories,
      toggleDrawer,
      totalCalories,
      settingsBottom,
      dietBroken,
      updateExpectedCalories
    } = this.props

    return (
      <Drawer anchor='bottom' open={settingsBottom}>
        <CalorieSettings>
          <ExpectedCalories>
            Expected Calories:
          </ExpectedCalories>
          <Input
            type='number'
            onChange={e => onExpectedCaloriesChange(e.target.value)}
            value={expectedCalories}
            placeholder='Expected Calories Today'
          />
          <Button
            onClick={() => {
              updateExpectedCalories()
              toggleDrawer('settingsBottom', false)
            }}
            color='#5FBA7D'
          >
            Update
          </Button>
          <Button onClick={() => toggleDrawer('settingsBottom', false)} color='grey'>
            Cancel
          </Button>
          <TotalWrapper>
            Total calories :{' '}
            <TotalCalories color={dietBroken ? 'red' : 'rgb(100, 196, 123)'}>
              {' '}
              {totalCalories}
            </TotalCalories>
          </TotalWrapper>
        </CalorieSettings>
      </Drawer>
    )
  }
}

export default Settings

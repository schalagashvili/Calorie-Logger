import React, { Component } from 'react'
import Drawer from '@material-ui/core/Drawer'
import { CalorieSettings } from './styles'
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
          <div
            style={{
              display: 'flex',
              lineHeight: 1.5,
              marginTop: '20px',
              marginRight: '10px'
            }}
          >
            Expected Calories:
          </div>
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

          <div style={{ display: 'flex', marginTop: 15, fontSize: 16 }}>
            Total calories :{' '}
            <div
              style={{
                color: dietBroken ? 'red' : 'rgb(100, 196, 123)',
                fontWeight: 'bold',
                marginLeft: 5,
                fontSize: 16
              }}
            >
              {' '}
              {totalCalories}
            </div>
          </div>
        </CalorieSettings>
      </Drawer>
    )
  }
}

export default Settings

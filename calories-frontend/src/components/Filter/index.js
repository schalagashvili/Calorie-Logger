import React, { Component } from 'react'
import Drawer from '@material-ui/core/Drawer'
import { FilterWrapper } from './styles'
import { Button } from '../../styles/mixins'
import { DatePicker, TimePicker } from '../../components'

class Filter extends Component {
  render() {
    const {
      onSearch,
      toggleDrawer,
      filterBottom,
      fromDate,
      toDate,
      onFromDateChange,
      onToDateChange,
      onFromTimeChange,
      onToTimeChange,
      fromTime,
      toTime
    } = this.props

    return (
      <Drawer anchor='bottom' open={filterBottom}>
        <div style={{ margin: 'auto', marginTop: '20px' }}>Filter</div>
        <FilterWrapper>
          <div style={{ display: 'flex', margin: 15, flexWrap: 'wrap', flexDirection: 'column' }}>
            <DatePicker
              date={fromDate}
              onChange={onFromDateChange}
              headerText='Date From'
              marginRight
            />
            <DatePicker date={toDate} onChange={onToDateChange} headerText='Date To' />
          </div>
          <div style={{ display: 'flex', margin: 15, flexWrap: 'wrap', flexDirection: 'column' }}>
            <TimePicker
              time={fromTime}
              onChange={onFromTimeChange}
              headerText='Time From'
              marginRight
            />
            <TimePicker time={toTime} onChange={onToTimeChange} headerText='Time To' />
          </div>
          <Button
            onClick={() => {
              onSearch()
              toggleDrawer('filterBottom', false)
            }}
            color='rgb(225, 0, 80)'
          >
            Search
          </Button>
          <Button onClick={() => toggleDrawer('filterBottom', false)} color='grey'>
            Cancel
          </Button>
        </FilterWrapper>
      </Drawer>
    )
  }
}

export default Filter

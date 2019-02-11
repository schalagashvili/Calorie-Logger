import React, { Component } from 'react'
import Drawer from '@material-ui/core/Drawer'
import { FilterWrapper } from './styles'
import { Button, PickerWrapper } from '../../styles/mixins'
import { DatePicker, TimePicker, Title } from '../../components'

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
        <Title>Filter</Title>
        <FilterWrapper>
          <PickerWrapper>
            <DatePicker
              date={fromDate}
              onChange={onFromDateChange}
              headerText='Date From'
              marginRight
            />
            <DatePicker date={toDate} onChange={onToDateChange} headerText='Date To' />
          </PickerWrapper>
          <PickerWrapper>
            <TimePicker
              time={fromTime}
              onChange={onFromTimeChange}
              headerText='Time From'
              marginRight
            />
            <TimePicker time={toTime} onChange={onToTimeChange} headerText='Time To' />
          </PickerWrapper>
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

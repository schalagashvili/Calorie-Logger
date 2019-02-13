import React, { Component } from 'react'
import Drawer from '@material-ui/core/Drawer'
import { FilterWrapper, PickerWrapper, Title } from './styles'
import { Button  } from '../../styles/mixins'
import { DatePicker, TimePicker  } from '../../components'
import colors from '../../styles/colors'

class Filter extends Component {
  render() {
    const {
      onSearch,
      filterBottom,
      fromDate,
      toDate,
      handleChange,
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
              onChange={(e) => handleChange('fromDate', e.target.value)}
              headerText='Date From'
              marginRight
            />
            <DatePicker date={toDate} onChange={(e) => handleChange('toDate', e.target.value)} headerText='Date To' />
          </PickerWrapper>
          <PickerWrapper>
            <TimePicker
              time={fromTime}
              onChange={(e) => handleChange('fromTime', e.target.value)}
              headerText='Time From'
              marginRight
            />
            <TimePicker time={toTime} onChange={(e) => handleChange('toTime', e.target.value)} headerText='Time To' />
          </PickerWrapper>
          <Button
            onClick={() => {
              onSearch()
              handleChange('filterBottom', false)
            }}
            color={colors.pink}
          >
            Search
          </Button>
          <Button onClick={() => handleChange('filterBottom', false)} color={colors.grey}>
            Cancel
          </Button>
        </FilterWrapper>
      </Drawer>
    )
  }
}

export default Filter

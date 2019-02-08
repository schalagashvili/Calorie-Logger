import React, { Component } from 'react'
import { Button, Input } from '../../styles/mixins'
import Drawer from '@material-ui/core/Drawer'
import { SaveErrorText } from '../../pages/SignUp/styles'
import { DatePicker, TimePicker } from '../../components'
import { Add, Container, InnerWrapper, RecordsHeader } from './styles'

class AddRecord extends Component {
  render() {
    const {
      addBottom,
      isAdd,
      addTime,
      addDate,
      onAddDateChange,
      onAddTimeChange,
      addTitle,
      onAddTitleChange,
      onAddCaloriesChange,
      saveError,
      addCalories,
      saveErrorText,
      onSave,
      toggleDrawer,
      isEditMealShowing
    } = this.props

    return (
      <Drawer anchor='bottom' open={addBottom}>
        <Add id='edit-meal' isEditMealShowing={isEditMealShowing}>
          <InnerWrapper>
            <Container>
              <RecordsHeader>{isAdd ? 'Add' : 'Edit'} Meal</RecordsHeader>
              <DatePicker date={addDate} onChange={onAddDateChange} />
              <TimePicker time={addTime} onChange={onAddTimeChange} />
              <Input value={addTitle} onChange={e => onAddTitleChange(e)} placeholder='Title' />
              <Input
                min={0}
                value={addCalories || ''}
                onChange={e => onAddCaloriesChange(e)}
                type='number'
                placeholder='Calories'
              />
              <div style={{ display: 'flex' }}>
                {saveError === 1 ? <SaveErrorText>{saveErrorText}</SaveErrorText> : null}
              </div>
              <div
                style={{
                  marginLeft: 'auto',
                  display: 'flex',
                  alignItems: 'baseline',
                  width: 178
                }}
              >
                <Button
                  onClick={() => {
                    onSave()
                  }}
                  color='#5FBA7D'
                >
                  Save
                </Button>
                <Button onClick={() => toggleDrawer('addBottom', false)} color='grey'>
                  Cancel
                </Button>
              </div>
            </Container>
          </InnerWrapper>
        </Add>
      </Drawer>
    )
  }
}

export default AddRecord

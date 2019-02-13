import React from 'react'
import TextField from '@material-ui/core/TextField'
import { InputHeader, Wrapper } from '../TimePicker/styles'
import style from './styles'


function DatePicker(props) {
  const { headerText, onChange } = props
  return (
    <Wrapper>
      <InputHeader>{headerText}</InputHeader>
      <TextField
        id='date'
        onChange={e => onChange(e)}
        type='date'
        value={props.date}
        InputLabelProps={{
          shrink: true
        }}
        style={style}
      />
    </Wrapper>
  )
}

export default DatePicker

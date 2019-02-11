import React from 'react'
import TextField from '@material-ui/core/TextField'
import { InputHeader, Wrapper } from '../TimePicker/styles'

const style = {
  borderRadius: 4,
  height: 45,
  flex: 1,
  maxWidth: 600,
  width: 265
}

function DatePicker(props) {
  const { classes, headerText, onChange } = props
  return (
    <Wrapper>
      <InputHeader>{headerText}</InputHeader>
      <TextField
        id='date'
        onChange={e => onChange(e)}
        type='date'
        value={props.date}
        // defaultValue={props.date || new Date().toISOString().substr(0, 10)}
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
        style={style}
      />
    </Wrapper>
  )
}


export default DatePicker

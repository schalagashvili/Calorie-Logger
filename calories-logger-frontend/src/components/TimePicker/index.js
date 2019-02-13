import React from 'react'
import TextField from '@material-ui/core/TextField'
import './styles.css'
import { InputHeader, Wrapper, style } from './styles'


function TimePicker(props) {
  const { classes, headerText, marginRight, marginLeft, onChange } = props
  return (
    <Wrapper marginRight={marginRight} marginLeft={marginLeft}>
      <InputHeader>{headerText}</InputHeader>
      <TextField
        id='time'
        type='time'
        value={props.time}
        onChange={e => onChange(e)}
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
        inputProps={{
          step: 60
        }}
        style={style}
      />
    </Wrapper>
  )
}

export default TimePicker

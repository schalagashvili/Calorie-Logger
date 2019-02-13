import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import './styles.css'
import { InputHeader, Wrapper } from './styles'

const style = {
  borderRadius: 4,
  height: 45,
  flex: 1,
  maxWidth: 600,
  width: 265
}

function TimePickers(props) {
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

export default withStyles(styles)(TimePickers)

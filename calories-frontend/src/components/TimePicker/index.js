import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import './styles.css'
import { InputHeader, Wrapper } from './styles'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    border: 'none'
  },
  textField: {
    border: 'none'
  }
})

const style = {
  // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  borderRadius: 4,
  height: 45,
  flex: 1,
  padding: '10px 20px',
  boxShadow: '0 1px 5px rgba(0, 0, 0, 0.2)',
  maxWidth: 600,
  width: 265
}

function TimePickers(props) {
  const { classes, headerText, marginRight, marginLeft } = props

  return (
    <Wrapper marginRight={marginRight} marginLeft={marginLeft}>
      <InputHeader>{headerText}</InputHeader>
      <TextField
        id="time"
        type="time"
        defaultValue="07:30"
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
        inputProps={{
          step: 300
        }}
        style={style}
      />
    </Wrapper>
  )
}

TimePickers.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TimePickers)

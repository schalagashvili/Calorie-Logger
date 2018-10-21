import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { InputHeader, Wrapper } from '../TimePicker/styles'

const styles = theme => ({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
  },
  label: {
    textTransform: 'capitalize'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
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
  maxWidth: 600,
  width: 265,
  boxShadow: '0 1px 5px rgba(0, 0, 0, 0.2)'
}

function DatePickers(props) {
  const { classes, headerText, onChange } = props

  return (
    <Wrapper>
      <InputHeader>{headerText}</InputHeader>
      <TextField
        id="date"
        onChange={(e) => onChange(e)}
        type="date"
        value={props.date || new Date().toISOString().substr(0, 10)} 
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

DatePickers.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(DatePickers)

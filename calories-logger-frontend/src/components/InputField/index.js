import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import purple from '@material-ui/core/colors/purple'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing.unit
  },
  cssLabel: {
    '&$cssFocused': {
      color: purple[500]
    }
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: purple[500]
    }
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: purple[500]
    }
  },
  notchedOutline: {},
  bootstrapRoot: {
    'label + &': {
      marginTop: theme.spacing.unit * 3
    }
  },
  bootstrapInput: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  },
  bootstrapFormLabel: {
    fontSize: 18
  }
})

function CustomizedInputs(props) {
  const { classes, placeholder } = props

  return (
    <div className={classes.root}>
      <FormControl className={classes.margin}>
        <InputLabel
          htmlFor='custom-css-standard-input'
          classes={{
            root: classes.cssLabel,
            focused: classes.cssFocused
          }}
        >
          {placeholder}
        </InputLabel>
        <Input
          min={0}
          value={props.value}
          onChange={e => props.onChange(e)}
          id='custom-css-standard-input'
          classes={{
            underline: classes.cssUnderline
          }}
        />
      </FormControl>
    </div>
  )
}

export default withStyles(styles)(CustomizedInputs)

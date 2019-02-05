import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import FilterList from '@material-ui/icons/FilterList';
import AddCircle from '@material-ui/icons/AddCircle';
import Settings from '@material-ui/icons/Settings';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
});

function IconLabelButtons(props) {
    const { classes } = props;
    return (
        <div>
            <Button variant="contained" style={{ backgroundColor: '#2196F3', color: 'white' }} className={classes.button}>
                Add
        <AddCircle className={classes.rightIcon} />
            </Button>
            <Button variant="contained" color="secondary" className={classes.button}>
                Filter
        <FilterList className={classes.rightIcon} />
            </Button>
            <Button variant="contained" color="default" className={classes.button}>
                Settings
        <Settings className={classes.rightIcon} />
            </Button>
            {/* <Button variant="contained" color="secondary" className={classes.button}>
                Delete
        <DeleteIcon className={classes.rightIcon} />
            </Button> */}
        </div>
    );
}

IconLabelButtons.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconLabelButtons);
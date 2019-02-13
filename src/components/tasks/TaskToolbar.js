import React from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { lighten } from '@material-ui/core/styles/colorManipulator'

import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

export default withStyles(toolbarStyles)(({classes, numSelected, handleRemove}) =>
  numSelected ? <Toolbar
    className={classNames(classes.root, {
      [classes.highlight]: numSelected > 0,
    })}
  >
    <div className={classes.title}>
      <Typography color="inherit" variant="subtitle1">
        {numSelected} selected
      </Typography>
    </div>
    <div className={classes.spacer} />
    <div className={classes.actions}>
      <Tooltip title="Delete">
        <IconButton aria-label="Delete" onClick={() => handleRemove()}>
          <DeleteIcon/>
        </IconButton>
      </Tooltip>
    </div>
  </Toolbar> : ''
)
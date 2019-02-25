import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {lighten} from '@material-ui/core/styles/colorManipulator'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Button from '@material-ui/core/Button'

const toolbarStyles = theme => ({
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

export default withStyles(toolbarStyles)((
  {
    classes,
    numSelected,
    handleRemove,
    login,
    handleLogout
  }) =>
  numSelected ?
    <AppBar position="static">
      <Toolbar className={classes.highlight}>
        <div className={classes.title}>
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        </div>
        <div className={classes.spacer}/>
        <div className={classes.actions}>
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" onClick={() => handleRemove()}>
              <DeleteIcon/>
            </IconButton>
          </Tooltip>
        </div>
      </Toolbar>
    </AppBar>:
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <div className={classes.title}>
          <Typography variant="h6" color="inherit">
            Todos
          </Typography>
        </div>
        <div className={classes.spacer}/>
        <div className={classes.title}>
          <Typography variant="h6" color="inherit">
            {login}
          </Typography>
        </div>
        <div className={classes.actions}>
          <Tooltip title="Logout">
            <Button variant="contained" onClick={() => handleLogout()}>
              Logout
            </Button>
          </Tooltip>
        </div>
      </Toolbar>
    </AppBar>
)
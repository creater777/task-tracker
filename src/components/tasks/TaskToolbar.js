import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {lighten} from '@material-ui/core/styles/colorManipulator'

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import FilterListIcon from '@material-ui/icons/FilterList'
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
    margin:'1rem'
  },
});

export default withStyles(toolbarStyles)((
  {
    classes,
    numSelected,
    handleRemove,
    login,
    tabIndex,
    handleLogout,
    handleTabChange
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
    <AppBar position="static">
      <Toolbar>
        <div className={classes.title}>
          <Typography variant="h6" color="inherit">
            Todos
          </Typography>
        </div>
        <Tabs value={tabIndex} variant="fullWidth" onChange={handleTabChange}>
          <Tab label="Table" />
          <Tab label="Scram" />
        </Tabs>
        <div className={classes.spacer}/>
        <div className={classes.actions}>
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div className={classes.title}>
          <Typography variant="h6" color="inherit">
            {login}
          </Typography>
        </div>
        <Tooltip title="Logout">
          <Button variant="contained" onClick={() => handleLogout()}>
            Logout
          </Button>
        </Tooltip>
      </Toolbar>
    </AppBar>
)
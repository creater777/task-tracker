import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import TaskList from '../containers/tasks/TaskList'
import {withStyles} from "@material-ui/core/styles/index";

const styles = theme => ({
  root: {
    margin: '5pt 0pt',
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: 30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
});

export default withStyles(styles)(({classes}) =>
  <div className="App">
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Todos
        </Typography>
      </Toolbar>
    </AppBar>
    <Paper>
      <TaskList classes={classes}/>
    </Paper>
  </div>
)

import React from 'react';
import Paper from '@material-ui/core/Paper';

import TaskList from '../containers/tasks/TaskList'
import {withStyles} from "@material-ui/core/styles/index";

const styles = theme => ({
  root: {
    margin: '0',
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
    <Paper>
      <TaskList classes={classes}/>
    </Paper>
  </div>
)

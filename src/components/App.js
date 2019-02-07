import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import TaskList from '../containers/tasks/TaskList'

export default () =>
  <div className="App">
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Todos
        </Typography>
      </Toolbar>
    </AppBar>
    <Paper>
      <TaskList/>
    </Paper>
  </div>

import React from 'react';
import { connect } from 'react-redux'
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import TaskListItem from './TaskListItem'


import {tasksInit} from '../../actions/tasks'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
});

class TaskList extends React.Component {
  componentWillMount = () => {
    this.props.tasksInit();
  }

  render() {
    const { classes, tasks } = this.props;
    return (
      <List className={classes.root}>
        {tasks.map((value, index) =>
          <TaskListItem key={value.id} index={index} />
        )}
      </List>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    tasks: state.tasks.items
  }
}

export default connect(
  mapStateToProps,
  {tasksInit}
  )(withStyles(styles)(TaskList)
);
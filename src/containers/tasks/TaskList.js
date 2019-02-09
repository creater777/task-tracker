import React, {Component} from 'react';
import { connect } from 'react-redux'
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
// import TablePagination from '@material-ui/core/TablePagination';
// import TableSortLabel from '@material-ui/core/TableSortLabel';


import TaskRow from './TaskRow'
import TaskHeader from './TaskHeader'


import {tasksInit} from '../../actions/tasks'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  table: {

  }
});

class TaskList extends Component {
  componentWillMount = () => {
    this.props.tasksInit();
  }

  render() {
    const { classes, orderBy, tasks } = this.props;
    return (
      <Table className={classes.table} aria-labelledby="tableTitle">
        <TaskHeader orderBy={orderBy}/>
        <TableBody className={classes.root}>
          {/*tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)*/}
          {tasks.map((value, index) =>
            <TaskRow key={value.id} index={index}/>
          )}
        </TableBody>
      </Table>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    tasks: state.tasks.items,
    orderBy: state.tasks.orderBy
  }
}

export default connect(
  mapStateToProps,
  {tasksInit}
  )(withStyles(styles)(TaskList)
);
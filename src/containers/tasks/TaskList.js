import React, {Component} from 'react'
import {connect} from 'react-redux'
import Beforeunload from 'react-beforeunload'
import {withStyles} from "@material-ui/core/styles/index";

// import PropTypes from 'prop-types'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TablePagination from '@material-ui/core/TablePagination'

import TaskRow from './TaskRow'
import TaskHeader from './TaskHeader'
import TaskDialog from './TaskDialog'
import TaskToolbar from './TaskToolbar'

import {
  tasksInit,
  tasksStore,
  taskSetPagination,
  taskAdd,
  taskEdit,
  taskSetDialog
} from '../../actions/tasks'

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

class TaskList extends Component {
  componentWillMount() {
    this.props.tasksInit()
  }

  componentWillUnmount() {
    this.props.tasksStore()
  }

  handleChangePage(page) {
    const {rowsPerPage, rowsPerPageOptions} = this.props.pagination
    this.props.taskSetPagination({rowsPerPage, page, rowsPerPageOptions})
  }

  handleChangeRowsPerPage(rowsPerPage) {
    const {page, rowsPerPageOptions} = this.props.pagination
    this.props.taskSetPagination({rowsPerPage, page, rowsPerPageOptions})
  }

  handleAdd() {
    this.props.taskSetDialog({visible: true})
  }

  handleEdit(value) {
    this.props.taskSetDialog({
      data: this.props.tasks.find(item => item.id === value.id),
      visible: true
    })
  }

  onDialogSubscribe(data) {
    if (data.id) {
      this.props.taskEdit({
        ...data
      })
      return;
    }
    this.props.taskAdd({
      title: data.title,
      description: data.description
    })
  }

  render() {
    const
      {classes, tasks, pagination, orderBy} = this.props,
      {page, rowsPerPage} = pagination,
      tasksOnPage = tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

    return <Beforeunload onBeforeunload={() => this.componentWillUnmount()}>
      <Fab color="secondary" aria-label="Add" className={classes.fabButton} onClick={() => this.handleAdd()}>
        <AddIcon/>
      </Fab>
      <TaskToolbar />

      <TaskDialog handleSubscribe={data => this.onDialogSubscribe(data)}/>
      <Table aria-labelledby="tableTitle">
        <TaskHeader orderBy={orderBy}/>
        <TableBody>
          {tasksOnPage.map(value =>
            <TaskRow
              key={value.id}
              id={value.id}
              handleEdit={() => this.handleEdit(value)}
            />
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={tasks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={(event, page) => this.handleChangePage(page)}
        onChangeRowsPerPage={event => this.handleChangeRowsPerPage(event.target.value)}
      />
    </Beforeunload>
  }
}

const mapStateToProps = (state, props) => {
  return {
    tasks: state.tasks.items,
    pagination: state.tasks.pagination,
    orderBy: state.tasks.orderBy
  }
}

export default withStyles(styles)(connect(
  mapStateToProps,
  {tasksInit, tasksStore, taskSetPagination, taskAdd, taskEdit, taskSetDialog}
)(TaskList))
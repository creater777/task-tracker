import React, {Component} from 'react'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TablePagination from '@material-ui/core/TablePagination'

import TaskRow from './TaskRow'
import TaskHeader from './TaskHeader'
import TaskDialog from './TaskDialog'

import {tasksInit, taskSetPagination, taskAdd, taskEdit, taskSetDialog} from '../../actions/tasks'

class TaskList extends Component {
  componentWillMount() {
    this.props.tasksInit();
  }

  handleChangePage(page){
    const {rowsPerPage, rowsPerPageOptions} = this.props.pagination
    this.props.taskSetPagination({rowsPerPage, page, rowsPerPageOptions})
  }

  handleChangeRowsPerPage(rowsPerPage){
    const {page, rowsPerPageOptions} = this.props.pagination
    this.props.taskSetPagination({rowsPerPage, page, rowsPerPageOptions})
  }

  handleAdd(){
    this.props.taskSetDialog({visible: true})
  }

  handleEdit(value){
    this.props.taskSetDialog({
      data: this.props.tasks.find(item => item.id === value.id),
      visible: true
    })
  }

  onDialogSubscribe(data){
    if (data.id){
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
    const { classes, orderBy, tasks, pagination, dialog } = this.props
    const { page, rowsPerPage} = pagination
    const { visible } = dialog
    return <div key="taskContext">
      <Fab color="secondary" aria-label="Add" className={classes.fabButton} onClick={() => this.handleAdd()}>
        <AddIcon />
      </Fab>
      {visible && <TaskDialog handleSubscribe = { data => this.onDialogSubscribe(data) } />}
      <Table aria-labelledby="tableTitle">
        <TaskHeader orderBy={orderBy}/>
        <TableBody>
          {tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((value, index) =>
            <TaskRow
              key={value.id}
              index={index}
              handleEdit = {() => this.handleEdit(value, index)}
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
    </div>
  }
}

const mapStateToProps = (state, props) => {
  return {
    tasks: state.tasks.items,
    orderBy: state.tasks.orderBy,
    pagination: state.tasks.pagination,
    dialog: state.tasks.dialog || {}
  }
}

export default connect(
  mapStateToProps,
  {tasksInit, taskSetPagination, taskAdd, taskEdit, taskSetDialog}
)(TaskList)
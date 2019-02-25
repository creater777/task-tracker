import React, {Component} from 'react'
import {connect} from 'react-redux'
import {taskAdd, taskEdit, taskSetDialog, taskSetPagination, tasksInit, tasksStore} from "../../actions/tasks";

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TablePagination from '@material-ui/core/TablePagination'

import TaskRow from './TaskRow'
import TaskHeader from './TaskHeader'

class TaskTable extends Component {

  handleEdit(value) {
    this.props.taskSetDialog({
      data: this.props.tasks.find(item => item.id === value.id),
      visible: true
    })
  }

  handleChangePage(page) {
    const {rowsPerPage, rowsPerPageOptions} = this.props.pagination
    this.props.taskSetPagination({rowsPerPage, page, rowsPerPageOptions})
  }

  handleChangeRowsPerPage(rowsPerPage) {
    const {page, rowsPerPageOptions} = this.props.pagination
    this.props.taskSetPagination({rowsPerPage, page, rowsPerPageOptions})
  }

  render(){
    const
      {tasks, pagination, orderBy} = this.props,
      {page, rowsPerPage} = pagination,
      tasksOnPage = tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

    return [
      <Table key="task-table" aria-labelledby="tableTitle">
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
      </Table>,
      <TablePagination
        key="task-table-pagination"
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
    ]
  }
}

const mapStateToProps = (state, props) => {
  return {
    tasks: state.tasks.items,
    pagination: state.tasks.pagination,
    orderBy: state.tasks.orderBy
  }
}

export default connect(
  mapStateToProps,
  {tasksInit, tasksStore, taskSetPagination, taskAdd, taskEdit, taskSetDialog}
)(TaskTable)
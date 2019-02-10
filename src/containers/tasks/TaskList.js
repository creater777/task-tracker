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
import TaskDialog, {DIALOG_MODE_ADD, DIALOG_MODE_EDIT} from './TaskDialog'

import {tasksInit, taskSetPagination, taskAdd, taskEdit} from '../../actions/tasks'

class TaskList extends Component {
  componentWillMount() {
    this.props.tasksInit();
    this.setState({
      showDialog: false,
      dialogData: {}
    })
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
    this.setState({
      showDialog: true,
      dialogMode: DIALOG_MODE_ADD,
      dialogData: null
    })
  }

  handleEdit(index){
    const {tasks} = this.props
    this.setState({
      showDialog: true,
      dialogMode: DIALOG_MODE_EDIT,
      dialogData: tasks[index]
    })
  }

  handleDialogClose(data){
    const {dialogMode} = this.state
    this.setState({
      showDialog: false,
    })
    switch (dialogMode){
      case DIALOG_MODE_ADD:
        this.props.taskAdd({
          title: data.title,
          description: data.description
        })
        break
      case DIALOG_MODE_EDIT:
        const {index} = this.props
        this.props.taskEdit({
          index, id, title, description, complete, checked
        })

    }
  }

  handleDialogSubscribe(data){
    this.setState({
      showDialog: false,
    })
  }

  render() {
    const { classes, orderBy, tasks, pagination } = this.props
    const { page, rowsPerPage} = pagination
    const { showDialog, dialogData, dialogMode } = this.state
    return <div key="taskContext">
      <Fab color="secondary" aria-label="Add" className={classes.fabButton} onClick={() => this.handleAdd()}>
        <AddIcon />
      </Fab>
      {showDialog && <TaskDialog
        state = { true }
        dialogMode = { dialogMode }
        dialogData = { dialogData }
        handleClose = { () => this.handleDialogClose() }
        handleSubscribe = { data => this.handleDialogSubscribe(data) }
      />}
      <Table aria-labelledby="tableTitle">
        <TaskHeader orderBy={orderBy}/>
        <TableBody>
          {tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((value, index) =>
            <TaskRow
              key={value.id}
              index={index}
              handleEdit = {index => this.handleEdit(index)}
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
    pagination: state.tasks.pagination
  }
}

export default connect(
  mapStateToProps,
  {tasksInit, taskSetPagination, taskAdd, taskEdit}
)(TaskList)
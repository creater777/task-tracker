import React, {Component} from 'react'
import { connect } from 'react-redux'
import Beforeunload from 'react-beforeunload'

// import PropTypes from 'prop-types'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TablePagination from '@material-ui/core/TablePagination'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import TaskRow from './TaskRow'
import TaskHeader from './TaskHeader'
import TaskDialog from './TaskDialog'
import TaskToolbar from '../../components/tasks/TaskToolbar'

import {tasksInit, tasksStore, taskSetPagination, taskAdd, taskEdit, taskRemove, taskSelect, taskSetDialog} from '../../actions/tasks'

class TaskList extends Component {
  componentWillMount() {
    this.props.tasksInit()
  }

  componentWillUnmount(e){
    this.props.tasksStore()
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

  handleRemoveItems(){
    this.props.taskRemove(this.props.selected)
  }

  render() {
    const
      {classes, tasks, selected, tasksOnPage, pagination, dialog} = this.props,
      {page, rowsPerPage} = pagination,
      {visible} = dialog
    console.log('render')
    return <Beforeunload onBeforeunload={e => this.componentWillUnmount(e)}>
      <Fab color="secondary" aria-label="Add" className={classes.fabButton} onClick={() => this.handleAdd()}>
        <AddIcon />
      </Fab>
      {selected.length ?
        <TaskToolbar
          numSelected = {selected.length}
          handleRemove={() => this.handleRemoveItems()}
        /> :
        <AppBar position="static" className={classes.root}>
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Todos
            </Typography>
          </Toolbar>
        </AppBar>
      }

      {visible && <TaskDialog handleSubscribe = { data => this.onDialogSubscribe(data) } />}
      <Table aria-labelledby="tableTitle">
        <TaskHeader />
        <TableBody>
          {tasksOnPage.map((value, index) =>
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
    </Beforeunload>
  }
}

const mapStateToProps = (state, props) => {
  const
    {pagination} = state.tasks,
    {page, rowsPerPage} = pagination,
    tasksOnPage = state.tasks.items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return {
    tasks: state.tasks.items,
    pagination: state.tasks.pagination,
    tasksOnPage,
    selected: tasksOnPage.filter(item => item.checked),
    dialog: state.tasks.dialog || {}
  }
}

export default connect(
  mapStateToProps,
  {tasksInit, tasksStore, taskSetPagination, taskAdd, taskEdit, taskRemove, taskSelect, taskSetDialog}
)(TaskList)
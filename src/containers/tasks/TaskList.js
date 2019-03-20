import React, {Component} from 'react'
import {connect} from 'react-redux'
import Beforeunload from 'react-beforeunload'
import {withStyles} from "@material-ui/core/styles/index"

import PropTypes from 'prop-types'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import TaskDialog from './TaskDialog'
import TaskToolbar from './TaskToolbar'
import TaskTable from './TaskTable'
import TaskScrum from './TaskScrum'

import {tasksInit, tasksStore, taskSetDialog} from '../../actions/tasks'

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

  handleAdd() {
    this.props.taskSetDialog({visible: true})
  }

  render() {
    const {classes, tab} = this.props

    return <Beforeunload onBeforeunload={() => this.componentWillUnmount()}>
      <Fab color="secondary" aria-label="Add" className={classes.fabButton} onClick={() => this.handleAdd()}>
        <AddIcon/>
      </Fab>
      <TaskToolbar />
      <TaskDialog />
      {tab === 0 ? <TaskTable /> : <TaskScrum />}
    </Beforeunload>
  }
}

const mapStateToProps = (state, props) => {
  return {
    tasks: state.tasks.items,
    pagination: state.tasks.pagination,
    orderBy: state.tasks.orderBy,
    tab: state.tasks.tab
  }
}

export default withStyles(styles)(connect(
  mapStateToProps,
  {tasksInit, tasksStore, taskSetDialog}
)(TaskList))

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number]
    ),
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    checked: PropTypes.bool
  })).isRequired,

  pagination: PropTypes.shape({
    rowsPerPage: PropTypes.number,
    page: PropTypes.number,
    rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number)
  }).isRequired,

  orderBy: PropTypes.shape({
    field: PropTypes.string,
    sort: PropTypes.string
  }).isRequired,
  tab: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  tasksInit: PropTypes.func.isRequired,
  tasksStore: PropTypes.func.isRequired,
  taskSetDialog: PropTypes.func.isRequired
}
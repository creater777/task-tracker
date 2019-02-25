import React, {Component} from 'react'
import {connect} from 'react-redux'

// import PropTypes from 'prop-types'
import TaskToolbarComponent from '../../components/tasks/TaskToolbar'

import {taskRemove} from '../../actions/tasks'
import {authLogout} from '../../actions/auth'

class TaskToolbar extends Component {

  handleRemoveItems() {
    this.props.taskRemove(this.props.selected)
  }

  handleLogout(){
    this.props.authLogout()
  }

  render() {
    const {selected, login} = this.props
    return <TaskToolbarComponent
      numSelected={selected.length}
      login={login}
      handleRemove={() => this.handleRemoveItems()}
      handleLogout={() => this.handleLogout()}
    />

  }
}

const mapStateToProps = (state, props) => {
  const
    {items, pagination} = state.tasks,
    {page, rowsPerPage} = pagination,
    tasksOnPage = items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    selected = tasksOnPage.filter(item => item.checked)
  return {
    selected,
    login: state.auth.login
  }
}

export default connect(
  mapStateToProps,
  {taskRemove, authLogout}
)(TaskToolbar)
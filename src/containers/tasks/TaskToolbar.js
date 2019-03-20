import React, {Component} from 'react'
import {connect} from 'react-redux'

import PropTypes from 'prop-types'
import TaskToolbarComponent from '../../components/tasks/TaskToolbar'

import {taskRemove, tasksSetTab} from '../../actions/tasks'
import {authLogout} from '../../actions/auth'

class TaskToolbar extends Component {

  handleRemoveItems() {
    this.props.taskRemove(this.props.selected)
  }

  handleLogout(){
    this.props.authLogout()
  }

  handleTabChange(target, value){
    this.props.tasksSetTab(value)
  }

  render() {
    const {selected, login, tab} = this.props
    return <TaskToolbarComponent
      numSelected={selected.length}
      login={login}
      tabIndex={tab}
      handleRemove={this.handleRemoveItems.bind(this)}
      handleLogout={this.handleLogout.bind(this)}
      handleTabChange={this.handleTabChange.bind(this)}
    />

  }
}

const mapStateToProps = (state, props) => {
  const
    {items, pagination, tab} = state.tasks,
    {page, rowsPerPage} = pagination,
    tasksOnPage = items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    selected = tasksOnPage.filter(item => item.checked)
  return {
    selected,
    tab,
    login: state.auth.login
  }
}

export default connect(
  mapStateToProps,
  {taskRemove, tasksSetTab, authLogout}
)(TaskToolbar)

TaskToolbar.propTypes = {
  selected: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number]
    ),
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    checked: PropTypes.bool
  })),
  tab: PropTypes.number.isRequired,
  login: PropTypes.string.isRequired
}
import {
  TASKS_INIT,
  TASKS_ADD,
  TASKS_EDIT,
  TASKS_REMOVE,
  TASKS_SORTBY,
  TASKS_STORE
} from '../actions/tasks'

const initialState = {
  tasks: {},
  sortBy: {
    field: 'title',
    desk: false
  }
}

export default (state = initialState, action) => {
  switch (action.type){
    case TASKS_INIT:
      return {
        ...state,
        tasks: localStorage.getItem('tasks')
      }

    case TASKS_ADD:
    case TASKS_EDIT:
      return {
        tasks: {
          ...state.tasks,
          [action.value.id]: action.value
        }
      }

    case TASKS_REMOVE:
      delete state[action.value.id]
      return {
        tasks: {
          ...state.tasks,
        }
      }

    case TASKS_SORTBY:
      return {
        sortBy: {
          ...state.sortBy,
          sortBy: action.sortBy
        }
      }

    case TASKS_STORE:
      localStorage.setItem('tasks', JSON.parse(state))
      return state

    default:
      return state
  }
}
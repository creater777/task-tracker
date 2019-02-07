import {
  TASKS_INIT,
  TASKS_ADD,
  TASKS_EDIT,
  TASKS_REMOVE,
  TASKS_SORTBY,
  TASKS_STORE
} from '../actions/tasks'

const initialState = {
  items: [],
  sortBy: {
    field: 'title',
    desk: false
  }
}

export default (state = initialState, action) => {
  switch (action.type){
    case TASKS_INIT:
      return {...JSON.parse(localStorage.getItem("tasks") || '[]')}

    case TASKS_ADD:
      state.items = [
        ...state.items,
      ].push(action.value)
      return {...state}

    case TASKS_EDIT:
      state.items[action.index] = action.value
      return {...state}

    case TASKS_REMOVE:
      state.items.splice(action.index, 1)
      return {
        ...state,
        items: [...state.items]
      }

    case TASKS_SORTBY:
      return {
        sortBy: {...action.sortBy}
      }

    case TASKS_STORE:
      localStorage.setItem('tasks', JSON.parse(state))
      return state

    default:
      return state
  }
}
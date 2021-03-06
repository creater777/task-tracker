import {compare} from '../helpers/compare'
import {rowsPerPageOptions} from '../config'
import {
  TASKS_INIT,
  TASKS_ADD,
  TASKS_EDIT,
  TASKS_REMOVE,
  TASKS_SORTBY,
  TASKS_SELECT_ALL,
  TASKS_SET_PAGINATION,
  TASKS_SET_DIALOG,
  TASKS_STORE,
  TASKS_SET_TAB
} from '../actions/tasks'

const initialState = {
  items: [],
  orderBy: {
    field: 'title',
    sort: 'desc'
  },
  pagination: {
    rowsPerPage: rowsPerPageOptions[0],
    page: 0,
    rowsPerPageOptions
  },
  tab: 0
}

export default (state = initialState, action) => {
  let index = null
  switch (action.type){
    case TASKS_INIT:
      return {...(JSON.parse(localStorage.getItem("tasks")) || initialState)}

    case TASKS_ADD:
      state.items = [...state.items]
      state.items.push(action.value)
      return {...state}

    case TASKS_EDIT:
      index = state.items.findIndex(item => item.id === action.value.id)
      state.items[index] = action.value
      return {...state}

    case TASKS_REMOVE:
      action.ids.forEach(id => {
        index = state.items.findIndex(item => item.id === id)
        state.items.splice(index, 1)
      })
      return {
        ...state,
        items: [...state.items]
      }

    case TASKS_SORTBY:
      const {field, sort} = action.value
      state.orderBy = {...action.value}
      state.items.sort((item1, item2) =>
        compare(item1, item2, field) * (sort === 'desc' ? -1 : 1)
      )
      return {...state}

    case TASKS_SELECT_ALL:
      state.items.forEach((item, index) => {
        if (action.value.ids.indexOf(item.id) > -1){
          state.items[index].checked = action.value.value
        }
      })
      return {
        ...state,
        items: [...state.items]
      }

    case TASKS_SET_PAGINATION:
      return {
        ...state,
        pagination: action.value
      }

    case TASKS_SET_DIALOG:
      return {
        ...state,
        dialog: action.value
      }

    case TASKS_STORE:
      localStorage.setItem('tasks', JSON.stringify(state))
      return state

    case TASKS_SET_TAB:
      return {...state, tab: action.value}

    default:
      return state
  }
}
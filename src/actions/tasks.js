import {getGuid} from "../helpers/guid"

export const TASKS_INIT = 'TASKS_INIT'
export const TASKS_ADD = 'TASKS_ADD'
export const TASKS_EDIT = 'TASKS_EDIT'
export const TASKS_REMOVE = 'TASKS_REMOVE'
export const TASKS_SORTBY = 'TASKS_SORTBY'
export const TASKS_SELECT_ALL = 'TASKS_SELECT_ALL'
export const TASKS_SET_PAGINATION = 'TASKS_SET_PAGINATION'
export const TASKS_SET_DIALOG = 'TASKS_SET_DIALOG'
export const TASKS_STORE = 'TASKS_STORE'
export const TASKS_SET_TAB = 'TASKS_SET_TAB'

export const tasksInit = () => ({
  type: TASKS_INIT
})

export const taskAdd = ({title, description, status}) => ({
  type: TASKS_ADD,
  value: {
    id: getGuid(),
    title,
    description,
    status: status || 'planed',
    checked: false
  }
})

export const taskEdit = ({id, title, description, status, checked}) => ({
  type: TASKS_EDIT,
  value: {
    id,
    title,
    description,
    status,
    checked
  }
})

export const taskRemove = ids => ({
  type: TASKS_REMOVE,
  ids
})

export const taskSortBy = ({field, sort}) => ({
  type: TASKS_SORTBY,
  value: {
    field,
    sort
  }
})

export const taskSelect = ({ids, value}) => ({
  type: TASKS_SELECT_ALL,
  value: {
    ids,
    value
  }
})

export const taskSetPagination = ({rowsPerPage, page, rowsPerPageOptions}) => ({
  type: TASKS_SET_PAGINATION,
  value: {
    rowsPerPage,
    page,
    rowsPerPageOptions
  }
})

export const taskSetDialog = ({data, visible}) => ({
  type: TASKS_SET_DIALOG,
  value: {
    data,
    visible
  }
})

export const tasksStore = () => ({
  type: TASKS_STORE
})

export const tasksSetTab = value => ({
  type: TASKS_SET_TAB,
  value
})

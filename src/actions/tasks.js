import {getGuid} from "../helpers/guid"

export const TASKS_INIT = 'TASKS_INIT'
export const TASKS_ADD = 'TASKS_ADD'
export const TASKS_EDIT = 'TASKS_EDIT'
export const TASKS_REMOVE = 'TASKS_REMOVE'
export const TASKS_SORTBY = 'TASKS_SORTBY'
export const TASKS_SET_PAGINATION = 'TASKS_SET_PAGINATION'
export const TASKS_SET_DIALOG = 'TASKS_SET_DIALOG'
export const TASKS_STORE = 'TASKS_STORE'

export const tasksInit = () => ({
  type: TASKS_INIT
})

export const taskAdd = ({title, description}) => ({
  type: TASKS_ADD,
  value: {
    id: getGuid,
    title,
    description,
    complete: false,
    checked: false
  }
})

export const taskEdit = ({id, title, description, complete, checked}) => ({
  type: TASKS_EDIT,
  value: {
    id,
    title,
    description,
    complete,
    checked
  }
})

export const taskRemove = id => ({
  type: TASKS_REMOVE,
  id
})

export const taskSortBy = ({field, sort}) => ({
  type: TASKS_SORTBY,
  value: {
    field,
    sort
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
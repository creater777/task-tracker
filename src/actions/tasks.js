import {getGuid} from "../helpers/guid"

export const TASKS_INIT = 'TASKS_INIT'
export const TASKS_ADD = 'TASKS_ADD'
export const TASKS_EDIT = 'TASKS_EDIT'
export const TASKS_REMOVE = 'TASKS_REMOVE'
export const TASKS_SORTBY = 'TASKS_SORTBY'
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

export const taskEdit = ({index, id, title, description, complete, checked}) => ({
  type: TASKS_EDIT,
  value: {
    id,
    title,
    description,
    complete,
    checked
  },
  index: index
})

export const taskRemove = ({index}) => ({
  type: TASKS_REMOVE,
  index
})

export const taskSortBy = ({field, sort}) => ({
  type: TASKS_SORTBY,
  value: {
    field,
    sort
  }
})

export const tasksStore = () => ({
  type: TASKS_STORE
})
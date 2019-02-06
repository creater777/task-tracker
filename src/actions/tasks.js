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
    description
  }
})

export const taskEdit = ({id, title, description}) => ({
  type: TASKS_EDIT,
  value: {
    id,
    title,
    description
  }
})

export const taskRemove = id => ({
  type: TASKS_REMOVE,
  value: id
})

export const taskSortBy = ({field, desk}) => ({
  type: TASKS_SORTBY,
  value: {
    field,
    desk
  }
})

export const tasksStore = () => ({
  type: TASKS_STORE
})
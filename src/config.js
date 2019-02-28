import * as palette from '@material-ui/core/colors'

const statuses = {
  'planed': {
    title: 'Planed',
    color: palette['common'][100]
  },
  'process': {
    title: 'In process',
    color: palette['orange'][100]
  },
  'ready': {
    title: 'Ready',
    color: palette['green'][100]
  }
}

export {
  statuses
}
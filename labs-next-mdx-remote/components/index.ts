import dynamic from 'next/dynamic'

const Note = dynamic(() => import('components/Note'))
const Grid = dynamic(() => import('components/Grid'))

export const elements = {
  Note,
  Grid,
}

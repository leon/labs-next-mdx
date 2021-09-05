import dynamic from 'next/dynamic'

const Note = dynamic(() => import('components/Note'))
const Grid = dynamic(() => import('components/Grid'))
//import { default as Note } from 'components/Note'
import { ComponentMap } from 'mdx-bundler/client'

export const elements: ComponentMap = {
  Note,
  Grid,
}

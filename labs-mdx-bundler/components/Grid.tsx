import { ReactNode } from 'react'

import styles from './Grid.module.css'

export interface GridProps {
  children?: ReactNode
}
export default function Grid({ children }: GridProps) {
  return <div className={styles.grid}>{children}</div>
}

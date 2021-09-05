import { ReactNode } from 'react'

export interface NoteProps {
  children?: ReactNode
}
export default function Note({ children }: NoteProps) {
  return <div className="note">{children}</div>
}

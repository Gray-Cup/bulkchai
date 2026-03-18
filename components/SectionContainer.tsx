import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return (
    <section className="mx-auto max-w-5xl px-6 sm:px-8 xl:max-w-6xl xl:px-10">{children}</section>
  )
}

import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Shared Journal - Togthr',
    description: 'Write your story together. Togthr shared journal is the private space where every entry adds a brick to your nest.',
  }
}

export default function JournalLayout({ children }: { children: React.ReactNode }) {
  return children
}

import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Pet Journal - Togthr',
    description: 'Tell your pet about your day. Every entry becomes a memory that grows your pet\'s nest on Togthr.',
  }
}

export default function JournalLayout({ children }: { children: React.ReactNode }) {
  return children
}

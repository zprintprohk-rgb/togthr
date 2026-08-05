import { Metadata } from 'next'
export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Soulmate Chat - Togthr', description: 'Togthr Soulmate is a private AI companion that listens without judgment.' }
}
export default function ChatLayout({ children }: { children: React.ReactNode }) { return children }

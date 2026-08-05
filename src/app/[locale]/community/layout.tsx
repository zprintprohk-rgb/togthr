import { Metadata } from 'next'
export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Couples Community - Togthr', description: 'Join the Togthr tree hole — an anonymous community where couples share stories.' }
}
export default function CommunityLayout({ children }: { children: React.ReactNode }) { return children }

import { Metadata } from 'next'
export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Daily Feeding - Togthr', description: 'Feed your shared pixel pet on Togthr. Daily check-ins make your virtual companion grow through 5 stages.' }
}
export default function DailyLayout({ children }: { children: React.ReactNode }) { return children }

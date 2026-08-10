import { Metadata } from 'next'
export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Daily Care - Togthr', description: 'Check in with your pixel pet on Togthr. Daily self-care moments make your virtual companion grow through 5 stages.' }
}
export default function DailyLayout({ children }: { children: React.ReactNode }) { return children }

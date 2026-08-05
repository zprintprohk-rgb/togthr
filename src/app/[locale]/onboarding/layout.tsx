import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Welcome to Togthr',
    robots: { index: false, follow: true },
  }
}

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return children
}

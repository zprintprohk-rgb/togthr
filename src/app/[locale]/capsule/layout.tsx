import { Metadata } from 'next'
export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Time Capsule - Togthr', description: 'Bury a memory capsule on Togthr and set a future date to dig it up together.' }
}
export default function CapsuleLayout({ children }: { children: React.ReactNode }) { return children }

/**
 * /chat — Soulmate AI chat (Fusion v2)

import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Soulmate Chat - Togthr',
    description: 'Togthr Soulmate is a private AI companion that listens without judgment. Quiet companionship, not endless chatting.',
  }
}
 *
 * Server entry — renders the interactive <ChatClient />.
 * Mood-responsive background + pet presence + capsule quick replies
 * + 1.2s mock AI responses (mock behavior preserved from v1).
 */

import ChatClient from './ChatClient'

export default function SoulmateChatPage() {
  return <ChatClient />
}

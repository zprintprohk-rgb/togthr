// src/lib/landing-pages-bodies.ts
//
// 26 unique EN body contents for the pSEO landing pages (S3 cleanup: 22 couple-themed bodies removed).
// One Body per slug. The per-slug page.tsx imports the body and renders
// it for all 8 locales (EN content only — other locales reuse the EN body;
// only the meta title/description and hreflang tags vary per locale).
//
// Each body ships:
//   - h1: the headline (keyword + emotional hook)
//   - intro: the opening paragraph
//   - heroCopy: 1-2 lines that sit next to the pet image
//   - sections: 3 "why it works" sections (desktop-dwelling / 5-stage
//     growth / no ads no social pressure — the universal product wedge)
//   - faqs: 2 GEO-style Q&A items
//   - cta: a single closing CTA sentence ending in "Start free in your browser"

import type { LandingGroup } from './landing-pages'

export type Body = {
  h1: string
  intro: string
  heroCopy: string
  sections: { h: string; p: string }[]
  faqs: { q: string; a: string }[]
  cta: string
}

const GROUP_INTRO: Record<LandingGroup, string> = {
  self: 'for one person on a quiet desk',
  bff: 'for two people who count each other as their person',
  tmg: 'for anyone who misses the small creature in the keychain',
  discovery: 'for anyone looking for a small quiet companion',
}

const W1 = `A small pet that lives in your browser tab is doing something a phone widget cannot: it is on the screen you are already looking at for eight hours a day. You do not have to remember to open a lock screen. You do not have to switch apps. The little pixel robot just sits there, in the corner of your work, your study, your writing, your code — and the longer you keep it there, the more the day starts to feel a little less alone. Most of the apps that try this only do it on mobile. Togthr was built for the desktop first, because that is where the quiet hours are.`
const W2 = `Most virtual pets are static. They are cute, and then they are the same tomorrow, and the next day, and the year after. Togthr Bot is not. It starts as a baby — a small round-headed pixel robot — and it grows, in five real stages, only as long as you keep showing up. Baby, toddler, teen, adult, legend. Each stage takes a few weeks of small regular check-ins, and once it reaches the adult stage it unlocks one of six hidden career skins: programmer, doctor, astronaut, chef, police officer, firefighter. There is also a one-in-seventy-two chance your pet is the rare golden edition, which quietly exists and which most people never talk about. The growth is the product. Everything else is the frame around it.`
const W3 = `A lot of companion apps make their money the same way social apps do: ads inside the pet, streaks that punish you when you skip a day, social feeds that make you compare your life to strangers. Togthr is none of that. There are no ads anywhere in the product, ever. There are no streaks that break and ruin your week. There is no friends list, no like count, no DM thread that you have to keep up with. The pet is yours alone, or yours and one other person's. It grows, or it waits, but it never nags, and it never makes you feel behind. That is the design choice that makes it feel like a friend and not a chore.`

const WHY_SECTIONS = [
  { h: `It lives where you already are`, p: W1 },
  { h: `It actually grows`, p: W2 },
  { h: `It is the quietest app on your screen`, p: W3 },
]

// ─── Group 1 — self / lonely desk / focus ────────────────────────────────────
const self: Record<string, Body> = {
  'lonely-desk-companion': {
    h1: `A lonely desk companion that does not need you to talk to it`,
    intro: `A lonely desk does not always need a conversation. Sometimes it needs a small, quiet presence that just sits there. Togthr is a small pixel pet that lives in your browser and grows as you keep showing up to your own day. You do not have to chat with it. You do not have to type anything. You can just look over, see it there, and get back to work. It is the rarest kind of app: one that helps by being quiet.`,
    heroCopy: `A small pixel pet, sitting in the corner of your desk, growing because you showed up.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `Will the pet interrupt my work?`, a: `No. Togthr is deliberately the opposite of an interrupt. There are no banners, no daily push notifications, no streak reminders that pop up over your code. The pet is presence, not pressure. If you want a small visual nudge, you can ask for one. If you do not, it just sits there.` },
      { q: `What if I am not actually lonely, I just like the company?`, a: `That is most of the people who use Togthr. The app is not built around a clinical problem; it is built around a normal human preference for not being the only living thing in the room during a long Tuesday. The pet works whether or not you would call it loneliness.` },
    ],
    cta: `Put a small companion on the desk tomorrow. Start free in your browser.`,
  },

  'pixel-pet-for-focus': {
    h1: `A pixel pet for focus — not a streak, not a counter, just a small witness`,
    intro: `Most focus apps are gamified to the point of distraction: a streak counter, a points system, a leaderboard you secretly compare yourself to. Togthr skips all of that. The pet simply grows as you keep working, in five stages, visibly. If you focus for a real session, the pet will move a little. If you take a week off because life happened, the pet waits. It is the focus app for people who hate focus apps.`,
    heroCopy: `A small pet, visibly growing as the focused hours stack up.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `Does Togthr actually track my focus time?`, a: `It tracks your daily check-ins, not your keystrokes. The growth comes from showing up, not from being productive in a measurable way. The product is built around the idea that the relationship with your own attention deserves the same gentleness you would give a friend's.` },
      { q: `Will it work alongside my existing focus tools?`, a: `Yes. Togthr is not a focus app, it is the thing on the corner of the screen while you use a focus app. Pair it with whatever timer or music you already use, and the pet quietly accumulates the months you put in.` },
    ],
    cta: `Open Togthr tomorrow, start your first focus session, watch the pet move. Start free in your browser.`,
  },

  'cute-desktop-buddy-for-students': {
    h1: `A cute desktop buddy for students — sits with you through the semester`,
    intro: `A study buddy used to be a friend in the library. Now it is a small pixel pet in the corner of your laptop, growing through five stages across the semester. Togthr is built for the long uneven hours of student life: the all-nighters, the week of nothing, the recovery week, the slow climb back. The pet does not grade you. It just grows when you show up, and waits when you do not. By finals it has been with you the whole time, and you can both remember the season that produced each stage.`,
    heroCopy: `A small pixel buddy, in the corner of your laptop, through the whole semester.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `Is Togthr a study app?`, a: `It is a study companion, not a study app. It does not have flashcards, it does not have a Pomodoro timer, it does not track your GPA. It is the small living thing on the corner of your screen while you do all the actual studying in another tab.` },
      { q: `Will I outgrow it?`, a: `Probably not. The pet reaches its adult stage after a few months of regular use, and then it keeps changing — six hidden career skins, the rare golden edition, the relationship your friend can join if you want. It is built to grow with you, not to be abandoned by spring break.` },
    ],
    cta: `Adopt your study buddy before the next study session. Start free in your browser.`,
  },

  'desktop-pet-for-work-from-home': {
    h1: `A desktop pet for working from home — the coworker who never schedules a meeting`,
    intro: `Working from home is wonderful, and the apartment is quiet, and sometimes the only living thing in the room is you. Togthr is a small pixel pet that lives in your browser, grows across the workday, and provides the kind of silent company an office would have given you for free. It does not ping you. It does not expect a response. It is the rarest thing in remote work: a colleague who is content to just be in the room.`,
    heroCopy: `A small coworker, in the corner of the screen, who never books a meeting.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `Will my employer have any visibility into my Togthr?`, a: `None. Togthr is your personal browser app, and nothing in it is visible to anyone but you (and the one other person you choose to share the pet with, if you do). It is not Slack, not Teams, not a corporate wellness tool.` },
      { q: `Does the pet help with focus?`, a: `Indirectly, yes. The pet provides a small visible signal of the day, which is a surprisingly effective way to keep yourself oriented. The product was designed for the long silent hours of remote work, where the day can otherwise dissolve into a single grey afternoon.` },
    ],
    cta: `Put the pet on your work-from-home desk tomorrow. Start free in your browser.`,
  },

  'quiet-companion-app-no-chat': {
    h1: `A quiet companion app with no chat — and that is the point`,
    intro: `Most companion apps are, when you look closely, chat apps. They want you to type sentences to a bot, and the bot wants to type sentences back, and after a while you realise you are just texting a small language model. Togthr is the opposite. There is no chat. The pet is the only conversation, and it is silent. You check in, the pet grows, the day is held. The quietness is not a missing feature. It is the design.`,
    heroCopy: `A companion that does not talk back, because the quietness is the comfort.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `Why no chat?`, a: `Because chat is where companion apps usually break. The user gets tired, the bot gets awkward, and the whole thing collapses. Togthr is built around the idea that the small living presence of the pet — not the conversation — is what is actually comforting. The chat would be in the way.` },
      { q: `What if I do want to talk to something?`, a: `Togthr is not the only app in your life, and it does not pretend to be. Use whatever chat tool, journal, or therapist you already use. Togthr is the silent third presence in the corner, doing the job a real pet would do if a real pet were allowed in the room.` },
    ],
    cta: `Try the quiet version of a companion app. Start free in your browser.`,
  },

  'desk-pet-for-coders': {
    h1: `A desk pet for coders — the IDE tab that is also a small creature`,
    intro: `A coder's day is mostly a single browser window, a single editor, and a single long uninterrupted thought. Togthr is built to live in that window without disturbing it: a small pixel pet in the corner of the screen, growing as you keep showing up to the work. It does not interrupt your flow. It does not pop up over your code. It is the rarest kind of tool for coders: one you can ignore for six hours and then glance at and feel slightly less alone.`,
    heroCopy: `A small pixel pet, sitting beside the editor, growing as the commits do.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `Will it slow down my editor?`, a: `No. Togthr lives in a browser tab, and the pet is a tiny CSS animation. It uses no measurable CPU. It will not show up in your profiler, and it will not slow down a build.` },
      { q: `Does it integrate with my workflow?`, a: `Not directly, and that is intentional. Togthr is not a productivity plugin, it is the small living thing on the corner of the screen that is happy you are coding. The integration you want is the one that does not require an integration: a presence, not a tool.` },
    ],
    cta: `Open a new tab tomorrow and adopt the coder's pet. Start free in your browser.`,
  },

  'pixel-buddy-for-study-sessions': {
    h1: `A pixel buddy for study sessions that grows with your semester`,
    intro: `Study sessions are long, lonely, and full of small defeats. Togthr is a small pixel buddy that lives in your browser and grows through five stages across the whole semester, one small study session at a time. You check in, the pet moves a little, you go back to the chapter. By the time finals come, the pet has visibly grown, and you can both remember the season that produced each stage. It is a study buddy that asks for nothing and shows up every time.`,
    heroCopy: `A small pixel buddy, growing with the semester, one session at a time.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `Does Togthr actually help me study?`, a: `It helps in one specific way: it gives the long lonely hours a small visible shape. The pet is a small daily witness to the work, which is, in practice, a real motivator. It is not a study method. It is the small thing on the corner of the screen that makes the work feel less invisible.` },
      { q: `What if I study in bursts?`, a: `The pet is built for bursts. You check in when you actually study, the pet moves a little, and the long empty days do not count against you. There is no streak to break, no penalty for a rest day, no shame in a slow week.` },
    ],
    cta: `Bring the pixel buddy to your next study session. Start free in your browser.`,
  },

  'low-pressure-companion-app': {
    h1: `A low-pressure companion app — the opposite of every other one`,
    intro: `Most companion apps are high-pressure. They want you to check in, they want you to keep the streak, they want you to send the right number of messages this week. Togthr is the opposite. The pet is yours, the check-in is one tap, there is no streak to break, and the pet waits when you forget. The whole design assumes that the reason you want a companion is that the rest of your life is already full of pressure. This one is not.`,
    heroCopy: `A small pixel pet, growing because you showed up, with nothing to break.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `What does "low-pressure" actually mean?`, a: `It means three specific things. There is no streak counter, so there is no streak to break. There are no notifications you cannot turn off, so there is no nag. And there is no friends list or social feed, so there is no comparison. The pet grows on your own check-ins, on your own time, at your own pace.` },
      { q: `Is it just a desktop pet then?`, a: `It is a desktop pet that you can also share with one other person, if you want. The low-pressure part applies to that too: if you do not share it, the pet is yours. If you do, there is no chat, no group feed, no thread to keep up with. Just one other person, and the pet in the middle.` },
    ],
    cta: `Try the low-pressure version of a companion app. Start free in your browser.`,
  },
}

// ─── Group 2 — bff / friendship ─────────────────────────────────────────────
const bff: Record<string, Body> = {
  'virtual-pet-to-share-with-best-friend': {
    h1: `A virtual pet to share with your best friend, not your whole feed`,
    intro: `Most "share with a friend" apps end up being share with everyone. The friend gets buried in a feed, the pet gets buried in a feed, the meaning gets buried in a feed. Togthr is the opposite. The pet is shared with exactly one other person — your person, your best friend, the one you already text too much — and the share is the whole point. There is no feed. There is no other friend to invite. There is the pet, and there is the two of you.`,
    heroCopy: `A small shared pet, between you and the friend you actually text back.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `Why only one friend?`, a: `Because friendship at that depth is the point. Togthr is not built to scale to a hundred friends. It is built for the one friend you have had since you were seventeen, or the one friend you made last year, and the small shared ritual of keeping the pet alive between you.` },
      { q: `What if we are in different countries?`, a: `Then the asynchronous design of Togthr works exactly as intended. One of you writes a sentence, the other reads it twelve hours later, the pet grows. Time zones are the use case, not a bug.` },
    ],
    cta: `Invite the friend you keep meaning to text. Start free in your browser.`,
  },

  'bff-desktop-buddy-app': {
    h1: `A BFF desktop buddy app — the small thing between you and your person`,
    intro: `Best friendships are mostly invisible. They live in shared jokes, in the running count of who owes whom coffee, in the way you can tell each other almost anything at 11 p.m. on a Tuesday. Togthr is the small visible shape of that invisible thing: a pixel pet that you and your BFF both feed, that grows as the friendship does, that is just there in the corner of the screen reminding you that someone is on the other end of the day.`,
    heroCopy: `A small pixel pet, in the corner of the screen, that is the friendship made visible.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `What if one of us uses it more than the other?`, a: `That is fine. The pet grows on both your check-ins, but it does not fail if one of you has a quieter month. The friendship is not a metric. The pet is just the small witness to it.` },
      { q: `Is this a dating app?`, a: `Same app, different relationship. Togthr does not know, and does not care, whether the other person is your partner, your best friend, or your sister. The shape of the ritual is the same: a small sentence a day, a small pet in the middle.` },
    ],
    cta: `Start the BFF ritual tonight. Start free in your browser.`,
  },

  'friendship-check-in-app': {
    h1: `A friendship check-in app — the daily sentence that keeps the thread unbroken`,
    intro: `Best friendships die not from fights but from drift. You stop texting, then you feel weird about texting, then the gap is so wide that the re-entry feels like a job application. Togthr is a friendship check-in app designed to keep the thread unbroken without making either of you perform. You write one sentence, your friend writes one sentence, the pet grows a little. The check-in is the ritual. The pet is the excuse.`,
    heroCopy: `A small daily sentence, a small pet, a friendship that does not drift.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `What do we actually write?`, a: `One sentence each, every day or so. It can be about anything — a meeting, a dog, a sandwich, a worry, a small win. The sentence is not the point. The writing of it is. The friendship is the cumulative effect of all the sentences you did not have to send.` },
      { q: `Will Togthr replace the long phone call?`, a: `No, and it is not trying to. The long call is the deep end. Togthr is the shallow end — the small daily contact that keeps the pool warm. The two of them work best together: the call once a month, the pet every day.` },
    ],
    cta: `Start the check-in with your best friend tomorrow. Start free in your browser.`,
  },

  'long-distance-friendship-app': {
    h1: `A long-distance friendship app for grown-ups who keep meaning to text`,
    intro: `Long-distance friendships are the ones that drift fastest, because the excuses are easy. Togthr is a long-distance friendship app that gives the friendship a small, visible, daily reason to exist. A sentence a day from each of you, a small pet in the middle, five growth stages over the months. It does not replace the visit or the long call, but it keeps the thread unbroken between them, which is the only real problem in the first place.`,
    heroCopy: `A small pixel pet, in two browsers, holding the friendship together.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `Can we use it across very different time zones?`, a: `Yes. The whole design is asynchronous. One of you writes a sentence in the morning, the other reads it in the evening, the pet grows. The app is built to make time zones a feature, not a friction.` },
      { q: `What if one of us goes quiet for a month?`, a: `The pet waits. There is no penalty for a quiet month, no streak to break. When the other person comes back, the pet is still there, slightly smaller than it would have been, ready to grow again. The friendship does not need to be defended from real life.` },
    ],
    cta: `Bring the long-distance friendship back to life tonight. Start free in your browser.`,
  },

  'shared-pixel-pet-with-friends': {
    h1: `A shared pixel pet with friends — the smallest possible friendship ritual`,
    intro: `Most friendship rituals are too big. The group chat dies, the group trip is too expensive, the monthly dinner is too much to schedule. Togthr is the smallest possible friendship ritual: one shared pixel pet, one sentence a day from each of you, a small daily touch that takes thirty seconds. It is the friendship equivalent of the plant on the office windowsill — small, alive, and unmistakably yours.`,
    heroCopy: `A small shared pet, fed by a daily sentence, kept by the two of you.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `Is the pet shared with multiple friends, or just one?`, a: `Just one. The product is built around a single, deep friendship, not a group. If you have three best friends, you can have three pets. The point is the small, specific, one-to-one ritual, not the scaling.` },
      { q: `What if I want the pet to be just mine?`, a: `Then it is just yours. You can adopt a Togthr pet, feed it daily, watch it grow, and never invite anyone in. The shared-with-a-friend part is opt-in, and the solo version is a complete experience on its own.` },
    ],
    cta: `Start the smallest possible friendship ritual. Start free in your browser.`,
  },

  'best-friend-daily-ritual-app': {
    h1: `A best-friend daily ritual app — one sentence, one pet, one thread unbroken`,
    intro: `Daily rituals between best friends usually fail because they ask too much. Togthr is a best-friend daily ritual app that asks for one sentence each. That is the entire ritual. There is no other thing to remember. The pet grows visibly in the corner of your screen, and after a few months the two of you have a small living record of the friendship that you can both scroll back through, sentence by sentence, on the boring days.`,
    heroCopy: `A daily sentence from each of you, a small pet that visibly grew.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `What if we are bad at rituals?`, a: `So are most people. That is why Togthr's ritual is one sentence a day, not a video call a week. The bar is so low that you can clear it on the worst day, and the pet still grows. The design assumes the friendship is real and the schedule is not.` },
      { q: `Can we both see all the old sentences?`, a: `Yes. The shared journal of sentences is the heart of the app. Months later, scrolling back through a long thread of "long day, nothing happened" is surprisingly moving. The friendship is in the cumulative weight of all the small days.` },
    ],
    cta: `Start the daily ritual with your person tonight. Start free in your browser.`,
  },

  'desktop-pet-for-besties': {
    h1: `A desktop pet for besties — the small creature between two browsers`,
    intro: `Best friends do not need another messaging app. They need a small thing that reminds them, gently, that the other one is still there. Togthr is a desktop pet for besties: a small pixel creature that lives in both your browsers, grows as you both keep showing up, and quietly holds the friendship together across whatever the year throws at you. It is the small creature between two browsers, doing the job a real best friend does in person.`,
    heroCopy: `A small pixel pet, between two browsers, growing with the friendship.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `What does the pet actually do all day?`, a: `Mostly it sits in the corner. It idles, blinks, occasionally does a small animation. It is presence, not entertainment. The visible growth is the only thing it does, and the visible growth is the only thing it needs to do.` },
      { q: `Is this a dating app?`, a: `Same product, different relationship. Togthr does not label the other person — partner, best friend, sibling, parent — the app is the same. The friendship version is just the version where the other person is the friend you have had since you were fifteen.` },
    ],
    cta: `Adopt the besties pet tomorrow morning. Start free in your browser.`,
  },

  'stay-in-touch-app-for-friends': {
    h1: `A stay-in-touch app for friends who keep meaning to text more`,
    intro: `The hardest text to send is the one that starts with nothing. "Hey" feels weird, the empty message box is its own obstacle, and the gap has now been six months. Togthr is a stay-in-touch app that gives the friendship a small, daily, non-performative reason to keep the thread alive. You each write a sentence, the pet grows, and the next time you actually want to call, the gap is six days, not six months.`,
    heroCopy: `A small daily sentence, a small growing pet, a thread that never goes silent.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `Will this replace actual texting?`, a: `It will not, and it is not trying to. Togthr is the background radiation of a friendship — the small daily contact that keeps the signal strong — not the foreground conversation. The two of them work together: Togthr keeps the thread warm, the text or call does the real work.` },
      { q: `What if I do not want to share with a specific friend?`, a: `Then the pet is just yours, and that is also fine. A solo Togthr pet grows on your own check-ins, and you can adopt a second one later if a friend does come to mind. The product is built to be useful either way.` },
    ],
    cta: `Stop meaning to text, and start keeping in touch. Start free in your browser.`,
  },
}

// ─── Group 3 — tamagotchi / nostalgia ────────────────────────────────────────
const tmg: Record<string, Body> = {
  'tamagotchi-for-desktop': {
    h1: `A Tamagotchi for your desktop — same loop, no keychain`,
    intro: `The original Tamagotchi lived on a keychain because that was the only screen you could carry. Togthr is the same idea moved to where you actually are now: the desktop. A small pixel pet that lives in your browser, that grows through five stages as you keep showing up, that does not die if you forget it for a weekend, and that never punishes you for living your life. It is the Tamagotchi for adults, on the screen where the day actually happens.`,
    heroCopy: `The Tamagotchi loop, moved to the screen you actually use.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `Does the pet die if I forget it?`, a: `No. This is the deliberate design choice. The 1990s needed the death mechanic to create stakes, because there was no other feedback loop. The 2026 version gets its stakes from growth: the pet visibly moves through five stages, and that visible growth is the reward. The death mechanic is replaced by the gentler one of "the pet is just a little smaller than it would have been."` },
      { q: `Can I name the pet?`, a: `Yes. You can name your Togthr pet anything you like, and the name shows up in the daily check-in. The pet does not have a personality you have to learn, it has the personality you give it.` },
    ],
    cta: `Adopt the desktop Tamagotchi tonight. Start free in your browser.`,
  },

  'modern-tamagotchi-app-2026': {
    h1: `A modern Tamagotchi app for 2026 — same heart, new home`,
    intro: `The Tamagotchi idea was a beautiful one and it does not belong in 1996. Togthr is a modern Tamagotchi app for 2026: pixel art, five growth stages, six hidden career skins, a one-in-seventy-two chance of a golden edition, and a desktop presence that does not require you to wear it on your keychain. It is the same small care-and-grow loop, moved to where the day happens and updated for the way adults actually use computers.`,
    heroCopy: `The same loop, on the screen you actually use, in 2026.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `Is Togthr a remake of Tamagotchi?`, a: `It is not. Togthr shares the DNA — a small pixel creature that grows when you care for it — but it is built for a different life. Togthr Bot lives in a relationship, not on a keychain, and it grows through five stages only as long as someone keeps showing up. Think of it as the grandchild of the original idea: same pixel heart, new home.` },
      { q: `What does the 2026 version do that the 1990s version could not?`, a: `It does not die, it does not have three buttons, it does not require a CR2032 battery, and it lives on a screen you are already looking at for eight hours a day. The loop is the same. The rest has been updated.` },
    ],
    cta: `Try the 2026 version of the Tamagotchi. Start free in your browser.`,
  },

  'tamagotchi-alternative-for-adults': {
    h1: `A Tamagotchi alternative for adults — the loop, without the anxiety`,
    intro: `The original Tamagotchi was designed for nine-year-olds with a lot of free time and a parent willing to buy the replacement batteries. It was, in practice, also a source of small ongoing anxiety: the beeping, the death, the guilt. Togthr is a Tamagotchi alternative for adults: the same care-and-grow loop, but without the death mechanic, without the beeping, without the keychain. It is the rare pet that is designed for the life you actually have, not the life the marketing assumed.`,
    heroCopy: `The Tamagotchi loop, designed for the life you actually have.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `Why not just get a Tamagotchi?`, a: `You can, and the originals are still lovely. Togthr is for the part of the day when the keychain is not with you — the long quiet hours at the desk — and for the part of you that does not want to be punished for a busy week. The two products are not in competition; one is a nostalgia object, the other is a daily companion.` },
      { q: `Will I outgrow it?`, a: `Probably not, because the pet is not a fixed toy. It reaches its adult form after a few months and then keeps changing: six hidden career skins, the rare golden edition, the chance to invite one other person in. The pet is built to grow with you, not to be outgrown by the third month.` },
    ],
    cta: `Adopt the adult-friendly Tamagotchi tonight. Start free in your browser.`,
  },

  'pixel-pet-like-tamagotchi': {
    h1: `A pixel pet like Tamagotchi, but quieter and gentler`,
    intro: `A pixel pet like Tamagotchi should not be hard to find — and yet most of the modern ones are not the same. They are either too gamified, with streaks and levels and a friend list, or too realistic, with full 3D animals and a chat box. Togthr is the deliberately small version: pixel art, five growth stages, no streak to break, no chat, no friends list. It is the Tamagotchi loop, run quietly, on the screen where the day actually happens.`,
    heroCopy: `A pixel pet, like the one in the keychain, but quieter and gentler.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `What is the difference between Togthr and a Tamagotchi?`, a: `Two specific things. The death mechanic is gone: the pet does not die, it just pauses if you are away for a while. And the keychain is gone: the pet lives in your browser, on the screen you are already looking at. The loop is the same. The format is updated.` },
      { q: `Can I still call it my Tamagotchi?`, a: `You can call it whatever you like. The product is a Togthr Bot, but the feeling is the same one the keychain had in 1996, and the name is yours to choose.` },
    ],
    cta: `Find the gentler version of the Tamagotchi. Start free in your browser.`,
  },

  'desktop-tamagotchi-windows': {
    h1: `A desktop Tamagotchi for your browser — Windows, Mac, anything`,
    intro: `A desktop Tamagotchi should not need a download. Togthr is a desktop Tamagotchi that lives in your browser, on Windows, Mac, Linux, or anything else that can run a tab. There is no install, no exe, no permission prompts, no updates. You open a tab, the pet is there, the pet grows. It is the Tamagotchi loop, available wherever you happen to be working today, and ready to follow you when you switch laptops tomorrow.`,
    heroCopy: `A desktop Tamagotchi that does not need a download.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `Does it work on Windows? On a Mac? On Linux?`, a: `It works on any of them, because it works in your browser. Chrome, Safari, Firefox, Edge — whatever you are already using. There is nothing to install, and there is no compatibility list to worry about.` },
      { q: `Will it work on a work computer?`, a: `Yes. Because it lives in a regular browser tab, and does not require any special permissions. The pet is small, the resource use is negligible, and IT will not see it in their logs as anything other than a normal HTTPS request.` },
    ],
    cta: `Put a Tamagotchi on your desktop tonight. Start free in your browser.`,
  },

  'tamagotchi-30th-anniversary-app': {
    h1: `A Tamagotchi 30th-anniversary companion — same loop, in your browser`,
    intro: `The original Tamagotchi launched in 1996, which means 2026 is the thirtieth anniversary. Bandai is marking the year with a real-world exhibition, an Uniqlo collaboration, and a Nano reissue. Togthr is the software companion for that anniversary: a small pixel pet that lives in your browser, grows through five stages as you keep showing up, and quietly carries the original care-and-grow loop into the place where adults actually spend their days now. It is the thirtieth-anniversary Tamagotchi, for the people who no longer wear a keychain.`,
    heroCopy: `The 30th-anniversary Tamagotchi, for the people who no longer carry a keychain.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `Is Togthr an official Tamagotchi 30th-anniversary product?`, a: `No, and we are not pretending it is. Togthr is an independent product that borrows the care-and-grow loop, the pixel aesthetic, and the small-creature-on-a-screen feeling of the original. The 30th anniversary is a real thing — see the official exhibitions — and Togthr is a way for adults to participate in the spirit of the moment without buying another piece of hardware.` },
      { q: `What does the 30th anniversary have to do with my daily routine?`, a: `Probably nothing, directly. But there is a reason the idea keeps coming back, thirty years later: small creatures that you care for, that visibly respond, are a category of software that people keep wanting. The 30th anniversary is just the year the category got its name back. The product is the same loop, updated for how you actually use a screen in 2026.` },
    ],
    cta: `Mark the 30th anniversary your own way. Start free in your browser.`,
  },

  'virtual-pet-that-grows-up-like-tamagotchi': {
    h1: `A virtual pet that grows up like Tamagotchi, baby to legend`,
    intro: `The Tamagotchi's most important feature was not the death mechanic. It was the visible growth: baby to child to teen to adult, in five real stages that took weeks of small regular care. Togthr is a virtual pet that grows up the same way, with the same five stages, but on your desktop instead of on a keychain, and without the death mechanic that made the 1990s version exhausting. The growth is the same. The format is updated. The death is gone.`,
    heroCopy: `Five real growth stages, baby to legend, on the screen where the day happens.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `What are the five stages?`, a: `Baby, toddler, teen, adult, legend. Each one takes a few weeks of small regular check-ins, and each one is visibly different on screen. The pet's face, posture, and small animations change at each stage, so the growth is not just a number ticking up — it is a small living thing visibly becoming more itself.` },
      { q: `What happens at the legend stage?`, a: `The pet settles into its adult form and starts unlocking hidden career skins. There are six: programmer, doctor, astronaut, chef, police officer, firefighter. There is also a one-in-seventy-two chance that your pet is the rare golden edition, which quietly exists and which most people never talk about. The growth does not end. The shape just keeps changing.` },
    ],
    cta: `Watch a Tamagotchi-style pet grow through all five stages. Start free in your browser.`,
  },

  'tamagotchi-for-work-computer': {
    h1: `A Tamagotchi for your work computer — the silent coworker`,
    intro: `A Tamagotchi at work would have been a liability in 1996. The beeping alone would have got it confiscated by Friday. Togthr is a Tamagotchi for your work computer: silent, small, present, and content to be the coworker who never schedules a meeting. It lives in a browser tab, it does not interrupt, and it grows visibly as the weeks go by. By the end of the year, you and the small pixel pet have been through something together, even if it never said a word.`,
    heroCopy: `A small pixel pet, on the work computer, the silent coworker you always wanted.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `Will my employer mind?`, a: `Probably not, because the pet is in a normal browser tab, uses negligible resources, and does not interrupt your work. It is, in visible footprint, the same as having a small sticker on the corner of your monitor. The ethical line — distraction, surveillance — does not really apply, because the pet does not look at your screen or report back to anyone.` },
      { q: `Is this just a desktop pet then?`, a: `It is, with the same care-and-grow loop the original Tamagotchi had, and updated for the way adults actually use computers. The word "Tamagotchi" still works. The pixel pet is the same idea. The home, this time, is your work computer.` },
    ],
    cta: `Put a Tamagotchi on your work computer tomorrow. Start free in your browser.`,
  },
}

// ─── Group 4 — discovery / comparison ─────────────────────────────
const discovery: Record<string, Body> = {
'virtual-pet-for-emotional-support': {
    h1: `A virtual pet for emotional support — that asks nothing of you`,
    intro: `The best emotional support is not a conversation. Sometimes it is a small living thing in the room that does not need you to explain anything. Togthr is a virtual pet for emotional support, built around that idea: a small pixel creature that lives in your browser, that grows as you keep showing up to your own day, and that never asks you to describe what is wrong. It just sits there, in the corner, in all four stages — idle, working, thinking, success — and the visible growth over months is the quietest possible reminder that you kept going.`,
    heroCopy: `A small pet that asks for nothing, and is still there at the end of the month.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `Is this a mental health app?`, a: `No, and it is important to be clear about that. Togthr is not a replacement for therapy, not a clinical tool, not a crisis resource. It is a small daily companion that provides presence and persistence, the way a real pet would, without making any claims about treatment. If you need professional support, please seek it. If you need a small quiet friend on the desktop, we built one.` },
      { q: `What does the pet actually do for emotional support?`, a: `It provides two things that are in short supply during a rough month: presence, and persistence. The pet is there every day. It does not leave. It does not need you to be better. It just grows, slowly, as you keep showing up, and the visible proof that the month has passed is sometimes the only thing that helps the next month start.` },
    ],
    cta: `Adopt the small quiet pet tonight and let it sit with you through the month. Start free in your browser.`,
  },
'a-pixel-pet-that-notices-you': {
    h1: `A pixel pet that notices you — and nothing else on your screen does`,
    intro: `Your browser tabs do not notice you. Your calendar does not notice you. Your email does not notice you, except to add another unread number to the badge. Togthr is a pixel pet that notices: it grows when you show up, it pauses when you rest, and the small creature in the corner of your browser remembers the month you just had. It is not a productivity tool. It is not a mental health tracker. It is a small visible witness to your days, and the noticing is the whole point.`,
    heroCopy: `A small pixel pet that noticed the month you just had.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `How does the pet "notice" you?`, a: `Through the daily check-in: a single sentence, a single mood tap, a single interaction that takes about ten seconds. The pet grows based on the pattern of those check-ins — faster when you are both consistent, slower but still moving when you are not. The noticing is not surveillance; it is accumulation.` },
      { q: `Is the pet aware of what I do outside the app?`, a: `No. The pet only knows what you tell it in the check-in, and nothing else. It does not see your browser history, your screen time, your other tabs, or your location. The noticing is limited to the intentional interaction, and that is the design.` },
    ],
    cta: `Let the pet notice the month you are about to have. Start free in your browser.`,
  },
}

// ─── Public lookup ──────────────────────────────────────────────────────────
const ALL_BODIES: Record<string, Body> = {
  ...self,
  ...bff,
  ...tmg,
  ...discovery,
}

export function getLandingBody(slug: string): Body | undefined {
  return ALL_BODIES[slug]
}

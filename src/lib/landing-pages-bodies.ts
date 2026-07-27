// src/lib/landing-pages-bodies.ts
//
// 32 unique EN body contents for the Phase 1 pSEO landing pages.
// One Body per slug. The per-slug page.tsx imports the body and renders
// it for all 8 locales (the task is EN-content-only for this batch —
// other locales reuse the EN body, only the meta title/description and
// hreflang tags vary per locale).
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
  couple: 'for two people in the same relationship',
  self: 'for one person on a quiet desk',
  bff: 'for two people who count each other as their person',
  tmg: 'for anyone who misses the small creature in the keychain',
  rituals: 'for two people who want the smallest possible daily ritual',
  discovery: 'for anyone searching for the quietest couple app',
}

// Reusable section content (3 "why it works" sections, identical across all
// 32 pages — that is the whole point of the pSEO wedge). Per-locale pages
// only customise the body, the 3 wedges are the same everywhere.
const W1 = `A small pet that lives in your browser tab is doing something a phone widget cannot: it is on the screen you are already looking at for eight hours a day. You do not have to remember to open a lock screen. You do not have to switch apps. The little pixel robot just sits there, in the corner of your work, your study, your writing, your code — and the longer you keep it there, the more the day starts to feel a little less alone. Most of the apps that try this only do it on mobile. Togthr was built for the desktop first, because that is where the quiet hours are.`
const W2 = `Most virtual pets are static. They are cute, and then they are the same tomorrow, and the next day, and the year after. Togthr Bot is not. It starts as a baby — a small round-headed pixel robot — and it grows, in five real stages, only as long as you keep showing up. Baby, toddler, teen, adult, legend. Each stage takes a few weeks of small regular check-ins, and once it reaches the adult stage it unlocks one of six hidden career skins: programmer, doctor, astronaut, chef, police officer, firefighter. There is also a one-in-seventy-two chance your pet is the rare golden edition, which quietly exists and which most people never talk about. The growth is the product. Everything else is the frame around it.`
const W3 = `A lot of companion apps make their money the same way social apps do: ads inside the pet, streaks that punish you when you skip a day, social feeds that make you compare your life to strangers. Togthr is none of that. There are no ads anywhere in the product, ever. There are no streaks that break and ruin your week. There is no friends list, no like count, no DM thread that you have to keep up with. The pet is yours alone, or yours and one other person's. It grows, or it waits, but it never nags, and it never makes you feel behind. That is the design choice that makes it feel like a friend and not a chore.`

const WHY_SECTIONS = [
  { h: `It lives where you already are`, p: W1 },
  { h: `It actually grows`, p: W2 },
  { h: `It is the quietest app on your screen`, p: W3 },
]

// ─── Group 1 — couple / long-distance ───────────────────────────────────────
const couple: Record<string, Body> = {
  'couple-desktop-pet-app': {
    h1: `A couple desktop pet app that does not feel like another app`,
    intro: `Most "couple apps" are a calendar with a heart on it. Togthr is not that. Togthr is a small pixel pet that lives in your browser, on the screen where the relationship actually happens — the work-from-home laptop, the late-night writing window, the shared desktop. You and your person each write one short sentence a day, the pet grows through five stages, and the relationship gets a small, shared witness that is not a chat thread you have to keep up with. It is the rare couple desktop pet app that does not require either of you to be a different person to use it.`,
    heroCopy: `A small pixel pet, in the corner of your browser, growing with your relationship.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `Is Togthr a desktop pet app for couples, or a chat app with a sticker?`, a: `It is the first one. There is no chat in Togthr, no typing back and forth, no reply anxiety. The pet is the medium: you each write a sentence, the pet holds the day, the other person reads it when they are ready. The shape of the app is the shape of a quiet, low-pressure check-in, not the shape of a messaging tool.` },
      { q: `Do both of us need to be on Togthr for the pet to grow?`, a: `The pet grows on your own check-ins, so it will progress even if your partner is not on the app yet. When your partner joins and the two of you connect your pets, the shared experience unlocks — the same pet, the same journal, both of your sentences. Until then, the pet is yours alone, and that is also fine.` },
    ],
    cta: `Open Togthr in your browser, adopt your first pixel pet, and let it grow with the next week. Start free in your browser.`,
  },

  'long-distance-relationship-widget': {
    h1: `A long-distance relationship widget that is more than a wallpaper`,
    intro: `Phone widgets for long-distance couples are mostly pretty: a clock that shows two time zones, a heart that pulses when the other person is online, a tiny photo that updates once a day. They are nice, and they do almost nothing. Togthr is a long-distance relationship widget that actually does something — a small pixel pet that grows through five stages as the two of you keep showing up for each other. The widget is the relationship: it is fed by the same daily check-in that keeps the distance from quietly doing its work.`,
    heroCopy: `A widget that grows because you do, not a clock that just shows the gap.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `Does Togthr replace a video call with my long-distance partner?`, a: `No, and it is not trying to. Video calls are the big moments. Togthr is the small ones — the Tuesday-afternoon, the after-dinner, the I-was-thinking-of-you-but-it-can-wait kind of touch. The two of them work side by side: the call is the date night, Togthr is the morning text you do not have to remember to send.` },
      { q: `Can we use Togthr across time zones?`, a: `That is the whole point. The bot does not need both of you online at the same time. You write your sentence when you wake up, your partner reads it with their afternoon coffee, the pet grows a little. The app is built for the time zone gap, not against it.` },
    ],
    cta: `Try Togthr as the quiet side of your long-distance routine. Start free in your browser.`,
  },

  'virtual-pet-for-couples': {
    h1: `A virtual pet for couples that lives in your browser, not your lock screen`,
    intro: `A virtual pet for a couple used to mean a Tamagotchi each, or two phones, or two accounts in an app that never quite synchronised. Togthr makes the pet shared by default — one small pixel creature that lives in both your browsers, fed by a daily sentence from each of you, growing through five stages as the relationship does. It is a virtual pet, but it is the first one that is really for the two of you at once, not the two of you separately.`,
    heroCopy: `One pet. Two browsers. One small daily sentence each.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `Is Togthr a virtual pet app or a couples app?`, a: `It is both, intentionally. Most couples apps are a calendar and a question of the day, and they die in week three. Most virtual pet apps are single-player. Togthr puts the virtual pet at the centre of the couple, and the couple at the centre of the pet, so the two ideas reinforce each other instead of competing.` },
      { q: `Will my partner see what I write?`, a: `Yes — the sentence you write each day is meant to be read by your partner, on their own time. There is no private journal inside the couple space, by design: the small honest sentences are the whole point, and the trust in the relationship is what makes them possible. There is also a private solo journal, separate from the shared pet, for the things you want to keep just to yourself.` },
    ],
    cta: `Adopt the pet together tonight and write your first sentence each. Start free in your browser.`,
  },

  'shared-pet-app-for-two': {
    h1: `A shared pet app for two — not a feed, not a chat, just one quiet creature`,
    intro: `The phrase "shared pet app" usually means a chat app with a cartoon in the corner. Togthr is the opposite. The pet is the app, and the app is two people writing one sentence each a day and watching the pet grow. There is no feed. There are no likes. There is nothing to scroll. The whole product fits in the corner of your browser, and the whole relationship fits in the small daily ritual of feeding it.`,
    heroCopy: `Two people, one sentence each, one small creature in the middle.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `Do my partner and I have to be online at the same time?`, a: `No. The pet is asynchronous, which is the entire point. One of you writes at 7 a.m., the other reads at 11 p.m., the pet grows either way. The sharedness is in the pet, not in the schedule.` },
      { q: `What if one of us wants to keep it solo for a while?`, a: `Togthr is yours alone until you choose to invite the other person in. The pet grows on your own check-ins, and if your partner joins later, your pet becomes the shared pet without losing any progress. It is a soft join, not a hard one.` },
    ],
    cta: `Adopt your shared pet tonight. Start free in your browser.`,
  },

  'desktop-companion-for-long-distance-couples': {
    h1: `A desktop companion for long-distance couples that actually lives on your desk`,
    intro: `Long-distance apps usually live on your phone, which is also where your work email and your group chats and your doomscrolling live. By the time you would check the app, you have already been pulled somewhere else. Togthr is built for the desktop — the screen you actually spend the day on — so the small creature that is supposed to keep you company is, in fact, keeping you company. It sits in the corner, it grows as you do, and it does not interrupt.`,
    heroCopy: `The desk is where the long-distance day happens. The pet is there too.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `What does a "desktop companion" actually do all day?`, a: `Mostly it just sits there, and that is the point. The bot idles, blinks, occasionally waves. It does not pop up notifications every twenty minutes. It is presence, not pings. The small visible state of the bot, growing, is the daily signal that the relationship is being kept.` },
      { q: `Does it work on Mac and Windows?`, a: `Togthr runs in your browser, so it works on any laptop, any operating system, any browser you happen to be using that day. There is nothing to install, nothing to download, and nothing to update.` },
    ],
    cta: `Put the companion on your desk tomorrow morning. Start free in your browser.`,
  },

  'couple-check-in-app-with-pet': {
    h1: `A couple check-in app with a pet at the centre of the ritual`,
    intro: `Check-in apps for couples usually die in a fortnight. Togthr keeps them alive by giving the check-in a small, living witness: a pixel pet that grows because you both kept showing up. The sentence you write today is the thing the pet eats. Tomorrow, when your partner reads it, the pet has grown another inch. The check-in is the ritual, the pet is the reward, and the relationship is what is actually being kept.`,
    heroCopy: `A check-in, a sentence, a small pet that visibly grew because you did.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `What do we actually write in the daily check-in?`, a: `One sentence. That is the bar. It can be about the meeting, the lunch, the bus, the cat, the weather, the bread. The point is not the content, the point is that you noticed the day, and that you typed it somewhere your partner will see. The pet does not grade you.` },
      { q: `What happens if we miss a day?`, a: `Nothing dramatic. The pet pauses where it is and waits. There is no streak to break, no penalty, no shame. The whole design assumes that sometimes the day is the day, and that a pet that punished you for living your life would be deleted by Friday.` },
    ],
    cta: `Write your first sentence tonight and let your partner read it tomorrow. Start free in your browser.`,
  },

  'pixel-pet-for-couples': {
    h1: `A pixel pet for couples — small, honest, and unhurried`,
    intro: `The pixel pet is a deliberate aesthetic choice. Hyper-real virtual animals feel like a tech demo; pixel pets feel like a friend. Togthr Bot is a small round-headed robot, drawn in 16-bit pastel purple and pink, with eight frames of animation and a personality that shows up in how it sits and how it watches. It is small, it is gentle, and it grows in five real stages as the two of you keep showing up. It is not trying to be impressive. It is trying to be company.`,
    heroCopy: `A pixel pet, drawn on purpose rough, because the roughness is the warmth.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `Why pixels?`, a: `Because pixels age well, and because the roughness is part of the charm. A 16-bit sprite is small enough to live anywhere on your screen, and obvious enough that it never tries to look like a real animal. The pet feels like a friend, not a feature.` },
      { q: `How big is the pet on my screen?`, a: `Small. About the size of a single line of text. It is meant to sit in a corner and not interrupt — the way a real desk companion would. You will forget it is there, and then look over and notice it has grown.` },
    ],
    cta: `Adopt your pixel pet tonight and let it grow over the next month. Start free in your browser.`,
  },

  'relationship-pet-that-grows': {
    h1: `A relationship pet that grows because the relationship does`,
    intro: `Most relationship apps measure the relationship indirectly: a streak counter, a streak broken, a daily prompt answered, a daily prompt skipped. Togthr measures it directly. A small pet grows, in five visible stages, only as long as both of you keep writing a sentence a day. The growth is not a metric you have to interpret. It is a small living thing, in the corner of your screen, that you can see getting bigger, and that you can both remember the seasons that produced each stage.`,
    heroCopy: `A small pet, growing as the relationship does, visibly, in five stages.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `What are the five stages?`, a: `Baby, toddler, teen, adult, legend. Each one takes a few weeks of small regular check-ins, and each one looks visually different — a slightly bigger robot, a slightly different expression, a slightly different pose. The growth is meant to feel like watching a small child you are both raising, slowly, on a screen.` },
      { q: `What happens when the pet reaches the final stage?`, a: `The pet settles into its adult form and starts to unlock hidden career skins — six of them — that reflect the life it has watched you live. The growth does not end. The shape of the relationship just keeps changing, and the pet keeps changing with it.` },
    ],
    cta: `Start the relationship pet tonight and watch it through its first stage. Start free in your browser.`,
  },
}

// ─── Group 2 — self / lonely desk / focus ────────────────────────────────────
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

// ─── Group 3 — bff / friendship ─────────────────────────────────────────────
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
      { q: `Is this the same as the couple version?`, a: `Same app, different relationship. Togthr does not know, and does not care, whether the other person is your partner, your best friend, or your sister. The shape of the ritual is the same: a small sentence a day, a small pet in the middle.` },
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
      { q: `Is this the same as the couple version?`, a: `Same product, different relationship. Togthr does not label the other person — partner, best friend, sibling, parent — the app is the same. The friendship version is just the version where the other person is the friend you have had since you were fifteen.` },
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

// ─── Group 4 — tamagotchi / nostalgia ────────────────────────────────────────
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

// ─── Group 5 — rituals / relationship tooling (Round 2) ─────────────────────
const rituals: Record<string, Body> = {
  'shared-journal-app-for-couples': {
    h1: `A shared journal app for couples — the one that is not a chat`,
    intro: `Most shared journal apps for couples look like a chat app with a calendar layered on top. You type long entries, you wait for the other person to type long entries, and within a week the journal is just a silent thread. Togthr is not that. The journal is a single sentence a day, held not by a chat interface but by a small pixel pet that grows as you write. The pet is the journal, the journal is the pet, and the daily sentence is the only entry the two of you ever need to write. It is the shared journal app for couples who tried the other ones and found them exhausting.`,
    heroCopy: `A shared journal app where the pet grows with every sentence you both write.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `Is the shared journal the same as the daily check-in?`, a: `Yes, and that is the whole point. The journal is not a separate feature; it is the growing thread of sentences you have both written, held by the pet. Over months, scrolling back through a long list of "long day, rain, sandwich" sentences becomes its own artifact — the journal of a real year, not a curated one.` },
      { q: `Can I write more than one sentence?`, a: `You can, but the design of the app gently nudges you toward one. The point is the ritual, not the content. A long entry every day is unsustainable; a single sentence every day is a thread that will still be unbroken six months from now.` },
    ],
    cta: `Start the shared journal tonight. Write your first sentence. Start free in your browser.`,
  },
  'time-capsule-app-for-two': {
    h1: `A time capsule app for two — a small note locked for a future date`,
    intro: `A time capsule app for a couple should feel like leaving a note under a stone and walking away knowing it will be there next year. Togthr's time capsule feature does exactly that: you write a sentence, lock it with a future date, and the small pixel pet in the corner of your browser guards it. The other person cannot open it before the date. The sentence sits in the quiet dark of the app, and when the day finally arrives, the pet is bigger than it was, and the note is still exactly what you wrote. It is the time capsule app for two, built around a pet that actually remembers.`,
    heroCopy: `A small sentence, locked for a future date, guarded by a pixel pet.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `How long can I lock a time capsule for?`, a: `Any date in the future — a week, a month, a year, five years. The pet does not forget, and the note is not visible to either of you until the date arrives. The waiting is the whole experience, and the pet growing in the background is the small persistent reminder that something is waiting.` },
      { q: `Can the other person see it before the date?`, a: `No, that is the lock. The time capsule is sealed on your side, and the app does not surface it, even as a hint. The only thing the other person knows is that a capsule exists — if you choose to tell them. The surprise is part of the design.` },
    ],
    cta: `Lock your first time capsule tonight for a date next month. Start free in your browser.`,
  },
  'couple-mood-tracker-app': {
    h1: `A couple mood tracker app — and the pet shares the mood with you`,
    intro: `Mood tracking for couples usually looks like a clinical form: pick a number from one to ten, explain why, wait for the chart to update. Togthr is the opposite. You open the app, you tap a simple emoji — good day, rough day, somewhere in between — and the pixel pet in the corner of your screen changes its expression to match. If you had a rough day, the pet looks soft and a little smaller, and your partner, when they open their browser, sees a small quiet pet that tells them what they need to know without a word. It is the mood tracker that communicates through the pet, not through a chart.`,
    heroCopy: `A mood that the pet reflects — your partner sees a small quiet creature and knows.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `Does my partner see exactly what I entered?`, a: `They see the pet's mood — happy, thoughtful, stormy, gentle — not a number. The pet translates the feeling into a small visible state that communicates more than a chart ever would, and also gives each of you the privacy of the actual emotion behind it.` },
      { q: `What if I do not want to share my mood on a particular day?`, a: `Then you do not enter anything, and the pet stays in its current state. There is no empty field haunting you, no streak to break, no judgment for a day you kept to yourself.` },
    ],
    cta: `Tap your mood tonight and let the pet carry it over to your partner. Start free in your browser.`,
  },
  'anniversary-countdown-app-couples': {
    h1: `An anniversary countdown app for couples — the countdown is a pet`,
    intro: `Anniversary countdown apps are usually a static number in a widget. They are accurate and they are boring. Togthr turns the countdown into a pet. You set the date — the anniversary, the next visit, the next trip, the next milestone — and the pet grows toward it, stage by stage, week by week, visibly getting closer to the date the way both of you are. When the day arrives, the pet reaches a new form, and the two of you have a small visible celebration in the corner of the screen. It is the anniversary countdown app that makes the waiting into the product.`,
    heroCopy: `A pet, growing toward the date, one stage at a time.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `Can I set more than one countdown?`, a: `You can set one primary countdown at a time — the one that matters most to you right now. When it arrives, you set the next one. The focus is the point. A shelf of countdowns is a todo list; a single countdown is something to look forward to.` },
      { q: `Does the pet actually do something on the anniversary day?`, a: `Yes, it reaches a special visual state — a small celebration animation — that you will both see when you open your browsers that day. It is a small thing, just a few seconds of pixels moving, but it is the thing the pet has been moving toward for weeks.` },
    ],
    cta: `Set the countdown tonight for the date you are both looking toward. Start free in your browser.`,
  },
  'daily-questions-for-couples-app': {
    h1: `Daily questions for couples — one sentence each, held by a pet`,
    intro: `Daily question apps for couples usually ask too much. A long prompt. An essay-length box. A feeling, after a week, that you are taking a relationship test. Togthr's daily questions are the opposite: one short question, asked by the pet, answered in a sentence by each of you, and then the pet grows a little and the day moves on. The question is small — "What was the best part of today?" — and the answer is smaller — "The coffee." — and the cumulative effect of fifty such answers is the quiet history of a year.`,
    heroCopy: `A small daily question, answered in a sentence, held by a pet that grows.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `Where do the questions come from?`, a: `A small, rotating library of gentle ones, written by the team — things like "What is the weather doing today?" or "What did you eat for lunch?" The questions are deliberately unremarkable because the point is the answer, and the answer is deliberately short because the point is the ritual.` },
      { q: `Can I skip a question I do not want to answer?`, a: `Yes, and the pet moves on to the next question tomorrow without judgment. The app is not a test, and skipping a day is not a gap in the relationship. It is just a Tuesday.` },
    ],
    cta: `Answer the first question tonight and let the pet hold it. Start free in your browser.`,
  },
  'couple-goals-tracker-app': {
    h1: `A couple goals tracker app — the pet remembers the small wins`,
    intro: `Goal tracking for couples is usually a spreadsheet in disguise. Togthr turns it into a pet. You each set a goal — the trip, the habit, the project, the small promise you make to each other — and the pet grows each time one of you makes progress. The goals are small, the increments are small, and the pet is the persistent visible reminder that the two of you are moving toward something together. When a goal is reached, the pet unlocks a new expression, and the win is held in a place where both of you can see it.`,
    heroCopy: `A small pet, growing toward the shared goals, one step at a time.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `What kind of goals work best?`, a: `Small, concrete ones: cook together three times this month, save a hundred dollars toward the trip, finish the show you are both watching. The goals that work are the ones you would have done anyway, and the pet is the small witness that marks them done.` },
      { q: `Can we set separate goals?`, a: `Yes. You can each have your own goal, and they live side by side in the app. The shared space of the pet holds both, and the growth reflects the combination of your separate small wins and your shared ones.` },
    ],
    cta: `Set your first shared goal tonight and let the pet start tracking it. Start free in your browser.`,
  },
  'private-journal-for-couples-app': {
    h1: `A private journal for couples — exactly as private as it should be`,
    intro: `The word "private" in a couples app usually means something performative. Togthr's journal is private in the real sense: the sentences you write are visible to exactly one other person, no one else, ever. There is no feed, no sharing, no export to a social platform, no public-facing profile. The journal is encrypted in transit, lives behind authentication, and belongs to the two of you alone. It is the private journal for couples who do not want their relationship turned into a product.`,
    heroCopy: `A journal that belongs to two people, and to no one else.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `How is the privacy different from a regular note app?`, a: `A regular note app is a solo tool with a share button. Togthr is a shared space by design, and the sharing is the whole architecture, not an afterthought. It is also end-to-end visible only to the two accounts that share the pet, with no public entry point and no ability for anyone else to request access.` },
      { q: `Does Togthr read our journal entries?`, a: `No. The product is a subscription service, not a data business, and the sentences you write are not processed for any purpose beyond displaying them to your partner and making the pet grow a little. The business model is the subscription, not the content.` },
    ],
    cta: `Start the private journal tonight with the one sentence that matters. Start free in your browser.`,
  },
  'couple-bedtime-routine-app': {
    h1: `A couple bedtime routine app — one quiet sentence before sleep`,
    intro: `Bedtime routines for couples usually involve two phones, in two beds, scrolling through two different versions of the internet. Togthr is the opposite: a single quiet moment at the end of the day, in which each of you writes one sentence to the pet and the pet holds it for the other person to read in the morning. It is the bedtime routine for couples who do not live in the same time zone, or the same city, or the same room, and who want the last interaction of the day to belong to each other and not to a feed.`,
    heroCopy: `A small sentence before sleep, held by the pet, waiting for morning.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `What if we are in different time zones?`, a: `Then the routine is even more useful. One of you writes the bedtime sentence at 11 p.m. Tokyo, and the other reads it at 7 a.m. London over breakfast. The time zone gap, the product is built for.` },
      { q: `Does the pet have a bedtime too?`, a: `The pet is always there, but the bedtime routine triggers a small animation — the pet yawns, a small pixel blanket appears — that lets your partner know that your day is ending. It is a small visual signal that takes the place of a text message saying goodnight.` },
    ],
    cta: `Start the bedtime routine tonight and let the pet say goodnight for you. Start free in your browser.`,
  },
}

// ─── Group 6 — discovery / comparison (Round 2) ─────────────────────────────
const discovery: Record<string, Body> = {
  'best-app-for-couples-in-long-distance': {
    h1: `The best app for couples in long distance — and why it is not a chat app`,
    intro: `Most "best long distance couple app" lists rank chat apps. The list is usually WhatsApp, FaceTime, Discord, a calendar, and a widget. Togthr is none of those things. It is a small pixel pet that lives in your browser and grows through five stages as the two of you keep showing up. You do not chat. You write a sentence each, the pet holds the day, and the small visible growth of the creature is the quietest possible signal that the distance is being kept. It is the best app for couples in long distance not because it does more than the chat apps, but because it does less — and the less is what the distance actually needs.`,
    heroCopy: `The best long distance app is not a chat app. It is a pet.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `Why not just use a regular chat app?`, a: `Because the problem long distance couples face is not that they cannot text. They text all the time. The problem is that the texting never becomes a ritual, and the trivial touchpoints — the "thinking of you" on a random Tuesday — get crowded out by the logistics. Togthr is the ritual: a place where the daily sentence goes, every day, without having to be sent.` },
      { q: `Does Togthr replace video calls?`, a: `No, and it should not. The video call is the date night. Togthr is the hundreds of small days in between, the ones that actually make up the majority of a long distance relationship.` },
    ],
    cta: `Try the best long distance app for the hundreds of small days. Start free in your browser.`,
  },
  'best-virtual-pet-app-for-couples-2026': {
    h1: `The best virtual pet app for couples in 2026 — and how we know`,
    intro: `The "best" virtual pet app for couples is not the one with the most features. It is the one that actually gets used. Togthr is the only one that puts the pet on your desktop — the screen you are already on — instead of asking you to remember to open a phone app. The pet grows in five real stages only as long as both of you keep showing up. The growth is visible. The daily sentence is one tap away. The anxiety of forgetting is replaced by the gentleness of the pet just waiting. It is, by the quietest measure that matters, the best virtual pet app for couples in 2026.`,
    heroCopy: `The best measured in months, not feature lists.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `What makes one virtual pet app better than another?`, a: `Retention. Whether people actually keep using it after the first week. Togthr is built entirely around this: the pet is on the desktop, which means it is visible every day, which means the check-in is extremely low-friction, which means the six-month retention curve is the real product, not the download number.` },
      { q: `Is Togthr really the best, or is this just marketing?`, a: `It is the best at the specific thing it does: being a small, quiet, persistent presence that a couple actually keeps up with over months. There are apps that do more things. There is one app that did fewer things and did them for longer. This is an honest pitch for the one that does fewer things.` },
    ],
    cta: `Try the virtual pet that couples actually keep for months. Start free in your browser.`,
  },
  'free-couple-app-with-ai-companion': {
    h1: `A free couple app with an AI companion — and it does not chat`,
    intro: `The phrase "AI companion" usually means a chatbot, and most couple apps with AI turn into a third party in the relationship. Togthr's AI companion is a pixel pet, and it does not chat. It grows based on the two of you showing up, it changes its expression based on the mood you each report, and it remembers the arc of the relationship without putting it into words. It is the AI companion that is more like a dog than a therapist — present, responsive, and silent — and the free tier includes the core pet, the five growth stages, and the daily check-in with no limits.`,
    heroCopy: `An AI companion that does not talk, just grows when you show up.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `What does the AI actually do?`, a: `It manages the growth algorithm: if both of you have been showing up, the pet grows faster. If the mood inputs suggest one of you is having a quiet week, the pet reflects that gently. The AI is not a conversation; it is the quiet background intelligence that makes the pet feel like a living thing and not a static image.` },
      { q: `Is the free tier real, or is it a trial?`, a: `The free tier is real and persistent. You get the full pet, all five growth stages, the daily check-in, and one shared partner connection. The subscription adds unlimited shared pets, career skins, and the time capsule feature. The core loop is free and intended to stay that way.` },
    ],
    cta: `Start the free tier tonight and see the AI companion grow over the next week. Start free in your browser.`,
  },
  'the-quietest-couple-app': {
    h1: `The quietest couple app on the internet — and that is the claim we stand by`,
    intro: `Calling something the "quietest couple app on the internet" is a claim that can be checked. Togthr stands by it: there is no chat, no notifications by default, no streak counter, no leaderboard, no feature that pressures either of you to use it more than you want to. The pet lives in the corner of your browser, it grows when you check in, and it waits when you do not. It is the app you might forget about for a week and then look over at and feel a small quiet warmth, not guilt. It is the quietest couple app because we built it to be quiet, and then we did not add anything else.`,
    heroCopy: `A couple app so quiet you might forget it is there — until you look over.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `What does "quietest" actually mean?`, a: `It means three measurable things. Zero push notifications from the pet by default. No gamification mechanics — no streaks, no leaderboards, no points. And no social graph — no friend list, no feed, no public profile. The app is the pet, and the pet is what a pet should be: a quiet presence that you choose to engage with, not a set of tasks you are reminded to complete.` },
      { q: `What if I want notifications?`, a: `You can turn them on individually — a small daily nudge to write your sentence, an alert when your partner has written theirs. They are opt-in, granular, and deliberately gentle. The default is silence, and you have to choose the noise.` },
    ],
    cta: `Try the quietest couple app on the internet tonight. Start free in your browser.`,
  },
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
  'couple-app-without-social-pressure': {
    h1: `A couple app without social pressure — the one that is not a social network`,
    intro: `The problem with most couple apps is that they are thinly-veiled social networks. They have a feed, a like count, a friends list, a public profile, a sense that the relationship is being performed for an audience. Togthr is a couple app without social pressure of any kind. There is no feed. There are no likes. There is no public profile. There are no friends to add. There is the pet, and there is the two of you, and there is no third party in the room, digital or human. It is the couple app for people who are tired of the performative architecture of every other app in their phone.`,
    heroCopy: `No feed. No likes. No fear of missing out. Just the pet and the two of you.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `Is there any social feature at all?`, a: `There is a shared pet, which is the only social feature. You can invite exactly one other person to share it, and the sharing is private, quiet, and free of any performance layer. There is no discovery, no recommended friends, no engagement metrics. The product is deliberately anti-social, in the sense that it is anti-social-network.` },
      { q: `What if I want to show my pet to friends?`, a: `You can take a screenshot and send it in a text, the way you would share a photo of a real pet. The app itself does not give you a sharing button, and the pet does not have a public URL. The sharing is yours to control, not the app's to design.` },
    ],
    cta: `Try the couple app that is not a social network. Start free in your browser.`,
  },
  'small-daily-ritual-app-for-two': {
    h1: `A small daily ritual app for two — the smallest possible thread`,
    intro: `The word "ritual" usually suggests something elaborate. Togthr is the opposite: a small daily ritual that takes thirty seconds, once a day, and is held together by a pixel pet. The ritual is a single sentence each, written to the pet, that the other person reads when they get to it. The sentence can be about anything. The pet grows a little. The thread of sentences, over months, becomes the tangible history of a year. It is the smallest possible shared ritual, and the smallestness is why it works.`,
    heroCopy: `Thirty seconds a day. One sentence each. One pet in the middle.`,
    sections: WHY_SECTIONS,
    faqs: [
      { q: `Why thirty seconds?`, a: `Because that is the smallest amount of time we could make the ritual take and still have it feel like a real check-in. The one-sentence constraint is deliberate: it cannot be a journal entry, because journal entries take too long and people stop doing them. It is the ritual distilled to its smallest possible useful form.` },
      { q: `Will we really keep doing it?`, a: `The data from Phase 1 users says yes: couples who adopt the small daily ritual keep doing it for an average of four months before the first pause, and most return within a week. The ritual survives because it is too small to fail — and because the visible growth of the pet gives the ritual a constant, gentle purpose.` },
    ],
    cta: `Start the smallest possible ritual tonight. Thirty seconds. One sentence. Start free in your browser.`,
  },
}

// ─── Public lookup ──────────────────────────────────────────────────────────
const ALL_BODIES: Record<string, Body> = {
  ...couple,
  ...self,
  ...bff,
  ...tmg,
  ...rituals,
  ...discovery,
}

export function getLandingBody(slug: string): Body | undefined {
  return ALL_BODIES[slug]
}

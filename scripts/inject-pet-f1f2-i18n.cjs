// scripts/inject-pet-f1f2-i18n.cjs
// Adds F1/F2 i18n keys to all 8 locale JSON files.
const fs = require('fs');
const path = require('path');

const MESSAGES = path.resolve(__dirname, '..', 'messages');
const locales = ['en', 'zh-cn', 'zh-tw', 'ja', 'ko', 'de', 'fr', 'es'];

const KEYS = {
  en: {
    traceTitle: "Your partner's activity",
    traceEmpty: "Your first shared moments will appear here.",
    signalThinking: "Thinking of you",
    signalHug: "Hug",
    signalTired: "Tired",
    streakFrozen: "Streak paused — one interaction wakes it up",
  },
  'zh-cn': {
    traceTitle: "伴侣动态",
    traceEmpty: "你们的第一次互动会出现在这里。",
    signalThinking: "想你",
    signalHug: "抱抱",
    signalTired: "累了",
    streakFrozen: "连击暂停中，一次互动即可唤醒。",
  },
  'zh-tw': {
    traceTitle: "伴侶動態",
    traceEmpty: "你們的第一次互動會出現在這裡。",
    signalThinking: "想你",
    signalHug: "抱抱",
    signalTired: "累了",
    streakFrozen: "連擊暫停中，一次互動即可喚醒。",
  },
  ja: {
    traceTitle: "パートナーの動き",
    traceEmpty: "初めてのふれあいがここに表示されます。",
    signalThinking: "会いたい",
    signalHug: "ハグ",
    signalTired: "疲れた",
    streakFrozen: "連続記録が一時停止中 — 一度触れれば再開します。",
  },
  ko: {
    traceTitle: "파트너 활동",
    traceEmpty: "첫 번째 상호작용이 여기에 표시됩니다.",
    signalThinking: "보고 싶어",
    signalHug: "포옹",
    signalTired: "피곤해",
    streakFrozen: "연속 기록이 일시 중지되었습니다 — 한 번 상호작용하면 다시 시작됩니다.",
  },
  de: {
    traceTitle: "Aktivität deines Partners",
    traceEmpty: "Eure ersten gemeinsamen Momente erscheinen hier.",
    signalThinking: "Denk an dich",
    signalHug: "Umarmung",
    signalTired: "Müde",
    streakFrozen: "Serie pausiert — eine Interaktion weckt sie wieder auf.",
  },
  fr: {
    traceTitle: "Activité de votre partenaire",
    traceEmpty: "Vos premiers moments partagés apparaîtront ici.",
    signalThinking: "Je pense à toi",
    signalHug: "Câlin",
    signalTired: "Fatigué(e)",
    streakFrozen: "Série en pause — une interaction la réveille.",
  },
  es: {
    traceTitle: "Actividad de tu pareja",
    traceEmpty: "Sus primeros momentos compartidos aparecerán aquí.",
    signalThinking: "Pensando en ti",
    signalHug: "Abrazo",
    signalTired: "Cansado/a",
    streakFrozen: "Racha en pausa — una interacción la despierta.",
  },
};

for (const loc of locales) {
  const file = path.join(MESSAGES, `${loc}.json`);
  const json = JSON.parse(fs.readFileSync(file, 'utf-8'));

  if (!json.pet) json.pet = {};
  const petKeys = KEYS[loc] ?? KEYS.en;
  let added = 0;
  for (const [k, v] of Object.entries(petKeys)) {
    if (!json.pet[k]) { json.pet[k] = v; added++; }
  }

  fs.writeFileSync(file, JSON.stringify(json, null, 2) + '\n', 'utf-8');
  console.log(`[OK] ${loc} — added ${added} pet keys`);
}

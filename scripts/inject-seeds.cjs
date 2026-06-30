// 给 8 个 locale 的 journal namespace 加上 seedEntries 翻译
const fs = require('fs');
const path = require('path');

const SEEDS = {
  'en': {
    e1: 'Beautiful day today. Went out for a long walk.',
    e2: 'Snowfall at last! Cozy season is here.',
    e3: 'Our first Christmas together 🎄',
  },
  'zh-cn': {
    e1: '今天天气很好，出去走了走。',
    e2: '下雪了！南方人激动坏了。',
    e3: '第一次一起过圣诞 🎄',
  },
  'zh-tw': {
    e1: '今天天氣很好，出去走了走。',
    e2: '下雪了！南方人激動壞了。',
    e3: '第一次一起過聖誕 🎄',
  },
  'ja': {
    e1: '今日はいい天気。散歩に出かけた。',
    e2: '雪が降ってきた！南国の人は大興奮。',
    e3: '初めてのクリスマスを一緒に 🎄',
  },
  'ko': {
    e1: '오늘 날씨 좋아서 산책 다녀왔어요.',
    e2: '눈이 왔어요! 남쪽 사람이 신났어요.',
    e3: '처음 함께한 크리스마스 🎄',
  },
  'es': {
    e1: 'Buen tiempo hoy, salimos a caminar un rato.',
    e2: '¡Por fin nieve! Estamos emocionados.',
    e3: 'Nuestra primera Navidad juntos 🎄',
  },
  'fr': {
    e1: "Beau temps aujourd'hui, on est sortis marcher.",
    e2: 'De la neige enfin ! On est tout excités.',
    e3: 'Notre premier Noël ensemble 🎄',
  },
  'de': {
    e1: 'Schönes Wetter heute, wir waren spazieren.',
    e2: 'Schnee endlich! Wir sind ganz aufgeregt.',
    e3: 'Unser erstes Weihnachten zusammen 🎄',
  },
};

function injectSeedEntries(json, locale) {
  const seeds = SEEDS[locale];
  const block = ',\n    "seedEntries": {\n      "e1": { "text": ' + JSON.stringify(seeds.e1) + ', "mood": "warm" },\n      "e2": { "text": ' + JSON.stringify(seeds.e2) + ', "mood": "cool" },\n      "e3": { "text": ' + JSON.stringify(seeds.e3) + ', "mood": "festive" }\n    }';

  const idx = json.lastIndexOf('"stageName"');
  if (idx < 0) throw new Error('No stageName in ' + locale);

  let depth = 0;
  let i = idx;
  while (i < json.length) {
    if (json[i] === '{') depth++;
    else if (json[i] === '}') { depth--; if (depth === 0) break; }
    i++;
  }
  if (depth !== 0) throw new Error('No matching } for stageName in ' + locale);

  return json.substring(0, i + 1) + block + json.substring(i + 1);
}

for (const locale of Object.keys(SEEDS)) {
  const file = path.join('messages', locale + '.json');
  const orig = fs.readFileSync(file, 'utf8');
  if (orig.includes('"seedEntries"')) {
    console.log(locale, 'already has seedEntries, skip');
    continue;
  }
  const updated = injectSeedEntries(orig, locale);
  try { JSON.parse(updated); } catch (e) {
    console.log(locale, 'JSON PARSE FAILED:', e.message);
    continue;
  }
  fs.writeFileSync(file, updated);
  console.log(locale, 'updated', orig.length, '->', updated.length);
}

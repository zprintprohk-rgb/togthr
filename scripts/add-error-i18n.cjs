/**
 * Add errorPage namespace to all 8 locale files.
 * Insert before the final closing '}'
 */
const fs = require('fs')
const path = require('path')

const msgsDir = path.resolve(__dirname, '../messages')

const errorPageBlock = {
  en: {
    errorPage: {
      title: 'Something went sideways',
      message: 'The page hit a snag. Your pet is on it.',
      tryAgain: 'Try again',
      home: 'Home',
      errorId: 'Error ID',
    },
  },
  'zh-cn': {
    errorPage: {
      title: '出了点小状况',
      message: '页面遇到了小问题。你的宠物正在处理。',
      tryAgain: '重试',
      home: '首页',
      errorId: '错误 ID',
    },
  },
  'zh-tw': {
    errorPage: {
      title: '出了點小狀況',
      message: '頁面遇到了小問題。你的寵物正在處理。',
      tryAgain: '重試',
      home: '首頁',
      errorId: '錯誤 ID',
    },
  },
  ja: {
    errorPage: {
      title: '問題が発生しました',
      message: 'ページでエラーが発生しました。ペットが対応中です。',
      tryAgain: '再試行',
      home: 'ホーム',
      errorId: 'エラー ID',
    },
  },
  ko: {
    errorPage: {
      title: '문제가 발생했습니다',
      message: '페이지에 오류가 발생했습니다. 펫이 처리 중입니다.',
      tryAgain: '다시 시도',
      home: '홈',
      errorId: '오류 ID',
    },
  },
  de: {
    errorPage: {
      title: 'Etwas ist schiefgelaufen',
      message: 'Die Seite hat ein Problem. Dein Haustier kümmert sich darum.',
      tryAgain: 'Erneut versuchen',
      home: 'Startseite',
      errorId: 'Fehler-ID',
    },
  },
  fr: {
    errorPage: {
      title: 'Quelque chose a mal tourné',
      message: 'La page a rencontré un problème. Votre animal s\'en occupe.',
      tryAgain: 'Réessayer',
      home: 'Accueil',
      errorId: 'ID d\'erreur',
    },
  },
  es: {
    errorPage: {
      title: 'Algo salió mal',
      message: 'La página encontró un problema. Tu mascota está en ello.',
      tryAgain: 'Intentar de nuevo',
      home: 'Inicio',
      errorId: 'ID de error',
    },
  },
}

const langMap = {
  'en.json': 'en',
  'zh-cn.json': 'zh-cn',
  'zh-tw.json': 'zh-tw',
  'ja.json': 'ja',
  'ko.json': 'ko',
  'de.json': 'de',
  'fr.json': 'fr',
  'es.json': 'es',
}

for (const [filename, lang] of Object.entries(langMap)) {
  if (filename.endsWith('.bak')) continue
  const filePath = path.join(msgsDir, filename)
  const raw = fs.readFileSync(filePath, 'utf-8').trimEnd()

  // The file ends with `\n}` — insert before that
  if (raw.endsWith('}')) {
    const block = errorPageBlock[lang]
    if (!block) {
      console.error(`No translation for ${lang}`)
      continue
    }
    const json = JSON.stringify(block, null, 2)
    // Remove outer braces — we want just the inner content
    const inner = json.slice(1, -1).trim()
    const newContent = raw.slice(0, -1) + ',\n' + inner + '\n}\n'
    fs.writeFileSync(filePath, newContent, 'utf-8')
    console.log(`✅ ${filename} — errorPage added`)
  } else {
    console.error(`❌ ${filename} does not end with '}'`)
  }
}

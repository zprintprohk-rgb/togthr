// scripts/add-feedback-i18n.cjs
// Adds "feedback" namespace to all 8 locale JSON files.
// Idempotent: skips locales that already have "feedback".
const fs = require('fs');
const path = require('path');

const MESSAGES = path.resolve(__dirname, '..', 'messages');

const locales = ['en', 'zh-cn', 'zh-tw', 'ja', 'ko', 'de', 'fr', 'es'];

const FEEDBACK = {
  en: {
    title: "Got feedback?",
    typeLabel: "Type",
    messageLabel: "What's on your mind?",
    messagePlaceholder: "Tell us what you'd like to see, or what broke...",
    emailLabel: "Your email (optional, for follow-up)",
    emailPlaceholder: "you@example.com",
    send: "Send feedback",
    sending: "Sending…",
    sentTitle: "Thanks — we got your message and will get back within 48 hours.",
    error: "Something went wrong. Please try again.",
    types: {
      bug: "Bug report",
      feature: "Feature request",
      billing: "Billing question",
      general: "General feedback",
    },
  },
  'zh-cn': {
    title: "有反馈？",
    typeLabel: "类型",
    messageLabel: "你想说什么？",
    messagePlaceholder: "告诉我们你想看到什么，或者哪里坏了...",
    emailLabel: "你的邮箱（选填，用于后续回复）",
    emailPlaceholder: "you@example.com",
    send: "发送反馈",
    sending: "发送中…",
    sentTitle: "谢谢 — 已收到你的消息，48 小时内回复。",
    error: "出了点问题。请再试一次。",
    types: {
      bug: "Bug 报告",
      feature: "功能建议",
      billing: "支付问题",
      general: "通用反馈",
    },
  },
  'zh-tw': {
    title: "有回饋？",
    typeLabel: "類型",
    messageLabel: "你想說什麼？",
    messagePlaceholder: "告訴我們你想看到什麼，或哪裡壞了...",
    emailLabel: "你的信箱（選填，用於後續回覆）",
    emailPlaceholder: "you@example.com",
    send: "發送回饋",
    sending: "發送中…",
    sentTitle: "謝謝 — 已收到你的訊息，48 小時內回覆。",
    error: "出了點問題。請再試一次。",
    types: {
      bug: "Bug 報告",
      feature: "功能建議",
      billing: "支付問題",
      general: "通用回饋",
    },
  },
  ja: {
    title: "フィードバックがありますか？",
    typeLabel: "種類",
    messageLabel: "何をお考えですか？",
    messagePlaceholder: "見たい機能や、壊れているところを教えてください...",
    emailLabel: "メールアドレス（任意、返信用）",
    emailPlaceholder: "you@example.com",
    send: "フィードバックを送信",
    sending: "送信中…",
    sentTitle: "ありがとうございます — メッセージを受け取りました。48時間以内に返信します。",
    error: "問題が発生しました。もう一度お試しください。",
    types: {
      bug: "バグ報告",
      feature: "機能リクエスト",
      billing: "お支払いについて",
      general: "一般的なフィードバック",
    },
  },
  ko: {
    title: "피드백이 있으신가요?",
    typeLabel: "유형",
    messageLabel: "무슨 생각을 하고 계신가요?",
    messagePlaceholder: "보고 싶은 기능이나, 고장난 부분을 알려주세요...",
    emailLabel: "이메일 (선택, 답변용)",
    emailPlaceholder: "you@example.com",
    send: "피드백 보내기",
    sending: "보내는 중…",
    sentTitle: "감사합니다 — 메시지를 받았습니다. 48시간 내에 답변 드리겠습니다.",
    error: "문제가 발생했습니다. 다시 시도해 주세요.",
    types: {
      bug: "버그 신고",
      feature: "기능 요청",
      billing: "결제 문의",
      general: "일반 피드백",
    },
  },
  de: {
    title: "Feedback?",
    typeLabel: "Typ",
    messageLabel: "Was liegt Ihnen auf dem Herzen?",
    messagePlaceholder: "Sagen Sie uns, was Sie sehen möchten oder was kaputt ist...",
    emailLabel: "Ihre E-Mail (optional, für Rückfragen)",
    emailPlaceholder: "you@example.com",
    send: "Feedback senden",
    sending: "Wird gesendet…",
    sentTitle: "Danke — wir haben Ihre Nachricht erhalten und melden uns innerhalb von 48 Stunden.",
    error: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
    types: {
      bug: "Fehler melden",
      feature: "Funktionswunsch",
      billing: "Abrechnungsfrage",
      general: "Allgemeines Feedback",
    },
  },
  fr: {
    title: "Un avis ?",
    typeLabel: "Type",
    messageLabel: "Qu'avez-vous en tête ?",
    messagePlaceholder: "Dites-nous ce que vous aimeriez voir, ou ce qui ne marche pas...",
    emailLabel: "Votre e-mail (facultatif, pour vous répondre)",
    emailPlaceholder: "you@example.com",
    send: "Envoyer",
    sending: "Envoi en cours…",
    sentTitle: "Merci — nous avons bien reçu votre message et vous répondrons sous 48 heures.",
    error: "Un problème est survenu. Veuillez réessayer.",
    types: {
      bug: "Signaler un bug",
      feature: "Suggestion",
      billing: "Question de facturation",
      general: "Avis général",
    },
  },
  es: {
    title: "¿Tienes feedback?",
    typeLabel: "Tipo",
    messageLabel: "¿Qué tienes en mente?",
    messagePlaceholder: "Dinos qué te gustaría ver, o qué está roto...",
    emailLabel: "Tu email (opcional, para respuesta)",
    emailPlaceholder: "you@example.com",
    send: "Enviar feedback",
    sending: "Enviando…",
    sentTitle: "Gracias — recibimos tu mensaje y te responderemos en 48 horas.",
    error: "Algo salió mal. Inténtalo de nuevo.",
    types: {
      bug: "Reportar bug",
      feature: "Sugerencia",
      billing: "Consulta de pago",
      general: "Feedback general",
    },
  },
};

for (const loc of locales) {
  const file = path.join(MESSAGES, `${loc}.json`);
  const raw = fs.readFileSync(file, 'utf-8');
  const json = JSON.parse(raw);

  if (json.feedback) {
    console.log(`[SKIP] ${loc} already has feedback namespace`);
    continue;
  }

  json.feedback = FEEDBACK[loc] ?? FEEDBACK.en;

  // Pretty-print with 2-space indent matching project convention
  fs.writeFileSync(file, JSON.stringify(json, null, 2) + '\n', 'utf-8');
  console.log(`[OK] ${loc} — added feedback (${Object.keys(FEEDBACK[loc]).length} keys)`);
}

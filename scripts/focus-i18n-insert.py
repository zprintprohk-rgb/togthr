#!/usr/bin/env python3
"""Focus Mode i18n 精准插入：nav.focus + home.companions.cards.focus + focus 命名空间（8 语言）"""
import json, re, sys

NAV_FOCUS = {
    'en': 'Focus', 'zh-cn': '专注', 'zh-tw': '專注', 'ja': '集中',
    'ko': '집중', 'de': 'Fokus', 'fr': 'Focus', 'es': 'Enfoque',
}

CARD_FOCUS = {
    'en':    {'title': 'Focus Mode', 'desc': 'Your pet studies & works beside you'},
    'zh-cn': {'title': '专注模式', 'desc': '公仔陪你一起学习工作'},
    'zh-tw': {'title': '專注模式', 'desc': '公仔陪你一起學習工作'},
    'ja':    {'title': 'フォーカスモード', 'desc': 'ペットがそばで一緒に勉強・仕事'},
    'ko':    {'title': '포커스 모드', 'desc': '펫이 곁에서 함께 공부하고 일해요'},
    'de':    {'title': 'Fokus-Modus', 'desc': 'Dein Pet lernt und arbeitet neben dir'},
    'fr':    {'title': 'Mode Focus', 'desc': 'Ton compagnon étudie et travaille à tes côtés'},
    'es':    {'title': 'Modo Enfoque', 'desc': 'Tu mascota estudia y trabaja a tu lado'},
}

FOCUS = {
    'en': {
        'title': 'Focus Mode',
        'subtitle': 'A tiny robot keeps you company while you work.',
        'chooseDuration': 'How long shall we focus together?',
        'minutes': '{minutes} min',
        'start': 'Start focusing',
        'giveUp': 'End this session',
        'awayNotice': "I'm waiting for you…",
        'welcomeBack': "Welcome back — let's keep going!",
        'completeTitle': 'You did it!',
        'completeDesc': '{minutes} minutes of gentle focus, together.',
        'streak': '{days}-day streak',
        'again': 'One more round',
        'lockedPlus': '🔒 Unlock longer sessions with Plus',
        'interruptedNote': "This session paused for a while — no worries, we'll start fresh.",
        'phrase1': "I'm right here with you.",
        'phrase2': 'One tiny step at a time.',
        'phrase3': "You've got this.",
        'phrase4': "Let's grow together, quietly.",
    },
    'zh-cn': {
        'title': '专注模式',
        'subtitle': '有一只小机器人，陪你一起工作学习。',
        'chooseDuration': '想一起专注多久？',
        'minutes': '{minutes} 分钟',
        'start': '开始专注',
        'giveUp': '结束本次',
        'awayNotice': '我等你回来…',
        'welcomeBack': '欢迎回来，继续加油！',
        'completeTitle': '完成啦！',
        'completeDesc': '一起温柔地专注了 {minutes} 分钟。',
        'streak': '连续专注 {days} 天',
        'again': '再来一轮',
        'lockedPlus': '🔒 Plus 解锁更长专注',
        'interruptedNote': '本次专注中途暂停了一会儿——没关系，我们重新开始。',
        'phrase1': '我就在这里陪你。',
        'phrase2': '一小步一小步来。',
        'phrase3': '你可以的。',
        'phrase4': '一起安静地成长。',
    },
    'zh-tw': {
        'title': '專注模式',
        'subtitle': '有一隻小機器人，陪你一起工作學習。',
        'chooseDuration': '想一起專注多久？',
        'minutes': '{minutes} 分鐘',
        'start': '開始專注',
        'giveUp': '結束本次',
        'awayNotice': '我等你回來…',
        'welcomeBack': '歡迎回來，繼續加油！',
        'completeTitle': '完成啦！',
        'completeDesc': '一起溫柔地專注了 {minutes} 分鐘。',
        'streak': '連續專注 {days} 天',
        'again': '再來一輪',
        'lockedPlus': '🔒 Plus 解鎖更長專注',
        'interruptedNote': '本次專注中途暫停了一會兒——沒關係，我們重新開始。',
        'phrase1': '我就在這裡陪你。',
        'phrase2': '一小步一小步來。',
        'phrase3': '你可以的。',
        'phrase4': '一起安靜地成長。',
    },
    'ja': {
        'title': 'フォーカスモード',
        'subtitle': '小さなロボットが、お仕事や勉強に寄り添います。',
        'chooseDuration': '一緒にどのくらい集中しよう？',
        'minutes': '{minutes} 分',
        'start': '集中をはじめる',
        'giveUp': '今回はここまで',
        'awayNotice': '待ってるよ…',
        'welcomeBack': 'おかえり！がんばろう！',
        'completeTitle': 'やったね！',
        'completeDesc': '一緒にやさしく {minutes} 分集中できたよ。',
        'streak': '{days} 日連続',
        'again': 'もう一回',
        'lockedPlus': '🔒 Plusでもっと長く集中',
        'interruptedNote': '途中で少しおやすみしたけど、大丈夫。また一緒に始めよう。',
        'phrase1': 'そばにいるよ。',
        'phrase2': '一歩ずつ進もう。',
        'phrase3': 'きみならできる。',
        'phrase4': '静かに一緒に育とう。',
    },
    'ko': {
        'title': '포커스 모드',
        'subtitle': '작은 로봇이 공부와 일에 곁에서 함께해요.',
        'chooseDuration': '같이 얼마나 집중할까요?',
        'minutes': '{minutes}분',
        'start': '집중 시작',
        'giveUp': '이번 세션 종료',
        'awayNotice': '기다리고 있을게요…',
        'welcomeBack': '다시 왔네요, 계속 힘내요!',
        'completeTitle': '해냈어요!',
        'completeDesc': '함께 다정하게 {minutes}분 집중했어요.',
        'streak': '{days}일 연속 집중',
        'again': '한 번 더',
        'lockedPlus': '🔒 Plus로 더 긴 집중 시간 열기',
        'interruptedNote': '잠시 멈췄지만 괜찮아요. 다시 함께 시작해요.',
        'phrase1': '곁에 있을게요.',
        'phrase2': '한 걸음씩 천천히.',
        'phrase3': '할 수 있어요.',
        'phrase4': '조용히 함께 성장해요.',
    },
    'de': {
        'title': 'Fokus-Modus',
        'subtitle': 'Ein kleiner Roboter begleitet dich bei der Arbeit.',
        'chooseDuration': 'Wie lange wollen wir uns gemeinsam konzentrieren?',
        'minutes': '{minutes} Min.',
        'start': 'Fokus starten',
        'giveUp': 'Session beenden',
        'awayNotice': 'Ich warte auf dich…',
        'welcomeBack': "Willkommen zurück — weiter geht's!",
        'completeTitle': 'Geschafft!',
        'completeDesc': '{minutes} Minuten sanfter Fokus, gemeinsam.',
        'streak': '{days} Tage in Folge',
        'again': 'Noch eine Runde',
        'lockedPlus': '🔒 Längere Sessions mit Plus freischalten',
        'interruptedNote': 'Diese Session hat kurz pausiert — kein Problem, wir fangen neu an.',
        'phrase1': 'Ich bin hier bei dir.',
        'phrase2': 'Ein kleiner Schritt nach dem anderen.',
        'phrase3': 'Du schaffst das.',
        'phrase4': 'Lass uns leise zusammen wachsen.',
    },
    'fr': {
        'title': 'Mode Focus',
        'subtitle': "Un petit robot t'accompagne pendant que tu travailles.",
        'chooseDuration': 'Combien de temps veut-on se concentrer ensemble ?',
        'minutes': '{minutes} min',
        'start': 'Commencer',
        'giveUp': 'Terminer cette session',
        'awayNotice': "Je t'attends…",
        'welcomeBack': 'Bon retour — on continue !',
        'completeTitle': "Bravo, c'est fait !",
        'completeDesc': '{minutes} minutes de concentration en douceur, ensemble.',
        'streak': "{days} jours d'affilée",
        'again': 'Encore une fois',
        'lockedPlus': '🔒 Débloque des sessions plus longues avec Plus',
        'interruptedNote': "Cette session a fait une petite pause — pas de souci, on repart à zéro.",
        'phrase1': 'Je suis là avec toi.',
        'phrase2': 'Un petit pas à la fois.',
        'phrase3': 'Tu peux le faire.',
        'phrase4': 'Grandissons ensemble, en douceur.',
    },
    'es': {
        'title': 'Modo Enfoque',
        'subtitle': 'Un pequeño robot te acompaña mientras trabajas.',
        'chooseDuration': '¿Cuánto tiempo nos concentramos juntos?',
        'minutes': '{minutes} min',
        'start': 'Empezar a enfocar',
        'giveUp': 'Terminar esta sesión',
        'awayNotice': 'Te estoy esperando…',
        'welcomeBack': '¡Bienvenido de nuevo — sigamos!',
        'completeTitle': '¡Lo lograste!',
        'completeDesc': '{minutes} minutos de enfoque tranquilo, juntos.',
        'streak': '{days} días seguidos',
        'again': 'Otra ronda',
        'lockedPlus': '🔒 Desbloquea sesiones más largas con Plus',
        'interruptedNote': 'Esta sesión hizo una pequeña pausa — no pasa nada, empezamos de nuevo.',
        'phrase1': 'Estoy aquí contigo.',
        'phrase2': 'Un pequeño paso cada vez.',
        'phrase3': 'Tú puedes.',
        'phrase4': 'Crezcamos juntos, en calma.',
    },
}

def indent_block(obj):
    s = json.dumps(obj, ensure_ascii=False, indent=2)
    lines = s.split('\n')
    return lines[0] + '\n' + '\n'.join('  ' + l for l in lines[1:])

for loc, nav_label in NAV_FOCUS.items():
    path = f'messages/{loc}.json'
    raw = open(path, encoding='utf-8').read()

    # 1) nav.focus — 插到 nav 块末尾（"seo" 之前）
    pat = re.compile(r'("nav": \{.*?)(\n  \},\n  "seo")', re.S)
    assert pat.search(raw), f'{loc}: nav anchor missing'
    raw = pat.sub(lambda m: m.group(1) + ',\n    "focus": ' + json.dumps(nav_label, ensure_ascii=False) + m.group(2), raw, count=1)

    # 2) home.companions.cards.focus — 跟在 treehole 后面
    pat = re.compile(r'("treehole": \{ [^\n]* \})\n(      \})')
    assert pat.search(raw), f'{loc}: treehole anchor missing'
    card = json.dumps(CARD_FOCUS[loc], ensure_ascii=False)
    raw = pat.sub(lambda m: m.group(1) + ',\n        "focus": ' + card + '\n' + m.group(2), raw, count=1)

    # 3) focus 命名空间 — 追加到文件末尾
    assert raw.endswith('\n}\n'), f'{loc}: unexpected EOF'
    raw = raw[:-3] + ',\n  "focus": ' + indent_block(FOCUS[loc]) + '\n}\n'

    open(path, 'w', encoding='utf-8', newline='\n').write(raw)
    json.load(open(path, encoding='utf-8'))  # 立即验证合法
    print(f'{loc}: OK')

print('all done')

#!/usr/bin/env python3
"""
N2 fix: convert pricing.tiers.eternal.features from a single comma-separated
string into a native-language array for all 7 non-English locales.

English (en.json) already has the proper array shape, so it's left alone.
"""
import json
from pathlib import Path

MSGS = Path(__file__).resolve().parent.parent / "messages"

# Source of truth (en.json)
EN_FEATURES = [
    "Everything in Plus",
    "All 50+ pet suits unlocked",
    "Golden legendary pets",
    "Priority support",
    "Early access to new features",
]

# Translations — kept short & matching each file's existing tier style
TRANSLATIONS = {
    "zh-cn": [
        "Plus 全部功能",
        "解锁全部 50+ 套装",
        "金色传说宠物",
        "优先客服",
        "抢先体验新功能",
    ],
    "zh-tw": [
        "Plus 所有功能",
        "解鎖全部 50+ 造型",
        "金色傳說寵物",
        "優先客服",
        "搶先體驗新功能",
    ],
    "ja": [
        "Plus 全機能",
        "50+ ペットスーツ全解放",
        "金色レジェンダリーペット",
        "優先サポート",
        "新機能先行体験",
    ],
    "ko": [
        "Plus 전 기능",
        "전체 50+ 펫 슈트 해제",
        "골든 레전드 펫",
        "우선 지원",
        "신기능 선행 체험",
    ],
    "de": [
        "Alles in Plus",
        "Alle 50+ Haustier-Suits freigeschaltet",
        "Goldene legendäre Haustiere",
        "Prioritäts-Support",
        "Früher Zugriff auf neue Funktionen",
    ],
    "fr": [
        "Tout de Plus",
        "Tous les 50+ skins d'animaux débloqués",
        "Animaux légendaires dorés",
        "Support prioritaire",
        "Accès anticipé aux nouvelles fonctionnalités",
    ],
    "es": [
        "Todo de Plus",
        "Todos los 50+ skins desbloqueados",
        "Mascotas legendarias doradas",
        "Soporte prioritario",
        "Acceso anticipado a nuevas funciones",
    ],
}


def main() -> None:
    for locale, feats in TRANSLATIONS.items():
        path = MSGS / f"{locale}.json"
        data = json.loads(path.read_text(encoding="utf-8"))
        tier = data["pricing"]["tiers"]["eternal"]
        before = tier.get("features")
        tier["features"] = feats
        path.write_text(
            json.dumps(data, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        print(f"[{locale}] features: {type(before).__name__} -> list ({len(feats)} items)")

    # Sanity: re-read and assert
    for locale in TRANSLATIONS:
        data = json.loads((MSGS / f"{locale}.json").read_text(encoding="utf-8"))
        f = data["pricing"]["tiers"]["eternal"]["features"]
        assert isinstance(f, list), f"{locale} still not a list!"
        assert all(isinstance(x, str) and x for x in f), f"{locale} has empty/empty item"
        # ensure no English leakage
        for english in EN_FEATURES:
            assert english not in f, f"{locale} still has English '{english}'"
    print("ALL 7 LOCALES VERIFIED ✓")


if __name__ == "__main__":
    main()

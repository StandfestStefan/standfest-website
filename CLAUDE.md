# Standfest Digital — Webseite (standfestdigital.at)

**Lokaler Pfad:** `C:\StandfestDigital\standfest-website\`
**Git-Remote:** `StandfestStefan/standfest-website` (GitHub)
**Aktiver Branch (Stand 22.05.2026):** `experimental/light-theme` oder `feature/preis-und-geo-fixes`
**Live-Stand:** Coming-Soon-Page aktiv, echte Site liegt im Repo dahinter

---

## Wichtigste Regel

**Vor jeder Code-Aktion in diesem Repo: lies `.briefing/` durch.**
Die Recherche-Mappe ist die einzige Quelle für Strategie, Design-System, Tonalität und Patch-Roadmap.

```
.briefing/
├── 01-strategie.md           ← WARUM, ICP, Theme-Begründung, Anti-KI
├── 02-design-system.md       ← Tokens, Fonts, WCAG-Tabelle
├── 03-tonalitaet.md          ← Stefan-Sprache, verbotene Wörter, Sie-Form
├── 04-patch-roadmap.md       ← 15 Patches, Reihenfolge, Aufwand
└── 05-arbeits-regeln.md      ← Wie du in diesem Repo arbeitest
```

Lies in genau dieser Reihenfolge. Erst Strategie, dann Konkretes.

---

## Was du NIE machst (Schutzregeln)

1. **Kein `git push`** ohne explizite Anweisung von Stefan
2. **Kein direkter Commit auf `main`**
3. **Kein Mergen ohne Browser-Test davor**
4. **Keine KI-typischen Phrasen** ("ganzheitlich", "next-level", "innovativ", "nahtlos", "in der heutigen digitalen Welt", "State-of-the-Art")
5. **Kein `<!-- AI-generated -->` Marker, kein "Erstellt mit Claude" Hinweis**
6. **Kein Stock-Photo-Look in Bildern**
7. **Bei Patch-Konflikten: STOP, `git am --abort`, Bescheid sagen.** Nie selbst mergen.

---

## Was du IMMER machst

1. Vor jedem Patch: `git branch --show-current` + `git status` ausgeben
2. Vor jeder File-Änderung: aktuelles File `view`-en, nicht raten
3. Nach jedem Patch: konkrete Spot-Checks ausführen (siehe `.briefing/04-patch-roadmap.md`)
4. Bei Mehrdeutigkeit: Stefan fragen, nicht selbst entscheiden
5. Antworten auf Deutsch, intern du-Form
6. Sei knapp und liefere copy-paste-fertige PowerShell-Befehle

---

## Arbeits-Pattern (Stefan-Stil)

- "Weiter" oder "Go" = sofort nächster Schritt, keine Zusammenfassung
- Direktheit > Höflichkeit
- Konkrete Annahmen treffen statt Rückfragen — als "Annahme:" markieren
- Pro Session ein Thema
- Bei Browser-Test-Bedarf: nicht selbst durchführen, sondern PowerShell-Befehl `npx serve .` ausgeben und Stefan klickt

---

## Wichtige Pfade

| Pfad | Was |
|---|---|
| `C:\StandfestDigital\standfest-website\` | Dieses Repo |
| `.briefing/` | Recherche + Regeln (READ-ONLY für dich, verändert nur Stefan) |
| `.megaprompts/` | Bereitliegende Megaprompts pro Phase |
| `css/style.css` | Hauptdatei für Theme |
| `fonts/` | Self-hosted Variable Fonts |
| `img/` | Statische Bilder |

---

## Tools die du hast

- PowerShell 7.x
- Git (lokal, kein `push` ohne Erlaubnis)
- Python 3 (für komplexere Replacements)
- `npx serve .` für lokalen Test
- `Select-String`, `Get-Content`, `Set-Content` für Verifikation

## Tools die du NICHT hast (in dieser Repo-Session)

- Browser (du kannst nicht selbst gucken)
- Lighthouse-CLI (es sei denn Stefan installiert es bewusst)
- Internet-Recherche neu (die Recherche steht schon in `.briefing/`)

---

## Wenn du anfängst

Erste 4 Befehle die du IMMER ausführst:

```powershell
cd C:\StandfestDigital\standfest-website
git branch --show-current
git status
Get-ChildItem .\.briefing\ | Select-Object Name
```

Dann sag Stefan kurz was du gefunden hast, frag was er konkret machen will.

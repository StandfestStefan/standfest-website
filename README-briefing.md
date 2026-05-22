# Standfest Briefing-Mappe — Setup-Anleitung

**Erstellt:** 22.05.2026
**Zweck:** Recherche + Strategie + Patches als Wissensbasis für Claude-Code-Agents bereitstellen, damit JEDE Claude-Code-Session in `C:\StandfestDigital\standfest-website\` automatisch dieselben Regeln und Wissen nutzt.

---

## Was im Paket ist

```
standfest-briefing/
├── README.md                    ← du liest gerade
├── CLAUDE.md                    ← kommt ins Repo-Root, Claude Code lädt es automatisch
├── .briefing/                   ← Wissensbasis (read-only für Claude Code)
│   ├── 01-strategie.md          ICP, Theme-Begründung, Anti-KI
│   ├── 02-design-system.md      Tokens, Fonts, WCAG-Tabelle
│   ├── 03-tonalitaet.md         Sprache, verbotene Wörter
│   ├── 04-patch-roadmap.md      15 Patches mit Code-Snippets
│   └── 05-arbeits-regeln.md     Wie Claude Code im Repo arbeitet
└── .megaprompts/                ← 5 fertige Megaprompts pro Phase
    ├── 01-phase1-theme-fonts.md      Light-Theme + Fonts (15 Min)
    ├── 02-phase2-authentizitaet.md   Hand-drawn SVG + Hero (4-6h)
    ├── 03-phase3-inhalt-ux.md        Texte + Pakete + DSGVO (6-8h)
    ├── 04-phase4-compliance-mobile.md WCAG + Mobile + Footer (4-6h)
    └── 05-phase5-push-live.md        Push + Coming-Soon weg (1-2h)
```

---

## Setup-Anleitung (10 Min, einmalig)

### Schritt 1 — ZIP herunterladen
ZIP `standfest-briefing.zip` aus Claude.ai herunterladen, nach `C:\Users\maure\Laptop Apps\Downloads\` legen.

### Schritt 2 — Entpacken + ins Repo kopieren

PowerShell:

```powershell
cd C:\StandfestDigital\standfest-website

# Verifikation: Branch + Status
git branch --show-current
git status
# MUSS: working tree clean

# Entpacken
$zipPath = "C:\Users\maure\Laptop Apps\Downloads\standfest-briefing.zip"
$tmp = ".\.tmp-briefing"
if (Test-Path $tmp) { Remove-Item $tmp -Recurse -Force }
Expand-Archive -Path $zipPath -DestinationPath $tmp

# Inhalt prüfen
Get-ChildItem $tmp -Recurse | Select-Object FullName

# Files ins Repo kopieren
Copy-Item "$tmp\CLAUDE.md" .\ -Force
New-Item -Path .\.briefing -ItemType Directory -Force
New-Item -Path .\.megaprompts -ItemType Directory -Force
Copy-Item "$tmp\.briefing\*" .\.briefing\ -Force
Copy-Item "$tmp\.megaprompts\*" .\.megaprompts\ -Force

# Tmp aufräumen
Remove-Item $tmp -Recurse -Force

# Verifikation
Test-Path .\CLAUDE.md
Test-Path .\.briefing
Test-Path .\.megaprompts
Get-ChildItem .\.briefing | Select-Object Name
```

Erwartung: 5 Files in `.briefing/`, 5 Files in `.megaprompts/`, CLAUDE.md im Root.

### Schritt 3 — Gitignore-Frage entscheiden

Drei Optionen:

**Option A — Commits ja, Briefing-Mappe im Repo (mein Vorschlag):**
Files kommen in den Branch, werden bei Push mit-deployed. Vorteil: Marvin/m.berger sehen die Briefing-Mappe auch. Nachteil: Files sind public sobald Push.

**Option B — Nur lokal, nicht ins Repo:**
`.briefing/` und `.megaprompts/` in `.gitignore` aufnehmen. Nur lokale Wissensbasis für Stefans Claude-Code-Sessions.

**Option C — Mixed: CLAUDE.md ja, Rest nein:**
Nur CLAUDE.md committen (referenziert auf `.briefing/`). Die eigentlichen Briefing-Files bleiben lokal.

Empfehlung: **Option A**, weil:
- Wissen ist Team-Asset
- m.berger könnte später auch Patches contributen
- Public-Sichtbarkeit ist OK (kein Secret, nur Strategie)
- GitHub bleibt source-of-truth

```powershell
git add CLAUDE.md .briefing .megaprompts
git status
git commit -m "docs: Briefing-Mappe + Megaprompts fuer Claude Code

Wissensbasis für Claude-Code-Agents im Webseiten-Repo.
Enthaelt Recherche-Ergebnisse (Anti-KI-Konzept, Persona-Hypothese,
Design-System-Tokens, WCAG-Tabelle, 15 Patches) sowie 5 sequentielle
Megaprompts pro Phase.

Pfade:
- CLAUDE.md (Root) — automatisch von Claude Code geladen
- .briefing/ — 5 thematische Wissens-Files
- .megaprompts/ — 5 ausfuehrbare Megaprompts

Quelle: Recherche-Session 21.05.2026 + Strategie 22.05.2026"
```

### Schritt 4 — Testen ob Claude Code es liest

In Cmd:

```
cmd /c claude --dangerously-skip-permissions
```

In der Claude-Code-Session als ersten Befehl:

```
Liste alle Files in .briefing/ und .megaprompts/. Was findest du?
```

Erwartung: Claude Code zeigt die Files an + kennt das CLAUDE.md.

---

## Workflow danach

### Pro Phase

1. Stefan öffnet entsprechenden `.megaprompts/0N-...md` File
2. Kopiert den ```-Block (alles zwischen ```...```)
3. Pasted in Claude Code
4. Claude Code arbeitet die Schritte ab, fragt bei Mehrdeutigkeit
5. Stefan kontrolliert Output, gibt OK oder Korrektur
6. Browser-Test wo angemerkt
7. Wenn alles passt: zum nächsten Megaprompt

### Zwischen Phasen

- Stefan kann jederzeit STOP sagen
- Branch-Tags als Safety-Net (vor jeder Phase ein Backup-Tag)
- Bei Problemen: zurück auf Tag + neu starten

---

## Hilfreiches

### Wenn Claude Code "vergisst" die Briefing-Mappe zu lesen

Erinnerung-Prompt:
```
Lies bitte zuerst .briefing/05-arbeits-regeln.md, dann mach den Task.
```

### Wenn du eine Phase überspringst

Kein Problem — Phasen sind technisch unabhängig. Aber:
- Phase 1 (Theme) muss VOR Phase 2 (Visuelles) sein
- Phase 4 (WCAG) sollte VOR Phase 5 (Live) sein

### Wenn du etwas an `.briefing/` ändern willst

In Claude.ai mit mir reden. Claude Code in Code-Sessions ÄNDERT die Briefing-Files nicht (read-only für Code). Aktualisierung läuft über strategische Chats hier.

---

## Was als nächstes ansteht

1. **Setup machen** (10 Min, Schritte 1-4 oben)
2. **Megaprompt 01 ausführen** (15 Min Claude Code + 5 Min Browser-Test)
3. **Stefan entscheidet:** Theme passt oder nicht
4. **Wenn passt:** Megaprompt 02 (Phase 2 — Authentizität)
5. ... und so weiter

Bei Problemen: zurück in Claude.ai, hier besprechen.

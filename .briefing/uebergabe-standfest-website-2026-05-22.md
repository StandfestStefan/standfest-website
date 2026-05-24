# Übergabe — Standfest-Website Session-Fortsetzung

> **Stand:** 22.05.2026 Abend
> **Repo:** `C:\StandfestDigital\standfest-website\`
> **Branch:** `experimental/light-theme`
> **HEAD:** Nach K1-Fix (Commit von Claude Code, exakter Hash siehe `git log`)

---

## Was du als nächste Session-Claude wissen musst

### Persönlich: Stefan Maurer

- GF Standfest Digital (geplant OG mit Marvin Blatnig)
- Direkt, kein Bullshit, "Weiter" = sofort nächster Schritt
- Macht Stop-Points + Browser-Tests gewohnt
- Screenshots mit Gelb-Markierung sehr hilfreich
- Nutzt PowerShell 7.6.1 + VSCode + Chrome
- Lokales Setup: `C:\StandfestDigital\standfest-website\`
- Stefan delegiert strategische Entscheidungen an Claude wenn unsicher
- **Aktuelle Realität:** Keine zahlenden Kunden, F&F-Phase, kein Zeitdruck

### Tech-Stack

- Statische HTML/CSS/JS auf Hetzner (Live: standfestdigital.at → aktuell Coming-Soon)
- Repo `StandfestStefan/standfest-website` auf GitHub (private)
- Vite NICHT im Einsatz für diese Site — pure HTML
- npx serve für lokales Testing auf localhost:3000
- Claude Code v2.1.148 lokal (`cmd /c claude --dangerously-skip-permissions`)
- Background-Sessions können hängen — bei Problem: Node-Prozesse killen + neu starten

### Aktueller Stand

**Branch `experimental/light-theme` hat 21 Commits am 22.05.:**

1. **Phase 1** (3 Commits): Light-Theme CSS + Font-Preloads + Repo-Nachzieher
   - Cream BG (paper, paper-2, paper-3 Layer-Tokens)
   - Newsreader Variable (Serif für Headlines)
   - Inter Variable (Sans für Body)
   - Grüner Akzent #4a7c59
2. **Phase 2** (3 Commits): Hand-drawn SVG-Underline + Asymmetrisches Hero + Editorial-Pullquote
3. **Feinschliff 1** (5 Commits, F-05 übersprungen): Hero-Width, Hero-Visual-Größe, Radial-Gradient-Platzhalter, Scope-Box-Override, Setup-Fee Info-Strip
4. **DSGVO-Commit** (1): Datenschutz-Hinweis über Submit-Button (Urlaubs-Patch)
5. **Feinschliff 2** (3 Commits): Footer-Kontrast, Hero-Stats-Box raus, Pricing-Struktur SETUP/DANN
6. **Feinschliff 3** (2 Commits): Footer-Trennung 3-Layer, Setup-Preis größer als Monatsrate
7. **Feinschliff 4** (6 Commits): Nav-fix-Position, Antwortzeit konsistent, Datenschutz-Anbieter, Vorlage-Warnungen weg, Hausnummer, Stats-Section

**Safety-Tags:**
- `pre-feinschliff-2026-05-22`
- `pre-feinschliff2-2026-05-22`
- `pre-feinschliff3-2026-05-22`
- `pre-feinschliff4-2026-05-22`
- `post-phase2-2026-05-22`

**Branch `experimental/light-theme` ist NICHT gepusht.** Nur lokal.
**Main-Branch unangetastet.** Live-Site läuft auf alter Version.

### Arbeits-Pattern

**Hybrid-Modell:**
- **Claude.ai (Strategie + Megaprompts)** — Hauptchat mit Stefan
- **Claude Code (lokal, Ausführung)** — bekommt Megaprompts gepasted
- **Claude Browser-Seitenleiste (Review)** — visueller Reviewer ohne Code-Zugriff

**Megaprompt-Struktur die für Claude Code funktioniert:**
- Vor-Start lesen-Anweisung (Briefing-Files)
- Pre-Flight (Branch, Status, Tag)
- Pro Patch: Diagnose → Fix → Spot-Check → Commit
- Final-Block mit Git-Log + Browser-Test-Hinweis
- "NICHT TUN"-Liste am Ende

**Claude Code stoppt sauber bei Mehrdeutigkeit** — gibt "needs input" und wartet. Pattern hat sich bewährt.

### Kritische Erkenntnisse Light-Theme-Arbeit

- **Background-Guard:** Claude Code blockiert direkte Repo-Edits manchmal. Workaround: `.claude/settings.json` mit `{"worktree":{"bgIsolation":"none"}}` in BEIDEN Pfaden (`C:\StandfestDigital\` UND `C:\StandfestDigital\standfest-website\`)
- **Worktree-Modus** kann passieren — dann Browser-Test im Worktree-Pfad nicht im Hauptcheckout
- **Spot-Checks mit `Select-String`** sind linienbasiert — Pattern muss auf einer Zeile matchen
- **CSS-Spezifität:** `.price-amount--setup` allein reicht oft nicht, braucht `.price-amount.price-amount--setup` weil Basis-Klasse später lädt
- **PowerShell-Patterns:**
  - Hier-Strings: `@'...'@` für Code (no expansion)
  - UTF-8 ohne BOM: `[System.IO.File]::WriteAllText` mit `New-Object System.Text.UTF8Encoding $false`

### Briefing-Mappe im Repo

Aktuell unter `.briefing/`:
- `01-strategie.md` — Positioning, Zielgruppe
- `02-design-system.md` — CSS-Tokens, Variablen
- `03-tonalitaet.md` — Sprach-Stil, KMU-tauglich
- `04-patch-roadmap.md` — Phasen-Plan P-W01 bis P-W15
- `05-arbeits-regeln.md` — "Bei Mehrdeutigkeit melden, nicht raten"

Unter `.megaprompts/`:
- `01-phase1-theme-fonts.md` (durchgelaufen)
- `02-phase2-authenticity.md` (durchgelaufen)
- `03-phase3-content-ux.md` (offen)
- `04-phase4-compliance-mobile.md` (offen)
- `05-phase5-push-live.md` (offen)

### Was offen ist

**Direkt offen:**
- Browser-Test K1-K6 nach letztem Claude-Code-Lauf (User hat noch nicht final getestet)
- F-11 (Hero-Headline) ist OK, kein Bug → erledigt

**Phase 3 (Inhalt + UX, P-W11 bis P-W15):**
- P-W11 Pricing-Texte (KPI-Definition, Monatlicher Call, etc.) — Klärung mit Marvin
- P-W12 Leistungen differenzieren — Stefan-Entscheidung welche Trennung
- P-W13 Konfigurator optional (Browser-Claude meinte: für KMU zu viel Designer-Aufwand)
- P-W14 WhatsApp-only (Telefon `+43 660 5847291` aus Memory)
- P-W15 DSGVO-Checkbox — **VERWORFEN** nach Recherche, Hinweistext ist DSGVO-konform für Österreich, Checkbox vermeidet OGH-Klauselkontrolle

**Phase 4 (Compliance + Mobile, P-W07/P-W09/P-W10):**
- P-W10 Mobile-Optimierung
- P-W09 Footer-Umbau (Adresse, Team-Namen, Tap-to-Call)
- P-W07 Polaroid für Team-Foto (braucht echtes Foto Stefan + Marvin)

**Phase 5 (Push + Live):**
- Bilder via Midjourney ($10 Plan) — Stefan kennt MJ nicht, wird mit Marvin gemacht
- Recherche-Dokument bereits da: `recherche-bilder-2026-05-22.md` (6 MJ-v7-Prompts)
- 4 Stellen brauchen Bilder: Hero, About-Übergang, 3x Leistungen-Akzente
- Push zu GitHub (Backup)
- Live-Schaltung — **abhängig von OG-Gründung** (Stefan will erst nach offizieller Gründung live)

**Größere Strategie-Themen (mit Marvin besprechen):**
- Leistungen-Seite: aktuell wirkt wie Auswahl-Menü, soll als Gesamtpaket verkaufen
- Konfigurator: Mockup zeigt nicht den Standfest-Stil (Tonalitäts-Mismatch)
- Mitte der Startseite: zu viel Eyebrow-Labels, wirkt Agentur-Kampagne statt Handschlag
- Telefonnummer prominenter auf Startseite (KMU-Zielgruppe verbreitet "ich ruf an")

**Bekannte Inkonsistenzen die mit Marvin geklärt werden müssen:**
- OG-Gründungs-Datum unbekannt
- UID-Beantragung Status unbekannt
- Marvin's Foto + Bio für About-Section fehlt
- "Sprechen Sie uns an" vs "So erreichen Sie uns" — Tonalität

---

## Wichtige Pfade

```
C:\StandfestDigital\standfest-website\          # Haupt-Repo
C:\StandfestDigital\standfest-website\.briefing\  # Briefing-Mappe
C:\StandfestDigital\standfest-website\.megaprompts\  # Megaprompts P1-P5
C:\StandfestDigital\.claude\settings.json        # Background-Guard-Override
C:\Users\maure\.ssh\id_standfest                 # SSH-Key
```

---

## Aktive Memory-Korrekturen

| Punkt | Aktualisiert |
|---|---|
| COMP-1 DSGVO-Checkbox | **VERWORFEN** — Hinweistext reicht (Art. 6 lit. b/f) |
| Antwortzeit | **"Werktags innerhalb 24-48h"** (nicht "24 Stunden") |
| Stats-Section | "ab 149€" nicht "ab 590€" |
| Adresse | "Kaiser-Franz-Josef-Straße 3" (mit Bindestrichen, Hausnummer) |
| Inhaber | OG (in Gründung) Marvin Blatnig + Stefan Maurer (beide Pages) |

---

## Was die neue Session zuerst tun sollte

1. **`git log --oneline -25`** im Repo um aktuellen Stand zu sehen
2. **`git status`** prüfen ob clean
3. **Stefan fragen** ob Browser-Test K1-K6 schon gemacht ist
4. **Dann:** je nach Antwort entscheiden ob noch Fixes nötig oder ob Push-Strategie / Tages-Abschluss

---

## Workflow-Tipps für neue Session-Claude

- **Eine Sache pro Session** — Stefan mag fokussierte Arbeit
- **Megaprompts in Markdown** für Claude Code, mit klarer Struktur
- **Stop-Points einbauen** bei Mehrdeutigkeit
- **Screenshots anfordern** wenn visuelles Problem
- **Memory-System nutzen** — Stefan-Memory ist gepflegt, kein wiederholtes Erklären
- **Bei DSGVO/Recht:** Recherche IMMER mit aktuellen österreichischen Quellen
- **Bei Pricing:** alle 3 Stufen (F&F, START, ETABLIERT) im Kopf haben

---

## Letzte Worte

Du übernimmst eine sehr saubere Sitzung. **21 Commits, alle dokumentiert, Safety-Tags vor jeder Phase.** Light-Theme ist stabil, Phase 2 + Feinschliffe 1-4 sind durch. Die Site ist deutlich besser als am Session-Start.

Was bleibt: Browser-Test-Verifikation, dann Push-Strategie + Phase 3 mit Marvin-Klärungen.

**Stefan ist müde nach langem Arbeitstag.** Wenn Browser-Test in der neuen Session ergibt dass alles passt: **Tages-Abschluss + Strategy-Talk für morgen, kein neuer großer Patch heute.**

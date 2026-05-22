# Megaprompt 02 — Phase 2: Authentizität (Visuelles, Anti-KI)

**Zweck:** Hand-drawn SVG, asymmetrisches Hero, Editorial-Pullquote.
**Aufwand:** 4-6 Stunden gesamt
**Vorbedingung:** Phase 1 ist angewendet, Stefan hat Light-Theme bestätigt

---

## COPY-PASTE in Claude Code

```
Du arbeitest in C:\StandfestDigital\standfest-website. Aktiver Branch: experimental/light-theme.

ZIEL: Phase 2 — Authentizität. 4 konkrete Patches aus .briefing/04-patch-roadmap.md.

VOR-DEM-START LESEN:
- .briefing/01-strategie.md (besonders Anti-KI-Look Konzept)
- .briefing/02-design-system.md (Tokens und Fonts)
- .briefing/03-tonalitaet.md (Sprache)
- .briefing/04-patch-roadmap.md (Patches P-W03, P-W04, P-W05, P-W08)

REGELN:
- Pro Patch ein einzelner Commit
- Vor jedem Commit: Stefan-Vorschau via git diff --stat
- Nach jedem Patch: Browser-Test-Hinweis ausgeben
- Bei Mehrdeutigkeit: Stefan fragen, nicht selbst entscheiden

SCHRITT 0 — Pre-Flight
cd C:\StandfestDigital\standfest-website
git branch --show-current   # MUSS: experimental/light-theme
git status                  # MUSS: working tree clean
git log --oneline -3        # Sollte Phase-1-Commits zeigen

SCHRITT 1 — Patch P-W03: Hand-drawn SVG-Akzente

1a. Verzeichnis anlegen:
New-Item -Path .\img\svg -ItemType Directory -Force

1b. 3 SVG-Dateien anlegen (siehe .briefing/04-patch-roadmap.md Abschnitt P-W03):
- img/svg/handdrawn-underline.svg
- img/svg/handdrawn-divider.svg
- img/svg/handdrawn-arrow.svg

1c. CSS-Regel in style.css ergänzen für .hero-title::after (Underline)
Sektion: nach den Heading-Globalregeln

1d. In index.html: Underline-SVG einbauen unter Hero-Title
Such-Pattern: das h1 oder .hero-title im Hero-Bereich

1e. Spot-Checks:
- Get-ChildItem .\img\svg -Filter "handdrawn-*.svg" | Measure-Object  # erwartet 3
- Select-String "handdrawn-underline" .\index.html | Measure-Object   # erwartet 1+
- Select-String "::after" .\css\style.css | Select-Object -First 5    # für Visual-Check

1f. Commit:
git add -A
git commit -m "feat(theme): Hand-drawn SVG-Underline auf Hero-Headline (P-W03)

Drei SVG-Files in img/svg/ angelegt:
- handdrawn-underline.svg (Hero-Title)
- handdrawn-divider.svg (Section-Dividers)
- handdrawn-arrow.svg (CTA-Pfeile)

Erste Anwendung: Underline unter .hero-title via ::after.

Bezug: P-W03 aus .briefing/04-patch-roadmap.md"

→ STOP, Stefan-Feedback einholen ob hand-drawn Look passt.

SCHRITT 2 — Patch P-W04: Asymmetrisches Hero (65/35)

2a. Aktuelles Hero-Markup in index.html anschauen
Wahrscheinlich: zentriert oder einspaltig

2b. Neue CSS-Klasse .hero-grid mit 65% / 35% einbauen (siehe Roadmap)
+ Media-Query für Mobile (1fr stacked)

2c. index.html: Hero-Struktur auf 2-Spalten umbauen
- Links 65%: bestehender Text-Content (Headline, Subtitle, CTA-Buttons, Trust-Hints)
- Rechts 35%: Platzhalter-DIV für späteres Bild (P-W08)
  Hinweis: Falls Stefan noch kein Hero-Bild hat, eine SVG-Illustration oder Farbblock als Placeholder

2d. Spot-Checks:
- Select-String "hero-grid" .\index.html | Measure-Object        # erwartet 1+
- Select-String "grid-template-columns: 65%" .\css\style.css     # erwartet 1
- Browser-Test-Hinweis (Mobile-Layout prüfen!)

2e. Commit:
git commit -m "feat(theme): Hero auf asymmetrisches 65/35-Layout umgestellt (P-W04)

Bisher: zentriertes Hero
Jetzt: 2-Spalten-Grid mit 65% Text + 35% Visual
Mobile: stacked (1fr)

Wabi-Sabi-Prinzip Fukinsei — Asymmetrie wirkt natuerlicher als 50/50.

Bezug: P-W04 aus .briefing/04-patch-roadmap.md"

→ STOP, Browser-Test, Stefan-Feedback.

SCHRITT 3 — Patch P-W05: Editorial-Pullquote in About-Sektion

3a. About-Sektion in index.html finden
Such-Pattern: "about" oder "ueber-uns" oder h2 mit "Team"

3b. blockquote.pullquote einbauen (Markup siehe Roadmap)
WICHTIG: Quote-Text mit Stefan abklären, NICHT selbst erfinden.
Default-Vorschlag (markiert als Annahme): "Wir bauen Websites für Menschen
die wenig Zeit haben, aber viel zu sagen."
Author: "— Stefan Maurer"

3c. CSS-Regel .pullquote + .drop-cap einbauen (siehe Roadmap)

3d. Spot-Checks:
- Select-String "pullquote" .\index.html | Measure-Object   # erwartet 1
- Select-String "drop-cap" .\index.html | Measure-Object    # erwartet 1
- Select-String "drop-cap" .\css\style.css | Measure-Object # erwartet 1+

3e. Commit:
git commit -m "feat(theme): Editorial-Pullquote mit Drop-Cap in About-Sektion (P-W05)

blockquote.pullquote mit Drop-Cap fuer ersten Buchstaben.
Print-inspired (Magazin-Anmutung).

ANNAHME: Quote-Text Default. Stefan kann anpassen.

Bezug: P-W05 aus .briefing/04-patch-roadmap.md"

→ STOP, Stefan fragen ob Quote-Text passt.

SCHRITT 4 — Patch P-W08: Hero-Bild-Platzhalter

WICHTIG: Wenn Stefan noch kein Midjourney-Bild generiert hat:
- Nicht selbst eines erfinden
- Stattdessen einen SVG-Placeholder im Hero-Right-Spalten-Bereich einbauen
- Mit Hinweis "TODO: hero-atmosphere.webp einsetzen wenn Bild da"

Wenn Stefan ein Bild geliefert hat:
4a. Bild nach img/hero-atmosphere.webp kopieren (Stefan legt es in Downloads)
4b. img-Tag in index.html im Hero-Right-Bereich
4c. Width/Height-Attribute für Layout-Stability
4d. alt-Text mit Stefan abklären

→ STOP, Stefan-Entscheidung.

FINAL — Bericht
Write-Host ""
git log --oneline -8
Write-Host ""
Write-Host "Phase 2 (Authentizitaet) abgeschlossen." -ForegroundColor Green
Write-Host "Browser-Test empfohlen: npx serve ."
Write-Host ""
Write-Host "Naechste Phase: 03 (Inhalt + UX) - Texte ueberarbeiten"

NICHT TUN:
- Quote-Texte selbst erfinden
- Bilder selbst generieren (Stefan macht Midjourney)
- Hand-drawn SVGs ueberall (3-4 reichen)
- Magnetic-Cursor oder ähnliche Awwwards-Patterns einbauen
- git push
```

---

## Was Stefan zwischen den Schritten macht

- Nach SCHRITT 1: Browser-Test, prüfen ob Underline "passt"
- Nach SCHRITT 2: Mobile-Layout prüfen
- Nach SCHRITT 3: Quote-Text entscheiden (oder Default lassen)
- Vor SCHRITT 4: Midjourney-Bild generieren (separate Aufgabe)

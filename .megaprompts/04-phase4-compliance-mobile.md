# Megaprompt 04 — Phase 4: Compliance + Mobile

**Zweck:** Mobile-Optimierung, Footer-Umbau, Polaroid-Akzent, WCAG-Pflicht (EAA-Deadline 28.06.2026)
**Aufwand:** 4-6 Stunden
**Vorbedingung:** Phase 3 abgeschlossen, Texte stehen

---

## COPY-PASTE in Claude Code

```
Du arbeitest in C:\StandfestDigital\standfest-website. Aktiver Branch: experimental/light-theme.

ZIEL: Phase 4 — Compliance + Mobile. 3 Patches: P-W10, P-W09, P-W07.

VOR-DEM-START LESEN:
- .briefing/02-design-system.md (WCAG-Tabelle, Touch-Target-Regel)
- .briefing/04-patch-roadmap.md (Patches P-W07, P-W09, P-W10)

HARTES ZIEL: 28.06.2026 EAA-Deadline.
NACH dieser Phase: WCAG-konform, Mobile-tauglich, ready für Live-Schaltung.

SCHRITT 0 — Pre-Flight
cd C:\StandfestDigital\standfest-website
git branch --show-current   # experimental/light-theme
git status

SCHRITT 1 — Patch P-W10: Mobile-Optimierung

1a. Body-Font-Size auf Mobile prüfen
Select-String "font-size: \(1[5-9]px\|16px\)" .\css\style.css
# MUSS mindestens 16px sein

1b. Touch-Target-Audit:
Such-Patterns: padding für Buttons, Links, Form-Inputs
Min 44x44px CSS (oder via padding equivalent)

1c. Telefon-Links auf "tel:" prüfen:
Select-String "tel:" .\index.html .\kontakt.html .\impressum.html
# Sollte vorhanden sein

1d. Wenn Telefon-Nummer noch kein tel: link hat: einbauen
HTML: <a href="tel:+436601234567" class="phone-link">+43 660 1234567</a>

1e. Mobile-Section-Padding prüfen:
Aktuelles --section-padding: 100px 0
Mobile (Container-Query): 48-64px 0
Falls noch nicht: Media-Query oder Container-Query einbauen

1f. Lighthouse-Score-Hinweis:
Nicht selbst messen, aber Stefan Hinweis geben:
"Stefan: Lighthouse-Audit nach Phase 4 ausführen.
 In Chrome DevTools → Lighthouse → Mobile → Performance + Accessibility."

1g. Commit:
git commit -m "feat(mobile): Touch-Targets + Section-Padding + tel-Links (P-W10)

- Body-Font Mobile: 16px minimum
- Touch-Targets: 44x44px Buttons + Links
- Telefon-Nummern als tel: links (Tap-to-Call)
- Section-Padding Mobile: 48-64px (Desktop bleibt 100px)
- Container-Queries für Pakete-Karten

Bezug: P-W10 aus .briefing/04-patch-roadmap.md
EAA-Deadline: 28.06.2026"

→ Browser-Test (Mobile-Ansicht in DevTools).

SCHRITT 2 — Patch P-W09: Footer umgestalten

2a. Aktuellen Footer aus index.html lesen
Footer ist in jeder Page identisch (vermutlich)

2b. Neue Footer-Struktur:
- Echte Adresse prominent (groß, lesbar)
- Telefon-Nummer als großer tap-to-call-Button (Mobile)
- Team-Namen mit Funktion
- Hand-drawn Trennlinie (svg) oberhalb des Footers
- Kontakt-Block links, Links rechts, Brand mittig

2c. CSS: Footer hat schon beigen BG (--nav-bg), passt
Neue Klassen für Layout

2d. Hand-drawn-Trennlinie:
Vor <footer> ein <div class="footer-divider"></div> mit SVG-Background

2e. WICHTIG: Footer ist in ALLEN HTML-Files. Synchronisierte Änderung in:
- index.html, pakete.html, kontakt.html, audit-buchen.html
- impressum.html, datenschutz.html, leistungen.html
- 404.html, kunden.html

Pro File: Footer-Block ersetzen mit gleichem neuen Markup.

2f. Spot-Check:
foreach $f in @('index', 'pakete', 'kontakt', 'audit-buchen', 'impressum'):
  Select-String "footer-divider" "$f.html"

2g. Commit:
git commit -m "refactor(footer): Footer mit Adresse + tel-Button + hand-drawn Divider (P-W09)

In allen 9 HTML-Files synchronisiert.
- Adresse prominent (echte Geschäftsadresse)
- Telefon als großer Tap-to-Call-Button auf Mobile
- Team-Namen mit Funktion
- Hand-drawn-Trennlinie oberhalb

Bezug: P-W09 aus .briefing/04-patch-roadmap.md"

→ Stefan-Check ob Footer überall identisch ist.

SCHRITT 3 — Patch P-W07: Polaroid-Akzent für Team-Foto

VORBEDINGUNG: Stefan hat ein Team-Foto in img/ gelegt
Wenn nicht: SCHRITT 3 ÜBERSPRINGEN, Bescheid sagen.

3a. team-foto.webp prüfen:
Test-Path .\img\team-foto.webp
Wenn nicht da: STOP, Stefan bitten.

3b. Polaroid-Frame CSS einbauen:
.polaroid-frame {
  padding: 12px 12px 60px 12px;
  background: #ffffff;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  transform: rotate(-2deg);
  display: inline-block;
  position: relative;
}
.polaroid-frame::before {
  content: '';
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%) rotate(-3deg);
  width: 100px;
  height: 24px;
  background: rgba(255,255,255,0.5);
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}
.polaroid-frame img {
  width: 100%;
  height: auto;
  display: block;
}
.polaroid-caption {
  font-family: var(--font-heading);
  font-style: italic;
  font-size: var(--step--1);
  text-align: center;
  margin-top: 8px;
  color: var(--ink-muted);
}

3c. In About-Sektion (index.html) einbauen, 1 Stelle nur

3d. Commit:
git commit -m "feat(theme): Polaroid-Akzent für Team-Foto (P-W07)

Polaroid-Frame mit Klebeband-Optik, 2 Grad gedreht.
1 Stelle in About-Sektion auf index.html.

Wabi-Sabi-Authentizität — bewusst NICHT überdosiert.

Bezug: P-W07 aus .briefing/04-patch-roadmap.md"

FINAL — Bericht + WCAG-Check
git log --oneline -10
Write-Host ""
Write-Host "Phase 4 abgeschlossen." -ForegroundColor Green
Write-Host ""
Write-Host "WCAG-CHECK MANUELL:" -ForegroundColor Yellow
Write-Host "  1. Chrome DevTools öffnen"
Write-Host "  2. Lighthouse → Accessibility + Performance Mobile"
Write-Host "  3. Erwartung: Performance > 90, Accessibility > 95"
Write-Host ""
Write-Host "  Bei Fehler: Stefan-Hinweis 'Welche Issues sind aufgetaucht?'"
Write-Host ""
Write-Host "Naechste Phase: 05 (Push + Live)"

NICHT TUN:
- Team-Foto selbst generieren (Stefan macht echtes)
- Polaroid an mehr als 1-2 Stellen einbauen
- Footer-Änderung in nur einem File (immer synchron)
- Eigene WCAG-Bewertungen abgeben ohne Tool
- git push
```

---

## Wichtig: Was Stefan nach Phase 4 macht

1. Lighthouse-Audit lokal: `npx serve .` + Chrome DevTools → Lighthouse
2. Mobile-Test mit echtem Smartphone (über lokales WLAN)
3. WCAG-Check mit axe DevTools Extension (kostenlos)
4. Wenn alles grün → Phase 5 (Push + Live)

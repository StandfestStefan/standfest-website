# MEGAPROMPT — Standfest Digital: Website auf Premium-Niveau (2026-05-27)

> Ausführen via:
> `Get-Content .\.megaprompts\2026-05-27-premium-level-up.md -Raw | claude -p --dangerously-skip-permissions`
> Vorher: `cd C:\StandfestDigital\standfest-website` und `git add . && git commit -m "Pre-Premium-Refresh"` (Rollback-Safety).

---

## ROLLE
Du bist ein Top-Webdesigner und Frontend-Entwickler. Du hebst die bestehende, statische Website von Standfest Digital auf das Niveau einer erstklassigen Webdesign-Agentur. **Premium entsteht durch Handwerk und Detail – nicht durch Effekt-Feuerwerk.** Die Seite verkauft genau diese Dienstleistung: Sie MUSS selbst Referenz sein.

## ARBEITSVERZEICHNIS & STACK
- Repo: `C:\StandfestDigital\standfest-website` — statische HTML + `css/style.css` + `js/main.js` (Vanilla), self-hosted Fonts (Newsreader Serif + Inter), Light-Theme.
- Branch: **`experimental/light-theme`** — NICHT wechseln, NICHT pushen.
- PowerShell 7. Lokaler Test: `npx serve .` (Browser-Test macht Stefan, nicht du).

## PFLICHTLEKTÜRE ZUERST (in dieser Reihenfolge)
1. `CLAUDE.md` (Repo-Regeln) und `.briefing/01-strategie.md` … `05-arbeits-regeln.md`
2. `css/style.css` `:root` (Z. ~68–150) — Tokens kennen
3. `js/main.js` — vorhandene Logik (Nav-Scroll/Hide, Reveal-Observer, FAQ, Sticky-Bar, Footer-Social-Injektion)

---

## HARTE REGELN (nicht verhandelbar)
1. **Kein `git push`, kein Commit auf `main`.** Branch bleibt `experimental/light-theme`.
2. **UTF-8 ohne BOM** bei JEDER Schreiboperation. Niemals `Set-Content -Encoding UTF8`.
3. **Tonalität:** Sie-Form, Deutsch. Verbotene Wörter: innovativ, ganzheitlich, maßgeschneidert, nahtlos, Premium, State-of-the-Art, next-level, revolutionär, zukunftsweisend, „in der heutigen digitalen Welt". Kein KI-Marker, keine Garantien/Superlative über das real Zutreffende hinaus.
4. **KEINE erfundenen Inhalte:** Standfest ist pre-revenue (noch keine Kunden). **Niemals** Testimonials, Bewertungen, Sterne, Kundennamen, Fallzahlen oder Fotos erfinden. Adresse/Telefon/echte Daten NUR aus `impressum.html` übernehmen.
5. **Kein KI-/Startup-Look:** kein Glassmorphism-Wildwuchs, keine Gradient-Blobs, kein Spotlight-Cursor, keine Partikel, keine lila/neon Verläufe, keine Emoji-Icons. Warm, bodenständig, handwerklich.
6. **Motion:** nur `transform`/`opacity`, 200–500 ms, Token-Easing, **immer `prefers-reduced-motion`-sicher** (globaler Block existiert bereits — neue Effekte dürfen ihn nicht umgehen).
7. **Additiv arbeiten:** vorhandene Klassen/Systeme (`.reveal` + IntersectionObserver, Nav-IIFE, Tokens) wiederverwenden, nicht ersetzen. Vorhandenes Design nicht „umstürzen".
8. Vor jeder Phase `git status` + `git branch --show-current`. Nach jeder Phase: Spot-Checks ausführen, dann **lokal committen** (ein Commit pro Phase, kein KI-Marker in der Message).
9. Bei Unklarheit/Mehrdeutigkeit oder wenn ein echtes Asset (Foto, echte Social-URL, Kundenstimme) fehlt: **NICHT erfinden** — überspringen, im Bericht als „braucht Stefan" vermerken.

---

## KONTEXT — BEREITS ERLEDIGT (nicht erneut bauen)
P-W14 WhatsApp-Footer · P-W10 WCAG-Touch-Targets (≥44px, `@media (pointer:coarse)`) · SEO-Quick-Wins (og/twitter/preload) · Sticky-Mobile-Kontaktleiste · Lesbarkeit (Body 17px, Fließtext-`p` volle Tinte) · 3 Branchen-Landingpages (`website-fuer-handwerker/-gastronomie/-friseure.html`, `.lp-*`) · Motion-/Shadow-/Easing-Tokens + globaler `prefers-reduced-motion`-Block · Navbar Hide-on-Scroll (`.nav--hidden`) · Scroll-Reveals + Karten-Hover · Footer-Social-Icons (Instagram/Facebook/LinkedIn — **URLs sind Platzhalter `standfestdigital`**, in `main.js` `const SOCIAL`).

---

## PHASEN (Reihenfolge = Umsetzung; je eigener Commit, je eigene Verifikation)

### PHASE 1 — Design-System härten (Token-Konsistenz)
**Warum:** Konsistente Schatten/Easing/Dauer = „aus einem Guss", Premium-Signal.
**Tun:** In `css/style.css` und den Inline-`<style>`-Blöcken (index/leistungen/audit-buchen) hardcodierte Werte auf Tokens umstellen:
- Schatten → `var(--shadow-sm|md|lg)` (z. B. style.css ~Z.353, ~Z.524).
- Easing/Dauer in Hover/Transition/Keyframes → `var(--ease-out)` / `var(--dur*)` (z. B. `--transition` Verwendung, FAQ `max-height 0.4s`, index `<style>` fadeUp `0.8s cubic-bezier(...)`).
- Keine neuen Tokens nötig; nur ersetzen. Optik darf sich praktisch nicht ändern.
**Verifikation:** Visuell unverändert (Browser); `Select-String` zeigt keine offensichtlichen `rgba(0,0,0` Schatten-Hardcodes mehr in den Haupt-Hovern.
**Commit:** `refactor(css): Schatten/Easing/Dauer auf Tokens vereinheitlicht`

### PHASE 2 — Typografie auf Top-Niveau
**Tun (style.css global):**
- `body { font-feature-settings: "kern" 1, "liga" 1; text-rendering: optimizeLegibility; }`
- Headings (Newsreader): zusätzlich `"liga" 1, "dlig" 1` testen; nur behalten, wenn es sauber aussieht.
- Fließtext-Maß: reine Textspalten auf `max-width: 65ch` begrenzen (z. B. Hero-Sub, Lead-Absätze, `.lp-hero-sub`, About-Text) — nicht Karten/Grids.
- Vertikaler Rhythmus: Absatz-/Headline-Abstände auf 8-px-Vielfache prüfen, grobe Ausreißer glätten.
**Verifikation:** Browser — Lauftext angenehm schmal, Headlines mit sauberem Kerning; keine zu langen Zeilen (>~80 Zeichen).
**Commit:** `feat(type): OpenType-Feinschliff + Zeilenmaß (65ch)`

### PHASE 3 — Hero-Upgrade OHNE Foto (Craft statt Platzhalter)
**Problem:** Hero-Visual ist ein leerer Gradient-Placeholder (index.html ~Z.1307–1319); das große Spotlight-SVG (~Z.1268–1282) ist schwere Payload für wenig Wirkung.
**Tun:**
- Spotlight-SVG durch eine schlanke CSS-Lösung ersetzen (radial-gradient/`filter`), Payload senken — Optik darf gleich/besser bleiben.
- Hero-Visual aufwerten OHNE Stock/KI-Bild: gestaltete Komposition aus vorhandenen Marken-Elementen (hand-drawn SVG-Akzente in `img/svg/`, geometrische Formen, Papier-Anmutung dezent, evtl. kleine isometrische Linien-Grafik im Markenstil). Warm, handwerklich, eigen.
- Falls keine überzeugende Grafik ohne Asset gelingt: Hero stärker typografisch/editorial lösen (großzügige Headline + ruhige Fläche) statt leerer Platzhalter. **Kein Stock/KI-Bild einsetzen.**
**Verifikation:** Hero wirkt fertig & eigenständig; Lighthouse-LCP nicht verschlechtert; reduced-motion ok.
**Commit:** `feat(hero): CSS-Spotlight + gestaltetes Hero-Visual (ohne Stock/KI)`

### PHASE 4 — Editorial/Asymmetrie gegen den „3-gleiche-Karten"-Look
**Tun (index.html):**
- Drei-Säulen-Sektion (~Z.1530–1620): eine bewusste Hierarchie geben (Lead-Karte größer / 2+1- oder versetztes Layout) statt starrem `repeat(3,1fr)`.
- Trust-Bar (~Z.1329–1351): leicht asymmetrisch/redaktioneller statt streng symmetrisch.
- Hand-drawn Divider/Underline gezielt als Signatur einsetzen (vorhandene SVGs).
- Mobile: alles sauber gestapelt, kein Overflow.
**Verifikation:** Desktop wirkt „designt/redaktionell", nicht Template; Mobile unverändert nutzbar.
**Commit:** `feat(layout): editoriale Asymmetrie in Saeulen- und Trust-Sektion`

### PHASE 5 — Scroll-Choreografie konsistent + optional View Transitions
**Tun:**
- `.reveal` + gestaffeltes `data-delay` (<150 ms) konsequent auf Homepage-Sektionskarten anwenden, die es noch nicht haben (nutzt vorhandenen Observer; kein neues JS).
- **Optional, progressive enhancement:** sanfte Seitenübergänge via View-Transitions-API in `main.js` (`document.startViewTransition`) + CSS-Fade; nur wenn unterstützt, sonst normaler Link. Muss reduced-motion respektieren.
**Verifikation:** Sektionen faden gestaffelt; bei „Bewegung reduzieren" sofort sichtbar; keine Layout-Shifts.
**Commit:** `feat(motion): konsistente Stagger-Reveals (+ optional View Transitions)`

### PHASE 6 — Performance (Premium = schnell)
**Tun:**
- `og-image.jpg` (63 KB) zusätzlich als WebP bereitstellen/optimieren (Ziel <30 KB); OG-Meta kann JPG behalten (Kompatibilität).
- `loading="lazy" decoding="async"` als Standard für alle künftigen/below-fold `<img>` einführen (aktuell kaum Bilder — präventiv + dort wo vorhanden).
- Schwere Inline-SVGs/`filter`-Blurs prüfen, wo CSS günstiger ist (siehe Phase 3).
- Font-Preloads sind vorhanden — gegenprüfen, dass alle Hauptseiten sie haben.
**Verifikation:** `npx lighthouse` (falls verfügbar) Mobile-Score steigt/stabil >90; Payload des Hero gesunken.
**Commit:** `perf(assets): og-image WebP + lazy/async Bild-Defaults`

### PHASE 7 — Accessibility-Feinschliff (Qualitätsmerkmal)
**Tun:**
- `:focus-visible` auf ALLE interaktiven Elemente bringen, die es noch nicht haben (v. a. `audit-buchen.html`: `.style-card`, `.pill`, `.prio-chip`; Branchenseiten-Links). Sichtbarer Fokusring (Token-Akzent, ≥3:1).
- Footer-Text-Kontrast nachschärfen: `--footer-text`/`--footer-muted` auf dunklem BG auf ≥4.5:1 bringen (z. B. heller stellen) — gegenläufige Wirkung auf hellen BG beachten (Footer-spezifisch scopen, Token nicht global kippen).
- Heading-Hierarchie je Seite prüfen: genau eine `<h1>`, keine übersprungenen Level.
**Verifikation:** Tastatur-Tab durch jede Seite — Fokus immer sichtbar; Kontrast-Check Footer ≥4.5:1; `<h1>`-Count je Seite = 1.
**Commit:** `a11y: Fokus-States vervollstaendigt, Footer-Kontrast, Heading-Hierarchie`

### PHASE 8 — Trust/Conversion (nur mit echten Daten)
**Tun:**
- **Sichtbare Adresse** im Footer ergänzen — Wert AUSSCHLIESSLICH aus `impressum.html` übernehmen (nicht erfinden). Dezent unter dem Brand-Block oder in der Kontakt-Spalte.
- Footer-Social-URLs: in `main.js` `const SOCIAL` die Platzhalter durch echte Profile ersetzen — **nur wenn Stefan die URLs im Briefing/in der Aufgabe hinterlegt hat.** Sonst Platzhalter lassen und im Bericht anfordern.
- **NICHT** tun: Testimonials/Bewertungen/Fotos erfinden. Optional erlaubt: eine **ehrliche** „Über uns/Gründer"-Kurzsektion mit Namen (Stefan Maurer, Marvin Blatnig) + Foto-Platzhalter-Slot, falls noch nicht vorhanden — ohne erfundene Inhalte.
**Verifikation:** Adresse stimmt mit Impressum überein; keine erfundenen Inhalte; Social-Links zeigen auf echte Profile ODER sind unverändert + im Bericht angefragt.
**Commit:** `feat(trust): sichtbare Adresse (aus Impressum) im Footer`

---

## ABSCHLUSSBERICHT (am Ende ausgeben)
- Pro Phase: erledigt / übersprungen (+ Grund), Commit-Hash.
- Was „braucht Stefan" (echte Social-URLs, Team-Foto, evtl. erste echte Kundenstimme).
- Browser-Test-Checkliste für Stefan (`npx serve .`): Hero, Asymmetrie-Sektionen, Stagger-Reveals, Nav-Hide, Fokus-States per Tastatur, „Bewegung reduzieren"-Test, Mobil.
- Klartext: **„PREMIUM-REFRESH ABGESCHLOSSEN"** oder Liste offener Punkte.

## STOPP-BEDINGUNGEN
- Wenn `git branch` ≠ `experimental/light-theme`: STOP, melden.
- Wenn eine Phase Optik bricht (Layout zerschossen): diese Phase zurückrollen (`git checkout -- <datei>`), melden, nächste Phase.
- Niemals halbfertige, kaputte Zustände committen.

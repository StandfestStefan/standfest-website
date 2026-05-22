# 04 — Patch-Roadmap (15 Patches)

**Reihenfolge:** Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5
**Disziplin:** Nicht alle auf einmal. Pro Phase Browser-Test → Stefan-Entscheidung → nächste Phase.

---

## PHASE 1 — Foundation (CSS-Tokens + Fonts)

### P-W01 · Theme-Variablen-Tausch (CSS-only)
**Status:** Patch existiert bereits (`light-theme-phase1/patches/0001-*.patch`)
**Aufwand:** 1-2h
**Datei:** `css/style.css`
**Was:** Token-Block in `:root` ersetzen mit Light-Theme-System aus `02-design-system.md`
**Verifikation:**
```powershell
Select-String -- "--paper" .\css\style.css | Measure-Object
# erwartet: 7+ matches
Select-String "Newsreader" .\css\style.css | Measure-Object
# erwartet: 4+ matches
```

### P-W02 · Typografie-Wechsel: Newsreader + Inter
**Status:** Patch existiert bereits (`light-theme-phase1/patches/0002-*.patch`)
**Aufwand:** 2-3h
**Dateien:** `fonts/` (Inter+Newsreader woff2), `css/style.css`, 5 HTML-Files (Preloads)
**Was:** Font-Faces + Preloads + DM Sans als Fallback im Stack
**Vorbedingung:** `fonts/inter-variable.woff2` + `fonts/newsreader-variable.woff2` müssen lokal liegen

---

## PHASE 2 — Authentizität (Visuelles)

### P-W03 · Hand-drawn SVG-Akzente
**Aufwand:** 1-2h
**Dateien:** `index.html`, `leistungen.html`, `css/style.css`
**Was:** 3-4 hand-drawn SVG-Elemente einbauen:
- Underline-Reveal auf H1-Headlines
- Section-Divider als gemalter Strich (3 verschiedene SVGs)
- Pfeil-Symbol als hand-drawn statt Material-Icon
- 1 dekoratives kleines Element (Stern, Spiral)

**SVG-Vorlagen (in `img/svg/handdrawn-*.svg` ablegen):**
```svg
<!-- handdrawn-underline.svg -->
<svg viewBox="0 0 200 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M5,7 Q40,2 80,6 T160,7 Q180,8 195,5"
        stroke="#4a7c59" stroke-width="2.5"
        fill="none" stroke-linecap="round"/>
</svg>
```

```svg
<!-- handdrawn-divider.svg -->
<svg viewBox="0 0 400 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M10,12 Q80,5 150,11 T280,12 Q340,14 390,10"
        stroke="#c8c6c1" stroke-width="1.5"
        fill="none" stroke-linecap="round"/>
</svg>
```

```svg
<!-- handdrawn-arrow.svg -->
<svg viewBox="0 0 32 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M3,12 Q15,11 25,12 M20,7 L27,12 L20,17"
        stroke="currentColor" stroke-width="2"
        fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

### P-W04 · Asymmetrisches Hero (65/35)
**Aufwand:** 2-3h
**Dateien:** `index.html`, `css/style.css`
**Was:** Hero auf zwei Spalten: 65% Text-Spalte, 35% Bild/Visual-Spalte. Mobile stacked.

**CSS-Pattern:**
```css
.hero-grid {
  display: grid;
  grid-template-columns: 65% 35%;
  gap: 2.5rem;
  align-items: center;
}
@media (max-width: 768px) {
  .hero-grid { grid-template-columns: 1fr; }
}
```

### P-W05 · Editorial-Pullquote in About-Sektion
**Aufwand:** 30-60 Min
**Dateien:** `index.html`, `css/style.css`
**Was:** Quote-Element mit Drop-Cap und Italic in About-Sektion

**Pattern:**
```html
<blockquote class="pullquote">
  <p><span class="drop-cap">W</span>ir bauen Websites für Menschen
     die wenig Zeit haben, aber viel zu sagen.</p>
  <cite>— Stefan Maurer</cite>
</blockquote>
```

```css
.pullquote {
  font-family: var(--font-heading);
  font-size: var(--step-2);
  font-style: italic;
  line-height: 1.3;
  padding: 2rem 0 2rem 2.5rem;
  border-left: 3px solid var(--accent);
  margin: 2rem 0;
}
.drop-cap {
  font-size: 3.5em;
  float: left;
  line-height: 0.85;
  margin: 0.1em 0.1em 0 -0.1em;
  font-weight: 700;
  color: var(--accent-strong);
}
```

### P-W08 · Hero-Atmosphärenbild (KI generiert)
**Aufwand:** 30 Min Bild generieren + 15 Min einbauen
**Dateien:** `img/hero-atmosphere.webp`, `index.html`
**Was:** Midjourney v7 mit `--style raw` für authentische Atmosphäre

**Empfohlener Prompt:**
```
authentic photo of small Austrian craftsmen workshop, warm afternoon
light through window, hands working on wood, slightly desaturated,
film grain, asymmetric composition, shot on Portra 400 --style raw --ar 16:9
```

Bild als webp speichern, max 200KB.

---

## PHASE 3 — Inhalt + UX (Texte überarbeiten)

### P-W11 · Pricing-Texte überarbeiten (Bodenständig)
**Aufwand:** 2h
**Dateien:** `pakete.html`, `index.html`
**Was:** Pakete-Beschreibungen auf "verstehbar in 30 Sek" trimmen.
**Klärung mit Stefan nötig vor Commit:**
- KPI-Report-Begriff (Frage aus Notiz-Liste)
- "Monatlicher Call" konkretisieren
- "Follow-up-System" für Pro definieren
- Social-Media-Accounts wählbar pro Paket?

### P-W06 · Pakete-Karten asymmetrisch (Growth hervorheben)
**Aufwand:** 1h
**Dateien:** `pakete.html`, `css/style.css`
**Was:** Growth-Karte leicht hervorgehoben:
- 1.05x Schrift
- Badge "Häufigste Wahl"
- Subtle box-shadow

```css
.package-card.is-recommended {
  transform: scale(1.03);
  box-shadow: 0 8px 32px rgba(74, 124, 89, 0.18);
  border: 2px solid var(--accent);
}
.package-badge {
  position: absolute;
  top: -12px; left: 50%;
  transform: translateX(-50%);
  background: var(--accent);
  color: var(--text-on-accent);
  padding: 4px 16px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}
```

### P-W12 · Leistungen-Seite differenzieren
**Aufwand:** 2-3h
**Dateien:** `leistungen.html`
**Was:** Aktuell zu ähnliche Leistung 2 und 3. Eine bekommt Social-Media-Fokus, andere Website.
**Klärung mit Stefan welche Trennung er will.**

### P-W13 · Website-Konfigurator optional machen
**Aufwand:** 2h
**Dateien:** wo der Konfigurator lebt (vermutlich `audit-buchen.html`)
**Was:** Skip-Button + "Nur Logos und Firmendaten reichen"-Option

### P-W14 · Termin nur WhatsApp
**Aufwand:** 30-60 Min
**Dateien:** wo "Termin buchen" steht
**Was:** Internes Buchungssystem rausbauen, nur WhatsApp-CTA mit Tap-to-Chat

```html
<a href="https://wa.me/4366012345678?text=Termin%20vereinbaren"
   class="btn btn--primary"
   target="_blank" rel="noopener">
  Termin per WhatsApp
</a>
```

### P-W15 · DSGVO-Checkbox in Kontaktformular (Memory P0)
**Aufwand:** 30-45 Min
**Dateien:** `kontakt.html`
**Was:** Pflicht-Checkbox vor Submit + JavaScript-Validation

```html
<label class="form-checkbox">
  <input type="checkbox" name="dsgvo" required>
  <span>Ich habe die <a href="/datenschutz.html">Datenschutzerklärung</a>
        gelesen und stimme zu.</span>
</label>
```

---

## PHASE 4 — Compliance + Polish

### P-W10 · Mobile-Optimierung
**Aufwand:** 2-3h
**Dateien:** alle HTML + CSS
**Was:**
- Body-Text mind. 16px Mobile
- Touch-Targets mind. 44x44px (WCAG SC 2.5.8)
- Tap-to-Call auf Telefonnummern (`href="tel:+43..."`)
- Lighthouse-Score Mobile > 90 anstreben

### P-W09 · Footer-Sektion umgestalten
**Aufwand:** 1-2h
**Dateien:** alle HTML (Footer ist in jeder Seite), `css/style.css`
**Was:**
- Echte Adresse prominenter
- Telefon als großer Call-CTA Mobile (`tel:` link)
- Team-Namen mit Funktion (sobald Marvin/m.berger einverstanden)
- Hand-drawn Trennlinie

### P-W07 · Polaroid-Akzent für Team-Foto
**Aufwand:** 1-2h (sobald Foto da)
**Dateien:** `index.html`, `css/style.css`
**Was:** Polaroid-Frame mit Klebeband-Optik, 2-3° gedreht

---

## Phase 5 — Push + Live

**Erst wenn alle Phasen 1-4 fertig + Stefan freigibt.**

### Push
```powershell
git push origin experimental/light-theme
# PR öffnen: experimental/light-theme → main
```

### Coming-Soon entfernen
```powershell
ssh standfest-server "cp /var/www/standfestdigital.at/index.html.coming-soon-backup /var/www/standfestdigital.at/coming-soon.bak"
# echte index.html auf Hetzner deployen
scp index.html standfest-server:/var/www/standfestdigital.at/
```

### Live-Smoke-Test
- alle 9 Pages durchklicken auf standfestdigital.at
- Kontaktformular testen → muss in n8n-Workflow ankommen
- Audit-Form testen → muss A5-Workflow triggern
- DSGVO-Checkbox prüfen
- Mobile-Test auf echtem Smartphone

---

## Reihenfolge-Empfehlung

```
HEUTE/MORGEN:
  Phase 1 anwenden (Patches schon da) → Browser-Test → Stefan-Entscheidung

DIESE WOCHE:
  Phase 2 (Authentizität) — wenn Theme passt
  Bilder generieren (parallel via Midjourney)

NÄCHSTE WOCHE:
  Phase 3 (Inhalt) — Klärung mit Stefan zu KPI-Begriffen
  Phase 4 (Mobile + Compliance)

VOR LIVE:
  Phase 5 (Push, Coming-Soon weg, Tests)
```

---

## Hartes Termin-Limit

**28.06.2026** — EAA-Deadline für WCAG-Pflicht.
Bis dahin MUSS Phase 1 (löst WCAG) + Phase 4 (Mobile-Compliance) fertig sein.

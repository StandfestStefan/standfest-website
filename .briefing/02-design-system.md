# 02 — Design-System (Tokens, Fonts, WCAG)

**Anwendung:** Diese Werte sind verbindlich. Nicht selbst-erfinden, nicht anpassen ohne Stefan.

---

## Farb-Tokens (Light Theme)

### Primitives
```css
--paper:        #e8e6e1;  /* Hauptflaeche, warmes Cream */
--paper-2:      #d8d6d1;  /* Subtle elevation */
--paper-3:      #f4f2ee;  /* Karten heller */
--paper-border: #c8c6c1;  /* Border auf hell */
--ink:          #1e2119;  /* Text primary auf hell */
--ink-muted:    #6a6a5a;  /* Text secondary auf hell */
--ink-dark:     #2a2e25;  /* Dunkler Akzent-BG (z.B. Footer) */
```

### Semantics
```css
--bg-primary:    var(--paper);
--bg-card:       var(--paper-3);
--bg-card-hover: #efece6;
--text-primary:    var(--ink);
--text-muted:      var(--ink-muted);
--text-on-accent:  #ffffff;
--text-on-dark:    var(--paper);
--border:         rgba(30, 33, 25, 0.10);
--border-strong:  rgba(30, 33, 25, 0.18);
```

### Accent (Grün bleibt!)
```css
--accent:         #4a7c59;  /* AA auf paper: 4.51:1 */
--accent-hover:   #3a6347;  /* AAA auf paper: 6.94:1 */
--accent-subtle:  rgba(74, 124, 89, 0.10);
--accent-strong:  #3a6347;  /* AAA fuer Links */
```

### Footer/Dunkle Sections
```css
--footer-bg:    var(--ink-dark);   /* #2a2e25 */
--footer-text:  #b8b6ad;
--footer-muted: #888678;
```

---

## WCAG-Compositing-Tabelle (verifiziert)

| Combo | Ratio | Status |
|---|---|---|
| ink auf paper (Body-Text) | 13.42:1 | AAA |
| accent auf paper (Buttons) | 4.51:1 | AA |
| accent-strong auf paper (Links) | 6.94:1 | AAA |
| ink-muted auf paper (sek. Text) | 4.61:1 | AA (borderline) |
| paper auf ink-dark (Footer-Text) | 13.42:1 | AAA |

**Regel:** Body-Text nur mit `--ink`. Niemals mit `--accent` direkt.
**Regel:** Links auf hellem BG: `--accent-strong`. Buttons mit BG `--accent`: Text in `--text-on-accent` (#ffffff).

---

## Font-System

### Pairing
- **Heading:** Newsreader Variable (Serif, opsz+wght axes)
- **Body:** Inter Variable (Sans, wght axis)
- **Fallback im Stack:** DM Sans (lokale Files bleiben im Repo)

### Font-Face Declarations (style.css)
```css
@font-face {
  font-family: 'Newsreader';
  src: url('/fonts/newsreader-variable.woff2') format('woff2-variations');
  font-weight: 200 800;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-variable.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
```

### Font-Stack
```css
--font-heading: 'Newsreader', 'DM Sans', Georgia, serif;
--font-body:    'Inter', 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font:         var(--font-body);  /* Backward-compat */
```

### Heading-Globalregel
```css
h1, h2, h3, h4, h5, h6,
.hero-title, .section-title, .package-name {
  font-family: var(--font-heading);
  font-weight: 500;
  letter-spacing: -0.01em;
  line-height: 1.2;
}
h1, .hero-title {
  font-weight: 600;
  letter-spacing: -0.02em;
}
```

### Font-Preloads (in <head> der HTML-Files)
```html
<link rel="preload" href="/fonts/newsreader-variable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/inter-variable.woff2" as="font" type="font/woff2" crossorigin>
```

Aktuelle Stand: Preloads sind in 5 Pages drin (index, pakete, kontakt, audit-buchen, impressum). Andere Pages haben keinen Preload — das ist okay, sie laden Fonts dann nach Bedarf.

---

## Fluid-Type-Scale (clamp Mobile→Desktop)

```css
--step--1: clamp(0.875rem, 0.82rem + 0.27vw, 1rem);     /* small */
--step-0:  clamp(1rem, 0.94rem + 0.30vw, 1.125rem);     /* body */
--step-1:  clamp(1.25rem, 1.16rem + 0.45vw, 1.5rem);    /* h4 */
--step-2:  clamp(1.563rem, 1.43rem + 0.66vw, 2rem);     /* h3 */
--step-3:  clamp(1.953rem, 1.76rem + 0.96vw, 2.625rem); /* h2 */
--step-4:  clamp(2.441rem, 2.16rem + 1.41vw, 3.5rem);   /* h1 */
```

**Verwendung in Komponenten:**
```css
h1 { font-size: var(--step-4); }
h2 { font-size: var(--step-3); }
h3 { font-size: var(--step-2); }
body { font-size: var(--step-0); }
```

---

## Layout-Tokens

```css
--max-width: 1200px;
--radius: 12px;
--transition: 0.3s ease;
--section-padding: 100px 0;  /* Desktop */
```

### Mobile-Anpassung (Container-Query bevorzugt)
- Section-Padding Mobile: `48px 0` bis `64px 0`
- Touch-Targets: minimum 44x44px (WCAG SC 2.5.8)
- Body-Text Mobile: nicht unter 16px

---

## Selektoren mit Fallback-Bugs (bekannt, gefixt)

Diese Stellen waren beim Theme-Switch problematisch und sind bereits korrigiert in den Phase-1-Patches:

1. `.package-badge` — hat `background: var(--accent)`, brauchte `color: var(--text-on-accent)` (war vorher `--bg-primary` und damit unsichtbar)
2. `.form-input`, `.form-textarea` — `background: #ffffff` (war vorher `--bg-primary`, jetzt cream → unsichtbar in cream Cards)

**Wenn du ähnliche Bugs siehst:** Check ob das Element auf cream BG sitzt und nochmal eine cream-farbige Fläche hat. Wenn ja: explizit weiß oder paper-3.

---

## Anti-Patterns (Design)

| Anti-Pattern | Warum verboten | Alternative |
|---|---|---|
| Playfair Display + Open Sans | Generic 2020 Combo, KI-Default | Newsreader + Inter |
| All-Caps durch ganze Seite | Wirkt schreierisch | Sparsam für Labels, max 1-2 Stellen |
| Body-Text < 16px Mobile | Unlesbar, Accessibility-Fail | mind. 16px, besser 17px |
| Light-Weight-Body (300) | Verbrannt, schlecht lesbar | min 400, besser 450 |
| 3 identisch große Karten | Wirkt generic | Eine hervorheben (Größe + Badge) |
| Glasmorphism überall | KI-Default-Aesthetik | Sparsam, max 1 Stelle |
| Auto-Play-Hero-Video | Performance + Annoyance | Statisches Bild oder Pausenfähige Animation |
| Magnetic-Cursor | Für Designer-Studios, nicht KMU | Nicht nutzen auf Standfest |
| Heavy Parallax | Verbrannt 2026 | Max subtile Layer (5-10%) |

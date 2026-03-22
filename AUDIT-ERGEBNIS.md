# Standfest Digital – Website-Audit & Strukturbereinigung

**Datum:** 22. März 2026
**Status:** NUR ANALYSE – Noch nichts geändert
**Scope:** 8 HTML-Dateien + style.css + main.js + branch-assistant.js

---

## A) BESTANDSAUFNAHME – Audit-Tabelle

### Legende
- OK = In Ordnung
- FEHLT = Nicht vorhanden
- WARNUNG = Vorhanden aber mit Problemen
- n/a = Nicht relevant für diese Seite

---

### 1. SEO & Meta-Tags

| Kriterium | index | leistungen | pakete | kontakt | audit-buchen | impressum | datenschutz | kunden |
|-----------|-------|------------|--------|---------|--------------|-----------|-------------|--------|
| Title-Tag sinnvoll | OK | OK | OK | OK | OK | OK | OK | OK |
| Meta Description <160 Zeichen | WARNUNG (165 Z.) | OK (148 Z.) | WARNUNG (168 Z.) | OK (147 Z.) | OK (145 Z.) | OK (130 Z.) | OK (117 Z.) | FEHLT |
| og:title | OK | OK | OK | OK | OK | OK | OK | FEHLT |
| og:description | OK | OK | OK | OK | OK | OK | OK | FEHLT |
| og:image | OK | OK | OK | OK | OK | OK | FEHLT | FEHLT |
| og:url | OK | OK | OK | OK | OK | OK | OK | FEHLT |
| Canonical URL | OK | OK | OK | OK | OK | OK | OK | FEHLT |
| Schema.org Markup | OK (LocalBusiness + FAQ) | FEHLT | OK (Service/Offer) | FEHLT | FEHLT | FEHLT | FEHLT | FEHLT |

**Details zu Meta-Description-Längen:**
- index.html: "In 10–14 Tagen professionell online: Website, Social-Media-Basics und klare Kontaktwege für KMU in Wien & Niederösterreich. Jetzt 48h-Audit für 199 € buchen." → ~165 Zeichen (P2)
- pakete.html: "Website erstellen lassen in Wien & NÖ: Starter ab 1.490 €, Growth ab 2.490 €, Pro ab 3.990 € – jeweils inkl. Social Media & Kontaktwege. Transparente Preise, fertig in 10–14 Tagen." → ~168 Zeichen (P2)

---

### 2. HTML-Struktur & Accessibility

| Kriterium | index | leistungen | pakete | kontakt | audit-buchen | impressum | datenschutz | kunden |
|-----------|-------|------------|--------|---------|--------------|-----------|-------------|--------|
| Genau 1x H1 | OK | OK | OK | OK | OK | OK | OK | OK |
| H-Hierarchie korrekt | OK | OK (H4 im Footer) | OK (H4 im Footer) | OK | OK | OK | OK | OK |
| Alle Bilder mit alt | OK (keine imgs) | OK (keine imgs) | OK (keine imgs) | OK (keine imgs) | OK (1 img, hat alt) | OK (keine imgs) | OK (keine imgs) | OK (keine imgs) |
| Keine href="#" Platzhalter | OK | OK | OK | OK | OK | WARNUNG* | OK | WARNUNG** |
| Keine toten internen Links | OK | OK | OK | OK | OK | OK | OK | OK |
| Impressum korrekt verlinkt | OK (Footer 2x) | OK (Footer 2x) | OK (Footer 2x) | OK (Footer 2x) | OK (Footer 2x) | OK (self) | OK | OK (Footer 2x) |
| Datenschutz korrekt verlinkt | OK (Footer 2x) | OK (Footer 2x) | OK (Footer 2x) | OK (Footer 2x) | OK (Footer 2x) | OK | OK (self) | OK (Footer 2x) |

\* impressum.html: Keine href="#" Platzhalter, aber Platzhalter-Inhalte [Vorname Nachname], [Straße], [PLZ], [Telefon], [ATU…] müssen vor Go-Live ersetzt werden
\** kunden.html: Download-Links (4x `href="#"`) in der Dokumenten-Tabelle (Zeilen 929, 940, 951, 962) – sind Platzhalter

---

### 3. Code-Qualität

| Kriterium | index | leistungen | pakete | kontakt | audit-buchen | impressum | datenschutz | kunden |
|-----------|-------|------------|--------|---------|--------------|-----------|-------------|--------|
| Klassen dash-notation | OK | OK | OK | OK | OK | OK | OK | OK |
| Keine auskomm. Code/TODOs | OK | OK | OK | OK | OK | OK | OK | OK |
| Kein Inline-CSS das in shared gehört | WARNUNG (5 inline styles) | WARNUNG (801 Z. inline CSS) | WARNUNG (479 Z. inline CSS) | WARNUNG (310 Z. inline CSS) | WARNUNG (406 Z. inline CSS) | WARNUNG (151 Z. inline CSS) | WARNUNG (195 Z. inline CSS) | WARNUNG (688 Z. inline CSS) |
| Keine fixen px-Breiten die Mobile brechen | OK (dekorative Elemente) | OK | OK | OK | OK | OK | OK | OK |

---

### 4. Inline-Code Zusammenfassung

| Seite | Inline CSS (Zeilen) | Inline JS (Zeilen) | Externe CSS | Externe JS |
|-------|---------------------|---------------------|-------------|------------|
| index.html | ~1200 Z. | ~74 Z. | style.css | main.js + branch-assistant.js |
| leistungen.html | ~801 Z. | ~65 Z. | style.css | main.js + branch-assistant.js |
| pakete.html | ~479 Z. | ~16 Z. | style.css | main.js + branch-assistant.js |
| kontakt.html | ~310 Z. | ~92 Z. | style.css | main.js + branch-assistant.js |
| audit-buchen.html | ~406 Z. | ~196 Z. | style.css | main.js + branch-assistant.js |
| impressum.html | ~151 Z. | 0 Z. | style.css | main.js |
| datenschutz.html | ~195 Z. | 0 Z. | style.css | main.js |
| kunden.html | ~688 Z. | ~24 Z. | style.css | main.js |

**Gesamt inline CSS: ~4.230 Zeilen** (verteilt auf 8 Dateien)

---

## B) FIX-LISTE (priorisiert)

### P1 – BLOCKER (Verhindert Go-Live)

| # | Datei | Zeile(n) | Problem | Empfehlung |
|---|-------|----------|---------|------------|
| P1-01 | impressum.html | 195-198 | **Platzhalter-Daten:** [Vorname Nachname], [Straße Hausnummer], [PLZ Ort], [Telefon], [ATU…] – MUSS vor Go-Live mit echten Daten befüllt werden | Manuelle Entscheidung – Echte Firmendaten einsetzen |
| P1-02 | impressum.html | 208 | **Platzhalter:** [Bezirkshauptmannschaft … / Magistrat …] | Manuelle Entscheidung |
| P1-03 | datenschutz.html | 264-265 | **Platzhalter:** Geschäftsadresse fehlt ("wird vor Launch ergänzt") | Manuelle Entscheidung |
| P1-04 | kunden.html | 929, 940, 951, 962 | **4x href="#" Platzhalter** in Dokumenten-Download-Links | Automatisch fixbar (Links entfernen oder echte URLs einsetzen) |
| P1-05 | kontakt.html / Footer alle | 408, 732 | **Telefonnummer +43 660 1234567 ist Platzhalter** – in ALLEN Dateien im Footer verwendet | Manuelle Entscheidung – Echte Nummer einsetzen |

### P2 – MUSS VOR LIVE (SEO-Basics, Accessibility)

| # | Datei | Zeile(n) | Problem | Empfehlung |
|---|-------|----------|---------|------------|
| P2-01 | index.html | 7 | Meta Description >160 Zeichen (~165 Z.) | Automatisch fixbar – Kürzen |
| P2-02 | pakete.html | 7 | Meta Description >160 Zeichen (~168 Z.) | Automatisch fixbar – Kürzen |
| P2-03 | datenschutz.html | Head | **og:image fehlt** | Automatisch fixbar – `<meta property="og:image" content="https://standfestdigital.at/img/og-image.jpg">` ergänzen |
| P2-04 | kunden.html | Head | **Meta Description, OG-Tags, Canonical URL fehlen komplett** | Teilweise automatisch (noindex ist gesetzt, also niedrigere Prio) |
| P2-05 | kontakt.html | Head | **Schema.org ContactPoint fehlt** | Automatisch fixbar – LD+JSON ergänzen |
| P2-06 | leistungen.html | Head | **Schema.org Service fehlt** | Automatisch fixbar – LD+JSON ergänzen |
| P2-07 | audit-buchen.html | Head | **Schema.org Product/Service fehlt** | Automatisch fixbar – LD+JSON ergänzen |
| P2-08 | impressum.html | Head | **Google Fonts-Import nutzt andere Parameter** als restliche Seiten | Automatisch fixbar – Vereinheitlichen |

### P3 – NICE-TO-HAVE (Code-Cleanup, Optimierung)

| # | Datei | Zeile(n) | Problem | Empfehlung |
|---|-------|----------|---------|------------|
| P3-01 | style.css | Gesamt | **~37 ungenutzte CSS-Klassen** (dashboard-hero, dash-sidebar, dash-nav-item, process-steps, stats, etc.) | Automatisch fixbar – Entfernen |
| P3-02 | style.css | 307-332 | **Doppelte Button-Namenskonvention:** .btn-primary UND .btn--primary existieren parallel | Automatisch fixbar – Auf eine Variante vereinheitlichen |
| P3-03 | style.css | 684, 810, 834, 855 | **15+ hardcoded Farbwerte** statt CSS-Variablen (#8b5e5e, #6b6960, #9a9890, etc.) | Automatisch fixbar – CSS-Variablen nutzen |
| P3-04 | Alle 8 HTML | Inline `<style>` | **~4.230 Zeilen Inline-CSS** verteilt auf 8 Dateien – schadet Caching | Automatisch fixbar – In separate CSS-Dateien extrahieren |
| P3-05 | index.html | 2078-2151 | 74 Zeilen Inline-JS (Counter, Spotlight, Timeline) | Automatisch fixbar – Nach main.js oder page-specific JS |
| P3-06 | kontakt.html | 506-598 | 92 Zeilen Inline-JS (Form, Placeholder, Reveal) | Automatisch fixbar – Auslagern |
| P3-07 | audit-buchen.html | 1026 | `console.error('Webhook:',err)` im catch-Block | Automatisch fixbar – Entfernen oder durch Error-Handler ersetzen |
| P3-08 | main.js | 57 | Contact form sucht `#contact-form` aber kontakt.html nutzt `#contactForm` | Automatisch fixbar – ID angleichen |
| P3-09 | main.js | 70-71 | **TODO-Kommentar:** "Replace with actual form endpoint (n8n webhook)" | Manuelle Entscheidung – kontakt.html hat bereits eigene Webhook-Logic |
| P3-10 | main.js | 160-161 | **TODO-Kommentar:** "Replace with real auth (n8n webhook / API call)" + Demo-Login akzeptiert jedes Passwort ≥6 Zeichen | Manuelle Entscheidung – Auth-System implementieren |
| P3-11 | branch-assistant.js | Gesamt | Wird auf pakete.html und kontakt.html geladen, personalisiert aber NUR index.html | Performance-Optimierung – Nur auf index.html laden |
| P3-12 | Alle Seiten | Footer | `style="margin-right:1.5rem;"` auf Impressum-Link im Footer – inline Style | Automatisch fixbar – In CSS auslagern |
| P3-13 | kunden.html | 694-697 | Massive inline Styles auf nav-inner und Hamburger-Button | Automatisch fixbar – In CSS auslagern |

---

## C) CSS-AUDIT

### Ungenutzte Klassen (definiert in style.css, nirgends im HTML)

**37 ungenutzte Klassen**, gruppiert nach Feature:

**Dashboard (alt):** `dashboard-hero`, `dash-sidebar`, `dash-nav-item`, `dash-content`, `dash-section`, `dash-info-row`, `dash-info-label`, `dash-info-value`, `dash-status`, `dash-stat-grid`, `dash-stat`, `dash-stat-number`, `dash-stat-label`

**Modal (generiert per JS, aber nie direkt im HTML):** `modal`, `modal-overlay`, `modal-header`, `modal-close`, `modal-body`, `modal-submit`, `modal-footer`, `modal-error`, `show`

**Layout:** `grid-2`, `grid-3`, `services-grid`

**Komponenten:** `process-steps`, `process-step`, `step-number`, `stats`, `stat`, `stat-value`, `stat-label`, `audit-checks`, `detail-content`, `detail-image`, `contact-info-block`, `label`, `package-detail`

**Nav-States:** `nav--hidden`, `nav--scrolled`, `nav-avatar` (werden per JS gesetzt – also eigentlich in Verwendung!)

**Buttons:** `btn--small`, `pending`

**Hinweis:** `nav--hidden`, `nav--scrolled`, `nav-avatar` und `visible` werden per JavaScript dynamisch gesetzt und sind NICHT wirklich ungenutzt. Ebenso die Modal-Klassen (injiziert per JS in main.js Zeile 91-116).

**Tatsächlich ungenutzte Klassen: ~20-25** (hauptsächlich alte Dashboard- und Layout-Klassen)

### Doppelte/Widersprüchliche Regeln

- `.btn-primary` und `.btn--primary` sind identisch definiert (Zeilen 307-319) → Vereinheitlichen
- `.btn-secondary` und `.btn--secondary` sind identisch definiert (Zeilen 321-332) → Vereinheitlichen
- `.hero` wird in style.css (Z. 373-376) und in mehreren HTML-Dateien inline überschrieben (pakete.html Z. 89-117, index.html Z. 105-116)

### Media Queries – Breakpoints

| Breakpoint | Wo definiert | Zweck |
|------------|-------------|-------|
| 968px | style.css Z. 1151 | Grid-Stacks, Footer 2-spaltig |
| 768px | style.css Z. 268, 1161 | Mobile Nav, Footer 1-spaltig |
| 1024px | pakete.html inline Z. 454 | Package-Grid Anpassung |
| 900px | audit-buchen.html inline | Konfigurator-Layout |
| 600px | audit-buchen.html inline | Mobile Termin-Ansicht |
| 520px | audit-buchen.html inline | Path-Cards Stack |
| 480px | pakete.html Z. 473, kontakt.html Z. 307 | Kleine Screens |

**Problem:** Breakpoints sind nicht konsistent. style.css nutzt 968px/768px, Inline-CSS nutzt 1024px/900px/600px/520px/480px.

### Hardcoded Werte statt CSS-Variablen

| Zeile(n) | Hardcoded Wert | Sollte sein |
|----------|----------------|-------------|
| 684 | `#8b5e5e` | Neues `--scope-exclusion` Variable |
| 810, 834, 844 | `#6b6960` | `var(--nav-text)` oder neues `--footer-text` |
| 855, 859 | `#9a9890` | `var(--text-muted)` |
| 903 | `#f5f3ee` | Neues `--modal-bg` oder `var(--nav-bg)` |
| 926, 959 | `#1e2119` | `var(--bg-primary)` |
| 946 | `#5a584f` | `var(--nav-text)` |
| 995-997, 1126-1128 | `#c0392b`, `rgba(224,92,58,...)` | Neues `--error-color` |
| 1095 | `#c17f3a` | Neues `--status-pending` |

---

## D) JS-AUDIT

### main.js (237 Zeilen)

| # | Zeile | Problem | Typ |
|---|-------|---------|-----|
| 1 | 57 | Form sucht `#contact-form`, aber kontakt.html nutzt `#contactForm` → Dead Code, kontakt.html hat eigene Form-Logic | Bug |
| 2 | 70 | `// TODO: Replace with actual form endpoint (n8n webhook)` | TODO |
| 3 | 160 | `// TODO: Replace with real auth (n8n webhook / API call)` | TODO |
| 4 | 162 | Demo-Login: Jedes E-Mail + Passwort ≥6 Zeichen funktioniert | Sicherheitsrisiko |
| 5 | 197-202 | Dashboard-Redirect ist auskommentiert ("Don't redirect, allow viewing demo dashboard") | Design-Entscheidung |
| 6 | Gesamt | Kein console.log/debug gefunden | OK |
| 7 | Gesamt | Alle Event-Listener haben entsprechende DOM-Elemente (mit null-checks) | OK |

### branch-assistant.js (539 Zeilen)

| # | Zeile | Problem | Typ |
|---|-------|---------|-----|
| 1 | Gesamt | Wird auf pakete.html UND kontakt.html geladen, personalisiert aber NUR index.html | Performance |
| 2 | Gesamt | Kein console.log/debug gefunden | OK |
| 3 | Gesamt | Gut strukturiert mit IIFE, proper error handling | OK |

### Inline-JS auf einzelnen Seiten

| Seite | Zeilen | Zweck | Problem |
|-------|--------|-------|---------|
| index.html | 74 Z. | Counter-Animation, Card-Spotlight, Timeline-Beam | Könnte in page-spezifische JS-Datei |
| kontakt.html | 92 Z. | Form-Handler (n8n Webhook), Placeholder-Rotation, Reveal | Dupliziert teilweise main.js Form-Logic |
| pakete.html | 16 Z. | Scroll-Reveal für Package-Cards | Könnte IntersectionObserver aus main.js nutzen |
| audit-buchen.html | 196 Z. | Konfigurator-Logik, Formular, Webhook | Page-spezifisch, OK als inline |
| kunden.html | 24 Z. | Notification dismiss, Progress-Bar Animation | Könnte in main.js |

---

## ANNAHMEN

1. Die Domain `standfestdigital.at` wird für den Go-Live verwendet (basierend auf canonical URLs)
2. Die Telefonnummer `+43 660 1234567` ist ein Platzhalter und muss ersetzt werden
3. Das `og-image.jpg` in `/img/` existiert (konnte nicht verifiziert werden, nur 3 Dateien im img-Ordner)
4. Die n8n-Webhooks (`https://n8n.standfestdigital.at/webhook/kontakt` und `/webhook/audit`) sind bereits eingerichtet
5. Das Login/Kunden-Portal ist noch nicht production-ready (Demo-Auth)
6. `branch-assistant.js` soll auf allen Seiten außer impressum/datenschutz geladen werden

---

## NÄCHSTE SCHRITTE (Prompt 2)

### Automatisch fixbar (können im nächsten Prompt umgesetzt werden):

1. **P1-04:** href="#" Platzhalter in kunden.html entfernen/ersetzen
2. **P2-01/02:** Meta Descriptions kürzen (index + pakete)
3. **P2-03:** og:image in datenschutz.html ergänzen
4. **P2-05/06/07:** Schema.org Markup für kontakt, leistungen, audit-buchen ergänzen
5. **P2-08:** Google Fonts Import vereinheitlichen
6. **P3-01:** Ungenutzte CSS-Klassen entfernen
7. **P3-02:** Button-Klassen vereinheitlichen
8. **P3-03:** Hardcoded Farben durch CSS-Variablen ersetzen
9. **P3-07:** console.error in audit-buchen entfernen
10. **P3-08:** Form-ID in main.js korrigieren
11. **P3-12:** Inline-Style im Footer in CSS auslagern
12. **P3-13:** Inline-Styles in kunden.html Nav auslagern

### Braucht manuelle Entscheidung:

1. **P1-01/02/03:** Echte Firmendaten für Impressum + Datenschutz
2. **P1-05:** Echte Telefonnummer für alle Seiten
3. **P3-04:** Ob Inline-CSS in separate Dateien extrahiert werden soll (verbessert Caching, erhöht HTTP-Requests)
4. **P3-09/10:** Ob der TODO-Form-Handler und Demo-Login ersetzt werden sollen
5. **P3-11:** Ob branch-assistant.js nur auf index.html geladen werden soll

---

## STATUSLOG

| Status | Details |
|--------|---------|
| **Done** | Kompletter Audit aller 8 HTML + CSS + JS abgeschlossen |
| **Next** | Prompt 2: Automatische Fixes (12 Items) umsetzen |
| **Blocker** | P1-01/02/03/05: Echte Firmendaten + Telefonnummer müssen VOR Go-Live eingepflegt werden – nur Stefan kann das entscheiden |

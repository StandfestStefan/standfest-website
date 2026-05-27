# Übergabe — Standfest Website · Stand 2026-05-27

**Für die frische Claude-Code-Session: lies diese Datei zuerst, dann `CLAUDE.md` + `.briefing/`.**

## Sofort durchstarten
```powershell
cd C:\StandfestDigital\standfest-website
git branch --show-current      # muss: experimental/light-theme
git status                     # sauber (nur untracked .briefing/variante-b, .briefing/website, templates)
git add . ; git commit -m "Pre-Premium-Refresh"   # Rollback-Safety
```
**Nächster großer Schritt liegt fertig bereit** als Megaprompt:
```powershell
Get-Content .\.megaprompts\2026-05-27-premium-level-up.md -Raw | claude -p --dangerously-skip-permissions
```
→ hebt die Seite in 8 Phasen auf Top-Agentur-Niveau (warm/handwerklich, kein KI-Look). Alle Regeln & Verifikationen stehen darin.

## Projekt-Kontext
- Statische Website von Standfest Digital (Webdesign-Agentur, Wien & NÖ, KMU-Zielgruppe 43–55, gering online-affin).
- **Phase Family & Friends, pre-revenue** → **keine echten Kunden/Bewertungen/Fotos.** Niemals Testimonials/Reviews/Fotos erfinden.
- Light-Theme, Newsreader (Serif) + Inter, Vanilla JS. Haupt-CSS `css/style.css`, Logik `js/main.js`.

## Aktueller Stand (Branch `experimental/light-theme`, 9 Commits ahead, NICHT gepusht)
Diese Session-Serie umgesetzt (neueste zuerst):
| Commit | Inhalt |
|---|---|
| `9072ef7` | Megaprompt „Premium Level-Up" für heute (Doku) |
| `513ed5c` | Footer-Social-Icons (Insta/FB/LinkedIn) — **URLs sind Platzhalter** |
| `b6cdc55` | Scroll-Reveals (Branchenseiten), Karten-Hover, H1-Underline, FAQ-Fix |
| `c8085d6` | Motion-/Shadow-/Easing-Tokens + `prefers-reduced-motion` + Nav-Hide-on-Scroll |
| `3314c42` | 3 Branchen-Landingpages (Handwerk, Gastro, Friseur) + interne Verlinkung + Sitemap |
| `1ab2741` | Sticky Mobile-Kontaktleiste + Lesbarkeit (Body 17px, Fließtext volle Tinte) |
| `36c5571` | SEO-Quick-Wins (og:image-Dublette, Font-preload, Meta-Konsistenz) |
| `bd133fd` | P-W10 WCAG-Touch-Targets ≥44px (`@media pointer:coarse`) |
| `88f4d07` | P-W14 WhatsApp-Link im Footer (6 Seiten) |

**Vorhandene Systeme (wiederverwenden, nicht ersetzen):** Design-Tokens in `:root` (`--ease-out`, `--dur-*`, `--shadow-sm/md/lg`); globaler `@media (prefers-reduced-motion: reduce)`-Block; `.reveal` + IntersectionObserver (`main.js`); Nav-Scroll-IIFE mit `nav--scrolled`/`nav--hidden`; Footer-Social-Injektion (`main.js` `const SOCIAL`); `.lp-*`-Klassen für Branchenseiten; Sticky-Bar-Injektion.

## Offene Punkte — brauchen STEFAN (Asset/Entscheidung)
1. **Echte Social-Profil-URLs** (Instagram/Facebook/LinkedIn) → in `js/main.js` `const SOCIAL` eintragen (aktuell Platzhalter `standfestdigital`).
2. **Echtes Team-/Atmosphären-Foto** → Hero & Über-uns (P-W07/P-W08) warten darauf. Bis dahin kein Stock/KI-Bild.
3. **Erste echte Kundenstimme** → erst dann Testimonial-Sektion befüllen (Struktur kann vorbereitet werden).
4. **Branchenseiten-Copy** (3314c42) ist Entwurf → von Stefan gegenlesen/freigeben.
5. **Hetzner-Deploy `preview.standfestdigital.at`** ist GEPARKT: DNS-A-Record fehlte (NXDOMAIN). Server/SSH/Nginx ok. Erst deployen, wenn Stefan DNS setzt (`preview` → `168.119.173.11`, TTL 300) und den Deploy-Stand bestätigt.

## Harte Regeln (Repo)
- Kein `git push`, kein Commit auf `main`, Branch bleibt `experimental/light-theme`.
- UTF-8 ohne BOM bei allen Schreiboperationen (nie `Set-Content -Encoding UTF8`).
- Sie-Form; verbotene Wörter: innovativ, ganzheitlich, maßgeschneidert, nahtlos, Premium, State-of-the-Art, next-level …; kein KI-Marker.
- Kein KI-Look (Glassmorphism-Wildwuchs, Gradient-Blobs, Spotlight-Cursor, Partikel, lila Verläufe). Motion nur `transform`/`opacity`, reduced-motion-sicher.
- Browser-Test macht Stefan (`npx serve .`) — Claude testet nicht selbst.
- Vor Aktion `git status`; nach jedem Schritt Spot-Checks + lokaler Commit (ein Commit pro Thema).

## Wichtige Dateien
- `css/style.css` (Tokens, Komponenten, `.lp-*`, reduced-motion, Nav, Sticky, Footer-Social)
- `js/main.js` (Nav-Hide/Shrink, Reveal-Observer, FAQ, Sticky-Bar, Footer-Social `SOCIAL{}`)
- `index.html` / `leistungen.html` / `pakete.html` / `kontakt.html` / `audit-buchen.html` / `impressum.html` / `datenschutz.html` / `404.html` / `kunden.html`
- `website-fuer-handwerker.html` / `-gastronomie.html` / `-friseure.html` (Branchen-Pilot)
- `.megaprompts/2026-05-27-premium-level-up.md` (nächster Schritt)
- `.briefing/` = Strategie/Design/Tonalität/Roadmap (READ-ONLY für Claude)

## Browser-Test-Checkliste (für Stefan, `npx serve .`)
Nav verschwindet beim Runter-, kommt beim Hochscrollen · Sektionen faden gestaffelt ein · Karten-Hover dezent · FAQ klappt lange Antworten voll auf · Footer-Social-Icons (noch Platzhalter-Links) · „Bewegung reduzieren" (OS) → keine Animationen · Mobil: Sticky-Kontaktleiste + ≥44px Touch-Targets.

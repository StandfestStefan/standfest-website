# Megaprompt 03 — Phase 3: Inhalt + UX (Texte überarbeiten)

**Zweck:** Pakete-Texte, Leistungen-Differenzierung, Konfigurator optional, WhatsApp-only, DSGVO-Checkbox.
**Aufwand:** 6-8 Stunden gesamt, mehrere Klärungen mit Stefan nötig
**Vorbedingung:** Phase 2 abgeschlossen, Theme + Authentizität sitzen

---

## WICHTIG VORWEG

Diese Phase **verändert Texte**, nicht nur Code. Tonalität ist Stefan-Domäne, nicht deine.

**Regel:**
- Für jede Text-Änderung: Vorschlag formulieren, Stefan zeigen, auf Bestätigung warten
- Verbotene Wörter aus `.briefing/03-tonalitaet.md` strikt einhalten
- Sie-Form konsequent
- Konkrete Zahlen statt Versprechen

---

## COPY-PASTE in Claude Code

```
Du arbeitest in C:\StandfestDigital\standfest-website. Aktiver Branch: experimental/light-theme.

ZIEL: Phase 3 — Inhalt + UX. 5 Patches: P-W11, P-W06, P-W12, P-W13, P-W14, P-W15

VOR-DEM-START LESEN:
- .briefing/03-tonalitaet.md (verbotene Wörter, Sprach-Regeln)
- .briefing/04-patch-roadmap.md (Patches P-W06, P-W11-P-W15)

REGEL: Bei jeder Text-Aenderung 3 Stationen:
1. Vorschlag formulieren
2. Stefan zeigen (git diff)
3. Auf "Go" warten

SCHRITT 0 — Pre-Flight
cd C:\StandfestDigital\standfest-website
git branch --show-current   # experimental/light-theme
git status

SCHRITT 1 — Patch P-W06: Pakete-Karten asymmetrisch

1a. pakete.html: Growth-Karte mit class "is-recommended" erweitern + Badge "Häufigste Wahl"

1b. CSS-Regel .package-card.is-recommended in style.css einfügen (siehe Roadmap)
+ .package-badge falls noch nicht existent

1c. Commit:
git commit -m "feat(packages): Growth-Karte als 'Häufigste Wahl' hervorgehoben (P-W06)

- transform: scale(1.03)
- Akzent-Border
- Badge 'Häufigste Wahl' oben
- Subtle Box-Shadow

Bezug: P-W06 aus .briefing/04-patch-roadmap.md"

→ Browser-Test, Stefan-OK.

SCHRITT 2 — Patch P-W11: Pricing-Texte überarbeiten

WICHTIG: HIER NUR VORBEREITEN, NICHT SELBST COMMITTEN.

2a. pakete.html komplett lesen, alle Paket-Texte extrahieren

2b. Für jeden Text prüfen gegen .briefing/03-tonalitaet.md:
- Verbotene Wörter drin? (innovativ, ganzheitlich, etc.)
- Sie-Form konsequent?
- Konkrete Zahlen statt Versprechen?

2c. Bericht an Stefan ausgeben:
- Welche Stellen problematisch sind (mit Zeilennummer + Quote)
- Was vorgeschlagen wird
- Klärungs-Punkte aus Stefans Notiz-Liste:
  - KPI-Report-Begriff (was bedeutet "KPI" für KMU-Inhaber?)
  - "Monatlicher Call" — Was wird besprochen? Wie lang?
  - "Follow-up-System" bei Pro — Was genau ist das?
  - Social-Media-Accounts wählbar pro Paket?

2d. STOP. Auf Stefan-Antworten warten.

2e. Nach Stefan-Antworten: Text-Patches einzeln einbauen
Pro Paket eigener Commit.

SCHRITT 3 — Patch P-W12: Leistungen-Seite differenzieren

3a. leistungen.html komplett lesen
3b. Aktuell sind Leistung 2 und 3 ähnlich (laut Notizen)
3c. Vorschlag an Stefan:
- Welche Trennung er will (Social-Media-Fokus vs. Website-Fokus?)
- Welche der beiden bekommt mehr Aufmerksamkeit?

3d. STOP. Stefan-Entscheidung.

3e. Nach Antwort: Umsetzung, eigener Commit.

SCHRITT 4 — Patch P-W13: Konfigurator optional

4a. Konfigurator-Stelle finden (vermutlich audit-buchen.html)
4b. "Skip"-Button + Alternative-Flow einbauen ("Nur Logos und Firmendaten reichen")
4c. Original-Flow bleibt erhalten als Default, Skip ist Alternative
4d. Commit:
git commit -m "feat(audit): Konfigurator optional gemacht mit Skip-Option (P-W13)

Stefan-Anweisung: Konfigurator nicht erzwingen.
Skip-Button + Mini-Form mit Logo/Firmendaten als Alternative.

Bezug: P-W13 aus .briefing/04-patch-roadmap.md"

SCHRITT 5 — Patch P-W14: Termin nur WhatsApp

5a. Suchen wo "Termin buchen" steht
5b. Internes Buchungssystem rausbauen
5c. WhatsApp-CTA mit Tap-to-Chat einbauen (Pattern siehe Roadmap)
5d. Commit:
git commit -m "feat(termin): Terminbuchung auf WhatsApp-only umgestellt (P-W14)

Internes Buchungssystem entfernt.
Stattdessen: WhatsApp tap-to-chat mit vorgegebener Nachricht.

Bezug: P-W14 aus .briefing/04-patch-roadmap.md"

SCHRITT 6 — Patch P-W15: DSGVO-Checkbox

6a. kontakt.html Form öffnen
6b. Pflicht-Checkbox + Datenschutz-Link einbauen (Markup siehe Roadmap)
6c. JS-Validation: Submit-Button disabled bis Checkbox checked
6d. Test mit JS-Disabled (Server-side fallback prüfen — der ist nicht hier)
6e. Commit:
git commit -m "fix(legal): DSGVO-Checkbox als Pflicht im Kontaktformular (P-W15)

Aus Memory-COMP-1, DSGVO-Pflicht.
- input[type=checkbox] mit required
- Link zur Datenschutzerklärung
- JS-Validation: Submit-Button disabled bis checked

Bezug: P-W15 aus .briefing/04-patch-roadmap.md"

FINAL — Bericht
git log --oneline -10
Write-Host ""
Write-Host "Phase 3 abgeschlossen." -ForegroundColor Green
Write-Host "Pflicht-Klaerungen mit Stefan haben stattgefunden."
Write-Host ""
Write-Host "Naechste Phase: 04 (Compliance + Mobile)"

NICHT TUN:
- Texte selbst erfinden ohne Stefan
- KI-Buzzwords einbauen
- "Erstellt mit Claude" o.ä. Hinweise
- git push
- Mehrere Pakete-Texte gleichzeitig ändern ohne Stefan-OK
```

---

## Wichtige Notiz

Diese Phase **dauert länger** weil mehrere Stefan-Entscheidungen drin stecken. Es ist okay wenn das auf 2-3 Sessions verteilt wird:
- Session A: P-W06 + P-W14 + P-W15 (schnell, keine Klärung)
- Session B: P-W11 (Pricing-Texte) — mit Stefan, ausführlich
- Session C: P-W12 + P-W13 — mit Stefan

Lieber 3 saubere Sessions als 1 hastige.

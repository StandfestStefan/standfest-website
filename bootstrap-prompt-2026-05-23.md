# Bootstrap-Prompt — Neue Claude.ai-Session 23.05.2026

> **Datum:** 23.05.2026 (oder später)
> **Zweck:** Phase 3 (Inhalt + UX) starten + Marvin-Klärungen
> **Vorgänger-Session:** 22.05.2026 (21 Commits Light-Theme)

---

## Einstiegs-Nachricht für neue Session

**Paste diesen Block in eine neue Claude.ai-Session:**

```
Ich starte eine frische Session zur Standfest-Website. Vorgänger-Session
vom 22.05. hat 21 Commits gemacht (Light-Theme + Feinschliffe 1-4).

STAND:
- Repo: C:\StandfestDigital\standfest-website
- Branch: experimental/light-theme
- Letzte Aktion: Push zu GitHub + Browser-Test K1-K6 [PASST / BUGS — wirst du sagen]
- Übergabe-Dokument im Repo: .briefing/uebergabe-standfest-website-2026-05-22.md
- Bitte zuerst LESEN bevor du anfängst

ZIEL HEUTE:
Phase 3 vorbereiten und teilweise umsetzen.
P-W11 bis P-W15 + Marvin-Klärungen.

REIHENFOLGE (mein Vorschlag, du kannst anders empfehlen):
1. Status-Check (git log, ist Branch gepusht, Browser-Test-Stand)
2. Marvin-Fragen-Liste erstellen (Markdown-Dokument im Repo)
3. Was OHNE Marvin machbar ist: identifizieren + umsetzen
4. Was MIT Marvin nötig ist: dokumentieren für nächsten Termin

KONTEXT:
- Stefan Maurer (du sprichst mit mir, GF Standfest Digital)
- Mit-Gründer Marvin Blatnig, OG in Gründung
- KMU-Zielgruppe (1-30 MA, Wien & NÖ, Handwerk/Gastro/Handel/Dienstleister/Gesundheit)
- Tonalität: solid, bodenständig, NICHT modern-trendy
- F&F-Phase (keine zahlenden Kunden), kein Zeitdruck vor Live
- Live-Schaltung: nach OG-Gründung (Datum unbekannt)

Lies zuerst .briefing/uebergabe-standfest-website-2026-05-22.md und gib mir
deinen Stand-Eindruck. DANN entscheide ich wie weiter.
```

---

## Was die neue Session erwarten wird

### Erste Aktion in neuer Session

Claude wird die Übergabe-Datei lesen (oder dich nach dem Inhalt fragen falls nicht im Repo committed). Dann fragt sie:
- Browser-Test K1-K6: passt? bugs?
- Aktueller HEAD?
- Marvin verfügbar heute oder nicht?

### Daraus folgt einer von 3 Wegen

**Weg 1 — Browser-Test war OK, Marvin verfügbar:**
→ Phase 3 komplett: Marvin-Klärungen + Megaprompts + Claude-Code-Arbeit

**Weg 2 — Browser-Test war OK, Marvin NICHT verfügbar:**
→ Marvin-Fragen-Liste erstellen + Solo-Sachen (P-W14 WhatsApp, Mobile-Polish, Footer-Details)

**Weg 3 — Browser-Test hat Bugs:**
→ Hotfix-Megaprompt zuerst, dann Phase 3

---

## Was du mitbringen solltest in die neue Session

| Item | Wo |
|---|---|
| Browser-Test-Ergebnis | Hier in alter Session oder direkt in neuer |
| Marvin verfügbar? | Im Kopf |
| Midjourney-Account? (Ja/Nein/später) | Im Kopf |
| OG-Gründungs-Datum | Falls bekannt |
| Marvin-Bio + Foto | Falls bekommen |

---

## Was bewusst NICHT in der neuen Session passieren soll

- Phase 3 ohne Marvin-Klärung der Pricing-Texte (Risiko: blind ändern, dann Marvin will anders)
- Bilder erstellen ohne Midjourney-Account (sinnlos)
- Live-Schaltung (erst nach OG-Gründung)
- main-Branch anfassen (experimental/light-theme bleibt das Spielfeld)

---

## Recherche-Themen, die in Phase 3 anfallen könnten

Markiere als TODO für Claude:
- Mobile-First-Best-Practices für KMU-Sites 2026
- WhatsApp-Business-Integration Best Practice (P-W14)
- Konfigurator: behalten/streichen/anders positionieren (mit Marvin)
- DSGVO-Cookie-Banner — aktuell impliziert in Datenschutz-Page, brauchen wir explizit?

---

## Phase-3-Backlog im Überblick

| Patch | Was | Marvin nötig? | Aufwand |
|---|---|---|---|
| **P-W11** | Pricing-Texte präzisieren (KPI-Report, Calls, Follow-up) | JA | 1-2h |
| **P-W12** | Leistungen-Seite: Gesamtpaket statt 3 einzelne CTAs | JA (Strategie) | 2-3h |
| **P-W13** | Konfigurator: Status (behalten/streichen/repositionieren) | JA (Strategie) | 1-3h |
| **P-W14** | WhatsApp-only Telefon-Integration (+43 660 5847291) | NEIN | 30 Min |
| **P-W15** | DSGVO-Checkbox | VERWORFEN — Hinweistext reicht (OGH-Klauselkontrolle vermeiden) | - |

**Marvin-frei umsetzbar:** P-W14, evtl. Mobile-Polish-Sachen

**Marvin-blockiert:** P-W11, P-W12, P-W13

---

## Strategie-Reminder

- **Pro Session ein Thema** — nicht Phase 3 + Bilder + Push parallel
- **Megaprompt-Pattern bewährt:** Vor-Start lesen, Pre-Flight, Diagnose → Fix → Spot-Check → Commit, NICHT TUN-Liste
- **Bei Stop:** Output hier reinpasten, Claude entscheidet
- **Bei Mehrdeutigkeit:** Claude Code stoppt von selbst — gut so

---

## Wenn Phase 3 abgeschlossen ist

**Phase 4 (Compliance + Mobile, P-W07/P-W09/P-W10):**
- Mobile-Optimierung
- Footer-Umbau mit echten Adressen
- Polaroid für Team-Foto (braucht Foto Stefan + Marvin)

**Phase 5 (Push + Live):**
- Midjourney-Bilder (mit Marvin oder allein nach Setup)
- Endgültiger Push zu main
- Coming-Soon entfernen
- Live-Schaltung (erst nach OG-Gründung!)

**EAA-Deadline 28.06.2026** im Hinterkopf behalten — WCAG 2.2 AA muss vor Live stehen.

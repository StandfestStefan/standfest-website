# Audit-Template-Platzhalter — Inventar

Stand: 2026-05-24 · gilt fuer `kunden-1pager.html` und `dossier-intern.html`

Mustache-Syntax: `{{variable}}` (Wert), `{{#liste}}...{{/liste}}` (Section), `{{#optional}}...{{/optional}}` (bedingter Block).

---

## Stammdaten (beide Templates)

| Variable | Typ | Pflicht | Quelle | Beispiel |
|---|---|---|---|---|
| `firma_name` | String | JA | Briefing | "Tischlerei Fally" |
| `branche` | String | JA | Briefing | "Tischlerei" |
| `ort` | String | JA | Briefing | "Korneuburg" |
| `bundesland` | String | optional | Briefing | "Niederösterreich" |
| `firma_gruendung` | Number | optional | Briefing | 1987 |
| `mitarbeiter` | Number | optional | Briefing | 4 |
| `umsatz` | String | optional (nur Dossier) | Briefing | "~350 k€" |

## Audit-Meta (beide)

| Variable | Typ | Pflicht | Quelle | Beispiel |
|---|---|---|---|---|
| `audit_datum` | String (dd.mm.yyyy) | JA | n8n-now | "20.04.2026" |
| `auditor_name` | String | JA | Briefing/Default | "Stefan Maurer" oder "Standfest Digital" |
| `auditor_email` | String | JA (nur 1-Pager) | Default | "stefan@standfestdigital.at" |
| `auditor_telefon` | String | optional (nur 1-Pager) | Briefing | "+43 660 xxxxx" |
| `lead_status` | String | nur Dossier | Briefing | "qualifiziert" |

## Scores (beide, 0-100)

| Variable | Typ | Pflicht | Quelle | Beispiel |
|---|---|---|---|---|
| `score_website` | Number 0-100 | JA | A1 PageSpeed | 62 |
| `score_gbp` | Number 0-100 | JA | A2 GBP-Check | 40 |
| `score_anfragen` | Number 0-100 | JA | Berechnet (Formular + WhatsApp + Telefonbutton) | 35 |
| `score_social` | Number 0-100 | JA | Manuell oder Default | 78 |
| `score_gesamt` | Number 0-100 | JA | Mittelwert | 54 |

> Hinweis: Die Gesamt-Balkenbreite (`.total-bar-fill`) ist im CSS hart auf 54 % gesetzt und wird NICHT dynamisch (CSS bleibt unangetastet — Regel). Nur die Zahl `{{score_gesamt}}` ist dynamisch.

## Score-Theme-Klassen (beide)

CSS-Klasse je nach Score: `t-green` (>=70), `t-warn` (40-69), `t-red` (<40). n8n-Code-Node ableiten.

| Variable | Typ | Pflicht | Quelle | Beispiel |
|---|---|---|---|---|
| `theme_website` | enum (`t-green`/`t-warn`/`t-red`) | JA | aus score_website | `t-warn` |
| `theme_gbp` | enum | JA | aus score_gbp | `t-red` |
| `theme_anfragen` | enum | JA | aus score_anfragen | `t-red` |
| `theme_social` | enum | JA | aus score_social | `t-green` |

## Kunden-1-Pager — exklusiv

### Massnahmen-Liste (Section, beliebig viele Eintraege; Original hatte 5)

```mustache
{{#massnahmen}}
  {{prio_key}}      <- "p1"/"p2"/"p3" (klein, fuer CSS-Klasse prio-{{prio_key}})
  {{prio}}          <- "P1 · Kritisch" / "P2 · Wichtig" / "P3 · Optimierung"
  {{titel}}         <- "Kein Kontaktformular auf der Website"
  {{beschreibung}}  <- "Kunden, die nicht anrufen wollen, springen ab..."
{{/massnahmen}}
```

> **Update 2026-05-24 (5d-fix):** Die Aufwand-Spalte wurde aus dem Kunden-1-Pager entfernt — der Kunde soll die Arbeitszeit nicht sehen. `{{aufwand}}` wird im 1-Pager NICHT mehr verwendet. Der Key bleibt in `sample-data.json` erhalten (schadet nicht; ggf. spaeter fuer Dossier-Seite-3-Templating). Im Dossier-Intern steht der Aufwand weiterhin im Maßnahmenkatalog (Seite 3, statische Tabelle, nicht getemplatet).

### CTA / Footer

| Variable | Typ | Pflicht | Quelle | Beispiel |
|---|---|---|---|---|
| `audit_gebuehr` | String | JA | Briefing-Phase | "89 €" (F&F: "GRATIS", START: "89 €", ETABLIERT: "249 €") |

## Dossier-Intern — exklusiv

### Executive Summary Seite 1

| Variable | Typ | Pflicht | Quelle | Beispiel |
|---|---|---|---|---|
| `pitch` | String | JA | Claude-generiert oder manuell | "Fally ist handwerklich top, online aber unsichtbar..." |

### Detailfunde Seite 2 (16 Variablen: 4 pro Bereich x 4 Bereiche)

Pro Bereich (Website / GBP / Anfragen / Social):
- `detail_{bereich}_summary` (1 Satz Label-Box, was zu tun)
- `detail_{bereich}_ok` (was funktioniert)
- `detail_{bereich}_miss` (was fehlt)
- vierte Zeile semantisch unterschiedlich: `_quellen` / `_benchmark` / `_conversion` / `_potenzial`

| Variablen | Quelle |
|---|---|
| `detail_website_summary` / `_ok` / `_miss` / `_quellen` | A1 + manuelles Review |
| `detail_gbp_summary` / `_ok` / `_miss` / `_benchmark` | A2 + Wettbewerbsrecherche |
| `detail_anfragen_summary` / `_ok` / `_miss` / `_conversion` | manuelle Audit-Bewertung |
| `detail_social_summary` / `_ok` / `_miss` / `_potenzial` | manuelle Audit-Bewertung |

### Verkaufs-Argumentarium Seite 4 (Einwand "zu teuer")

| Variable | Typ | Pflicht | Quelle | Beispiel |
|---|---|---|---|---|
| `growth_total` | String | JA | Pricing-Tabelle | "5.430 €" |
| `growth_monatlich` | String | JA | Pricing-Tabelle | "905 €" |
| `verlust_pro_monat` | String | JA | Berechnung aus Audit | "2.800 €" |

---

## Smoke-Test-Daten

Siehe `sample-data.json` neben dieser Datei. Daten entsprechen 1:1 dem Tischlerei-Fally-Beispiel.

## Was NICHT templated wurde (bleibt vorerst hardcoded)

Diese Bereiche enthalten weiterhin Tischlerei-Fally-Daten oder generische Standfest-Inhalte. Output ist trotzdem valide — A5 kann sie ignorieren. Bei Multi-Kunden-Einsatz spaeter nachziehen.

**Dossier:**
- **Seite 1 — Impact-Kacheln** (`€ 2.800` Monatsverlust, `−60 %`, `2 Monate` Amortisation) — kunden-spezifisch, NICHT templated
- **Seite 1 — Paket-Empfehlung** (Starter/Growth/Pro-Preise + `paket-why`-Begruendung mit "Fally") — NICHT templated
- **Seite 1 — Einstiegssatz fuer Marvin** ("Herr Fally, ...") — kunden-spezifisch, NICHT templated
- **Seite 3 — Massnahmenkatalog** (Tabelle, interne Kalkulation) — Stefan wollte spaeter umbauen
- **Seite 4 — Pricing-Compare-Tabelle** — statisch, gilt fuer alle Kunden
- **Seite 4 — Upsell-Zeitstrahl + Referenz-Hooks** — statisch (Lindner-Ref + TODO-Cards)
- **Seite 5 — Technische Notizen** (Infra, Risiken, Onboarding, Rollen) — internas-spezifisch, separate Befuellung

**1-Pager:** vollstaendig templated (keine Reste).

## Aenderungen am Workflow A5 (kommt in Megaprompt 5e)

A5 stellt diese Variablen zusammen aus:
- Briefing aus Webhook-Body (firma_name, branche, ort, bundesland, ...)
- A1-Output (score_website, detail_website_*)
- A2-Output (score_gbp, detail_gbp_*)
- Code-Node berechnet: theme_* (aus Scores), score_gesamt (Mittelwert), prio_key, Massnahmen-Array
- Static Defaults: auditor_*, growth_total, growth_monatlich, audit_gebuehr (je Phase)

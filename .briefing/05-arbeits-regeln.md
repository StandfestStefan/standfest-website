# 05 — Arbeits-Regeln (Wie du in diesem Repo arbeitest)

**Anwendung:** Diese Regeln gelten für JEDE Claude-Code-Session in `C:\StandfestDigital\standfest-website\`.

---

## Pre-Flight (immer am Anfang)

Bevor du irgendwas machst:

```powershell
cd C:\StandfestDigital\standfest-website
git branch --show-current
git status
git log --oneline -3
Get-ChildItem .\.briefing\ | Select-Object Name
```

Dann sag Stefan kurz:
- Auf welchem Branch du bist
- Ob Working-Tree clean ist
- Was die letzten 3 Commits sind

Erst danach: "Was soll ich machen?"

---

## Branch-Disziplin

| Was | Branch |
|---|---|
| Theme-Experimente | `experimental/light-theme` |
| Bestätigtes Theme + Patches | `feature/preis-und-geo-fixes` |
| Live | `main` |

**Regeln:**
1. Nie auf `main` direkt arbeiten
2. Wenn Stefan keinen Branch nennt: bist du auf was-ist-checked-out
3. Branch wechseln nur nach `git status` clean

---

## Vor jedem Code-Change

1. **`view`** die betroffene Datei (mindestens den relevanten Block)
2. **Annahme schreiben** was du machen wirst — als Stefan-lesbarer Bullet-Point
3. Bei mehr als 5 Zeilen Änderung: **Stefan vorher zeigen**, nicht selbst committen
4. Bei `git am`-Konflikt: **STOP, git am --abort, melden**

---

## Spot-Checks nach jedem Patch

Pro Patch mindestens 3 Spot-Checks:

```powershell
# Beispiel für CSS-Token-Patch
Select-String -- "--paper" .\css\style.css | Measure-Object | ForEach-Object { Write-Host "Light-Tokens: $($_.Count)" }
Select-String -- "--bg-primary: #1e2119" .\css\style.css | Measure-Object | ForEach-Object { Write-Host "Alter Dark-Token: $($_.Count) (erwartet 0)" }
git diff --stat
```

Output: Tabelle "Check / Erwartet / Ist / Status".

---

## Browser-Test-Bedarf erkennen

Nach Patches die Optik ändern:

```powershell
# Stefan-Hinweis ausgeben:
Write-Host "Browser-Test empfohlen — starte 'npx serve .' und prüfe localhost:3000 mit Strg+F5" -ForegroundColor Cyan
```

Du selbst startest **nicht** `npx serve`. Stefan macht den visuellen Test.

---

## Commits

### Format
```
type(scope): kurze beschreibung im imperativ

Detaillierte beschreibung was und warum.
Stichworte zur Verifizierung.

Bezug: P-W## aus 04-patch-roadmap.md
```

### Types
- `feat` — neue Funktion
- `fix` — Bug-Fix
- `style` — nur visuell, kein Verhalten
- `refactor` — Umbau ohne Verhaltensänderung
- `docs` — nur Doku
- `perf` — Performance

### Beispiel
```
feat(theme): Hand-drawn SVG-Underline auf Hero-Headline

Fügt subtiles SVG mit imperfektem Stroke unter h1.
Datei: img/svg/handdrawn-underline.svg neu
CSS: .hero-title::after Regel in style.css

Bezug: P-W03 aus 04-patch-roadmap.md
```

**Regeln:**
- Keine "Made by Claude" / "AI-generated" Marker im Commit
- Auf Deutsch
- Imperativ ("Füge X hinzu", nicht "Hinzugefügt X")
- Max 72 Zeichen Erste Zeile

---

## Tool-Restriktionen

### Was du NICHT machst
- `git push` (ohne explizite Stefan-Anweisung)
- `git merge` in `main`
- `git reset --hard` (gefährlich, du könntest Commits zerstören)
- `git rebase` außer wenn Stefan explizit darum bittet
- Browser-Tabs öffnen, Lighthouse manuell starten
- Files in `.briefing/` ändern (read-only für dich)
- Files in `fonts/` löschen (DM Sans bleibt Fallback)
- `npx install` ohne Anweisung

### Was du IMMER kannst
- `git status`, `git log`, `git diff`, `git branch`, `git checkout`
- `git add`, `git commit`
- `git am` (Patch anwenden)
- `git am --abort` (bei Konflikt SICHER zurück)
- `git stash` + `git stash pop`
- File-Edits via `str_replace` oder `create_file`
- PowerShell-Befehle ohne destruktive Wirkung

---

## Wenn was schiefgeht

### Patch klemmt
```powershell
git am --abort
git status
# MUSS: working tree clean
# Bescheid an Stefan: "Patch hatte Konflikt, abgebrochen, Stand zurück auf <SHA>"
```

### Falsche Datei geändert
```powershell
git restore <filename>
# Setzt die Datei auf letzten Commit zurück
```

### Falsche Commits gemacht
```powershell
# Du machst KEINEN git reset
# Sondern fragst Stefan
```

### Working-Tree dirty obwohl Stefan was anderes erwartet
```powershell
git status  # was ist es?
git diff    # was wurde geändert?
# Dann Stefan fragen
```

---

## Wann du Stefan fragst (nicht selbst entscheidest)

1. Mehrere CSS-Selektoren gleichzeitig ändern
2. Content/Text der Webseite (Tonalität-Sache → Stefan)
3. Werte aus `02-design-system.md` anzupassen — die sind fix
4. Neue Files anlegen die nicht in `.briefing/04-patch-roadmap.md` stehen
5. Wenn das Ergebnis "vielleicht so meinst du das" wäre
6. Wenn du mehrere Wege siehst (zeige beide Optionen)

---

## Wann du selbst entscheidest

1. PowerShell-Syntax-Details
2. Reihenfolge unkritischer Verifikations-Checks
3. Welche Spot-Checks sinnvoll sind
4. Wie du den Output strukturierst (Tabelle vs. Text vs. Liste)
5. Welche Kommentare im Code passen

---

## Standardisierter Ergebnis-Bericht

Am Ende einer Aufgabe — immer dieser Aufbau:

```
A) ERGEBNIS
- Was wurde gemacht
- Diff-Stat
- Commits

B) ANNAHMEN
- Was ich angenommen habe (oder nichts)

C) SPOT-CHECKS
- Tabelle: Check / Erwartet / Ist / Status

D) NÄCHSTE SCHRITTE
- Max 3 konkrete

E) STATUSLOG
- Done / Next / Blocker
```

---

## Notfall-Protokoll

Wenn du in einer Situation bist die in diesen Regeln nicht steht:

1. **STOP**, kein weiterer Code-Change
2. `git status` ausführen, dokumentieren
3. Stefan beschreiben was passiert ist + was du tun wolltest
4. Auf Antwort warten

**NIE im Notfall improvisieren.**

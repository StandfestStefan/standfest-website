# Megaprompt 01 — Phase 1: Theme + Fonts anwenden

**Zweck:** Light-Theme + Newsreader/Inter Pairing aus den Patches in `light-theme-phase1/` anwenden.
**Aufwand:** 10-15 Min
**Vorbedingung:** ZIP `light-theme-phase1.zip` und beide Font-Files (`inter-variable.woff2`, `newsreader-variable.woff2`) liegen in `C:\Users\maure\Laptop Apps\Downloads\`

---

## COPY-PASTE in Claude Code

```
Führe JETZT diese Phase-1-Anwendung aus. Du arbeitest in C:\StandfestDigital\standfest-website.

ZIEL: Light-Theme + Font-Pairing-Patches aus light-theme-phase1.zip anwenden.

VOR-DEM-START LESEN:
- .briefing/05-arbeits-regeln.md
- .briefing/02-design-system.md

SCHRITT 0 — Pre-Flight
- cd C:\StandfestDigital\standfest-website
- $PWD muss "C:\StandfestDigital\standfest-website" sein
- git branch --show-current → ist aktuell "feature/preis-und-geo-fixes" oder "experimental/light-theme"
- git status → "working tree clean" (sonst STOP)
- git log --oneline -1 → muss 0027b6f oder darauf basierend sein
- Test-Path "C:\Users\maure\Laptop Apps\Downloads\light-theme-phase1.zip" → muss True
- Test-Path "C:\Users\maure\Laptop Apps\Downloads\newsreader-variable.woff2" → muss True (Stefan hat von fontsource downgeloadet)

Bei jedem fail → STOP, Bescheid sagen.

SCHRITT 1 — Branch anlegen (falls nicht schon da)
$current = git branch --show-current
if ($current -ne "experimental/light-theme") {
  git checkout -b experimental/light-theme
}

SCHRITT 2 — ZIP entpacken
$zipPath = "C:\Users\maure\Laptop Apps\Downloads\light-theme-phase1.zip"
$tmp = "C:\StandfestDigital\standfest-website\.tmp-theme"
if (Test-Path $tmp) { Remove-Item $tmp -Recurse -Force }
Expand-Archive -Path $zipPath -DestinationPath $tmp

# Verifikation: 2 Patches + 1 Font da
Get-ChildItem "$tmp\patches\" -Filter "*.patch" | Measure-Object  # erwartet 2
Get-ChildItem "$tmp\fonts\" -Filter "*.woff2" | Measure-Object    # erwartet 1 (inter)

SCHRITT 3 — Fonts kopieren
Copy-Item "$tmp\fonts\inter-variable.woff2" .\fonts\ -Force
Copy-Item "C:\Users\maure\Laptop Apps\Downloads\newsreader-variable.woff2" .\fonts\ -Force

# Verifikation
Get-Item .\fonts\inter-variable.woff2 | Select-Object Name, @{N='KB';E={[math]::Round($_.Length/1KB,1)}}
Get-Item .\fonts\newsreader-variable.woff2 | Select-Object Name, @{N='KB';E={[math]::Round($_.Length/1KB,1)}}
# erwartet: inter ~344KB, newsreader irgendwo zwischen 100-400KB

SCHRITT 4 — Patches anwenden
git am "$tmp\patches\0001-feat-theme-Light-Theme-Finanz-App-inspired-Newsreade.patch"
git am "$tmp\patches\0002-feat-theme-Font-Preloads-in-5-HTML-Files-auf-Newsrea.patch"

Bei jedem Konflikt: git am --abort, STOP, melden.

SCHRITT 5 — Verifikation (mindestens 8 Spot-Checks)
Write-Host ""
Write-Host "=== SPOT-CHECKS ===" -ForegroundColor Cyan

$checks = @(
  @{N="Light-Tokens --paper im CSS"; Cmd={(Select-String -- '--paper' .\css\style.css | Measure-Object).Count}; Expected="ge 7"},
  @{N="Alter Dark-Token --bg-primary: #1e2119"; Cmd={(Select-String '\-\-bg-primary: #1e2119' .\css\style.css | Measure-Object).Count}; Expected="eq 0"},
  @{N="Newsreader-Font-Family"; Cmd={(Select-String "Newsreader" .\css\style.css | Measure-Object).Count}; Expected="ge 4"},
  @{N="Inter-Font-Family"; Cmd={(Select-String "Inter" .\css\style.css | Measure-Object).Count}; Expected="ge 3"},
  @{N="Fluid Type Scale"; Cmd={(Select-String -- '--step-' .\css\style.css | Measure-Object).Count}; Expected="ge 6"},
  @{N="newsreader-Preload index.html"; Cmd={(Select-String "newsreader-variable.woff2" .\index.html | Measure-Object).Count}; Expected="eq 1"},
  @{N="inter-Preload index.html"; Cmd={(Select-String "inter-variable.woff2" .\index.html | Measure-Object).Count}; Expected="eq 1"},
  @{N="newsreader-Preload pakete.html"; Cmd={(Select-String "newsreader-variable.woff2" .\pakete.html | Measure-Object).Count}; Expected="eq 1"},
  @{N="DM Sans noch als Fallback im Stack"; Cmd={(Select-String "DM Sans" .\css\style.css | Measure-Object).Count}; Expected="ge 4"},
  @{N="package-badge color fix"; Cmd={(Select-String "color: var\(--text-on-accent\)" .\css\style.css | Measure-Object).Count}; Expected="ge 1"}
)

foreach ($c in $checks) {
  $count = & $c.Cmd
  Write-Host ("  {0,-50} {1,3}  ({2})" -f $c.N, $count, $c.Expected)
}

SCHRITT 6 — Aufräumen
Remove-Item $tmp -Recurse -Force

SCHRITT 7 — Final Report
Write-Host ""
Write-Host "=== FINAL ===" -ForegroundColor Green
git log --oneline -5
Write-Host ""
Write-Host "BROWSER-TEST EMPFOHLEN:" -ForegroundColor Yellow
Write-Host "  npx serve ."
Write-Host "  Dann localhost:3000 mit Strg+F5 (Hartreload, sonst alter CSS-Cache)"
Write-Host ""
Write-Host "Pflicht-Pages: /, /pakete.html, /audit-buchen.html, /kontakt.html, /leistungen.html"

NICHT TUN:
- git push
- git merge in main
- npx serve selbst starten (Stefan macht den visuellen Test)
- Files in .briefing/ ändern
- Andere Files modifizieren als die in den Patches
- Bei Konflikt manuell mergen
```

---

## Was Stefan danach macht

1. `npx serve .` lokal starten
2. Browser auf `localhost:3000`, Strg+F5
3. Visuelle Prüfung gegen 02-design-system.md (Cream-BG, Newsreader-Headings, Akzent-Grün)
4. Entscheidung:
   - **PASST** → `experimental/light-theme` bleibt, weiter mit Megaprompt 02 (Phase 2)
   - **PASST NICHT** → Branch wegwerfen
     ```powershell
     git checkout feature/preis-und-geo-fixes
     git branch -D experimental/light-theme
     ```

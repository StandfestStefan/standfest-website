# Megaprompt 05 — Phase 5: Push + Live

**Zweck:** Branch mergen, GitHub-PR, Coming-Soon entfernen, Live-Smoke-Test
**Aufwand:** 1-2 Stunden
**Vorbedingung:** Phase 1-4 alle abgeschlossen, Browser-Tests grün, Stefan freigibt

---

## WICHTIG VORWEG

Diese Phase ist **destruktiv und produktiv** zugleich. Hier wird wirklich auf Live deployed.

**Stefan-Schritte für JEDEN Punkt:**
1. Du machst nichts ohne explizite Stefan-Anweisung
2. Pro Schritt: Output prüfen, Bestätigung holen, dann nächster Schritt
3. Bei jedem Zweifel: STOP

---

## COPY-PASTE in Claude Code

```
Du arbeitest in C:\StandfestDigital\standfest-website. Aktiver Branch: experimental/light-theme.

ZIEL: Phase 5 — Push + Live. Alle Patches in main, Coming-Soon entfernen, Site live.

VOR-DEM-START LESEN:
- .briefing/05-arbeits-regeln.md (Push-Regeln)
- Memory V9.2 falls verfügbar (Hetzner-Deploy-Pattern)

VORBEDINGUNG-CHECK (alles MUSS erfüllt sein):
- Phase 1-4 Commits sind da (git log)
- Lighthouse Mobile Performance > 90
- Accessibility-Audit grün (axe DevTools 0 critical)
- DSGVO-Checkbox funktioniert
- WhatsApp-CTA funktioniert
- Browser-Tests aller 9 Pages grün
- Stefan sagt explizit "PUSH OK"

Wenn EINE Bedingung nicht erfüllt: STOP.

SCHRITT 0 — Pre-Flight
cd C:\StandfestDigital\standfest-website
git branch --show-current   # experimental/light-theme
git status                  # working tree clean
git log --oneline -20       # Übersicht der Phase-1-4-Commits

SCHRITT 1 — Tag setzen vor Push (Safety-Net)
git tag pre-light-theme-deploy-2026-MM-DD experimental/light-theme
git tag --list "pre-light-theme-*"

SCHRITT 2 — Stefan-Bestätigung "PUSH GO"

VOR DEM PUSH explizit fragen:
Write-Host "BEREIT ZUM PUSH" -ForegroundColor Yellow
Write-Host "Branch: experimental/light-theme"
Write-Host ""
Write-Host "Wenn Stefan 'PUSH GO' sagt, weiter mit Schritt 3."
Write-Host "Sonst STOP."

STOP, auf "PUSH GO" warten.

SCHRITT 3 — Push (NUR wenn Stefan PUSH GO sagt)

git push origin experimental/light-theme

Erwartung-Output: PR-URL
Beispiel: "Create a pull request for 'experimental/light-theme' on GitHub by visiting:
          https://github.com/StandfestStefan/standfest-website/pull/new/experimental/light-theme"

URL an Stefan ausgeben.

SCHRITT 4 — Stefan öffnet PR auf GitHub

Stefan macht:
- Klick auf die URL
- PR-Titel: "Light-Theme + Phase-1-4 Patches (Recherche 21.05. + Roadmap)"
- PR-Beschreibung aus .briefing/04-patch-roadmap.md zusammenstellen
- Reviewer optional Marvin
- Self-Review nach 1 Tag Pause

DU: Wartet bis Stefan sagt "PR offen" + ggf. "Merge OK"

SCHRITT 5 — Merge (nach Stefan-OK)

WICHTIG: Stefan merged auf GitHub manuell, NICHT du via CLI.

Stefan klickt auf GitHub: "Squash and merge" oder "Merge pull request"
+ "Delete branch after merge" (Hygiene)

Du machst gar nichts in diesem Schritt.

SCHRITT 6 — Lokal sync (nach erfolgreichem Merge)

git checkout main
git pull origin main
git branch -d experimental/light-theme  # lokal löschen (Commits sind in main)

# Optional auch alten Branch:
# git branch -d feature/preis-und-geo-fixes  (falls nicht mehr gebraucht)
# git branch -d feature/cherry-pick-mberger  (Commits sind in main)

git log --oneline -5
# main MUSS jetzt die ganzen Theme-Commits haben

SCHRITT 7 — Coming-Soon entfernen (Hetzner-Deploy)

VORBEDINGUNG: SSH-Key funktioniert, Stefan-Bestätigung "DEPLOY GO"

# Backup der Coming-Soon-Page (für Notfall-Rollback)
ssh standfest-server "cp /var/www/standfestdigital.at/index.html /var/www/standfestdigital.at/index.html.coming-soon-backup-$(Get-Date -Format yyyyMMdd)"

# Neues index.html hochladen
scp index.html standfest-server:/var/www/standfestdigital.at/

# Weitere geänderte Files (gemäß Phase 1-4)
scp pakete.html standfest-server:/var/www/standfestdigital.at/
scp kontakt.html standfest-server:/var/www/standfestdigital.at/
scp leistungen.html standfest-server:/var/www/standfestdigital.at/
scp audit-buchen.html standfest-server:/var/www/standfestdigital.at/
scp impressum.html standfest-server:/var/www/standfestdigital.at/
scp datenschutz.html standfest-server:/var/www/standfestdigital.at/
scp 404.html standfest-server:/var/www/standfestdigital.at/
scp kunden.html standfest-server:/var/www/standfestdigital.at/

# CSS
scp css/style.css standfest-server:/var/www/standfestdigital.at/css/

# Fonts (NEU)
scp fonts/newsreader-variable.woff2 standfest-server:/var/www/standfestdigital.at/fonts/
scp fonts/inter-variable.woff2 standfest-server:/var/www/standfestdigital.at/fonts/

# SVGs (NEU aus Phase 2)
scp -r img/svg standfest-server:/var/www/standfestdigital.at/img/

# Hero-Bild (falls vorhanden)
if (Test-Path .\img\hero-atmosphere.webp) {
  scp img/hero-atmosphere.webp standfest-server:/var/www/standfestdigital.at/img/
}

SCHRITT 8 — Live-Smoke-Test

VOR Stefan-Verifikation auf standfestdigital.at:

Stefan macht jetzt:
1. https://standfestdigital.at/ öffnen → Erwartung: echte Site, keine Coming-Soon
2. Strg+F5 (Hard Reload)
3. Alle 9 Pages durchklicken
4. Kontaktformular: ausfüllen + abschicken
   → muss n8n-Workflow V1 triggern → Mail in entwuerfe@
5. Audit-Form: ausfüllen + abschicken
   → muss A5-Workflow triggern → 1-Pager in entwuerfe@
6. DSGVO-Checkbox: ohne Checken absenden → muss verhindern
7. Mobile-Test auf echtem Smartphone

Du machst nichts. Wartest auf Stefan-Feedback.

SCHRITT 9 — Rollback-Bereitschaft

Wenn Stefan sagt "ist kaputt":
ssh standfest-server "cp /var/www/standfestdigital.at/index.html.coming-soon-backup-* /var/www/standfestdigital.at/index.html"

Damit ist die Coming-Soon wieder da, du kannst in Ruhe debuggen.

FINAL — Bericht
git log --oneline -10
Write-Host ""
Write-Host "STANDFESTDIGITAL.AT IST LIVE." -ForegroundColor Green
Write-Host ""
Write-Host "Tag: pre-light-theme-deploy-2026-MM-DD"
Write-Host "Branch experimental/light-theme: lokal geloescht (in main)"
Write-Host ""
Write-Host "Naechste Aufgaben (separat):"
Write-Host "  - Marketing-Push (LinkedIn, WhatsApp-Status)"
Write-Host "  - Erste Outreach-Mails an Leads"
Write-Host "  - Marvin-Persona-Validierung mit echten Kundengesprächen"

NICHT TUN:
- PR mergen via CLI (Stefan macht GitHub-UI)
- Coming-Soon entfernen ohne Backup
- Push ohne explizites "PUSH GO" von Stefan
- Hetzner-Deploy ohne explizites "DEPLOY GO" von Stefan
- Tags löschen vor 14 Tagen Sicherheits-Periode
```

---

## Wichtige Reihenfolge der Stefan-Entscheidungen

1. **Vor PUSH:** "Sind alle Tests grün?" → Stefan sagt explizit GO
2. **Vor MERGE:** "Reviewer durch?" → Stefan merged manuell auf GitHub
3. **Vor DEPLOY:** "Coming-Soon raus?" → Stefan sagt DEPLOY GO
4. **Nach DEPLOY:** Stefan macht Live-Test, sagt LIVE OK oder ROLLBACK

Bei jedem Punkt: Wenn Stefan nicht explizit GO sagt → STOP.

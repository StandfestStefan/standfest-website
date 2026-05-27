Fuehre JETZT aus.

ROLLE: Senior Frontend-Entwickler im Standfest-Digital-Repo C:\StandfestDigital\standfest-website. Aktiver Branch: experimental/light-theme. KEIN Branch-Wechsel noetig.

AUFGABE — P-W14 WhatsApp-Footer-Eintrag auf 6 HTML-Seiten ergaenzen

KONTEXT:
- Eine WhatsApp-Integration existiert bereits in kontakt.html, audit-buchen.html, kunden.html
- Was fehlt: WhatsApp-Eintrag im FOOTER auf 6 anderen Seiten (parallel zur bestehenden Tel-Nummer)
- Nummer: +43 664 4123928 (Marvin)
- Format wa.me: 436644123928 (ohne Leerzeichen, ohne +, ohne Bindestriche)

BETROFFENE FILES (genau diese 6):
1. C:\StandfestDigital\standfest-website\index.html
2. C:\StandfestDigital\standfest-website\leistungen.html
3. C:\StandfestDigital\standfest-website\pakete.html
4. C:\StandfestDigital\standfest-website\impressum.html
5. C:\StandfestDigital\standfest-website\datenschutz.html
6. C:\StandfestDigital\standfest-website\404.html

NICHT ANFASSEN:
- kontakt.html, audit-buchen.html, kunden.html (haben schon WhatsApp)
- website-analyse.html (ist interne Doku-Datei)
- Andere Files

VORGEHEN PRO FILE:

Schritt 1: Datei lesen und die Footer-Zeile mit dem bestehenden tel-Link finden.

Pattern fuer das Finden:
<li><a href="tel:+436644123928">+43 664 4123928</a></li>

Beachte: Es koennten mehrere tel-Links pro Datei vorhanden sein:
- index.html: 1x (Zeile ~1979)
- leistungen.html: 1x (Zeile ~1436)
- pakete.html: 1x (Zeile ~834)
- impressum.html: 2x (Zeile ~217 Inline-Adresse + Zeile ~292 Footer)
- datenschutz.html: 1x (Zeile ~440)
- 404.html: 1x (Zeile ~145)

WICHTIG bei impressum.html: NUR den Footer-Eintrag (Zeile ~292) ergaenzen, NICHT den Inline-Adress-Eintrag (Zeile ~217 ist Pflichtangabe nach ECG, bleibt unveraendert).

Schritt 2: Direkt NACH dem Tel-li einen neuen li-Eintrag mit dem WhatsApp-Link einfuegen.

Neuer li-Eintrag (exakt so, eine Zeile):

            <li><a href="https://wa.me/436644123928?text=Hallo%2C%20ich%20interessiere%20mich%20f%C3%BCr%20Standfest%20Digital." target="_blank" rel="noopener">WhatsApp: +43 664 4123928</a></li>

Einrueckung: gleich viele Leerzeichen wie das vorhandene Tel-li auf der jeweiligen Zeile. Erkennen, kopieren, anwenden.

ANNAHME: Falls ein File mehrere Footer-Bloecke hat (z.B. impressum mit Inline + Footer), nur den FOOTER-li bekommen einen WhatsApp-Eintrag. Inline-Telefonangaben in Adressbloecken (Impressum-Pflichtangabe, "Telefon: <a>") bleiben unangetastet.

Schritt 3: Spot-Check nach Patches:

In PowerShell ausfuehren:
$count = (Select-String -Path *.html -Pattern "wa\.me/436644123928\?text=Hallo" | Measure-Object).Count
Write-Output "WhatsApp-Footer-Links Total: $count"

Erwartung: $count >= 6 (mindestens 6 neue Links + die 3 bereits bestehenden in kontakt/audit/kunden = mindestens 9)
Wenn $count < 6 nach Patch: STOP, dokumentiere welcher File fehlt.

Schritt 4: Commit (NUR LOKAL, KEIN PUSH):

git add index.html leistungen.html pakete.html impressum.html datenschutz.html 404.html
git commit -m "feat(footer): WhatsApp-Link in Footer auf 6 Seiten ergaenzt (P-W14)

Parallel zu bestehender Telefonnummer (+43 664 4123928, Marvin) nun
auch WhatsApp-Direktlink im Footer-Listenblock.

Pattern wa.me/436644123928 mit Pre-Filled-Text 
'Hallo, ich interessiere mich fuer Standfest Digital.'

Betroffene Files:
- index.html (Footer ~Z.1979)
- leistungen.html (Footer ~Z.1436)
- pakete.html (Footer ~Z.834)
- impressum.html (Footer ~Z.292, Inline-Adresse Z.217 unveraendert)
- datenschutz.html (Footer ~Z.440)
- 404.html (Footer ~Z.145)

Nicht angefasst (haben WhatsApp bereits):
- kontakt.html, audit-buchen.html, kunden.html

P-W14 Solo-Item aus Phase-3-Backlog erledigt."

STOP NACH COMMIT.
Liefere kurzen Bericht:
- Anzahl bearbeiteter Files
- Spot-Check-Ergebnis ($count)
- "Bereit fuer Browser-Test"

NICHT TUN:
- An kontakt/audit-buchen/kunden.html basteln (haben schon WhatsApp)
- An website-analyse.html basteln (interne Doku)
- An Inline-Adressbloecken (Impressum-Pflichtangabe) basteln  
- Andere Sections umbauen
- Push auf Origin (Stefan macht das spaeter manuell)
- Neue CSS-Klassen anlegen
- Bilder oder Icons fuer WhatsApp einbauen (nur Text-Link)

ANNAHMEN markieren falls noetig:
- Wenn ein erwartetes tel-Pattern nicht 1:1 zu finden ist: STOP, kein blindes Raten
- Wenn die Einrueckung pro File unterschiedlich ist: jeweils anpassen, im Commit-Body als "ANNAHME:" dokumentieren

LIEFERFORMAT:
1. Erst Plan in 3 Punkten
2. Dann pro File: view + str_replace
3. Dann Spot-Check-Output
4. Dann Commit
5. Dann "STOP" Bericht

Los gehts.

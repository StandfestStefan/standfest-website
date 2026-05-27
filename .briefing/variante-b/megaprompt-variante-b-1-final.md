Fuehre JETZT aus.

ROLLE: Du bist Senior Frontend-Entwickler im Standfest-Digital-Repo C:\StandfestDigital\standfest-website. Branch experimental/variante-B ist bereits ausgecheckt.

KONTEXT (wichtig zu wissen):
- Standfest Digital ist eine kleine Webdesign-Agentur fuer KMU in Wien & NOe.
- Marktanalyse hat gezeigt: alle Konkurrenten in Wien sind aufdringliche Verkaufs-Sites (KMU Webdesign mit "verkaufst du taeglich Kunden", webhead mit Space-Theme).
- Wir wollen das Gegenteil: editorialer Magazin-Look, ruhig, substanzhaft.
- Wir sind in F&F-Phase, ohne echte Kundenprojekte aber mit echtem Anspruch.
- Light-Theme + Newsreader/Inter ist bereits eingebaut (commit 48c6a5b und bb281d9).
- Stefan Maurer (Tech-GF) + Marvin Blatnig (Vertriebs-GF) sind die zwei Gruender.

CSS-TOKENS DIE SCHON DA SIND (NICHT NEU ANLEGEN):
--paper #e8e6e1 / --paper-2 #f0eee9 / --paper-3 #fafaf7
--paper-border rgba(30,33,25,0.10)
--ink #1e2119 / --ink-muted #6a6a5a
--accent #4a7c59 / --accent-strong #3a6347
--font-heading Newsreader / --font-body Inter
--step--1 bis --step-4 (fluid type scale via clamp)

KLASSEN DIE SCHON DA SIND:
.pullquote, .drop-cap, .hero-grid (65/35), .hero-visual (Platzhalter)
.handdrawn-underline (auf Hero-Title via ::after)

AUFGABE — Founder-Letter-Section in index.html einfuegen

SCHRITT 1: Lies aktuelle index.html komplett. Identifiziere wo die Hero-Section endet (typisch nach dem schliessenden div des .hero-grid).

SCHRITT 2: Fuege DIREKT NACH der Hero-Section folgende neue Section ein:

<section class="founder-letter" aria-labelledby="founder-letter-title">
  <div class="founder-letter-inner">
    <div class="founder-letter-eyebrow">Ein Brief von uns</div>
    <h2 id="founder-letter-title" class="founder-letter-title">
      Warum es uns gibt.
    </h2>
    <div class="founder-letter-body">
      <p class="founder-letter-lead">
        <span class="drop-cap">W</span>ir bauen Websites fuer Menschen, die wenig Zeit haben, aber viel zu sagen.
      </p>
      <p>
        Marvin und Stefan kommen aus zwei Welten. Marvin verkauft seit Jahren. Stefan baut seit Jahren. Wir haben beide etwas gemeinsam erlebt: kleine Betriebe, die online nicht gefunden werden, obwohl sie gute Arbeit machen. Agenturen, die fuenfstellige Betraege nehmen und Standard-Templates liefern. Inhaber, die ratlos zurueckbleiben.
      </p>
      <p>
        Daraus ist Standfest entstanden. Wir sind klein. Das ist Absicht. Wir nehmen pro Quartal nur so viele Projekte an, wie wir sauber begleiten koennen. So bleibt Zeit fuer jedes einzelne — und fuer die Betriebe, die wir schon betreuen.
      </p>
      <p>
        Was Sie hier finden: drei Pakete mit festen Preisen, ein Audit zum Einstieg, und keine Ueberraschungen in der Rechnung. Was Sie nicht finden: Versprechen, die wir nicht halten koennen.
      </p>
    </div>
    <div class="founder-letter-signature">
      <p class="founder-letter-signoff">Mit besten Gruessen</p>
      <p class="founder-letter-names">
        Marvin Blatnig &amp; Stefan Maurer<br>
        <span class="founder-letter-role">Gruender, Standfest Digital</span>
      </p>
    </div>
  </div>
</section>

WICHTIG: Achte auf Umlaute. "Gruessen", "Gruender", "fuer", "ueber", "moechten" als ue/ae/oe falls die Datei BOM-frei ist. Falls index.html UTF-8 mit echten Umlauten nutzt: dann auch hier "Grüßen", "Gründer", "für", "über", "möchten" verwenden. Schau dir den Rest der Datei an und folge dem dort verwendeten Muster.

SCHRITT 3: CSS in css/style.css ergaenzen, NACH den bestehenden Light-Theme-Regeln. Nutze die EXISTIERENDEN Tokens, KEINE neuen Farben oder Fonts. Code:

/* ---------- Founder-Letter (Variante B Konzept A) ---------- */
.founder-letter {
  padding: clamp(4rem, 8vw, 6rem) 1.5rem;
  background: var(--paper-2);
  border-top: 1px solid var(--paper-border);
  border-bottom: 1px solid var(--paper-border);
}
.founder-letter-inner {
  max-width: 720px;
  margin: 0 auto;
}
.founder-letter-eyebrow {
  font-size: var(--step--1);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--accent-strong);
  font-weight: 600;
  margin-bottom: 1.25rem;
}
.founder-letter-eyebrow::before {
  content: "";
  display: inline-block;
  width: 32px;
  height: 1px;
  background: var(--accent);
  vertical-align: middle;
  margin-right: 12px;
}
.founder-letter-title {
  font-family: var(--font-heading);
  font-size: var(--step-3);
  font-weight: 500;
  line-height: 1.1;
  margin-bottom: 2.5rem;
  color: var(--ink);
  max-width: 14ch;
}
.founder-letter-body {
  font-family: var(--font-body);
  font-size: var(--step-0);
  line-height: 1.7;
  color: var(--ink);
}
.founder-letter-body p {
  margin-bottom: 1.5rem;
}
.founder-letter-body p:last-child {
  margin-bottom: 0;
}
.founder-letter-lead {
  font-family: var(--font-heading);
  font-style: italic;
  font-size: var(--step-1);
  line-height: 1.4;
  margin-bottom: 2rem !important;
}
.founder-letter-lead .drop-cap {
  font-style: normal;
}
.founder-letter-signature {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--paper-border);
}
.founder-letter-signoff {
  font-family: var(--font-heading);
  font-style: italic;
  color: var(--ink-muted);
  margin-bottom: 0.5rem;
}
.founder-letter-names {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: var(--step-0);
  line-height: 1.5;
  margin: 0;
}
.founder-letter-role {
  font-weight: 400;
  color: var(--ink-muted);
  font-size: var(--step--1);
}
@media (max-width: 768px) {
  .founder-letter-title {
    max-width: 100%;
  }
}

SCHRITT 4: Spot-Checks ausfuehren und Ausgabe zeigen:

PowerShell-Befehle:
- (Select-String "founder-letter" .\index.html | Measure-Object).Count   # erwartet >= 5
- (Select-String "founder-letter-title" .\index.html | Measure-Object).Count   # erwartet 2
- (Select-String "Marvin Blatnig" .\index.html | Measure-Object).Count   # erwartet 1
- (Select-String "\.founder-letter " .\css\style.css | Measure-Object).Count   # erwartet >= 1
- (Select-String "\.founder-letter-inner" .\css\style.css | Measure-Object).Count   # erwartet 1

SCHRITT 5: Commit (DANACH, nicht zwischendurch):

git add index.html css/style.css
git commit -m "feat(variante-B): Founder-Letter-Section auf index.html (Konzept A)

Section nach Hero eingefuegt, namentlich von Marvin Blatnig + Stefan Maurer 
unterzeichnet. Editorial-Tonalitaet, max-width 720px fuer Lesbarkeit.

Bestehende Tokens wiederverwendet:
- paper-2 als Background
- ink als Body-Text
- accent-strong als Eyebrow-Akzent
- Newsreader fuer Headlines (italic-Lead)
- Inter fuer Body
- Drop-Cap aus P-W05-Pattern weitergenutzt

Hauptbotschaft: 'Wir bauen Websites fuer Menschen, die wenig Zeit haben, 
aber viel zu sagen.' (existierende Pullquote zum Lead-Element gemacht)

Erste Section von Variante-B-Konzept A 'Editorial'.
Naechste Schritte (separate Megaprompts):
- Constraints 'Was wir nicht machen'
- Manifest 'Was wir glauben'  
- Hero-Bild Variante B (Buero-Schreibtisch)
- Verfuegbarkeits-Section

Bezug: research-deliverable 1-marktanalyse.md + 2-konzept-empfehlungen.md."

SCHRITT 6: STOP NACH DEM COMMIT.
Liefere kurzen Bericht:
- Was wurde geaendert (Liste in 3-5 Punkten)
- Wo in index.html steht die Section jetzt (vor welcher anderen Section?)
- Erwarteter visueller Effekt (1-2 Saetze)
- "Bereit fuer Browser-Test: npx serve ."

NICHT TUN in diesem Megaprompt:
- Andere Sections umbauen (keine Hero-Aenderungen, keine Footer-Aenderungen)
- Neue Bilder einbauen (Hero-Buero-Bild kommt in Megaprompt 3)
- Push auf Origin (manueller Schritt, Stefan macht das nach Browser-Test)
- Files in ueber-uns.html, kontakt.html, pakete.html, leistungen.html anfassen
- Constraints- oder Manifest-Section schon einbauen (kommt in Megaprompt 2)

ANNAHMEN die Du machen darfst und markieren musst:
- Wenn das Markup an einer bestimmten Stelle nicht 1:1 passt (z.B. Hero hat anderen Klassennamen): anpassen und im Commit-Body als "ANNAHME:" dokumentieren
- Wenn eine bestehende CSS-Regel kollidiert: vorrangstark genug machen ohne !important (nur bei .founder-letter-lead margin-bottom darf !important stehen, weil .founder-letter-body p eine globale margin-bottom hat). Im Commit-Body dokumentieren.
- Wenn die Hero-Section vom Original abweicht: nicht raten, sondern STOP und Stefan fragen.

LIEFERFORMAT:
1. Erst: 3-Punkt-Plan was du machen wirst
2. Dann: tool-Aufrufe (view, str_replace, etc.)
3. Dann: Spot-Check-Output
4. Dann: Commit-Output
5. Dann: "STOP — bereit fuer Browser-Test" Bericht

Los gehts.

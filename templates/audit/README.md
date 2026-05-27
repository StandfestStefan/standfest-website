# Audit-Templates

HTML-Vorlagen fuer den 48h-Audit-Workflow (A5).

## Dateien (erwartet)

- `kunden-1pager.html` - Kunden-PDF (1 Seite A4, vor Versand)
- `dossier-intern.html` - Internes Verkaufs-Dossier (5 Seiten A4)
- `fonts/` - DM Sans Webfont-Files

## Konvention

- A4-Format (210x297 mm), Print-CSS via `@media print`
- Platzhalter im Mustache-Stil `{{variable_name}}`
- Brand-Tokens: `--accent: #4a7c59`, `--ink: #1e2119`, `--muted: #5a584f`
- Encoding UTF-8 ohne BOM

## Workflow-Einsatz

n8n-Workflow A5 holt die Templates via HTTP von `https://standfestdigital.at/templates/audit/<datei>.html`,
ersetzt Platzhalter und rendert zu PDF (Puppeteer im n8n Code-Node).
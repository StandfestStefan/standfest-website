# Go-Live Checkliste – standfestdigital.at

## VOR DNS-Umstellung

### Inhalte & Qualität
- [ ] Alle Seiten lokal getestet (Desktop + Mobile)
- [ ] Alle internen Links funktionieren
- [ ] Kontaktformular sendet an richtigen Webhook (n8n.standfestdigital.at/webhook/kontakt)
- [ ] Audit-Konfigurator sendet an richtigen Webhook (n8n.standfestdigital.at/webhook/audit)
- [ ] robots.txt erlaubt Crawling (Disallow nur /kunden.html)
- [ ] sitemap.xml enthält alle 7 öffentlichen Seiten
- [ ] **[SM-AKTION]** Impressum-Platzhalter ausfüllen: Name, Adresse, UID, Gewerbebehörde, Telefon
- [ ] **[SM-AKTION]** Datenschutz-Adresse ergänzen
- [ ] **[SM-AKTION]** Datenschutztext von Anwalt prüfen lassen (oder Hinweis-Banner aktiv lassen)
- [ ] Favicon vorhanden (favicon.ico + apple-touch-icon.png)
- [ ] OG-Image vorhanden (/img/og-image.jpg)
- [ ] Google Analytics 4 Code aktiv (G-4SGGPLWQMW)

### Technik
- [ ] Alle HTML-Dateien auf Server hochgeladen (/var/www/standfestdigital.at/)
- [ ] CSS + JS + img-Ordner hochgeladen
- [ ] robots.txt + sitemap.xml im Root
- [ ] 404.html vorhanden und konfiguriert

### Server (Hetzner)
- [ ] Nginx installiert und aktiv
- [ ] Server-Block-Config kopiert: nginx/standfestdigital.at.conf → /etc/nginx/sites-available/
- [ ] Symlink erstellt: ln -s /etc/nginx/sites-available/standfestdigital.at.conf /etc/nginx/sites-enabled/
- [ ] Security-Headers kopiert: nginx/security-headers.conf → /etc/nginx/snippets/
- [ ] **[SM-AKTION]** Nginx-Config testen: `sudo nginx -t`
- [ ] **[SM-AKTION]** Nginx neu laden: `sudo systemctl reload nginx`

---

## DNS-Umstellung

- [ ] **[SM-AKTION]** A-Record: standfestdigital.at → 168.119.173.11
- [ ] **[SM-AKTION]** CNAME: www.standfestdigital.at → standfestdigital.at
- [ ] **ACHTUNG:** MX-Records NICHT ändern! (bleiben bei Google Workspace)
- [ ] **[SM-AKTION]** SSL-Zertifikat generieren: `sudo certbot --nginx -d standfestdigital.at -d www.standfestdigital.at`
- [ ] DNS-Propagation abwarten (bis zu 48h, meist 1-2h)

---

## NACH Go-Live

### Sofort prüfen
- [ ] https://standfestdigital.at lädt korrekt
- [ ] HTTP → HTTPS Redirect funktioniert
- [ ] www → non-www Redirect funktioniert
- [ ] Alle Seiten mobil aufrufen (Smartphone)
- [ ] Kontaktformular End-to-End testen (Website → Webhook → Mail-Eingang)
- [ ] Audit-Konfigurator End-to-End testen (alle 3 Steps → Webhook)

### Google & Analytics
- [ ] **[SM-AKTION]** Google Search Console einrichten (search.google.com/search-console)
- [ ] **[SM-AKTION]** Property verifizieren (HTML-Tag oder DNS-TXT)
- [ ] **[SM-AKTION]** Sitemap einreichen in Search Console
- [ ] **[SM-AKTION]** Google Analytics verifizieren (analytics.google.com → Echtzeit-Bericht)
- [ ] **[SM-AKTION]** Google Business Profil: Website-URL aktualisieren auf https://standfestdigital.at

### Optional (Woche 1)
- [ ] PageSpeed Insights testen (pagespeed.web.dev)
- [ ] Security Headers testen (securityheaders.com)
- [ ] SSL-Bewertung prüfen (ssllabs.com/ssltest)
- [ ] Cookie-Banner implementieren (für GA4 DSGVO-konform)
- [ ] Cal.com Termin-Widget einrichten (ersetzt WhatsApp-Fallback)

# Schulhomepage der Volksschule Kaplanhof

Dieses Studienprojekt setzt das bereitgestellte Konzept „MEILENSTEIN 1_Homepage-Konzept – Volksschule Kaplanhof“ als statische Website um. Die Schule ist fiktiv. Der erste Meilenstein enthält nur das Grundgerüst und die vorgegebenen Platzhaltertexte.

## Gemeinsamer Weblink

[Website ansehen](https://chrisi122.github.io/volksschule-kaplanhof/) · [Veröffentlichungsstatus](https://github.com/chrisi122/volksschule-kaplanhof/actions/workflows/pages.yml)

GitHub Actions veröffentlicht jeden zu `main` übertragenen Stand nach erfolgreicher Prüfung automatisch. Die Gruppe und die Vortragende sehen die Website über denselben Weblink. Eine lokale Speicherung wird durch einen Git-Commit und `git push` zu GitHub übertragen; erst diese Übertragung startet die Veröffentlichung. Der aktuelle Zustand ist über den Veröffentlichungsstatus sichtbar.

Die Veröffentlichung enthält nur HTML- und CSS-Dateien sowie einen gegebenenfalls vorhandenen Medienordner `assets`. Die lokale Abgabedokumentation wird weder in das öffentliche GitHub-Projekt aufgenommen noch als Website ausgeliefert.

## Website öffnen

`index.html` im Projektordner doppelt anklicken. Die vollständige Website funktioniert direkt im Browser, auch ohne Internetverbindung oder Installation.

Alternativ mit vorhandenem Node.js im Projektordner starten:

```powershell
npm start
```

Die Vorschau ist unter <http://127.0.0.1:4173> erreichbar. Mit `Strg+C` beenden. Es sind keine npm-Pakete zu installieren.

## Aufbau

- `index.html`: Begrüßung und die drei vorgegebenen Vorschauen.
- `schule.html`, `klassen.html`, `eltern.html`, `aktuelles.html`, `kontakt.html`: die fünf Platzhalterseiten.
- `styles.css`: gemeinsame Gestaltung, Farben, Arial und Anpassung für kleinere Bildschirme.
- `scripts/preview.mjs`: optionaler lokaler Vorschau-Server; kein Bestandteil der eigentlichen Website.
- `scripts/build.mjs`: stellt die Website in `_site` zusammen und prüft lokale Dateiverweise.
- `.github/workflows/pages.yml`: automatische Veröffentlichung nach jeder Übertragung zu `main`.
- `dokumentation/`: lokale KI- und Prüfprotokolle für die Lehrveranstaltung; durch `.gitignore` von GitHub ausgenommen.

Texte werden direkt in der jeweiligen HTML-Datei geändert, die Gestaltung zentral in `styles.css`. Die Navigation und der Fußbereich stehen in jeder HTML-Datei; gemeinsame Änderungen daher in allen sechs Dateien durchführen. Die eigenständigen HTML-Seiten halten das Projekt ohne Build-Prozess bearbeitbar.

## Umfang des ersten Meilensteins

Die Texte, Menüreihenfolge und sechs Farbwerte stammen aus dem Konzept. Die drei Vorschauen führen zu Schule, Eltern und Aktuelles. Alle Unterseiten führen zur Startseite zurück. Auf jeder Seite ist der Hinweis auf das fiktive Studienprojekt sichtbar.

Die Website verwendet keine externen Schriftarten, Skripte, Bilder, Tracking-Dienste oder Cookies. Für die Darstellung ist kein JavaScript notwendig. Fotos, Kontaktdaten, Personen, Klassenlisten, Termine und zusätzliche Angebote wurden entsprechend dem Konzept nicht ergänzt.

Die Veröffentlichung über GitHub Pages wurde im weiteren Arbeitsauftrag ausdrücklich gewünscht. Der Status der Veröffentlichung ist oben verlinkt. Die im Konzept vorgesehenen weiteren inhaltlichen Prüfungen bleiben einem späteren Arbeitsschritt vorbehalten.

## Änderungen veröffentlichen

Vor der Übertragung im Projektordner prüfen:

```powershell
npm run build
```

Es sind keine npm-Pakete zu installieren. Nach erfolgreicher Prüfung die beabsichtigten Änderungen zu `main` übertragen. GitHub Actions führt dieselbe Prüfung vor jeder Veröffentlichung erneut durch. Bei einem Fehler wird kein neuer Stand veröffentlicht.

Neue Medien im Ordner `assets` ablegen und relativ verlinken, beispielsweise `assets/bild.jpg`. Vor dem Hinzufügen zu GitHub mit `git diff --cached --name-only` prüfen, dass nur die beabsichtigten Dateien erfasst sind. Den lokalen Ordner `dokumentation` nicht mit `git add -f` hinzufügen.

## Dokumentation des KI-Einsatzes

Das Protokoll in `dokumentation/KI-Nutzungsprotokoll.md` erfasst den Auftrag, das verwendete KI-System, Ergebnisse, Umsetzungsentscheidungen und Prüfungen. Es enthält ausdrücklich gekennzeichnete Felder für eure eigene fachliche Prüfung und Reflexion. Diese Angaben müssen von euch nach tatsächlicher Durchsicht ergänzt werden; die KI kann eure persönlichen Entscheidungen nicht vorwegnehmen.

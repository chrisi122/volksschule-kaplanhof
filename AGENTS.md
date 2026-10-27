# Projektregeln für die Schulwebsite

Dieses Projekt enthält die Website der fiktiven Volksschule Kaplanhof. Die Inhalte des ersten Meilensteins stehen in den sechs HTML-Dateien; die gemeinsame Gestaltung steht in `styles.css`. Vorgegebene Texte und Farben erhalten und keine Personen, Termine oder Angebote erfinden.

## Veröffentlichungsablauf

Die Nutzerin oder der Nutzer hat GitHub Pages mit automatischer Aktualisierung beauftragt. Das öffentliche Projekt ist `chrisi122/volksschule-kaplanhof`, der veröffentlichte Branch ist `main`.

Nach einem umgesetzten Änderungsauftrag an dieser Website:

1. Den betroffenen Ablauf angemessen prüfen und `npm run build` erfolgreich ausführen.
2. Die beabsichtigten Änderungen prüfen, gezielt vormerken und mit verständlicher Beschreibung committen.
3. Den fertigen Stand zu `origin/main` übertragen. Nicht mit Force-Push arbeiten. Bei zwischenzeitlichen Änderungen den gemeinsamen Stand zuerst abgleichen.
4. Den zu diesem Commit gehörenden GitHub-Actions-Lauf kontrollieren und das Ergebnis der Veröffentlichung berichten.

Explizite Anweisungen für lokale Entwürfe, reine Prüfungen oder Arbeit ohne Veröffentlichung gehen diesem Ablauf vor. Ein bloßes Speichern einer lokalen Datei aktualisiert die öffentliche Website nicht.

## Abgabedokumentation

Der lokale Ordner `dokumentation` ist absichtlich von Git ausgeschlossen. Er darf nicht mit `git add -f` veröffentlicht werden. Vorhandene KI- und Prüfprotokolle bei weiteren Arbeitsschritten wahrheitsgemäß ergänzen; persönliche Reflexionen und Freigaben der Studierenden nicht erfinden.

Der Export nach `_site` enthält ausschließlich HTML, CSS und gegebenenfalls `assets`. Entwicklungsdateien und Abgabedokumentation nicht in diesen Export aufnehmen.

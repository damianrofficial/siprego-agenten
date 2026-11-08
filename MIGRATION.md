# Auftrag an Claude Code: Siprego-Agenten auf Manager mit Unteragenten umstellen

Für Damian: Ordner entpacken, in Claude Code öffnen und schreiben: **"Lies MIGRATION.md und führe Phase 1 aus."** Die Datei `NICHT-INS-REPO_secrets.env` liegt neben diesem Ordner und kommt nie in Git.

Stand der Daten: So 08.11.2026, 17:30. Alles aus dem claude.ai-Projekt "Siprego Pizza" (Projektdokumente unter `claude/`) und den 8 geplanten Aufgaben ist hier enthalten.

## 1. Ausgangslage

Acht getrennte geplante Aufgaben (Cloud), jede startet eine eigene Sitzung ohne Gedächtnis. Sie tauschen sich nur über eine gemeinsame Textdatei im claude.ai-Projekt aus (`claude/manager-postfach.md`), die jeder Lauf komplett liest und komplett zurückschreibt.

| Aufgabe | ID | Zeitplan (Europe/Berlin) | Modell | Letzter Lauf |
| --- | --- | --- | --- | --- |
| Siprego Ads Pizzeria | trig_01JpdtS8eYrEuyh7f23LHZoK | Mo 08:39 | Fable 5.1 | noch nie (erster Lauf Mo 09.11.) |
| Siprego Social Wochenplan | trig_011Qan9TUTTfL7kdvtThRQdX | Mo 08:51 | Opus 5.5 | 02.11., ok |
| Siprego Newsletter Hauptmail | trig_01MYMNNDuU9HntmcyhRaVtBj | Di 08:48 | Fable 5.1 | 03.11., ok |
| Siprego Rückfrage-Check (Newsletter + Social) | trig_01V9UrU1xPpRXG3YM2FDNuPh | Di 09:27 | Fable 5.1 | 29.10. (damals Do), ok |
| Siprego Ads Catering | trig_01FgZ243iqtR7rJdPfYdjpie | Do 08:40 | Fable 5.1 | 05.11., ok |
| Siprego Newsletter Zweitmail | trig_014aL88F7xAtG5wjJLpdyPf4 | Sa 08:48 | Fable 5.1 | 07.11., ok |
| Siprego Manager Bericht | trig_018h494JszYi28DnSPq4HKX6 | Mo bis Sa 09:45 | Fable 5.1 | 07.11., "ok" |
| Siprego Manager Fragen | trig_012EDhR6jJSsgs2RhYrXMb6f | Mo bis Sa 10:15 | Fable 5.1 | 07.11., "ok" |

Prompts, Zeitpläne und Connectoren im Original: `alt/geplante-aufgaben/`.

## 2. Warum der Manager nicht funktioniert

Befund (geprüft 08.11.2026):
- Die Fach-Agenten schreiben ins Postfach (Einträge Ads Catering 05.11. und Zweitmail 07.11. sind da).
- Beide Manager-Läufe melden "erfolgreich", dauern aber nur 45 bis 80 Sekunden. Die Einträge stehen weiter auf "Bearbeitet vom Manager: nein", die Warteschlange ist leer, keine Frage wurde gestellt. Die Teveo-Frage (Frist Mo 09.11. 12:00) und die Zweitmail-Frage (Frist 07.11. 12:00) hat Damian nie bekommen.
- "Erfolgreich" heißt bei geplanten Aufgaben nur: kein Absturz. Fehlende Tools oder abgebrochene Arbeit stehen nur im Verlauf der Sitzung (claude.ai/code, Sitzungen cse_0147tbo6XwNxJEdZeBqhD6c1 und cse_0147tbo3bMRjrr15HQeLzJYz vom 07.11.). Ursache dort nachsehen, bevor umgestellt wird.

Strukturelle Gründe, unabhängig vom konkreten Fehler:
1. Der Manager hat keinen Zugriff auf die anderen Agenten. Er kann sie weder aufrufen noch korrigieren noch nachfragen, nur eine Datei lesen, die sie vorher geschrieben haben.
2. Zwei Manager-Läufe (Bericht und Fragen) plus sechs Fach-Läufe schreiben dieselben Dateien komplett zurück. Laut Newsletter-Playbook haben sich Läufe am 03.11. und bis 06.11. gegenseitig überschrieben.
3. Jeder Lauf ist eine neue Sitzung. Antworten von Damian landen in der Sitzung von heute, der nächste Lauf weiß davon nur, was in Dateien steht.

## 3. Ziel

Ein Repo, eine geplante Aufgabe "Siprego Manager". Der Manager ist die Hauptsitzung und ruft die Unteragenten in `.claude/agents/` direkt auf (social, newsletter, ads, check). Damian spricht nur mit dem Manager. Playbooks und Logs liegen versioniert in Git. Details: `CLAUDE.md` und `manager/ablauf.md`.

Läuft weiter in der Cloud, nicht auf dem Kassen-PC: Die Cloud läuft, auch wenn kein Rechner an ist, und Computer-Use würde die Kasse blockieren.

## 4. Phase 1: Repo und Umgebung (nichts Altes abschalten)

1. Privates GitHub-Repo `siprego-agenten` anlegen, diesen Ordner als ersten Commit pushen. Vorher prüfen, dass keiner der beiden Werte aus `NICHT-INS-REPO_secrets.env` in einer Datei des Repos vorkommt.
2. Cloud-Umgebung für die geplante Aufgabe einrichten:
   - Umgebungsvariablen aus `NICHT-INS-REPO_secrets.env` (WP_APP_PASSWORD, ELEVENLABS_API_KEY). Besser als Netzwerk-Geheimnis, falls angeboten.
   - Netzwerkzugriff erlauben für: siprego.de, siprego.orderu.shop, static.orderu.shop, api.elevenlabs.io, static.metricool.com, raw.githubusercontent.com (Schriften), docs.google.com. Mit der Umgebung der bisherigen Aufgaben vergleichen, dort funktionieren diese Aufrufe schon.
   - Setup-Skript: ffmpeg, python3-pip, `pip install pillow pillow-heif playwright rembg --break-system-packages`, `playwright install chromium`, Schriften Lacquer, Bricolage Grotesque, Figtree nach `fonts/` (Links in playbooks/social-design.md und social-hook-stil.md).
3. Connectoren der neuen Aufgabe: Brevo, Metricool, Google Drive. Nicht nötig: Canva, Framer, Notion, Simplybook, Claude Docs.
4. Prüfen, ob die Unteragenten die Connector-Tools sehen (in einer Testsitzung `ads` im Modus PIZZERIA mit "nur Metricool-Abruf testen" aufrufen).

### Stand Phase 1 (So 08.11.2026, erledigt in Claude Code)

Ursache Manager (beide Sitzungen vom 07.11. gelesen): In geplanten Läufen gab es kein Projects-Tool (project_read). Der Bericht-Lauf hat deshalb nur Brevo und Metricool abgefragt, der Fragen-Lauf hat sofort abgebrochen. Postfach, Playbooks und umsatz.md waren in keinem Manager-Lauf lesbar. Mit dem Repo ist das behoben: alle Dateien liegen auf der Platte.

1. Repo: github.com/damianrofficial/siprego-agenten, privat, Branch main, erster Commit gepusht. Geprüft: keiner der beiden Geheimwerte (auch nicht ohne Leerzeichen oder als Anfang) steht in einer Datei. fonts/ und NICHT-INS-REPO_* sind in .gitignore.
2. Umgebung: neue persönliche Cloud-Umgebung "siprego-agenten" (env_01BkwinaEhnV8vFuMUxTmmpA). Die Default-Umgebung der alten Aufgaben sperrte siprego.de, Shop, ElevenLabs, static.metricool.com und docs.google.com (getestet), deshalb eigene Umgebung.
   - Netzwerk: die 7 Hosts aus Punkt 2 freigegeben, Paketquellen und MCP-Server erlaubt. Alle 7 antworten. GitHub-Release-Downloads (rembg-Modell) gehen ohne Freigabe.
   - Setup-Skript gespeichert und hier einmal komplett durchgelaufen: ffmpeg, pip, pillow, pillow-heif, playwright 1.63.0 (passt zum vorinstallierten Chromium, sonst playwright install chromium), rembg mit onnxruntime, Schriften fonts/Lacquer-Regular.ttf, fonts/Bricolage.ttf, fonts/Figtree.ttf (Dateinamen wie in scripts/). Chromium-Start und Bricolage mit Achsen getestet. In einer frischen Sitzung noch unbewiesen.
   - Geheimnisse als Netzwerk-Geheimnis statt Umgebungsvariable (der Proxy setzt sie ein, kein Wert in der Sitzung). Folge für Playbooks: $WP_APP_PASSWORD und $ELEVENLABS_API_KEY sind leer; curl mit Platzhalter aufrufen, z. B. -u "social-agent:proxy-injected" und -H "xi-api-key: proxy-injected", der Proxy ersetzt den Header. Playbooks dafür in Phase 2 anpassen.
   - siprego.de: ERLEDIGT 08.11. (von Damian korrigiert). Test GET /wp-json/wp/v2/media?context=edit mit -u "social-agent:proxy-injected" liefert 200. /wp/v2/users/me blockt der Hoster immer mit 403, das ist kein Test.
   - api.elevenlabs.io: OFFEN, Geheimnis nicht eingetragen (abgelehnt). Header xi-api-key, ohne Präfix.
3. Connectoren: werden beim Anlegen der geplanten Aufgabe in Phase 2 gesetzt: Brevo, Metricool_Social_Media_Management, Google_Drive. Brevo am 08.11. von Damian verbunden, in der Sitzung sichtbar. Neu sichtbar: Gmail. Damit kann der Manager die Z-Berichte selbst lesen (Punkt 7), in Phase 2 mitnehmen. Ebenfalls mitnehmen: Meta_MCP (Damian 08.11.: "der ads agent kann und soll kampagnen ändern", Modus UMSETZEN in .claude/agents/ads.md). Connectoren der neuen Aufgabe also: Brevo, Metricool, Google Drive, Gmail, Meta_MCP.
4. Unteragenten-Test: Unteragent (Modell fable wie ads) hat die Metricool-Tools geladen und nur gelesen. Marken 7383922 und 7408163 sichtbar, Meta-Werbekonto 301514571034752 an beiden Marken, Google Ads 3121294482 an siprego.catering. Meta-Kampagnen 04.11. bis 08.11.: 3 rows, Spend 841,75 €. Google Drive sichtbar, Brevo nicht (siehe 3). Die Dateien in .claude/agents/ haben keine tools-Einschränkung, Unteragenten erben also alle Connectoren der Hauptsitzung. Der Aufruf über den Agent-Namen (ads, social ...) wird erst in einer Sitzung mit geklontem Repo getestet.
   - Achtung Ads: Die Catering-Kampagne "Leads - Pizza Catering" erscheint auch unter Marke 7383922 (gleiches Konto). Der Ads-Agent im Modus PIZZERIA muss sie herausfiltern.

## 5. Phase 2: Probelauf parallel zum alten Aufbau

1. Neue geplante Aufgabe "Siprego Manager", Repo `siprego-agenten`, Umgebung siprego-agenten, Modell Opus 5.5 (Damian 08.11.: alle Agenten mit Opus 5.5; Unteragenten stehen auf model: opus), Prompt: "Lies CLAUDE.md und manager/ablauf.md und führe den heutigen Lauf aus. PROBELAUF=1." Zeitplan zunächst einmalig per "Jetzt ausführen" an einem Montag und einem Dienstag (dann laufen social, ads, newsletter, check).
2. Im Probelauf legt nichts etwas in Metricool, Brevo oder WordPress an. Sonst entstehen doppelte Posts und doppelte Mails neben den alten Aufgaben.
3. Ergebnis mit dem alten Lauf desselben Tages vergleichen (`manager/probelauf-*.md` gegen Postfach-Eintrag). Damian bekommt nur eine kurze Probelauf-Nachricht.

## 6. Phase 3: Umschalten

Nur nach OK von Damian:
1. Die 8 alten Aufgaben pausieren (nicht löschen), IDs siehe Tabelle oben.
2. "Siprego Manager" auf Zeitplan `CRON_TZ=Europe/Berlin 31 8 * * 1-6` (Mo bis Sa 08:31) stellen, Prompt ohne PROBELAUF, Benachrichtigungen per Push an.
3. Prüfen, ob sich ein Lauf als fortlaufender Thread führen lässt (Option "Sitzung fortsetzen" oder Projekt-Thread), damit Damian einen einzigen Manager-Chat hat statt einer Sitzung pro Tag. Wenn nicht: Damian antwortet in der Sitzung des Tages, alles Dauerhafte steht nach jedem Commit in Git.
4. Nach 2 Wochen ohne Störung die alten Aufgaben löschen.

## 7. Termine, die beim Umschalten nicht verloren gehen dürfen

- Mo 09.11. 12:00: Teveo v2 und v3 pausieren? ERLEDIGT 08.11.: Damian "teveo v2 und v3 pausieren.", über den Meta-Connector pausiert, eingetragen in postfach.md, ads-log.md, playbooks/ads.md. Achtung: Der alte Lauf Ads Catering (Do 12.11.) liest die claude.ai-Projektdateien, nicht das Repo, und kennt die Entscheidung nicht.
- Mo 09.11.: Nummer 1 im Oktober (Stückzahl) oder Barbabietola bestätigt, sonst Mittwochsmail mit Antipasti-Platte.
- Di 10.11.: erster Autopilot-Lauf Hauptmail (scheduledAt Mi 11.11. 10:30). Sa 14.11.: erster Autopilot-Lauf Zweitmail. Mo 16.11.: Social-Autopilot laut Playbook, aber Damians Regel vom 29.10. gilt weiter: jeder Social-Entwurf vorher zur Freigabe.
- Di 10.11. 17:30: Post "Ungeschnitten #11" ist freigegeben und geplant.
- Do 12.11.: Wirkung Meta-Catering-Budget 80 €/Tag und Statics-Test bewerten. Do 19.11.: Statics je Motiv.
- Mo 16.11.: Zahlen Catering-Saison für die Mail 18.11. Mo 23.11.: Black-Friday-Code. 01.12.: Feiertags-Öffnungszeiten.
- Offen im Social-Log: Pizza in upload-24/-15, Napoli Famiglia im Shop, upload-9/-10/-11 posten oder Ads, Pizzaiolo in upload.mp4 und -5 erkennbar zeigen. siprego-upload-33.mp4 ist ein privates Video, öffentlich in der Mediathek: nie verwenden, Damian löscht es.
- Z-Berichte: Weiterleitung von info@siprego.de an Gmail war geplant (03.11.), Gmail-Connector noch nicht verbunden. Sobald da: Manager liest die Z-Bericht-PDFs selbst und füllt `logs/umsatz.md`.

## Stand Umstellung (So 08.11.2026, 18:55)

Damian hat entschieden: kein Probelauf, direkt umstellen ("alles umstellen auf montag").
- Sitzung "Siprego Manager" (session_0147tbo5DJSERRcDaV58aKAh), Umgebung siprego-agenten, Repo siprego-agenten, Opus 5.5. Ein fortlaufender Chat: Damian antwortet immer dort.
- Geplante Aufgabe "Siprego Manager" (trig_01Vf89qfXM2P2hWNmK9VHm95), CRON_TZ=Europe/Berlin 31 8 * * 1-6, feuert in diese Sitzung. Erster Lauf Mo 09.11. 08:31. Connectoren hängen an der Sitzung (Parameter connectors für Aufgaben ist in dieser Organisation nicht verfügbar).
- Selbsttest der Sitzung 08.11.: Repo, Push, Setup-Skript, Netzwerk, WordPress 200, Brevo, Metricool, Drive, Gmail, Meta, Unteragent ads mit Metricool: ok. Gefunden und behoben: SendUserMessage gibt es nicht (Bericht und Fragen jetzt als Chat-Antwort plus PushNotification, Fragen mit AskUserQuestion); Connector-Tools heißen mcp__<Server-ID>__<name> (laden per Stichwort, Punkt 5a in den Agent-Dateien).
- Die 8 alten Aufgaben sind seit 08.11. 18:51 pausiert (nicht gelöscht). Löschen nach 2 Wochen ohne Störung, also frühestens 23.11.
- Offen: ElevenLabs-Geheimnis (bis dahin nur Musik-Pool). Hinweis "veraltet, gilt: GitHub siprego-agenten" im claude.ai-Projekt setzt Damian.

## 8. Was sich für Damian ändert

- Er bekommt pro Tag höchstens einen kurzen Bericht und danach Fragen einzeln, alles vom Manager.
- Änderungen an Playbooks sagt er dem Manager ("trag ein: ..."), nicht mehr einem beliebigen claude.ai-Chat. Die Projektdokumente im claude.ai-Projekt sind nach dem Umschalten veraltet; am besten dort einen Hinweis "veraltet, gilt: GitHub siprego-agenten" an den Anfang setzen.

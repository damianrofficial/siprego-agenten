# Siprego Social-Playbook (Instagram + TikTok)

Stand: 03.11.2026 abends (Dienstag-Post im Rhythmus, Catering nur spärlich, Napoli per Due nicht online, 22 neue Clips gesichtet; vormittags: Neue Ausrichtung nach Instagram-Analyse: Raw-Reels, Teig-Serie, Produkt-Statics im Website-Design, siehe Abschnitt "Ausrichtung ab 03.11.2026" und playbooks/social-design.md; 02.11.2026 Damian: Napoli per Due und Famiglia online, Newsletter-Agent immer mitprüfen; 29.10.2026 Menü-Inhalte aus dem Shop und Antworten von Damian ergänzt, Freigabe im Chat ergänzt; 28.10.2026 Mittwoch-Regel, Halloween-Partymenü und geplante Menüs; davor 17.10.2026). Faktenquelle für den Social-Media-Agenten. Was hier nicht steht, darf er nicht behaupten. Änderungen hier eintragen oder Claude im Chat sagen. Öffnungszeiten, Produkte, Preise und Rabattcodes stehen im Newsletter-Playbook (playbooks/newsletter.md), das gilt auch für Social.

## Kanäle

- Instagram: @siprego.pizza (https://www.instagram.com/siprego.pizza/), in Metricool verknüpft seit 12.10.2026
- TikTok: @siprego, in Metricool verknüpft seit 13.10.2026
- Posting-Tool: Metricool (Starter-Tarif seit 13.10.2026). Marke "siprego.pizza", Brand-ID 7383922, Zeitzone Europe/Berlin. NUR diese Marke verwenden. Die zweite Marke "siprego.catering" (Brand-ID 7408163, Instagram @siprego.catering und Facebook) gehört zum Catering und wird vom Pizzeria-Agenten nicht bespielt.
- Freigabe-Phase läuft über Entwürfe (draft) in Metricool, nicht über den Review-Workflow (braucht Team-Tarif).
- Google Drive ist in Metricool verknüpft, aber das hilft nur im Planer per Hand. Über die API lehnt Metricool Drive-Links ab (getestet 13.10.2026). Der Agent lädt Medien deshalb in die WordPress-Mediathek, siehe "Bild-Upload".
- Link in Bio / Bestell-Link: https://siprego.orderu.shop/store/pfersee/menu
- Standort-Tag: Siprego, Hessenbachstr. 1, 86157 Augsburg-Pfersee

## Bild-Upload und Mediathek (öffentlicher Speicher und Eingang)

- WordPress-Mediathek auf siprego.de über die REST-API. Benutzer "social-agent" (Rolle Autor, darf nur Medien hochladen und auflisten). Anwendungspasswort: Netzwerk-Geheimnis der Cloud-Umgebung, der Proxy setzt es ein, im curl als Platzhalter "proxy-injected" (jederzeit im WordPress-Profil des Benutzers widerrufbar). Nur für Medien verwenden, nie für andere WordPress-Aktionen.
- Auflisten (neueste zuerst): curl -sS -u "social-agent:proxy-injected" "https://siprego.de/wp-json/wp/v2/media?per_page=50&orderby=date&order=desc" ; Felder: id, date, mime_type, source_url, media_details (width, height, length_formatted, filesize). source_url ist öffentlich und kann direkt per curl heruntergeladen werden, ohne Größenlimit.
- Upload: curl -sS -m 300 -u "social-agent:proxy-injected" -H "Content-Disposition: attachment; filename=siprego-THEMA-DATUM.jpg" -H "Content-Type: image/jpeg" --data-binary @DATEI.jpg https://siprego.de/wp-json/wp/v2/media ; die JSON-Antwort enthält source_url, das ist die öffentliche URL für Metricool. Videos genauso mit Content-Type video/mp4. Upload-Limit seit 17.10.2026: 512 MB (getestet mit 250 MB). Dateinamen sprechend, ohne Umlaute, Präfix "siprego-".
- Löschen (nur eigene Zwischen- oder Testdateien): curl -X DELETE -u "social-agent:proxy-injected" "https://siprego.de/wp-json/wp/v2/media/ID?force=true". Rohmaterial von Damian nie löschen.
- Eingerichtet 13.10.2026, Limits erhöht 17.10.2026 (Plesk PHP 512M, nginx client_max_body_size, wp-config WP_MEMORY_LIMIT 512M).
- Fertige Statics von Damian in der Mediathek: Antipasti-Platte für 2 Personen, 24,90 €, "Jetzt im Siprego Shop bestellen" (Quelle Damian, 09.11.2026, 1254x1254, frei ab sofort, Preis 24,90 € von Damian bestätigt): https://siprego.de/wp-content/uploads/2026/11/siprego-antipasti-fuer-2-24-90-damian-2026-11.jpg (ID 6163). Noch kein Post daraus angelegt.
- Foto von Damian: neuer Flyer "Deine Pizzeria in Pfersee" (Pizza Bufala Verde) in der Hand vor dem Siprego-Logo an der Wand (Quelle Damian, 09.11.2026, Original 1932x2576, WordPress hat auf 1920x2560 skaliert): https://siprego.de/wp-content/uploads/2026/11/siprego-flyer-pfersee-hand-2026-11-scaled.jpg (ID 6176). Verwendet am 09.11.2026 im Sonderpost Flyer-Helfer (Feed und Story), gesperrt bis 21.12.2026.

## Rohmaterial

- Haupteingang ist die WordPress-Mediathek (siehe oben). Damian schickt Fotos und Videos vom iPhone über den Kurzbefehl "An Siprego senden" (Teilen-Menü in Fotos) direkt dorthin, in voller Qualität (4K-Videos, HEIC oder JPG). Die Dateien heißen meist "siprego-upload.mp4" bzw. "siprego-upload-2.mp4" usw., erkennbar am Upload-Datum. Alles, was seit dem letzten Lauf hochgeladen wurde und nicht vom Agenten selbst stammt, ist neues Rohmaterial.
- Achtung bei iPhone-Videos: Hochkant gefilmte Clips stehen in der Mediathek als 3840x2160 (quer) mit Rotations-Flag (ffprobe: rotation=-90 oder 90). Das ist Hochformat. Vor einer Entscheidung über Quer oder Hochkant immer ffprobe mit stream_side_data=rotation prüfen. ffmpeg dreht beim Skalieren automatisch richtig, nicht selbst transponieren.
- Videos: Original bleibt in der Mediathek. Für Reels und TikTok erstellt der Agent mit ffmpeg eine Posting-Version: Hochformat 1080x1920 (bei 16:9-Clips Ausschnitt aus der Mitte, besser filmt Damian direkt hochkant), H.264, 30 fps, max. 30 Sekunden (bei längeren Clips den besten Abschnitt wählen), Audio behalten, und lädt sie als siprego-THEMA-DATUM-reel.mp4 hoch. Sichtung per ffmpeg-Frames (z. B. 6 Einzelbilder als Kontaktbogen).
- Musik: Der Agent erzeugt für jedes Reel einen eigenen Track mit der ElevenLabs Music API (seit 19.10.2026, bezahlter Tarif, gewerblich nutzbar, keine Quellenangabe nötig). API-Schlüssel (nur Musik-Berechtigung, jederzeit bei ElevenLabs widerrufbar): Netzwerk-Geheimnis der Cloud-Umgebung (Stand 08.11.2026 noch nicht eingerichtet, bis dahin nur Musik-Pool). Aufruf: curl -s -m 240 -X POST "https://api.elevenlabs.io/v1/music?output_format=mp3_44100_192" -H "xi-api-key: proxy-injected" -H "Content-Type: application/json" -d '{"prompt":"...","music_length_ms":17000}' -o track.mp3 ; music_length_ms auf die Reel-Länge setzen. Tracks nacheinander erzeugen, nie parallel (Rate-Limit 429). Mischung (von Damian am 19.10.2026 festgelegt): Originalton bleibt ganz leise im Hintergrund für Authentizität, 10 bis 20 % der Musiklautstärke, Musik etwas zurückgenommen. ffmpeg: [0:a]volume=0.35[orig];[1:a]afade=t=in:st=0:d=0.3,afade=t=out:st=ENDE-1:d=1.0,volume=0.55[mus];[orig][mus]amix=inputs=2:duration=first:dropout_transition=0:normalize=0,alimiter=limit=0.95 ; -c:v copy, -shortest. Ergebnis mean_volume rund -21 dB. Ausnahme: Schickt Damian ein fertiges CapCut-Video mit Musik, bleibt seine Musik. Fertige CapCut-Videos (meist HEVC .mov) vor dem Upload nach H.264 MP4 umwandeln.
- Musik-Stil (von Damian am 19.10.2026 festgelegt nach 7 Hörproben): Italienischer Schlager der 60er, wenige Instrumente, mit italienischem Gesang. Moderner Pop und Lo-fi klangen billig, nicht verwenden. Basis-Prompt (englisch, immer so beginnen): "Italian schlager from the 1960s, mandolin and acoustic guitar only with a gentle tambourine, charming male vocal singing in Italian with a smile in his voice, simple sing-along melody, sunny and lighthearted, vintage mono feel, minimal instrumentation". Pro Reel nur Stimmung und Tempo anpassen (z. B. "slower and tender" für Handwerk, "lively and playful" für Produkt, "warm and friendly" für Menschen), gelegentlich "female vocal" oder "whistled melody" statt Männerstimme für Abwechslung. Nie mehr als 3 bis 4 Instrumente nennen, keine Synthesizer, keine Drums außer Besen oder Tamburin.
- Musik-Pool von Damian (seit 19.10.2026, dürfen immer wieder verwendet werden, Vorrang vor ElevenLabs): https://siprego.de/wp-content/uploads/2026/10/siprego-musik-sotto-il-sole-di-napoli.mp3 (2:48), https://siprego.de/wp-content/uploads/2026/10/siprego-musik-italian-oldie.mp3 (2:54), https://siprego.de/wp-content/uploads/2026/10/siprego-musik-italo-pop-90s.mp3 (2:38). Regel: Pro Reel erst einen Track aus dem Pool nehmen, dabei durchwechseln (nicht zweimal hintereinander derselbe) und pro Verwendung einen anderen Ausschnitt wählen (ffmpeg -ss, einen Einsatz mit Melodie, nicht das Intro). Ausschnitt mit afade in 0,3 s und afade out 1 s. ElevenLabs nur, wenn keiner der drei passt oder Damian ausdrücklich etwas Neues will. Neue MP3s von Damian landen im Drive-Eingang (unter 5 MB lesbar) oder in der Mediathek, der Agent nimmt sie in den Pool auf und ergänzt diese Liste.
- Wenn der Ton selbst Inhalt ist (Knuspern, Zischen im Ofen, Inga spricht): Verhältnis umdrehen, Originalton volume 1.0, Musik volume 0.2.
- Fotos: HEIC per pillow-heif öffnen. Für Feed-Posts 1080x1350 (4:5), für Stories 1080x1920. Foto-Posts nur, wenn Damian ein fertiges, gutes Foto liefert (Mediathek oder Drive-Eingang). Keine Standbilder aus Videos, keine Ausschnitte aus Schnappschüssen: Damian hat am 03.11. drei Versionen abgelehnt (unscharf, keine Aussage) und entschieden: im Zweifel ein Video. Statt Foto also Raw-Reel oder Static im Website-Design.
- Drive-Eingang bleibt als Zweitweg bestehen: "Siprego Social Content / 01 Eingang (hier hochladen)", Ordner-ID 1DKBJpmpknbM4HigWV2DwxdqCgaalTIHm, dort nur Dateien bis 5 MB lesbar (größere lassen das Drive-Tool abstürzen, nicht versuchen). Ablage fertiger Pakete: "02 Geplant (Agent)", Ordner-ID 1zaEfy-nsAd1vLvxAJSXOGrWRZs2vC4XL.
- Dateiname-Konvention in Drive: JJJJ-MM-TT_Thema_Typ. "FINAL" = fertiges Static, direkt verwendbar. "VERALTET" = nie verwenden. "ungeprueft" = noch von niemandem angesehen.
- Bestand, der immer erlaubt ist: Bilder aus früheren Metricool-Posts (static.metricool.com), Produktfotos aus dem Shop (static.orderu.shop/brands/.../products/...), Bilder in der WordPress-Mediathek, Instagram-Feed auf siprego.de (nur 640 px, Notlösung).
- Verboten: KI-generierte Fotos von Essen oder Menschen. Canva nicht für Statics mit Foto verwenden (ersetzt echte Fotos durch KI-Bilder). Statics baut der Agent per Code (Pillow) nach playbooks/social-design.md: Creme #F3F1EB, Dunkelbraun #2A1A10, Rot #A6201C, Bricolage Grotesque 800 für Headlines, Figtree für Text, rundes Logomark, freigestelltes Produkt oder Foto als Karte. Das alte Social-Rot #da1718 und Inter nicht mehr verwenden.

## Ausrichtung ab 03.11.2026 (Damian, nach Instagram-Analyse Sep bis Okt 2026)

Was die Zahlen sagen (Instagram, 01.09. bis 02.11.2026, Quelle Metricool, Details im Social-Log):
- Teig-Reels von Damian (12.09. "Wie wird der beste Teig", 26.09. "Wie entsteht der perfekte Teig"): 14.500 und 33.600 Reichweite, 191 und 424 Interaktionen, zusammen 148 Speicherungen und 135 Shares. Zehnmal so viel wie alles andere. Lehrinhalt zum Teig wird gespeichert und geteilt.
- Serie "Ungeschnitten #1 bis #6" (ein Rohclip, Originalton, keine Musik, kein Text-Hook, kurze Caption): Reichweite median 2.040 (bis 4.400), Interaktionen median 24, 23 Shares. Beste laufende Serie.
- Agent-Reels (Lacquer-Hook, Pool-Musik, Schnitt aus mehreren Clips): Reichweite median 1.290, Interaktionen median 12, 3 Shares in 6 Reels. Schwächstes Reel-Format auf dem Konto.
- Feed: Inga-Foto 847 Reichweite, 35 Interaktionen (bestes Foto). Dough-diary-Karussells 450 bis 525 Reichweite mit 15 bis 19 Interaktionen (hohe Rate). Agent-Statics 434 bis 537 mit 5 bis 19. KI-Menü-Bilder 287 und 406 mit 2 und 6 Interaktionen (schlechteste Posts).

Daraus die Regeln:
1. Reels sind roh. Standard ist ein Clip, höchstens zwei Schnitte, Originalton laut, keine Pool-Musik, kein Lacquer-Hook. Ungeschnitten zeigt Action (Ofen, Hände, Schaufel, Fritteuse, Bewegung), nicht vorrangig das fertige Produkt (Damian, 03.11.). Produkt-Clips wie Käsefaden gehören zu Produkt-Posts, nicht in die Ungeschnitten-Reihe. Caption kurz im Stil von Damian ("Ungeschnitten #7", ein Satz, Kontakt, 3 Hashtags). Wenn Damian einen Clip ohne Anweisung schickt, wird er so gepostet. Hook und Musik nur noch für Listen-Reels (Umfrage, Nummern) oder wenn Damian es ausdrücklich will.
2. Teig und Handwerk sind die Hauptsäule, nicht Produkt. Alles, was Teig zeigt (Biga, Staglio, Ausziehen, Ofen, Rand), hat Vorrang. Dough diary (Karussell mit echten Versuchsfotos und Zahlen) bleibt Damians Serie, der Agent legt sie an, wenn Damian Fotos und Text liefert.
3. Produkt-Posts sind Statics im Website-Design (playbooks/social-design.md), weil sie als Meta-Ads weiterverwendet werden. Jedes Produkt-Static wird zusätzlich als 1080x1080 und 1080x1920 in die Mediathek gelegt (Dateiname siprego-ad-...). Keine KI-Bilder mehr, auch nicht als Ausnahme.
4. Menschen: Inga und Team öfter zeigen (bestes Foto des Quartals). Mindestens ein Foto mit Inga oder Team alle zwei Wochen.
5. Keine Menü-Posts mit erfundenem Bildmotiv. Fehlt ein Foto, wird das Produkt freigestellt aus dem Website-Bestand genommen oder der Post wartet.

## Rhythmus (ab Woche 09.11.2026, 6 Posts pro Woche)

| Tag | Zeit | Format | Säule |
| --- | --- | --- | --- |
| Dienstag | 17:30 | Raw-Reel oder Foto (Inga, Team, Produkt) | Vorfreude auf Mittwoch: "Morgen ab 11 Uhr wieder offen", Thema der Mittwochsmail anteasern. Seit 03.11.2026 auf Vorschlag von Damian, ab Di 10.11. |
| Mittwoch | 10:30 | Static im Website-Design (Feed, plus Ad-Formate) | Produkt oder Menü, Thema wie die Mittwochsmail, Zeile "Mittwoch offen, 11 bis 22 Uhr" |
| Donnerstag | 10:30 | Raw-Reel (Ungeschnitten) | Teig, Ofen, Handwerk |
| Freitag | 10:30 | Karussell | Dough diary (Damian) oder Produkt-Fakten im Website-Design |
| Samstag | 18:30 | Raw-Reel | Action zuerst (Ofen, Schaufel, Käse), Lokal höchstens danach, IG + TikTok. Seit 03.11. kein Foto mehr, außer Damian liefert eins. Reiner Lokal-Schwenk am 07.11. war schwach |
| Sonntag | 10:30 | Raw-Reel (Ungeschnitten) | Teig, Ofen, Käsefaden, Community-Frage in der Caption |

- Zeiten sind Europe/Berlin (Metricool: 10 Uhr stärkste Stunde Mi bis So, Samstag 18 Uhr). Der Agent darf um bis zu 2 Stunden verschieben, nie vor 10:00, nie nach 20:00.
- Montag wird nicht gepostet (geschlossen). Dienstag nur der Vorfreude-Post am Abend (Laden ist zu, der Post sagt das: "morgen").
- TikTok bekommt nur die Reels (Raw, mit Originalton), keine Statics.
- Fehlt ein Rohclip für einen Reel-Tag, fällt der Post aus und der Agent meldet es. Kein Ersatz-Foto mit Musik mehr. Nie zweimal dasselbe Bild innerhalb von 6 Wochen.
- Catering (Damian, 03.11.2026): nur spärlich, höchstens ein Post alle 4 Wochen, immer mit Verweis auf @siprego.catering, kein eigener Catering-Schwerpunkt mehr auf siprego.pizza. Für Catering wird ein eigener Agent gebaut. Der Weihnachtsfeier-Post vom 22.10. zählt, der nächste frühestens KW 47.

## Mittwoch-Regel (seit 28.10.2026)

- Der Mittwoch ist seit 14.10. wieder offen und noch der schwächste Tag (Umsätze 14.10. 1.130 €, 21.10. 840 €, 28.10. 1.430 €). An Tagen mit Newsletter lag der Umsatz rund 400 € höher. Social soll den Mittwoch genauso stützen.
- Der Mittwoch-Post (Static 10:30) trägt immer eine Zeile "Mittwoch offen, 11 bis 22 Uhr" in der Caption, egal welches Produkt gezeigt wird. Dazu am Mittwochvormittag (10:00 bis 11:00) eine Story mit demselben Hinweis und Bestell-Link-Sticker.
- Der Mittwoch-Post greift dasselbe Thema auf wie die Mittwochs-Hauptmail des Newsletter-Agenten (steht im Newsletter-Playbook unter "Bereits angelegte Kampagnen" und "Nächstes Thema"). Ein Thema, zwei Kanäle, gleicher Tag.

## Abstimmung mit dem Newsletter-Agenten (seit 02.11.2026, Damian: "immer newsletter agent checken")

- Vor jedem Social-Plan liest der Agent das Newsletter-Playbook komplett (Produkte und Menü-Status, Nächstes Thema, Notizen von Damian, Warteschlange) und schaut in Brevo die neuesten Kampagnen an (Entwürfe und gesendete, Thema und Inhalt).
- Was Damian dem Newsletter-Agenten im Chat bestätigt hat, gilt auch für Social. Steht ein Produkt dort als aktiv, darf Social es bewerben, auch wenn das Shop-Auslesen es (noch) nicht zeigt; den Unterschied im Bericht nennen.
- Neue Fakten aus einem Social-Lauf (z. B. Menü-Status) trägt der Agent auch ins Newsletter-Playbook ein.

## Content-Säulen (Mischung pro Monat, seit 03.11.2026)

1. Teig und Handwerk, roh (40 %): Biga, Staglio, Ausziehen, Ofen, Rand, Käsefaden. Ungeschnitten-Serie und Dough diary.
2. Produkt und Menü als Static im Website-Design (25 %): Mittagsmenü, Napoli per Due, Napoli Famiglia, Party Menü, Arancini, Specials (Mortabella, Bufala Verde). Preise nur aus dem Newsletter-Playbook.
3. Menschen (15 %): Inga, Team, Pizzabäcker. Gäste nur mit erkennbarem Einverständnis.
4. Lokal Augsburg und Pfersee (10 %): Laden, Fensterplatz, Abholung, Mittwoch offen.
5. Catering (höchstens 5 %, spärlich laut Damian 03.11.2026): höchstens ein Post alle 4 Wochen, immer Verweis auf @siprego.catering. Eigener Catering-Agent geplant.

## Menüs (Stand 02.11.2026, Details und Preise im Newsletter-Playbook)

- Inhalte und Namen der Menüs immer aus dem Shop übernehmen (Damian, 29.10.2026).
- Napoli Party Menü (4-6 Personen), 79,90 € im Shop, IM SHOP AKTIV seit 29.10.2026: 1 Pizza Familia (45 cm) nach Wahl, 6 Arancini nach Wahl, 2x Mozzarella Sticks (je 6 Stück), 2x Crispy Chicken Strips (je 5 Stück), 2 Softdrinks (1 L) nach Wahl. KEINE Vorbestellfrist. Der Name "Party Mostruosa" wird nicht verwendet. Instagram-Post Do 29.10. 16:30.
- Siprego Mittagsmenü, 16,90 € im Shop, IM SHOP AKTIV seit 29.10.2026: Pizza Piccola nach Wahl (kleine Pizza, von Damian bestätigt), 1 Arancino (oder ein frischer Salat), 1 Softdrink 0,33 L. Zeitfenster Mi bis Fr 11:00 bis 15:30 (von Damian am 30.10.2026 bestätigt, NICHT 11 bis 17 Uhr). Der Instagram-Post vom Fr 30.10. 10:30 nannte fälschlich 11 bis 17 Uhr und war schon veröffentlicht, Korrektur der Caption durch Damian in der Instagram-App.
- Napoli per Due: gibt es NICHT (Damian, 03.11.2026: "rausnehmen"). Napoli Famiglia: unklar, nicht im Shop. Beide nicht bewerben, bis sie im Shop stehen. Alle Erwähnungen aus den Entwürfen der Woche 04. bis 08.11. entfernt.
- Mittwoch 04.11.: gleiches Thema wie die Hauptmail 111, Static "Mittagspause. Gelöst." 10:30, dazu 17:30 Raw-Reel Inga mit Mortabella.
- Die Menü-Bilder vom 29./30.10. sind KI-generiert und mit isAiGenerated true markiert (Ausnahme, von Damian entschieden). Für weitere Posts echte Fotos verwenden.
- Regel für Menü-Posts: keine Streichpreise, kein "statt". Immer das Zeitfenster nennen. Die Pizza ist voller Preis, der Vorteil steckt in Arancini, Getränk und Dessert.
- Code HALLOWEEN (10 % ab 25 €, bis So 01.11. 22 Uhr) ist abgelaufen, nicht mehr verwenden.

## Ton und Caption-Regeln

- Per Du, herzlich, direkt, ein Augenzwinkern. Beispiele aus echten Posts: "Zu zweit nach Italien." / "Beste Pizza in Augsburg? Sagen wir nicht (dürfen wir nicht)." / "OMG, diese Käsefäden!" / "Mittwoch ist zurück."
- Zeile 1 ist der Hook (höchstens 8 Wörter, neugierig oder konkret). Danach 2 bis 5 kurze Zeilen. Zutaten statt Adjektive.
- Instagram-Caption: 40 bis 120 Wörter, 1 bis 3 Emojis, Abschluss mit Handlungsaufforderung (bestellen über den Link in der Bio, vorbeikommen, anrufen 0821 20817218) und Standortzeile "📍 Hessenbachstr. 1, Augsburg-Pfersee".
- TikTok-Caption: 10 bis 40 Wörter, Hook zuerst, 3 bis 5 Hashtags, kein Link. Dazu ein TikTok-Titel mit höchstens 60 Zeichen.
- Hashtags Instagram: 8 bis 12 aus diesem Pool, immer #siprego und #augsburg: #siprego #augsburg #augsburgfood #augsburgcity #pizzaaugsburg #pizzanapoletana #pizzacontemporanea #pfersee #arancini #aranciniaugsburg #antipasti #italienischessen #pizzeria #handwerk #foodie
- KEINE Gedankenstriche (weder langer noch halblanger Strich). Keine Floskeln, keine Großbuchstaben-Schreie, keine Gesundheitsversprechen.
- Fakten (Preise, Zutaten, Öffnungszeiten, Aktionen, Termine) nur aus den Playbooks, von siprego.de, aus dem Shop oder aus bestehenden Instagram-Texten. Nichts erfinden. Fehlt ein Fakt, weglassen.
- Vergleiche nur mit dem Lieferando-Preisvorteil (im Siprego Shop 10 % günstiger). Keine anderen Wettbewerber nennen.
- Text im Bild (Statics): höchstens 6 Wörter Headline mit Punkt, ein Wort in Rot #A6201C, Bricolage Grotesque, Creme-Fläche. Alles Weitere in playbooks/social-design.md. Immer echtes Logo (nicht als Text gesetzt).

## Freigabe und Autopilot

- Freigabe-Phase: Planungsläufe am 19.10., 26.10., 02.11. und 09.11.2026 legen alle Posts nur als Entwurf in Metricool an. Damian gibt frei (Entwurf in Metricool öffnen, Haken "Entwurf" entfernen, speichern), oder er gibt im Chat frei und Claude entfernt den Haken.
- Freigabe im Chat (Wunsch von Damian, 29.10.2026, gilt dauerhaft): Jeder Entwurf wird Damian im Chat zur Freigabe geschickt, mit der fertigen Datei (Bild oder Reel per SendUserFile) und dem Text (Instagram-Caption, bei Videos auch TikTok-Caption und Titel, dazu Tag und Uhrzeit). Der Montags-Lauf schickt alle Entwürfe der Woche so, einzeln und klar nummeriert. Erst nach "passt" oder "freigeben" von Damian setzt Claude draft auf false. Das gilt auch, wenn später der Autopilot startet, solange Damian nichts anderes sagt.
- Autopilot ab dem Lauf am Montag 16.11.2026: Der Agent plant fest ein. Damian kann in Metricool stoppen oder ändern.
- Ohne Metricool-Verbindung: Der Agent legt Post-Pakete (Caption-Datei mit Verweis auf Bild oder Clip) in "02 Geplant (Agent)" ab und meldet das. Niemand postet dann automatisch.
- Donnerstag-Check (seit 29.10.2026): Der Newsletter-Rückfrage-Lauf am Donnerstag 08:33 prüft auch Social: offene Metricool-Entwürfe für Fr bis So, die auf Freigabe warten, Widersprüche zwischen Captions und Shop oder Playbook, fehlendes Rohmaterial für den Montags-Lauf und offene Fragen im Social-Log. Er ändert nichts, er fragt nur Damian.

## Bereits geplante oder veröffentlichte Posts (vom Agenten nicht erneut anlegen, Bilder 6 Wochen nicht wiederverwenden)

- Mi 14.10.2026 10:30, Instagram: "Mittwoch ist zurück." mit Bild Inga vor dem Laden (https://static.metricool.com/common/202610/7383922-mtr_16256056249588155952.jpg).
- Mi 14.10.2026, Instagram-Story: Tiramisu ausverkauft (https://siprego.de/wp-content/uploads/2026/10/siprego-tiramisu-ausverkauft-story-2026-10-14.jpg).
- Do 15.10.2026 11:30, Instagram + TikTok: "Zu zweit nach Italien. Für 19,90 €." mit Antipasti-Static (https://siprego.de/wp-content/uploads/2026/10/siprego-antipasti-platte-1990.jpg).
- Fr 16.10.2026, Story auf siprego.catering (nicht diese Marke): Hochzeitsbuffet.
- Woche 21. bis 25.10.2026 (Lauf vom 19.10., Entwürfe): Mi Reel "Erst backen, dann belegen?" (IG 399773727, TikTok 399773788, Musik Sotto il Sole di Napoli ab 0:28), Do Static Weihnachtsfeier-Catering (399744350), Fr Reel "48 Stunden für diesen Teig" (IG 399773856, TikTok 399773927, Musik Italian Oldie ab 0:35), Sa 18:30 Foto Fensterplatz (399704353), So Reel "Welche nimmst du zuerst?" (IG 399783090, TikTok 399783143, Musik Italo Pop 90s ab 0:24, am 19.10. neu gebaut mit zentrierten Nummern-Badges). Die drei Reels wurden am 19.10. von Claude nachvertont.
- So 18.10.2026 10:30, Instagram Reel (Metricool-ID 398982897) und TikTok (398982930) getrennt: Hook "Wie lang wird der Käsefaden?", dann "4 Füllungen. Welche nimmst du?" Arancini Ragu, 4 Käse, Spinaci, Genovese mit Sortennamen im Bild, Musik von Damians CapCut-Version (https://siprego.de/wp-content/uploads/2026/10/siprego-arancini-4-sorten-2026-10-18-reel-v2.mp4). Ersetzt den vorher für 11:30 geplanten Käsefaden-Reel. Verbrauchte Rohclips (6 Wochen nicht wiederverwenden): siprego-upload-11, -12, -18, -20 und die ersten 3 s von -19 (Tischszene). Frei: -10 (dritter Arancino), Rest von -19.
- Woche 28.10. bis 01.11.2026 (Lauf vom 26.10.), Menü-Posts 29./30.10. und Woche 04. bis 08.11.2026 (Lauf vom 02.11.): siehe logs/social-log.md.
- Woche 10. bis 15.11.2026 (Lauf vom 09.11.): Ungeschnitten #11 bis #14, Static Mittagsmenü mit arancini-holzbrett.jpg, Karussell Mortabella mit allen Freistellern; Details und gesperrte Medien bis 21.12. in logs/social-log.md.
- Mo 09.11.2026 16:45, Instagram (Auftrag Damian, sofort veröffentlicht): Sonderpost Flyer-Helfer "Flyer verteilen. Wir suchen dich." als Feed-Post (Metricool 421997180) und Story (421997223), Foto siprego-flyer-pfersee-hand-2026-11 (ID 6176) gesperrt bis 21.12.2026. Details in logs/social-log.md.

## Manuelle Instagram-Posts auf TikTok nachziehen (Dauerregel seit 09.11.2026, Damian)

Damian wörtlich: "der social media agent muss außerdem regelmäßig prüfen, ob wir manuell posts veröffentlicht haben um diese dann auch auf tiktok zu posten."

1. Wann: bei jedem Lauf (WOCHENPLAN, AENDERUNG) und wenn der Manager den Agenten täglich dafür aufruft.
2. Finden: Instagram-Reels der letzten 14 Tage aus Metricool Analytics lesen (Netzwerk instagram, Connector reels: IGRE02 Datum mit Uhrzeit in UTC, IGRE03 Text, IGRE06 Link; zusätzlich Connector posts IGPO02, IGPO03, IGPO06, IGPO07 für den Typ). Mit den vom Agenten angelegten Posts vergleichen (Social-Log, Metricool-Planer per getScheduledPosts, dort stehen auch veröffentlichte Posts mit publicUrl). Ein Reel, das nicht vom Agenten stammt, ist ein manueller Post von Damian. Nur Videos (Reels); Fotos und Karussells werden nicht nachgezogen.
3. Prüfen, ob es schon auf TikTok @siprego ist: TikTok-Videos aus Metricool Analytics (Netzwerk tiktok, Connector posts: TKPO02, TKPO03, TKPO05) und TikTok-Posts im Planer, Abgleich über gleiche Caption-Nummer (z. B. "Ungeschnitten #10") oder gleichen Tag und gleiches Motiv. Damian kann auch selbst auf TikTok gepostet haben. Im Zweifel nicht posten und melden.
4. Datei beschaffen: zuerst WordPress-Mediathek (siprego-upload-*, Motiv per Kontaktbogen prüfen); nur wenn die Datei eindeutig dasselbe Video ist. Sonst die Medien-URL aus Metricool Analytics per curl. Nie eine Fassung mit Instagram-Wasserzeichen. Stand 09.11.2026: Metricool Analytics liefert für Reels nur das Vorschaubild (IGRE05), keine Video-URL, und die Instagram-Server (cdninstagram.com, instagram.com) sowie tiktok.com sind aus der Cloud-Umgebung gesperrt. Praktisch bleibt also nur die Mediathek.
5. Aufbereiten: Posting-Version wie für Raw-Reels (1080x1920, H.264, 30 fps, Originalton, kein Hook, keine Musik, wenn Damians Fassung keine hat). Upload als siprego-tiktok-THEMA-DATUM.mp4.
6. TikTok-Caption kurz aus der Instagram-Caption ableiten (10 bis 40 Wörter, gleiche Nummer, keine neuen Fakten, 3 bis 5 Hashtags, kein Link) plus TikTok-Titel mit höchstens 60 Zeichen.
7. Einplanen: als reiner TikTok-Post (providers tiktok, tiktokData mit title), fest eingeplant mit draft false (Damians Regel ist die Freigabe), autoPublish true. Nächster freier Slot zwischen 10:00 und 20:00, höchstens ein nachgezogenes Video pro Tag, mindestens 3 Stunden Abstand zu jedem geplanten Agent-Post auf TikTok oder Instagram, nicht Montag oder Dienstag vormittags.
8. Lässt sich die Datei nicht beschaffen: im Social-Log als "Datei fehlt" führen und dem Manager melden, damit er Damian um den Upload in die Mediathek bittet (Kurzbefehl "An Siprego senden", sonst per AirDrop an den Mac und von dort in WordPress unter Medien).
9. Protokoll: Jedes geprüfte manuelle Reel im Social-Log unter "TikTok-Nachzug" mit Instagram-Link, Datum, Status (nachgezogen mit TikTok-ID und Termin, schon auf TikTok, Datei fehlt), damit nichts doppelt gepostet wird. Vor jedem Einplanen diese Liste lesen.

## Sperrtermine und Sonderfälle

- Betriebsurlaub, Feiertage, Veranstaltungen: hier eintragen. Aktuell keine.
- So 01.11.2026 (Allerheiligen): normal geöffnet 11 bis 22 Uhr (siehe Newsletter-Playbook).
- Feiertage 24.12. bis 01.01.: noch offen, bis 01.12.2026 keine Aussage dazu.

## Notizen von Damian an den Agenten

- 28.10.2026: Mittwoch-Regel gilt (Abschnitt oben). Halloween-Partymenü und Menüs erst posten, wenn Damian die Shop-Anlage bestätigt hat.
- 29.10.2026: Alle Entwürfe immer im Chat zur Freigabe schicken (Datei plus Text), siehe "Freigabe und Autopilot".
- 29.10.2026: Mittagsmenü mit kleiner Pizza (Piccola). Menü-Inhalte aus dem Shop. Napoli Party Menü: 2 Portionen Mozzarella Sticks à 6 Stück, 2 Portionen Chicken Strips à 5 Stück, keine Vorbestellfrist.
- 29.10.2026: Der Donnerstag-Check prüft auch die Social-Media-Sachen.
- 30.10.2026: Mittagsmenü gilt Mi bis Fr 11:00 bis 15:30.
- 02.11.2026: "menüs sind online. immer newsletter agent checken". Napoli per Due und Napoli Famiglia sind online. Vor jedem Plan Newsletter-Playbook und Brevo prüfen, siehe Abschnitt "Abstimmung mit dem Newsletter-Agenten".
- 03.11.2026: "Mir gefällt der aktuelle Plan nicht." Bilder und Werbung nach dem Flyer-Design und siprego.de. Raw-Aufnahmen (Ungeschnitten), Teig-Inhalte und Karussells performen, Produkt-Posts als Static-Ads weiterverwenden. Umgesetzt in "Ausrichtung ab 03.11.2026", neuem Rhythmus und playbooks/social-design.md.
- 03.11.2026 abends: Napoli per Due gibt es noch nicht, rausnehmen. 22 neue Clips hochgeladen (siprego-upload bis -24 vom 03.11.), Woche neu geplant. Catering nur spärlich und immer mit Verweis auf Catering-Instagram, eigener Catering-Agent kommt. Neue Design-Ausrichtung ist gut. Vorschlag Dienstag-Post zur Vorbereitung auf Mittwoch: übernommen, Di 17:30 ab 10.11.
- 03.11.2026: Alle Fragen laufen in Zukunft über den Siprego Manager, nicht mehr im Social-Bericht. Der Social-Agent stellt keine Fragen mehr an Damian im Chat, sondern schreibt offene Punkte ins Social-Log unter "Offene Fragen" und meldet sie an den Siprego Manager (sobald der Übergabeweg feststeht). Der Bericht enthält nur noch Plan, Zahlen und Ausfälle.
- 07.11.2026: Samstags-Reel (Lokal-Schwenk über Wandbilder) war schwach, kein visueller Hook. Regel: Jedes Reel braucht in der ersten Sekunde einen visuellen Hook, also Bewegung am Produkt oder an den Händen (Pizza auf der Schaufel im Ofen, Käsefaden, Arancino ins Fett, Teig fliegt, Messer schneidet). Nie mit Deko, Wandbildern, Fassade oder einem leeren Schwenk anfangen. Clips so anschneiden, dass Sekunde 0 schon die Action zeigt, notfalls den Anfang wegschneiden. Lokal-Stimmung nur als zweiter Teil nach dem Hook.
- 09.11.2026: "der social media agent muss außerdem regelmäßig prüfen, ob wir manuell posts veröffentlicht haben um diese dann auch auf tiktok zu posten." Umgesetzt im Abschnitt "Manuelle Instagram-Posts auf TikTok nachziehen" (jeder Lauf, nur Videos, fest einplanen, höchstens eins pro Tag, 3 Stunden Abstand zu Agent-Posts).

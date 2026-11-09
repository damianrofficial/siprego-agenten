# Siprego Newsletter-Playbook

Stand: 06.11.2026 (Damian im Chat: Umsatz Mi 04.11. 1.100 €, Do 05.11. 2.000 €; Mail 111 am 04.11. 10:32 gesendet, Zahlen eingetragen. Wieder zusammengeführt: Eine ältere Fassung vom 03.11. hatte die Einträge "Berichtsformat", Monatsbericht, Zahlen 109/110 und Planung von 111 überschrieben; alles wiederhergestellt, die neue Notiz "Fragen über den Siprego Manager" ist übernommen. Davor 03.11.: Napoli per Due gibt es noch NICHT, Famiglia offen; 31.10.: Zweitmail 110 gesendet; 29.10.: Party Menü und Mittagsmenü bestätigt; 28.10.: Wirkung der Mittwochsmail; 27.10.: Liste 14 freigegeben, Regel "nur eine Frage pro Bericht"). Dieses Dokument ist die Faktenquelle für den Newsletter-Agenten. Was hier nicht steht, darf er nicht behaupten. Änderungen einfach hier eintragen oder Claude im Chat sagen. WICHTIG für alle Agenten: Unmittelbar vor jedem Schreiben das Dokument frisch lesen und nur ergänzen, nie eine ältere Kopie zurückschreiben. Am 03.11. und erneut bis 06.11. haben sich Läufe gegenseitig überschrieben.

## Berichtsformat (Regeln von Damian, 03.11.2026)

- Fragen und Bericht ZEITLICH GETRENNT schicken: zuerst die eine offene Frage als eigene, kurze Nachricht (im Chat per AskUserQuestion mit Antwortknöpfen, wenn verfügbar, sonst eine eigene kurze Nachricht nur mit der Frage), erst danach der Bericht als zweite Nachricht. Nie Frage und Bericht in einem Textblock, Damian überliest die Frage sonst.
- Fragen immer einzeln stellen, eine pro Nachricht (ergänzt die Regel vom 27.10.: nur die dringendste Frage pro Lauf).
- Die Mail als VORSCHAU schicken, nicht als Text: gerendertes Bild der Mail (Screenshot des HTML mit Playwright, 600 px breit, deviceScaleFactor 2, Platzhalter durch "Damian" ersetzt) per SendUserFile, display render. Im Bericht selbst nur Betreff, Vorschautext, Bild-URL, Empfängerzahl und die Zahlen. Der komplette Mailtext steht in Brevo.
- Bericht kurz halten: Zahlen zuerst, keine langen Textblöcke.
- Push-Benachrichtigung: erste Zeile ist die Frage (falls es eine gibt), sonst die wichtigste Zahl.
- Seit 03.11. (Notiz unten): Fragen sollen künftig über den Siprego Manager laufen. Solange der Übergabeweg offen ist, gelten die Regeln oben.

## Öffnungszeiten (ab Mi 14.10.2026)

- Montag, Dienstag: geschlossen
- Mittwoch: 11:00 bis 22:00 (neu ab 14.10.2026; Grund laut Damian am 13.10.: Wiedereröffnung am Mittwoch wegen hoher Nachfrage)
- Donnerstag: 11:00 bis 22:00
- Freitag: 11:00 bis 23:00
- Samstag: 17:00 bis 23:00 (regulär, von Damian am 31.10.2026 bestätigt)
- Sonntag: 11:00 bis 22:00

Sonderzeiten und Sperrtermine (Urlaub, Feiertage):
- Sa 31.10.2026 (Halloween): Sonderöffnung 14:00 bis 23:00, nur an diesem Samstag (Damian, 31.10.2026). Gilt nicht für andere Samstage.
- So 01.11.2026 (Allerheiligen): normale Sonntagszeiten 11:00 bis 22:00 (über den Code HALLOWEEN bis So 22:00 bestätigt).
- Feiertage 24.12. bis 01.01.: noch offen, Damian legt sie bis 01.12.2026 fest. Bis dahin keine Aussage dazu in Mails.

## Stammdaten

- Siprego GbR, Hessenbachstr. 1, 86157 Augsburg (Pfersee)
- Telefon: 0821 20817218
- Shop-Link für alle Buttons: https://siprego.orderu.shop/store/pfersee/menu (zeigt zuerst "Neu & Beliebt"). Niemals auf /category/... verlinken, diese Seiten zeigen neuen Besuchern "Sitzung abgelaufen". Der alte Link https://siprego.de/?change=store wird nicht mehr verwendet.
- Shop-Daten auslesen: curl -c cj.txt -b cj.txt -L https://siprego.orderu.shop/store/pfersee/menu liefert die komplette Speisekarte als JSON im HTML (Produktname, "description", Varianten mit "price"; Kategorien mit ihren Produkt-IDs unter "categories"). Am 31.10., 02.11. (10:20) und 03.11. (08:50) geprüft: Napoli per Due und Napoli Famiglia fehlen, die Kategorie "Menüs (NEU!)" enthält nur Napoli Party Menü und Siprego Mittagsmenü. Damian am 03.11.: Napoli per Due gibt es noch nicht. Menüs erst bewerben, wenn sie im Shop sichtbar sind.
- orderu-Verwaltung (Rabattcodes anlegen): https://login.orderu.shop/brand/t_hWqKVQb41oWm/s_gy7MjarQNGSA/ . Nur Damian kann sich dort anmelden. Codes legt Damian an, der Agent fragt rechtzeitig danach.
- Instagram: https://www.instagram.com/siprego.pizza/
- Bildquelle siprego.de (Stand 27.10.2026): Die Website hat KEINEN eingebetteten Instagram-Feed mehr. Feste Fotos unter https://siprego.de/wp-content/uploads/siprego/home/ , z. B. pizza-diavolo.jpg, pizza-steinofen.jpg, pizza-bufala-verde.jpg, pizza-mortabella.jpg, pizza-mortabella-burrata-pistazie-hero.jpg, arancini-holzbrett.jpg, arancini-ragu.jpg, antipasti-platte-fuer-2.jpg, siprego-pfersee-innen.jpg, instagram-1-kaesefaden.jpg bis instagram-6.jpg (Hochformat 394x700, instagram-1 hat eingeblendeten Text, nicht für Mails). Diese Fotos darf der Agent verwenden. Am 03.11. gesichtet und gut geeignet: arancini-holzbrett.jpg (vier Arancini auf schwarzer Platte, eines aufgeschnitten), noch unbenutzt.
- Produktbilder aus dem Shop (static.orderu.shop/brands/.../products/...) dürfen ebenfalls verwendet werden.
- Bilder aus Metricool-Posts (static.metricool.com/...) dürfen verwendet werden (Brand siprego.pizza, ID 7383922). Ausnahme: Die Menü-Bilder für Napoli Party Menü und Mittagsmenü (Instagram 29./30.10.) sind KI-generiert und als "Mit KI erstellt" markiert. In Mails nicht verwenden, solange Damian das nicht ausdrücklich erlaubt. Das gilt auch für die Shop-Produktbilder dieser Menüs.
- Bild-Regel (Damian, 17.10.2026): Eine Zweitmail nimmt NICHT dasselbe Bild wie die Hauptmail derselben Woche.
- Bereits verwendete Bilder:
  - Inga mit zwei Pizzen vor dem Laden, https://static.metricool.com/common/202610/7383922-mtr_16256056249588155952.jpg (Mail 104, 14.10.)
  - Antipasti-Platte für 2, https://static.metricool.com/planner/202610/7383922-file-5800866565411429945.jpeg (Zweitmail 106, 17.10.)
  - Arancini-Reel 4 Füllungen (Video), https://siprego.de/wp-content/uploads/2026/10/siprego-arancini-4-sorten-2026-10-18-reel-v2.mp4
  - Pizza Mortabella auf Teller, https://siprego.de/wp-content/uploads/2024/01/pizza-mortabella-2024.jpg (Hauptmail 108, 21.10.)
  - Pizza Diavolo auf Holzbrett, https://siprego.de/wp-content/uploads/siprego/home/pizza-diavolo.jpg (Hauptmail 109, 28.10.)
  - Pizza vor dem Feuer im Steinofen, https://siprego.de/wp-content/uploads/siprego/home/pizza-steinofen.jpg (Zweitmail 110, 31.10.)
  - Pizza Bufala Verde im Karton, https://siprego.de/wp-content/uploads/siprego/home/pizza-bufala-verde.jpg (Hauptmail 111, 04.11.)
- Absender: SIPREGO, info@siprego.de (Brevo Sender-ID 2)
- Empfängerlisten Brevo (nur Rückfall, wenn die Segmente fehlen): 6, 8, 13, 14.
- Unterschrift: Damian & Inga

## Wirkung der Mittwochsmail (Zahlen von Damian)

- Mittwoch-Umsätze seit Wiedereröffnung: 14.10. 1.130 € (Hauptmail 104), 21.10. 840 € (Hauptmail 108 ohne Angebot und ohne Mittwoch-Hinweis, Damian zählt den Tag als "ohne Mail"), 28.10. 1.430 € (Halloween-Mail 109 mit Code), 04.11. 1.100 € (Hauptmail 111 Mittagsmenü, ohne Code, an Aktiv + Schläfer). Zum Vergleich Do 05.11.: 2.000 € (Damian, 06.11.). Tagesumsätze stehen auch in logs/umsatz.md.
- Lesart: Ein Mittwoch mit wirksamer Mail bringt rund 300 bis 600 € mehr als ohne. Mit Code (28.10.) war der Mittwoch am stärksten. Die Mittwochs-Hauptmail ist fester Bestandteil jeder Woche und darf nicht ausfallen. Versand 10:30.
- Jede Mittwochsmail enthält oben eine Zeile, dass heute geöffnet ist (Mittwoch 11 bis 22 Uhr). Eine Zeile, kein Absatz.
- Eine Mittwochsmail braucht immer einen konkreten Anlass zum Bestellen (Angebot, neues Produkt, Menü, Code). Reine Story-Mails ohne Anlass (wie 108) haben nicht gewirkt.
- Damian trägt den Mittwoch-Umsatz hier ein oder sagt ihn im Chat. Der Agent nennt ihn im Samstag-Bericht neben den Klickzahlen.

## Segmente in Brevo (angelegt am 09.10.2026)

- "Aktiv", Segment-ID 1: letzte Bestellung nach dem 09.10.2025, oder E-Mail in den letzten 90 Tagen geöffnet oder geklickt (Apple MPP ausgeschlossen), oder in Liste 14. Mit Liste 14 am 27.10.2026: 1.033 Empfänger, am 31.10.2026: 1.026 Empfänger. Am 03.11.2026: 1.144 Kontakte laut contacts_get_contacts (inklusive Abgemeldeter).
- "Schläfer", Segment-ID 2: letzte Bestellung vor dem 09.10.2025 oder ohne Bestelldatum, dazu keine Öffnung in 90 Tagen und nicht in Liste 14. Am 03.11.2026: 2.526 Kontakte (inklusive Abgemeldeter, rund 1.488 davon abgemeldet).
- Aktiv + Schläfer zusammen am 04.11.2026: 2.080 versendet (Mail 111).
- Regel: Hauptmail an "Aktiv". Am ersten Mittwoch im Monat an "Aktiv" und "Schläfer". Zweitmail am Sonntag nur an "Aktiv".
- Vergleichsgröße: Klicks pro 100 Empfänger. Achtung: Mails an Aktiv + Schläfer haben naturgemäß weniger Klicks pro 100, weil die Schläfer kaum klicken. Nur Mails mit gleicher Empfängergruppe direkt vergleichen.
- Liste 14 "WinOrder Neu 2026-10": 270 Kontakte aus dem WinOrder-Import im Oktober. Willkommensmail 99: 12,7 % Abmeldungen. Damian hat am 27.10.2026 entschieden "Liste 14 wieder rein". Beobachtung abgeschlossen: Mail 109 0,49 %, Mail 110 1,08 % Abmeldungen, beide unter 1,5 %. Liste 14 bleibt drin. Stand 03.11.: 222 Abonnenten, 48 abgemeldet.
- Technik-Hinweis: Bei Kampagnen an Segmente liefert Brevo keine campaignStats (leeres Array). Dann gelten globalStats.
- Neue Kontakte: Seit dem Import am 09.10.2026 ist KEIN neuer Kontakt in Brevo angekommen (Stand 03.11.). Neue Shop-Kunden fließen nicht automatisch nach Brevo. Im Monatsbericht 03.11. an Damian gemeldet (regelmäßiger WinOrder-Export oder Schnittstelle nötig).

## Kontaktfelder in Brevo (seit 09.10.2026)

- LETZTE_BESTELLUNG, ERSTE_BESTELLUNG (Datum), UMSATZ_EUR (Zahl), EXT_ID (WinOrder-Kundennummer). Bei 1.959 Kontakten gefüllt.
- Beim Update-Import am 09.10.2026 wurden 1.689 Bestandskontakte neu angelegt, ihre Öffnungs- und Klick-Historie vor diesem Datum ist weg. Engagement zählt für sie erst ab der Mail vom 14.10.

## Dauerhafte Aussagen (dürfen jederzeit verwendet werden)

- Im Siprego Shop bestellt man 10 % günstiger als bei Lieferando.
- Vor Ort essen, abholen oder liefern lassen.
- Pizza Crispy Napoli: Mehl aus Neapel, 48 Stunden Teigruhe, auf Stein gebacken, täglich von Hand gemacht. Kategorie-Text im Shop (20.10.2026): "Neapolitanische Pizza mit einem super luftigen Teig. 48-72 Stunden bis zur Perfektion gegärt."
- Original Arancini gibt es in Augsburg nur bei Siprego.
- Weihnachtsfeier mit Pizzaofen für Firmen, Anfrage über siprego.de (PS in Hauptmail 111).

## Aktuelle Produkte und Specials

| Produkt | Fakten | Preis im Shop | Status |
| --- | --- | --- | --- |
| Arancini Ragu | Frittierte Reistürmchen aus Safranreis mit Hackfleischsoße (Rind), Erbsen, Mozzarella. Original Rezept aus Sizilien (Shop, 18.10.2026) | 1 Stk. 6,90 €, 3 Stk. 16,90 €, 6 Stk. 29,90 € (Shop, 18.10.2026) | Dauerkarte |
| Arancini 4 Käse | 4-Käse-Füllung. Original Rezept aus Sizilien (Shop, 18.10.2026) | wie Ragu | Dauerkarte |
| Arancini Spinaci | Blattspinat mit cremiger Ricottafüllung (Shop, 18.10.2026) | wie Ragu | neu seit Anfang Oktober 2026 |
| Arancini Genovese | Basilikumpesto und Mozzarella Fior di Latte, im Shop als [NEU] markiert (18.10.2026) | wie Ragu | Dauerkarte |
| Hinweis Arancini | Am 18.10.2026 im Shop genau diese 4 Sorten. "Veggie" gibt es aktuell nicht, nicht nennen. Kategorie-Text: "Arancini aus Safranreis und andere einzigartige Streetfood-Gerichte aus Italien. Nur bei uns in Augsburg." | | |
| Antipasti-Platte für 2 | Prosciutto-Melone-Schiffchen, Wurst- und Salamisorten, gegrilltes Gemüse, zwei Sorten Oliven, Käseauswahl mit Feigendip, Caprese-Spieße, Pizzabrötchen inklusive | 24,90 € (Damian, 09.11.2026, Shop bestätigt; davor 19,90 € seit 13.10., ursprünglich 29,90 €) | seit 03.10.2026, Tipp in Zweitmail 106 Bild von Damian 09.11.2026 (Static mit 24,90 €, Antipasti für 2 Personen) im Scratchpad eingang/, Social-Agent lädt es in die Mediathek. |
| Antipasti-Platte für 4 | noch nicht eingeführt | offen | nicht bewerben |
| Pizza Bufala Verde | Spinat-Base statt Tomatensauce, Büffelmozzarella, Cherrytomaten, Ricotta, frisches Basilikum, Zitronenzeste (Shop, 09.10. und 03.11.2026, als neu und vegetarisch markiert) | Piccola 14,90 €, Grande 16,90 €, Familia 27,90 € (Shop, 09.10.2026) | seit September 2026, Bild in Hauptmail 111 |
| Pizza Mortabella | Tomatensoße, Mozzarella, italienische Mortadella, Burrata, Basilikumpesto, Pistazien (Shop, 20.10.2026) | Piccola 16,90 €, Grande 18,90 € (Familia-Preis nicht nennen) | im Shop als LIMITIERT markiert. PS-Tipp in Hauptmail 108 |
| Pizza Diavolo | "scharfe Salsiccia, Cherrytomaten", als scharf markiert (Shop, 27.10.2026) | Piccola 14,90 € (Grande und Familia nicht nennen) | Dauerkarte. Held der Halloween-Hauptmail 109 |
| Pizza Barbabietola | Rote-Bete-Creme, Dill; genaue Zutaten von Damian bestätigen lassen | offen | Start nicht bestätigt, nicht bewerben |
| Tiramisu | leichte Mascarponecreme, Kaffee, Kakao | nicht bestätigt, nicht nennen | Dauerkarte |
| Napoli Party Menü (4-6 Personen) | Shop-Name genau so. 1 Pizza Familia (45 cm) nach Wahl, 6 Arancini nach Wahl, 2x Mozzarella Sticks (zusammen 12 Stück), 2x Crispy Chicken Strips (zusammen 10 Stück), 2 Softdrinks (1 L) nach Wahl. KEINE Vorbestellfrist (Damian, 29.10.). | 79,90 € im Shop (29.10. und 03.11.2026), 87,90 € bei Lieferando (Damian, 28.10.) | IM SHOP AKTIV seit 29.10.2026, darf beworben werden. Zusatz in Zweitmail 110 (31.10.). |
| Siprego Mittagsmenü | Shop-Name "Siprego Mittagsmenü (Mi-Fr / 11:00-15:30)". Shop-Beschreibung (03.11.2026): "Pizza Piccola nach Wahl, 1x Arancino (oder ein frischer Salat), 1x Softdrink 0,33L". Zeitfenster Mi bis Fr 11:00 bis 15:30 (Damian, 30.10.2026). | 16,90 € im Shop (29.10. und 03.11.2026), 18,90 € bei Lieferando (Damian, 28.10.) | IM SHOP AKTIV seit 29.10.2026. HELD der Hauptmail 111 (04.11.). |
| Napoli per Due | 2 Pizza Grande nach Wahl + wahlweise 2 Arancini oder großer gemischter Salat + 2x 0,33 L Softdrink | 41,90 € geplant, 45,90 € bei Lieferando (Damian, 28.10.) | NICHT IM SHOP. Damian am 03.11.2026: "Napoli per Due Menü gibts noch nicht, rausnehmen." Nicht bewerben, bis Damian es ausdrücklich freigibt UND es im Shop sichtbar ist. |
| Napoli Famiglia | 1 Pizza Familia nach Wahl + 6 Arancini + Tiramisu + 1 L Softdrink | 59,90 € geplant, 65,90 € bei Lieferando (Damian, 28.10.) | UNKLAR. Beim Shop-Auslesen am 02.11. und 03.11. nicht sichtbar. Nicht bewerben, bis es im Shop steht. |
| Regel für alle Menüs | Keine Streichpreise und kein "statt"-Preis in Mails. Menüs immer mit Zeitfenster nennen. Inhalt und Name immer aus dem Shop. | | |

## Gültige Rabattcodes

Ohne Eintrag hier gibt es in keiner Mail einen Code, Rabatt oder eine Zugabe. Damian legt den Code im orderu-Shop selbst an, bevor die Mail rausgeht. Ein Code mit dem Vermerk "VORSCHLAG, NICHT BESTÄTIGT" darf NICHT verwendet werden.

| Code | Wert | Mindestbestellwert | Gültig von bis | Für welche Mail |
| --- | --- | --- | --- | --- |
| WOCHENENDE10 | 10 % | 25 € | Sa 17.10.2026 17:00 bis So 18.10.2026 22:00 | Zweitmail 106. ABGELAUFEN. |
| HALLOWEEN | 10 % | 25 € | Mi 28.10.2026 11:00 bis So 01.11.2026 22:00 | Hauptmail 109 und Zweitmail 110. ABGELAUFEN. |
| TOP10 | 10 % auf alles (Damian, 09.11.2026) | keiner genannt, Bestätigung offen | Vorschlag Mi 11.11.2026 11:00 bis So 15.11.2026 22:00, Bestätigung offen | Für Hauptmail Mi 11.11. "Eure Top 10" und Zweitmail So 15.11. NOCH NICHT VERWENDEN, bis Damian bestätigt, dass der Code im orderu-Shop angelegt ist (Frage läuft, Frist Di 10.11. 18:00). |
| Black Friday (Mi 25.11. bis So 29.11.) | noch kein Code | | | Damian legt Code, Wert, Mindestbestellwert und Gültigkeit bis spätestens Mo 23.11.2026 hier ein, sonst Black-Friday-Mail ohne Rabatt. |

## Versandmodus

- Freigabe-Phase: Hauptmails bis 04.11.2026 und Zweitmails bis 08.11.2026 nur als Entwurf. Gibt Damian im Chat frei ("bitte planen"), setzt der Agent scheduledAt direkt am Entwurf. Zuletzt so gemacht am 03.11.2026 23:52 für Kampagne 111.
- Autopilot ab dem Lauf am Dienstag 10.11.2026: Der Agent plant fest ein (Mittwoch 10:30, Zweitmail Sonntag 10:30). Damian kann in Brevo stoppen.
- Zweitmail-Varianten: Standard Sonntag 10:30, auf Wunsch auch Samstag mit Code, der Samstag und Sonntag gilt (Damian, 17.10.).
- Technik: Die Brevo-Anbindung kann Kampagnen anlegen, lesen UND ändern (update_email_campaign, zuletzt am 03.11.2026 für scheduledAt und Name von 111; nur Entwürfe und geplante Kampagnen). Bei recipients kein leeres exclusionListIds mitschicken. Am 03.11. lieferte Brevo vereinzelt "Service Unavailable", ein zweiter Versuch ging durch.
- Geplante Läufe (Stand 29.10.2026): Dienstag 08:48 Hauptmail anlegen, Donnerstag 08:33 Rückfrage-Check, Samstag 08:48 Auswertung und Zweitmail. Montag 08:51 Social-Wochenplan.

## Bereits angelegte Kampagnen

- 95: Sondermail "Sa ab 14:00 & Antipasti Platte für 2", gesendet Sa 03.10., Listen 6, 8, 13. 1.907 zugestellt, 14 Klicks (0,73 pro 100), 20 Abmeldungen (1,05 %).
- 99: Willkommensmail für Liste 14, gesendet Mi 14.10. 267 zugestellt, 5 Klicks, 34 Abmeldungen (12,7 %).
- 100: Sondermail "Arancini Spinaci", gesendet Fr 09.10., Listen 6, 8, 13. 1.888 zugestellt, 5 Klicks (0,26 pro 100), 21 Abmeldungen (1,11 %), 1 Beschwerde.
- 104: Hauptmail KW42 "Mittwoch offen + Bufala Verde", gesendet Mi 14.10. 10:33, Listen 6, 8, 13. 1.876 zugestellt, 14 Klicks (0,75 pro 100), 25 Abmeldungen (1,33 %). Mittwoch-Umsatz 1.130 €.
- 106: Zweitmail KW42 "WOCHENENDE10", Segment Aktiv ohne Liste 14, gesendet Sa 17.10. 14:33. 795 zugestellt, 17 Klicks (2,1 pro 100), 1 Abmeldung (0,13 %). Beste Mail im Oktober.
- 108: Hauptmail KW43 "B Story | 48 Stunden Teig", Segment Aktiv ohne Liste 14, gesendet Mi 21.10. 10:35. 798 zugestellt, 5 Klicks (0,63 pro 100), 6 Abmeldungen (0,75 %). Mittwoch-Umsatz 840 €, Mail ohne Anlass.
- 109: Hauptmail KW44 "C Angebot | Halloween Code HALLOWEEN", Bild Diavolo, Segment Aktiv mit Liste 14, gesendet Mi 28.10. 10:15. Stand 03.11.: 1.026 zugestellt, 17 Klicks (1,66 pro 100), 5 Abmeldungen (0,49 %), 0 Beschwerden. Mittwoch-Umsatz 1.430 €.
- 110: Zweitmail KW44 "Halloween-Tag Code HALLOWEEN" plus Napoli Party Menü, Bild Steinofen, Segment Aktiv mit Liste 14, gesendet Sa 31.10. 15:06 durch Damian. Stand 03.11.: 1.020 zugestellt, 11 Klicks (1,08 pro 100), 11 Abmeldungen (1,08 %), 0 Beschwerden. Zweitmail brachte knapp zwei Drittel der Klicks der Hauptmail, aber doppelt so viele Abmeldungen.
- 111: Hauptmail KW45 "A Neu | Mittagsmenü 16,90 €", Bild Bufala Verde im Karton, Segmente Aktiv + Schläfer (erster Mittwoch im Monat). Betreff "Neu: unser Mittagsmenü für 16,90 € 🍕", Vorschautext "Pizza Piccola nach Wahl, ein Arancino, ein Softdrink. Mi bis Fr von 11 bis 15:30 Uhr.". Zeile "Heute ist Mittwoch, 11 bis 22 Uhr geöffnet", kein Code, PS Weihnachtsfeier mit Pizzaofen. Napoli per Due und Famiglia nicht drin (Damian: "Raus"). Auf Damians "bitte planen" am 03.11. 23:52 geplant, GESENDET Mi 04.11. 10:32. Stand 06.11.: 2.080 gesendet, 2.060 zugestellt, 8 Klicks (0,39 pro 100), 19 Abmeldungen (0,92 %), 0 Beschwerden. Mittwoch-Umsatz 04.11.: 1.100 €, Donnerstag 05.11.: 2.000 € (Damian, 06.11.). Lesart: wenig Klicks, weil die Hälfte der Empfänger Schläfer waren und kein Code; Mittwoch-Umsatz im Bereich einer Mail ohne Code. Der starke Donnerstag passt zum Mittagsmenü (Mi bis Fr), ist aber ohne Bestellzahlen des Menüs nicht sicher zuzuordnen.
- Nächstes Thema laut Plan: Mi 11.11. (Lauf Di 10.11., ERSTER AUTOPILOT-LAUF, scheduledAt 2026-11-11T10:30:00+01:00). "Nummer 1 im Oktober" mit Stückzahl, falls Damian die Zahl bis Mo 09.11. liefert; sonst Pizza Barbabietola, falls bestätigt; sonst A Neu mit Antipasti-Platte für 2 (19,90 €). Empfänger nur Aktiv. Bildvorschlag: arancini-holzbrett.jpg. Danach 18.11. B Story "Inga und die Catering-Saison 2026" (Zahlen bis Mo 16.11.), 25.11. C Black Friday (Code bis Mo 23.11.).

## Monatsbericht Oktober 2026 (Stand 03.11.2026, Zahlen aus Brevo)

- Versendbare Kontakte Aktiv + Schläfer: 2.081 (Anfang Oktober rund 2.180). Gesamt in Brevo: 3.670 Kontakte.
- Listen: 6 "Siprego Alle Augsburg" 1.736 Abonnenten / 1.487 abgemeldet; 8 "SIPREGO VIP Club" 164 / 61; 13 "Siprego 2026-05-07" 254 / 129; 14 "WinOrder Neu 2026-10" 222 / 48.
- Neue Kontakte seit 10.10.2026: 0.
- Abmeldungen Oktober gesamt: 123 über 8 Mails, davon NL-Agent-Mails 48.
- Beste Mail nach Klicks pro 100: 106 (2,14), dann 109 (1,66), 110 (1,08), 104 (0,75), 95 (0,73), 108 (0,63). Schwächste: 100 (0,26). Mails mit konkretem Anlass liegen klar vorn.
- Test-Vorschlag November (noch nicht entschieden): Am 18.11. Brevo A/B-Test auf den Betreff, Vorname gegen Preis oder Zahl, Kriterium Klicks.

## Notizen von Damian an den Agenten

- 17.10.2026: Zweitmail mit Gutscheincode darf auch am Samstag rausgehen, wenn der Code bis Sonntag gilt.
- 17.10.2026: Kein Bild doppelt in einer Woche.
- 25.10.2026: Wenn etwas fehlt oder unklar ist, Damian fragen statt still die vorsichtige Variante zu wählen (seit 03.11.: als eigene Nachricht vor dem Bericht, siehe Berichtsformat).
- 27.10.2026: Liste 14 wieder rein.
- 27.10.2026: NUR EINE FRAGE pro Bericht, die mit der nächsten Frist. Gilt für alle Läufe.
- 28.10.2026: Die Mittwochsmail ist Pflicht und braucht immer einen Bestellanlass plus eine Zeile "heute geöffnet". Keine Streichpreise in Mails.
- 29.10.2026: Mittagsmenü mit Pizza Piccola. Menü-Inhalte immer aus dem Shop.
- 30.10.2026: Mittagsmenü gilt Mi bis Fr 11:00 bis 15:30.
- 29.10.2026: Der Donnerstag-Check prüft auch die Social-Media-Sachen.
- 31.10.2026: Samstag 31.10. war Sonderöffnung 14 bis 23 Uhr, regulär bleibt Samstag 17 bis 23 Uhr.
- 02.11.2026: Newsletter und Social stimmen sich über dieses Playbook ab.
- 03.11.2026: "Napoli per Due Menü gibts noch nicht. Rausnehmen." Famiglia offen. Zu Mail 111: "Raus" für beide.
- 03.11.2026: "Fragen und Berichte bitte zeitlich getrennt mitteilen. Fragen bitte einzeln stellen." Und: "Schick mir die Mail als Vorschau rein statt Text." Siehe Berichtsformat.
- 03.11.2026: Alle Fragen (auch die Warteschlange unten) laufen in Zukunft über den Siprego Manager, nicht mehr direkt in den Berichten. Übergabeweg noch offen.
- 03.11.2026 23:52: "bitte planen" für Mail 111.
- 06.11.2026: Umsatz Mi 04.11. 1.100 €, Do 05.11. 2.000 €.
- 09.11.2026 21:15 (über Manager): "TOP10 - das wäre der code. 10% rabatt auf alles passt. die top 10 verkauften produkte werde ich morgen nachliefern." Thema der Mail Mi 11.11. ist damit "Eure Top 10" (die 10 meistverkauften Produkte) mit Code TOP10. Die Verkaufszahlen kommen am Di 10.11. von Damian. Ablauf für den Lauf Di 10.11.: Mail als ENTWURF anlegen (kein scheduledAt, Ausnahme vom Autopilot), weil Top-10-Liste und Code-Bestätigung noch fehlen; Platz für die Liste vorsehen. Der Manager ruft den Agenten erneut auf, sobald Liste und Code-Bestätigung da sind, dann einplanen für Mi 10:30. Kommt die Liste bis Di 18:00 nicht: Rückfall auf "meistgeklickt" (Diavolo, Margherita, Bufala laut Aufrufen, siehe nächste Zeile) ohne Stückzahl. Kommt die Code-Bestätigung nicht: Mail ohne Code.
- 09.11.2026 abends (über Manager): Damian schickt Screenshot "Top-Produkte" aus dem Shop als Grundlage für "Nummer 1". ACHTUNG: Die Spalte heißt AUFRUFE (Produktaufrufe im Shop), nicht Bestellungen, Zeitraum im Screenshot nicht sichtbar. Reihenfolge: diavolo 65 (10,9 %), margherita 55 (9,2 %), bufala 40 (6,7 %), pizza-mortabella 35 (5,9 %), pizza-bufala-verde 32 (5,4 %), pizza-cheese-supreme 29 (4,9 %), tonno 26 (4,4 %), paradiso 25 (4,2 %), salami 24 (4 %), sofia 24 (4 %); 30 Produkte gesamt. Für die Mail am 11.11.: Thema "Eure Nummer 1: Pizza Diavolo", Formulierung nur "die Pizza, die ihr im Shop am häufigsten anklickt" oder "meistgeklickt", KEINE Stückzahl und nicht "meistbestellt", solange Damian keine Bestellzahlen liefert. Top 3 (Diavolo, Margherita, Bufala) dürfen als Rangfolge genannt werden. Zutaten und Preise der Diavolo aus dem Shop. Code: Frage an Damian läuft (Vorschlag NUMMER1, 10 % ab 25 €, Mi 11.11. 11:00 bis So 15.11. 22:00); ohne bestätigten Code geht die Mail ohne Code raus.
- 09.11.2026 (über Manager): Mail Mi 11.11. Thema A "Nummer 1 im Oktober", Stückzahl und Pizza liefert Damian nach. Antipasti-Platte für 2 kostet 24,90 € (Shop stimmt). Code für die Mail: Damian fragt, Manager empfiehlt; Entscheidung offen.

## Warteschlange offener Fragen (eine pro Bericht, nach Frist sortiert, ab 03.11. über den Siprego Manager)

1. Für die Mail am 11.11. (Frist Mo 09.11.): Meistbestellte Pizza im Oktober mit Stückzahl ODER Pizza Barbabietola gestartet (Zutaten, Preis)? Kommt beides nicht, nimmt der Agent die Antipasti-Platte für 2.
2. Für die Mail am 18.11. (Frist Mo 16.11.): Zahlen zur Catering-Saison 2026 für die Inga-Story.
3. Black-Friday-Code (Mi 25.11. bis So 29.11.). Frist Mo 23.11., sonst Mail ohne Rabatt.
4. Feiertags-Öffnungszeiten 24.12. bis 01.01. Frist 01.12.
5. Napoli Famiglia und Napoli per Due: erst bewerben, wenn im Shop sichtbar. Keine eigene Frage nötig, der Agent prüft den Shop bei jedem Lauf.
6. Nebenbei, keine Frist: Code-Einlösungen WOCHENENDE10 und HALLOWEEN. Wie viele Mittagsmenüs wurden Mi bis Fr verkauft (Wirkung von Mail 111)? Wie kommen neue Shop-Kunden regelmäßig nach Brevo? Entscheidung zum A/B-Test-Vorschlag. Mittwoch-Umsatz jede Woche.

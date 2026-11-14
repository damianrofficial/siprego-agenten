# Siprego Catering: Social-Playbook (Instagram und Facebook)

Stand: 14.11.2026, angelegt vom Manager auf Damians Auftrag. Faktenquelle ist die Landingpage https://siprego.de/pizza-catering/ (gelesen 14.11.2026) plus Damians Angaben im Chat vom 14.11.2026. Bei Widerspruch gilt: nachfragen, nicht raten.

## Kanäle und Werkzeug

- Metricool-Marke "siprego.catering", Brand-ID 7408163, Zeitzone Europe/Berlin. Verbunden: Instagram siprego.catering, Facebook-Seite (ID 365850726614506). Kein TikTok.
- Nur der Agent `social-catering` schreibt in diese Marke. Der Agent `social` (Pizzeria, 7383922) und der Ads-Agent posten hier nie.
- Mediathek: WordPress siprego.de (Zugang social-agent, Platzhalter proxy-injected).

## Ziel und Zielgruppe (Damian, 14.11.2026)

- Regelmäßig Catering-Inhalte. "jeden tag ein beitrag wäre gut, aber nicht zwingend notwendig."
- "hohe qualität und top ästhetik, da unsere zielgruppe hochzeitspaare (=frauen) und entscheider in firmen sind."
- "ci kannst du von der landing page übernehmen."
- Fehlende Bilder: Damian erzeugt sie über ChatGPT, er braucht dafür "eine info welches bild benötigt wird mit einem prompt".

## Rhythmus und Freigabe

- Start: 4 Beiträge je Woche (Mo, Mi, Fr, So), Uhrzeit nach getBestTimeToPostByNetwork, sonst 18:30. Vorschlag des Managers, weil Qualität vor Menge geht und der Bildbestand klein ist; Steigerung auf täglich, sobald genug Material da ist.
- Freigabe-Phase bis auf Widerruf: alles als Entwurf, Damian gibt über den Manager frei.
- Lauf: donnerstags (zusammen mit dem Ads-Catering-Lauf) für die Folgewoche.

## CI (von der Landingpage)

- Farben: Creme #F3F1EB (Hintergrund), Dunkelbraun #2A1A10 (Text, dunkle Flächen), Braun #76503C (Nebentext, Linien, Akzent), Rot #B0241F (sparsam: ein Wort, Preis, Button; dunkler #A6201C, #801511), Hell #E6E1D6 und #EADFD2 (Karten, Flächen), Linie #DCD8CF, Weiß.
- Schriften der Seite (am 14.11.2026 im Browser gemessen, getComputedStyle auf der Live-Seite):
  - Überschriften (h1, h2, h3, Preise, große Zahlen, Menünamen): **Fraunces**, Gewicht 500, Laufweite minus 0,02 em (h1) bzw. minus 0,015 em (h2), Zeilenhöhe 0,98 bis 1,05, Farbe #5E3F2C. Betontes Wort in der Überschrift: Fraunces kursiv in Rot #B0241F (wie "Hochzeit" im Hero). Die Seite lädt Fraunces ohne optische Größe (kräftiger Schnitt), nicht den dünnen Display-Schnitt.
  - Fließtext, Listen, Buttons, Badges: **Karla**, 400, Zeilenhöhe 1,5 bis 1,6, Farbe #4D3823 (Lead) bzw. #42301C (Standard), Nebentext #6D573C. Figtree und Bricolage Grotesque gehören nur zu Kopf und Fuß der Seite (Pizzeria-Design), nicht zum Catering-Inhalt.
  - Gemessene Größen auf der Seite (Desktop): h1 64 px, h2 40 px, h3 22 px, Lead 17,5 px, Liste 13,5 bis 14,5 px.
- Textfarben wie gemessen: Überschrift #5E3F2C, Text #42301C, Lead #4D3823, Nebentext #6D573C. Linien #DCD8CF bzw. rgba(90,66,40,.28).
- Buttons: Hauptbutton Rot #B0241F, Text weiß, Karla 600, Radius 8 px, Höhe 52 px, Innenabstand 24 px, Pfeil am Ende. Paketbutton Braun #5E3F2C, Radius 8 px. Schluss-Abschnitt: Verlauf 165 Grad von #B0241F nach #801511, Button darauf in Creme #F3F1EB mit Text #5A4228.
- Karten: weiß, Radius 12 bis 14 px, Rand 1 px rgba(28,24,22,.12), Innenabstand 28 bis 32 px. Fotos mit Radius 18 px. Badge "Unsere Empfehlung": Rot, weiß, Karla 600, Versalien, Laufweite 1 px, Pille. Listen mit rotem Haken.
- Schriftdateien: `fonts/Fraunces-LP-normal.woff2`, `fonts/Fraunces-LP-italic.woff2`, `fonts/Karla-latin.woff2` (Ordner fonts/ ist nicht im Git; fehlen sie, neu laden: Karla von https://siprego.de/wp-content/uploads/siprego/karla-latin.woff2, Fraunces über https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;0,600;1,400;1,500 mit Browser-User-Agent, die beiden latin-Dateien von fonts.gstatic.com).
- Slide-Vorlage: `scripts/catering_karussell.js` (HTML und CSS, Playwright, 1080x1350). Bausteine: Titel mit Foto oben und Text unten, Paket-Slide mit hohem Foto (904x600, seit 14.11. spät), Schritt-Slide mit großer kursiver Zahl, Aussage-Slide, Rechenkarte, roter Schluss mit "Link im Profil". Seitenrand 88 px, Fußzeile mit Logo, "Siprego Catering" und Zähler. Logo: https://siprego.de/wp-content/uploads/2021/01/cropped-siprego-logomark-circ.png.
- Ton der Seite: "ihr" und "euch", ruhig, konkret, Festpreis und Zahlen, keine Übertreibung. Beispiele: "Drei Pakete mit Festpreis pro Person", "Preis in 2 Minuten berechnen", "Antwort in 48 h, unverbindlich".
- Handlungsaufruf: "Preis in 2 Minuten berechnen" bzw. "Jetzt unverbindlich anfragen", Link im Profil.

## Fakten (Landingpage, 14.11.2026)

- Angebot: Italienisches Catering für Hochzeit, Privatfeier, Firmenevent (Sommerfest, Weihnachtsfeier, Team-Event). Pizza aus dem Steinofen (485 °C, Pizza Contemporanea), Antipasti, Pasta, Dolci, live vor den Gästen. Bayern und Baden-Württemberg, Standort Augsburg.
- "Über 140 Hochzeiten begleitet" / "140+ Paare". Events bis 500+ Gäste.
- Pakete, Festpreis pro Person inkl. MwSt.:
  - Nur Pizza Live Cooking: 60 €
  - Antipasti & Pizza: 75 € (Antipasti-Buffet mit 7 Variationen, klassisch oder komplett vegetarisch; Pizza Live Cooking, 5 Kreationen nach Wahl; Pizzabrot und Mitternachtssnack)
  - Antipasti, Pizza & Pasta: 95 €, "Unsere Empfehlung" (dazu Pasta im Parmesanlaib an der Live-Station: Fettuccine al Tartufo und Pasta al Limone; Bambus-Pastateller und Schälchen inklusive)
  - Antipasti, Pizza, Pasta & Dessert: 115 € (dazu Dessert nach Wahl: Tiramisu und Panna Cotta im Glas oder Cannoli Concierge; Gläser als Leihgabe)
- In jedem Paket: Steinofen mit Live-Cooking, bis zu 2 Pizzen à 26 cm pro Person, 5 Kreationen aus 22, Pizzabrot, betreutes Buffet mit Service-Team, Pavillon, Beleuchtung, Auf- und Abbau, Mitternachtssnack. Anfahrt bis 25 km ab Augsburg inklusive, darüber Anfahrtskosten.
- Mindestauftragswert statt Mindestgästezahl: Mai bis September 4.500 €, Oktober bis April 3.500 € (inkl. MwSt., ohne Anfahrt).
- Antipasti (7): Tris di Bruschetta, Prosciutto e Melone, Mozzarella-Caprese-Spieße, Olive e Verdure, Käseplatte mit Feigendip, Wurstplatte, Pane e Grissini.
- Cannoli Concierge: mobile Station, frisch gefüllt, Füllungen Pistazie, Schokolade, kandierte Früchte.
- Vegan und glutenfrei: glutenfreier Teig auf separatem Blech ohne Aufpreis, veganer Käse 4 € pro Person. Sonderwünsche direkt am Ofen. Reste werden frisch verpackt dagelassen.
- Ablauf in sechs Schritten: Anfrage im Konfigurator (3 Minuten, Preis sofort), Angebot in 48 h, Verkostung oder Videoberatung, Vertrag und Anzahlung, Detail-Check 7 Tage vorher (finale Gästezahl, Pizza-Auswahl, Ablauf), Eventtag.
- Verkostung: in der Pizzeria in Augsburg, ca. 90 Minuten, Wunschpaket probieren, nach dem ersten Angebot, unverbindlich. "Eine kleine Anerkennung für unser Team vor Ort ist dabei gerne gesehen." Videoberatung 20 bis 30 Minuten.
- Platzbedarf: mindestens 4x4 m Außenstation, mit Pasta-Station zusätzlich ca. 2x2 m; bei Schlechtwetter 2 Tische à 2,20 m innen.
- Anschlüsse laut Landingpage: Outdoor 2x 230 V Steckdosen, Indoor 400 V Starkstrom (16 A), "Wasser: kein Anschluss notwendig".
- Zeit: Aufbau ca. 2 Stunden vorher, Buffetzeit in der Regel 2 bis 4 Stunden, Abbau ca. 1 Stunde.
- Zugang: Transporter (Sprintergröße) bis zur Backstation, Parkplatz, fester ebener Untergrund (Wiese nur bei Trockenheit), Treppen oder Rampe nur nach Absprache.
- Geschirr: nicht im Paketpreis; auf Anfrage über Partner für Geschirr- und Besteckverleih (Kosten im Angebot, Gäste räumen ab und spülen grob vor, Verleiher holt ab) oder über die Location; kleine Dessertteller reichen.
- Bezahlung: Event in weniger als 6 Monaten 80 % Anzahlung bei Vertragsunterschrift, 20 % am Veranstaltungstag; mehr als 6 Monate 50 % und 50 %. 5 % Rabatt bei Vollzahlung (nur bei Events in mehr als 6 Monaten).
- Bewertungen auf der Seite (öffentlich, Google): zwei Hochzeitsbewertungen mit Vornamen. Nur wörtlich und gekürzt zitieren.

## Fakten Firmen-Catering (https://siprego.de/firmen-catering/, gelesen 14.11.2026)

Die Firmen-Seite weicht von der Hochzeits-Landingpage ab. Für Firmen-Beiträge nur diese Zahlen verwenden:
- Anrede auf der Seite: "Sie". Preise netto, zzgl. 7 % MwSt. "ab 60 € pro Person netto".
- Vier Pakete: Pizza Live Cooking 60 € (5 Kreationen aus 22, bis zu 2 Pizzen à 26 cm pro Person, mobiler Steinofen); Antipasti & Pizza 75 € (dazu Antipasti-Buffet mit 7 Variationen, auch vegetarisch, Pizzabrot); Antipasti, Pizza & Dessert 95 €, "Bestseller" (dazu Dessert nach Wahl: Tiramisu & Panna Cotta oder Cannoli Concierge, Dessert-Service); Antipasti, Pizza, Trüffelpasta & Dessert 115 € (dazu Trüffelpasta live im Parmesanlaib, eigene Station).
- In jedem Paket: Steinofen mit Live-Cooking, Service-Team, betreutes Buffet, Auf- und Abbau. Außerdem auf der Seite: "Vollausstattung inklusive: Pavillon, Beleuchtung, Buffet-Präsentation". Kein Mitternachtssnack genannt.
- Anfahrt bis 60 km ab Augsburg inklusive (Hochzeit: 25 km). Zahlung auf Rechnung. Angebot in 48 h. Bis 500+ Gäste. Unter der Woche (Mo bis Mi) auch kurzfristig.
- Upgrades netto: Flying Antipasti Buffet plus 12 € pro Person, Geschirr und Besteck plus 8 € pro Person, Mietmobiliar auf Anfrage.
- Mindestauftragswert 4.500 € (Mai bis September) bzw. 3.500 € (Oktober bis April), jeweils netto, ohne Anfahrt.
- Bezahlung: 80 % Anzahlung bei Events in den nächsten 3 Monaten, sonst 50 %, Rest nach dem Event; 5 % Rabatt auf die Nettosumme bei Vollzahlung (Events in mehr als 3 Monaten). Storno: mehr als 60 Tage 25 %, 30 bis 60 Tage 50 %, unter 30 Tagen volle Summe.
- Indoor: 1x 400 V Starkstrom plus 2x 230 V. Outdoor 2x 230 V. Wasser: kein Anschluss notwendig.
- Anlässe: Sommerfest, Weihnachtsfeier, Team-Event und Offsite, Firmenjubiläum, Kundenevent und Eröffnung, Messe und Roadshow.

## Angaben von Damian (Chat 14.11.2026), nicht auf der Landingpage

- Gästezahl (Präzisierung 14.11. spät): Es wird NICHT gezählt, wie viele Gäste am Eventtag tatsächlich kommen. Maßgeblich ist die Zahl, die eine Woche vor dem Event erfragt wird. Nie so formulieren, als würde am Tag gezählt.
- Gästezahl: geplante Gästezahl (Kinder unter 6 Jahren zählen nicht) minus 10 % (Krankheit, Absagen) = Mindestanzahl. Eine Woche vor dem Event wird die finale Zahl erfragt; liegt sie über der Mindestanzahl, wird die Differenz mit der Schlussrechnung nachberechnet.
- Teller: "tipp: kleine teller reichen 20-23cm", Gäste kommen mehrmals ans Buffet, bleiben in Bewegung, lockere Atmosphäre. Eigenes Besteck "aus logistischen gründen" nicht.
- Verkostung: "ihr probiert wofür ihr euch interessiert, ihr zahlt was es euch wert war = das geld geht an unser team".
- Gas bringt Siprego mit.
- Frühzeitig anfragen: "wir sind extrem schnell ausgebucht", je schneller die Zusage, desto sicherer der Termin.

## Offene Widersprüche (erst klären, dann posten)

- GEKLÄRT 14.11.2026 (Damian "A"): kein Wasseranschluss nötig, Landingpage stimmt.
- GEKLÄRT 14.11.2026 Strom (Damian wörtlich: "steckdosen 1x230V für pizza station, zusätzlich 2x230V für pasta (oder 1x400V)"): Pizza-Station 1x 230 V; mit Pasta-Station zusätzlich 2x 230 V oder stattdessen 1x 400 V. Diese Angabe gilt für Beiträge, die Landingpage (Outdoor 2x 230 V, Indoor 400 V 16 A) weicht ab, Damian weiß es. Gas bringt Siprego mit. Thema 7 "Anschlüsse" damit baubar.
- GEKLÄRT 14.11.2026 (Damian "A"): 5 % Rabatt bei Vollzahlung nur bei Events in mehr als 6 Monaten, wie auf der Landingpage. Thema 4 damit baubar.
- Vorlaufzeiten für "Wann musst du dich um dein Catering kümmern?" (Hochzeit, Weihnachtsfeier, Sommerfest): keine Monatsangaben vorhanden.

## Themenliste

Von Damian (14.11.2026):
1. Pakete als Karussell mit Preis pro Person
2. Voraussetzungen für euer italienisches Catering (Logistik: Platz, Zufahrt, Untergrund, Zeit)
3. Wie kalkulieren wir die Gästezahl?
4. So könnt ihr sparen (5 % bei Vollzahlung), erst nach Klärung
5. Teller und Besteck
6. Verkostung vor Ort
7. Anschlüsse, erst nach Klärung Wasser
8. Wann müsst ihr euch um euer Catering kümmern? erst nach Klärung der Vorlaufzeiten

Ergänzt vom Manager (aus der Landingpage belegt):
9. In sechs Schritten von der Anfrage zum Eventtag
10. Was in jedem Paket steckt (Pavillon, Beleuchtung, Service, Mitternachtssnack)
11. 22 Pizzen, ihr wählt 5 (und Sonderwünsche am Ofen)
12. Antipasti-Buffet mit sieben Variationen
13. Pasta im Parmesanlaib
14. Cannoli Concierge
15. Vegan und glutenfrei
16. Schlechtwetter: was passiert, wenn es regnet
17. Was eine Bewertung sagt (Zitat-Slide)
18. Einsatzgebiet und Anfahrt (25 km inklusive)
19. Firmenevent: Sommerfest, Weihnachtsfeier, Team-Event
20. Videoberatung in 20 bis 30 Minuten
21. Was passiert mit übrigen Pizzen
22. Mindestauftragswert einfach erklärt

Ideen für Titelbilder: Mediathek 5841 (Brautpaar am Antipasti-Buffet, Erlaubnis liegt vor) als ganzes Bild für den Titel eines späteren Beitrags, z. B. Thema 12 (Antipasti-Buffet) oder Thema 17 (Was eine Bewertung sagt).

## Bildbestand

Gesichtet am 14.11.2026 (Mediathek-Suche catering, hochzeit, pavillon, antipasti, parmesan, cannoli, steinofen, buffet, pasta, dessert, tiramisu, wedding, event; jede Datei angesehen). "Team" heißt: Mitarbeiter erkennbar, keine Gäste; vor Verwendung als Hauptmotiv einmal bei Damian nachfragen.

| ID | Größe | Motiv | Personen erkennbar | Verwendbar |
| --- | --- | --- | --- | --- |
| 5022 | 2000x1333 | Pizza im Steinofen, Flamme, nah | nein | ja, sehr gut (verwendet: Pakete Titel) |
| 5068 | 1500x1500 | wie 5022, quadratisch | nein | ja |
| 5020 | 2000x1333 | Pizzen auf Edelstahl-Buffet, Basilikum, Schild | nein | ja |
| 5066 | 1500x1500 | wie 5020, quadratisch | nein | ja (verwendet: Gästezahl Titel) |
| 5091 | 2000x1000 | wie 5020, Querformat | nein | ja, für 4:5 zu flach |
| 5021 | 2000x1333 | Öl und Gewürze auf dem Buffet, Pizzen dahinter | nein | ja (verwendet: Firmen Titel) |
| 5067 | 1500x1500 | wie 5021, quadratisch | nein | ja |
| 5023 | 2000x1333 | Pavillon mit Buffet, Gäste davor | ja, Gäste | nein |
| 5069 | 1500x1500 | Pavillon mit Buffet, Gäste davor | ja, Gäste | nein |
| 5019 | 1333x2000 | zwei Pizzabäcker am Ofen | ja, Team | nur nach Rückfrage |
| 5065 | 1500x1500 | wie 5019 | ja, Team | nur nach Rückfrage |
| 5024 | 2000x1333 | Pizzabäcker belegt Pizza, Profil | ja, Team | nur nach Rückfrage |
| 5064 | 1500x1500 | wie 5024 | ja, Team | nur nach Rückfrage |
| 5060 | 1500x1500 | Käsebrett mit Trauben, in der Pizzeria | nein | nur klein im Beitrag, nicht als Titel (gleiche Serie wie 5062) |
| 5061 | 1500x1500 | Bruschetta und Oliven auf Holzbrett, Pizzeria | nein | nur klein im Beitrag, nicht als Titel (gleiche Serie wie 5062) |
| 6282 | 1080x1350 | Drei Holzbretter mit Antipasti in der Pizzeria (vorn Schinken, Salami, Feigen, Grissini; hinten Bruschetta, Oliven, Käse, Trauben; grüner Stuhl, Ziegelwand). Quelle: eigener Instagram-Beitrag DAMH8ZZomrf von siprego.catering, erstes Bild | nein | ja, von Damian am 14.11.2026 ausdrücklich gewählt (verwendet: Verkostung Titel v3). Nicht breiter als 1080 px verwenden |
| 5062 | 1500x1500 | Wurstbrett mit Feigen und Grissini, Pizzeria | nein | nein als Titel (Damian 14.11.: gefällt nicht) |
| 5266 | 819x1024 | Hände mit Handschuhen am Antipasti-Buffet, Teller | nein (nur Hände) | ja, kleine Auflösung |
| 5267 | 819x1024 | zwei Mitarbeiter hinter dem Antipasti-Buffet | ja, Team | nur nach Rückfrage |
| 5268 | 819x1024 | Antipasti-Buffet in Holzkisten, Prosciutto e Melone, links künstliches Grün | nein | nicht für Catering-Beiträge, Kunstpflanze sichtbar (Damian 14.11.) |
| 5269 | 1024x683 | Antipasti-Buffet, Steinofen im Hintergrund | nein | ja, klein und quer |
| 5270 | 1024x683 | Bruschetta und Menükarte auf dem Buffet | nein | ja, klein und quer |
| 5271 | 819x1024 | Hand hält Cannolo, Cannoli-Schild, abends | nein (nur Hand) | ja (Cannoli Concierge) |
| 5272 | 1024x683 | Cannolo auf schwarzer Serviette, Zitronen | nein | ja (Cannoli Concierge) |
| 5273 | 819x1024 | Cannoli Concierge füllt Cannolo am Bauchladen | ja, Team | nur nach Rückfrage (steht so auf der Landingpage) |
| 5274 | 1024x683 | Menükarte abends, Mitarbeiterin am Ofen unscharf | kaum | ja, klein und quer |
| 5275 | 819x1024 | Buffet mit Pizzen abends, Lichterkette, Ofen | nein | ja (Stimmung, Mitternachtssnack) |
| 5276 | 1024x767 | zwei Mitarbeiter unter dem Pavillon | ja, Team | nur nach Rückfrage |
| 5277 | 1024x873 | zwei Mitarbeiterinnen unter dem Pavillon | ja, Team | nur nach Rückfrage |
| 5753 | 1200x1600 | Pizzen vorn, Team am Ofen von hinten, Abendlicht (Hero der Landingpage) | nein (von hinten, unscharf) | ja, sehr gut (als Verkostung-Titel v2 gebaut, von Damian durch 6282 ersetzt; frei für andere Titel) |
| 5793 | 750x1000 | Pavillon mit Fähnchen, Buffet, Kind von hinten | Team seitlich, Kind von hinten | nein |
| 5825 | 720x900 | Standbild Hero-Video, Mitarbeiterin am Buffet | ja, Team | nur nach Rückfrage |
| 5824 | Video | Hero-Video Hochzeit (mp4) | noch nicht gesichtet | offen, vor Reel prüfen |
| 5841 | 944x1500 | Hochzeit, Antipasti-Buffet im Freien: oben Brautpaar und zwei Teammitglieder erkennbar, unten Basilikumtopf, Grissini im Glas, Salami- und Schinkenplatte, grüne und schwarze Oliven. Von Damian am 14.11.2026 im Chat geschickt und freigegeben ("dieses bild kannst du nehmen"); dieselbe Datei wie das Paketfoto der Landingpage | ja, Brautpaar und Team | ja, ganzes Bild verwendbar: Erlaubnis von Paar und Team liegt laut Damian vor (14.11.2026, "wir haben die erlaubnis vom paar und team"). Verwendet (Stand 14.11. spät): Ausschnitt mit Brautpaar am Buffet (y 262 bis 888) in Pakete Hochzeit Slide 2; Buffet-Ausschnitt ohne Gesichter (y 850 bis 1476) in Firmen Slide 3. Jeweils volle Breite 944 px |
| 5842 | 1178x1500 | Pizza-Buffet unter dem Pavillon, Mitarbeiterin von hinten, Ofen | nein (von hinten) | ja, gut (Pavillon, Aufbau) |
| 5849 | 800x1000 | Pasta im Parmesanlaib, Pasta-Karte | nein | ja (verwendet: Paket 2), kleine Auflösung |
| 5872 | 800x1000 | Tiramisu und Panna Cotta im Glas | nein | ja (verwendet: Paket 3), kleine Auflösung |
| 4795 | 1920x1080 | Vorspeisen auf Tellern, älter | nein | eher nein, passt nicht zum heutigen Buffet |
| 4978 | 1280x720 | Brautpaar unter Schleier | ja | nein (Gäste bzw. Stockfoto) |
| 5149 | 500x500 | Brautpaar küsst sich | ja | nein (wirkt KI-erzeugt, zu klein) |
| 5445 | 1080x1080 | Geschäftsleute mit Pizzatellern | ja | nein (wirkt KI-erzeugt) |
| 5656 | 600x800 | Brautpaar mit Pizza | ja | nein (wirkt KI-erzeugt) |
| 5893, 6163 | | Antipasti-Platte der Pizzeria mit Preis | nein | nein (Pizzeria-Angebot) |
| 2112 bis 3881 | | Bilder von 2019 (Theme-Material, Burger, Churros, Tacos) | | nein |
| 6082 bis 6144, 6191 bis 6196 | | fertige Catering-Anzeigen (Statics) | | nein, nur Ads |
| 6254 bis 6281 | 1080x1350 | Slides der Musterbeiträge vom 14.11.2026 (6271 bis 6274 geänderte Slides, 6275 bis 6281 Firmen-Variante; 6260, 6257, 6258, 6266 sind überholt) | nein | eigene Beiträge |

Lücken im Bestand (Bild gesucht, Stand 14.11.2026): hochauflösende Hochformat-Fotos von Antipasti-Buffet, Pasta im Parmesanlaib und Dessert (vorhanden nur 800 bis 819 px breit), Pavillon mit Beleuchtung am Abend ohne Personen, gedeckter Tisch oder Stimmung für Titel-Slides, Motiv für Videoberatung.

## Bereits geplante oder veröffentlichte Beiträge

Musterlauf 14.11.2026, alle drei als ENTWURF (draft true), Instagram und Facebook, Termine sind Platzhalter:

| Nr. | Termin | Thema | Format | Metricool-ID | uuid | Mediathek | Stand |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Mo 16.11.2026 19:00 | Thema 1, Pakete Hochzeit. Titel seit 14.11. spät: "Was kostet italienisches Catering für eure Hochzeit?" | Karussell, 6 Slides | 428412596 | -4351427074396372338 | 6271 (Titel v2), 6290 (Slide 2 v5, Brautpaar am Buffet aus 5841), 6291, 6292 (Paket-Slides im hohen Layout), 6264, 6265 | Entwurf, nach Damians Änderung, wartet auf Freigabe |
| 2 | Mi 18.11.2026 19:00 | Thema 3, Wie kalkulieren wir die Gästezahl? (Beispiel 104, 4 Kinder, 100, Mindestanzahl 90; eine Woche vorher 94 genannt, 4 nachberechnet) | Karussell, 6 Slides | 428398481 | -4601885445321831632 | 6254 bis 6256, 6272 (Slide 4 v2), 6273 (Slide 5 v2), 6259 | Entwurf, nach Damians Änderung, wartet auf Freigabe |
| 3 | Fr 20.11.2026 19:00 | Thema 6, Verkostung vor der Buchung (Titelfoto 6282, von Damian gewählt) | Karussell, 5 Slides | 428404410 | 8645212795312491167 | 6283 (Titel v3), 6267 bis 6270 | Entwurf, nach Damians Änderung, wartet auf Freigabe |
| 4 | Mo 07.12.2026 19:00 | Thema 1 Variante Firmen: "Was kostet italienisches Catering für euer Firmenevent?", vier Pakete netto laut Firmen-Seite | Karussell, 7 Slides | 428412719 | -6949295604068892181 | 6275, 6293, 6294 (Slide 3 v4, Buffet-Ausschnitt aus 5841 ohne Gesichter), 6295, 6296, 6280, 6281 | Entwurf, wartet auf Freigabe (Anrede und Link klären) |

Hinweis: Nach jedem updateScheduledPost ändert sich die Metricool-ID, die uuid bleibt.

## Notizen von Damian

- 14.11.2026 (über Manager): Auftrag wie oben. Fehlende Bilder liefert Damian über ChatGPT nach Prompt.
- 14.11.2026 spät (über Manager, zu den Musterkarussells): Titel-Slide als Frage, "Was kostet Italienisches Catering für eure Hochzeit?", ein paar Wochen später Variante "Was kostet Italienisches Catering für euer Firmenevent?". Lehre: Titel-Slides als Frage der Zielgruppe formulieren, je Zielgruppe (Hochzeit, Firma) eine eigene Variante.
- 14.11.2026 spät, zweite Antwort: Für die Verkostung will Damian das erste Bild aus dem eigenen Instagram-Beitrag DAMH8ZZomrf ("nimm dieses bild"), Mediathek 6282. Lehre: Bei Antipasti und Verkostung das Gesamtbild mit allen drei Brettern zeigen, nicht nur einen engen Ausschnitt; eigene Instagram-Beiträge von siprego.catering sind eine Bildquelle.
- 14.11.2026 spät, vierte Antwort: Foto vom Antipasti-Buffet mit Brautpaar geschickt (Mediathek 5841), "dieses bild kannst du nehmen." und "wir haben die erlaubnis vom paar und team." Damit ist 5841 ganz verwendbar.
- 14.11.2026 spät, fünfte Antwort, zum flachen Ausschnitt 904x384 aus 5841: "schlechter ausschnitt". Lehre: Paket-Slides mit hohem Bildkasten (904x600), Name links und Preis rechts darunter, zwei Zeilen; Fotos als Bild wirken lassen, keine engen Streifen aus Hochformat-Fotos.
- 14.11.2026 spät, dritte Antwort: "zu 1. slide 2 - anders bild nehmen. man sieht dass es eine plastipflanze ist" (Foto 5268). Lehre: Vor jeder Verwendung prüfen, ob künstliche Pflanzen oder Deko im Bild sind; solche Fotos nicht nehmen. Verdacht auch bei 5266, 5269, 5270 (Zitronenzweige, Grün auf dem Buffet) und bei den Efeuranken am Pavillon (5020, 5021, 5066, 5067, 5023, 5069).
- 14.11.2026 spät: Titelfoto der Verkostung (5062, Antipasti-Brett in der Pizzeria) "bild ist scheiße. nimm ein anderes." Lehre: Handyfotos aus der Pizzeria (5060, 5061, 5062) nicht als Titelbild. Für Titel nur die professionellen Aufnahmen (5022, 5068, 5020, 5066, 5021, 5067, 5753).

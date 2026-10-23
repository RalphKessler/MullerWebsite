# Auftragsgrundlage: Website Müller TB Technologies AG

## Firma
- **Müller TB Technologies AG**, Laubisrütistrasse 72, CH-8712 Stäfa · +41 44 926 44 88 · sales@muller.ch
- Hersteller von Isolierprofilmaschinen (Swiss Made): Maschinen und Anlagen für wärmegedämmte Aluminium-Fensterprofile
  (Thermal Break), Folieren von Oberflächen, Montage von Bürsten und Dichtungen, Sondermaschinen.
- Pionier: 1979 erste Rändelmaschine am Markt. 15–20 Mitarbeitende, weltweiter Export, Vertretungen in Asien, Europa, Mittlerer Osten.
- Ersatzteil-Katalog: https://parts.muller.ch/de/

## Zielgruppen
Profilhersteller, Systemhäuser und Fensterbauer weltweit (Produktionsleitung, Technik, Einkauf); bestehende Kunden für Support/Ersatzteile.

## Seitenstruktur
URLs wie auf muller.ch (`/de/maschinentypen/...`, `/de/support/`, `/de/firmenprofil/`, `/de/referenzen/`, `/de/antworten/`,
`/de/kontakt/`, `/de/kontakt/vertretungen/`), damit bestehende Links und Google-Einträge weiter funktionieren.

## Designrichtung
Modern, technisch, ruhig. Farben aus dem Logo: Blau `#0069b1` (Hauptfarbe), Rot `#d1063a` (Akzente sparsam).
Produktfotos freigestellt auf Weiss → helle Karten. Gestrichelter Kreis aus dem Logo als dezentes Gestaltungselement.
Keine Drittinhalte ohne Zustimmung (Systemschrift, keine Google Fonts, Karte nur als Link).

## Technik
Astro 7 (statisch), Sveltia CMS, Inhalte als YAML in `src/content/seiten/`, Bausteine siehe README.
Vor jedem Push: `npm run check` und `npm run build`. Mobil (360 px) ohne seitlichen Scrollbalken.

## Regeln
- **Erfinde keine Fakten.** Texte stammen von muller.ch; Lücken als `TODO: …` erfassen.
- Offene Fragen in `OPEN-QUESTIONS.md` sammeln.
- Nach jedem grösseren Schritt anhalten und eine klickbare Vorschau zeigen.

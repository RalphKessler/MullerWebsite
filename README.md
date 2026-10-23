# Müller TB Technologies AG – Demo-Website

Moderne Neuauflage von [muller.ch](https://muller.ch/de/) als statische Website mit **Astro** und dem Redaktionssystem **Sveltia CMS**.
Aufbau nach der internen Vorlage «Demoseite mit Astro, Git und Sveltia CMS» (gleich wie SPÄNI).

```
Redaktor (/admin) ──► GitHub-Repository ──► Build (Cloudflare Pages) ──► Website
```

## Lokal arbeiten

Voraussetzung: Node.js **22.23.4 oder neuer** (Astro 7), Git.

```sh
npm install
npm run dev          # Vorschau auf http://localhost:4321/de/
npm run check        # Typen und Inhalts-Schemas prüfen – vor jedem Push
npm run build        # Test-Build in dist/ (TODO-Platzhalter gelb markiert)
LIVE=true npm run build   # Live-Build (TODO-Platzhalter ausgeblendet)
```

**CMS lokal (ohne Anmeldung):** `npm run dev`, in Chrome oder Edge `http://localhost:4321/admin/` öffnen →
«Work with Local Repository» → Projektordner wählen. Änderungen landen direkt in den Dateien, danach committen und pushen.

## Aufbau

| Ort | Inhalt |
|---|---|
| `src/content/seiten/de/**/index.yml` | Alle Seiten. Ordnerstruktur = URL (gleiche Pfade wie auf muller.ch) |
| `src/content.config.ts` | Schemas der Seiten und Bausteine |
| `src/components/bloecke/` | Bausteine: Hero, Text, Bild+Text, Karten, Unterseiten, Kennzahlen, Schritte, FAQ, Logos, Aufruf, Kontakt |
| `src/data/einstellungen.json` | Firma, Kontakt, Farben, Demo-Modus – im CMS unter «Einstellungen» |
| `src/data/navigation.json` | Haupt- und Fussnavigation |
| `public/admin/config.yml` | Sveltia-CMS-Konfiguration |
| `public/uploads/` | Bilder (WebP, von muller.ch übernommen und verkleinert) |

**Neuen Baustein hinzufügen – immer drei Stellen:** Schema in `content.config.ts`, Komponente in
`components/bloecke/` + Eintrag in `Bausteine.astro`, Felder in `public/admin/config.yml`.

**Platzhalter-Regel:** fehlende Angaben als `TODO: …` erfassen. Im Test-Build gelb markiert, im Live-Build (`LIVE=true`) ausgeblendet.

## Online stellen (Cloudflare Pages)

1. Cloudflare → Workers & Pages → Pages-Projekt mit diesem Repository verbinden.
2. Build-Befehl `npm run build`, Ausgabeordner `dist`, Umgebungsvariable `NODE_VERSION=22`.
3. Für den Livegang: `LIVE=true` und `SITE_URL=https://muller.ch` setzen, in den Einstellungen «Demo-Modus» ausschalten
   und `public/robots.txt` freigeben.

## Anmeldung im CMS

- **Demo:** GitHub → Settings → Developer settings → Fine-grained token (nur dieses Repository, *Contents: Read and write*) →
  in `/admin` «Sign In Using Access Token».
- **Kunde:** Sveltia CMS Authenticator (Cloudflare Worker) + GitHub-OAuth-App, siehe <https://github.com/sveltia/sveltia-cms-auth>.
  Danach `base_url` in `public/admin/config.yml` aktivieren und `ALLOWED_DOMAINS` im Worker setzen.

Das CMS arbeitet auf dem Branch `main` (`backend.branch` in `config.yml`).

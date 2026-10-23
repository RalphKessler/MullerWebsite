import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Leere CMS-Felder kommen als '' oder null – vorab in undefined umwandeln,
// sonst scheitert die Prüfung beim ersten leeren Feld.
const leer = (v: unknown) => (v === '' || v === null ? undefined : v);
const text = () => z.preprocess(leer, z.string().optional());
const schalter = () => z.preprocess(leer, z.boolean().default(false));
const liste = <T extends z.ZodType>(s: T) =>
  z.preprocess((v) => (v === '' || v === null ? [] : v), z.array(s).default([]));
const auswahl = <T extends [string, ...string[]]>(werte: T, standard: T[number]) =>
  z.preprocess(leer, z.enum(werte).default(standard as never));

const bausteinHero = z.object({
  type: z.literal('hero'),
  hell: schalter(),
  oberzeile: text(),
  titel: z.string(),
  text: text(),
  bild: text(),
  alt: text(),
  knopf: text(),
  link: text(),
  knopf2: text(),
  link2: text(),
});
const bausteinText = z.object({
  type: z.literal('text'),
  hell: schalter(),
  titel: text(),
  inhalt: text(),
});
const bausteinBildtext = z.object({
  type: z.literal('bildtext'),
  hell: schalter(),
  oberzeile: text(),
  titel: text(),
  inhalt: text(),
  bild: text(),
  alt: text(),
  umgekehrt: schalter(),
  knopf: text(),
  link: text(),
});
const bausteinKarten = z.object({
  type: z.literal('karten'),
  hell: schalter(),
  titel: text(),
  einleitung: text(),
  spalten: auswahl(['2', '3', '4'], '3'),
  bildformat: auswahl(['quadrat', 'breit', 'frei'], 'breit'),
  eintraege: liste(
    z.object({
      titel: z.string(),
      text: text(),
      bild: text(),
      alt: text(),
      link: text(),
      linktext: text(),
    }),
  ),
});
const bausteinUnterseiten = z.object({
  type: z.literal('unterseiten'),
  hell: schalter(),
  titel: text(),
  einleitung: text(),
});
const bausteinKennzahlen = z.object({
  type: z.literal('kennzahlen'),
  hell: schalter(),
  titel: text(),
  eintraege: liste(z.object({ zahl: z.string(), beschriftung: z.string() })),
});
const bausteinSchritte = z.object({
  type: z.literal('schritte'),
  hell: schalter(),
  titel: text(),
  einleitung: text(),
  eintraege: liste(z.object({ titel: z.string(), text: text(), bild: text() })),
});
const bausteinFaq = z.object({
  type: z.literal('faq'),
  hell: schalter(),
  titel: text(),
  fragen: liste(z.object({ frage: z.string(), antwort: z.string() })),
});
const bausteinLogos = z.object({
  type: z.literal('logos'),
  hell: schalter(),
  titel: text(),
  text: text(),
  eintraege: liste(z.object({ name: z.string(), bild: z.string() })),
});
const bausteinAufruf = z.object({
  type: z.literal('aufruf'),
  hell: schalter(),
  titel: z.string(),
  text: text(),
  beschriftung: z.string(),
  link: z.string(),
});
const bausteinKontakt = z.object({
  type: z.literal('kontakt'),
  hell: schalter(),
  titel: text(),
  text: text(),
});

export const baustein = z.discriminatedUnion('type', [
  bausteinHero,
  bausteinText,
  bausteinBildtext,
  bausteinKarten,
  bausteinUnterseiten,
  bausteinKennzahlen,
  bausteinSchritte,
  bausteinFaq,
  bausteinLogos,
  bausteinAufruf,
  bausteinKontakt,
]);
export type Baustein = z.infer<typeof baustein>;

const seiten = defineCollection({
  // seiten/de/maschinentypen/folieren/index.yml → ID «de/maschinentypen/folieren»
  loader: glob({
    pattern: '**/*.yml',
    base: './src/content/seiten',
    generateId: ({ entry }) => entry.replace(/\.yml$/, '').replace(/\/?index$/, ''),
  }),
  schema: z.object({
    titel: z.string(),
    menutitel: text(),
    beschreibung: text(),
    oberzeile: text(),
    einleitung: text(),
    bild: text(),
    kurz: text(),
    reihenfolge: z.preprocess(leer, z.number().default(100)),
    kopf_ausblenden: schalter(),
    bloecke: liste(baustein),
    entwurf: schalter(),
  }),
});

export const collections = { seiten };

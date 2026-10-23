import { getCollection, type CollectionEntry } from 'astro:content';

export type Seite = CollectionEntry<'seiten'>;

/** Alle veröffentlichten Seiten (ohne Entwürfe). */
export const alleSeiten = () => getCollection('seiten', (s) => !s.data.entwurf);

/** «de/maschinentypen/folieren» → «/de/maschinentypen/folieren/» */
export const seitenUrl = (id: string) => `/${id}/`;

/** Direkte Unterseiten einer Seite, sortiert nach «reihenfolge», dann Titel. */
export function unterseiten(seiten: Seite[], id: string): Seite[] {
  const tiefe = id.split('/').length + 1;
  return seiten
    .filter((s) => s.id.startsWith(`${id}/`) && s.id.split('/').length === tiefe)
    .sort((a, b) => a.data.reihenfolge - b.data.reihenfolge || a.data.titel.localeCompare(b.data.titel, 'de'));
}

/** Brotkrumen: alle vorhandenen Elternseiten (ohne Startseite). */
export function brotkrumen(seiten: Seite[], id: string) {
  const teile = id.split('/');
  const pfade: { titel: string; url: string }[] = [];
  for (let i = 2; i < teile.length; i++) {
    const eltern = seiten.find((s) => s.id === teile.slice(0, i).join('/'));
    if (eltern) pfade.push({ titel: eltern.data.menutitel ?? eltern.data.titel, url: seitenUrl(eltern.id) });
  }
  return pfade;
}

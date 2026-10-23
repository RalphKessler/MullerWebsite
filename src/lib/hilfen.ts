import { marked } from 'marked';

// Live-Build: LIVE=true. Dann werden alle «TODO: …»-Platzhalter ausgeblendet,
// im Test-Build erscheinen sie gelb markiert.
export const LIVE = process.env.LIVE === 'true';

const TODO = /TODO:/;

/** Ist der Text ein Platzhalter (enthält «TODO:»)? */
export const istTodo = (s?: string | null) => !!s && TODO.test(s);

/** Text für die Ausgabe – im Live-Build fallen Platzhalter weg. */
export function zeige(s?: string | null): string | undefined {
  if (!s) return undefined;
  if (LIVE && istTodo(s)) return undefined;
  return s;
}

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Einzeiliger Text als HTML, Platzhalter markiert. */
export function zeile(s?: string | null): string {
  const t = zeige(s);
  if (!t) return '';
  return istTodo(t) ? `<mark class="todo">${escape(t)}</mark>` : escape(t);
}

/** Markdown aus dem CMS als HTML. Absätze mit «TODO:» werden markiert bzw. im Live-Build entfernt. */
export function markdown(s?: string | null): string {
  if (!s) return '';
  const absaetze = s
    .split(/\n{2,}/)
    .filter((a) => !(LIVE && istTodo(a)))
    .join('\n\n');
  const html = marked
    .parse(absaetze, { async: false, breaks: true })
    // interne Links aus dem CMS («/kontakt») mit Sprachpräfix versehen
    .replace(/href="(\/(?!de\/|uploads\/)[^"]*)"/g, (_, ziel: string) => `href="${link(ziel)}"`);
  return html.replace(/<(p|li|h[2-4])>([^<]*TODO:[^]*?)<\/\1>/g, '<$1><mark class="todo">$2</mark></$1>');
}

/** Interne Links mit Sprachpräfix versehen: «/leistungen» → «/de/leistungen/». */
export function link(ziel?: string | null, lang = 'de'): string {
  if (!ziel) return '#';
  if (/^(https?:|mailto:|tel:|#)/.test(ziel)) return ziel;
  const pfad = ziel.replace(/^\/+/, '').replace(/^de\/?/, '').replace(/\/+$/, '');
  return pfad ? `/${lang}/${pfad}/` : `/${lang}/`;
}

export const datum = (d: Date) =>
  d.toLocaleDateString('de-CH', { day: 'numeric', month: 'long', year: 'numeric' });

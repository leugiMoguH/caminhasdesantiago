// Micro-value notes (Phase 3, STEP 2). Derive ONE short, honest trust line per
// accommodation from real data fields (type / bookable / beds) — never generic,
// never fabricated. Shown on StayCard so the listing reads like a pilgrim's
// advice, not a directory.
//
// Priority (max one per card): first-come risk (⚠️) → scarce beds (⚡) →
// reservation reassurance (💡). The strongest, most decision-relevant signal wins.

export type Lang = 'en' | 'es' | 'pt';

export interface AccLike {
  type?: string;
  beds?: number;
  bookable?: boolean;
}

export interface PilgrimNote {
  icon: '⚠️' | '💡' | '⚡';
  text: string;
}

const SCARCE_BEDS = 20; // below this a dorm realistically sells out in season

const FIRST_COME: Record<Lang, string> = {
  en: 'First-come, no booking — arrive before 14:00 in summer or risk no bed.',
  es: 'Por orden de llegada, sin reserva — llega antes de las 14:00 en verano o te quedas sin cama.',
  pt: 'Por ordem de chegada, sem reserva — chega antes das 14:00 no verão ou arriscas ficar sem cama.',
};
const SCARCE: Record<Lang, string> = {
  en: 'Few beds — fills fast in peak season, so book ahead.',
  es: 'Pocas plazas — se llena rápido en temporada alta, reserva con antelación.',
  pt: 'Poucas camas — enche depressa na época alta, reserva com antecedência.',
};
const BOOKABLE: Record<Lang, string> = {
  en: 'Takes reservations — the safer bet if you walk in late or want a quieter sleep.',
  es: 'Admite reserva — la opción más segura si llegas tarde o quieres dormir más tranquilo.',
  pt: 'Aceita reserva — a aposta mais segura se chegas tarde ou queres dormir mais sossegado.',
};

/** One derived trust note for a stay, or null when nothing honest applies. */
export function pilgrimNote(acc: AccLike, lang: Lang): PilgrimNote | null {
  const isPublic = acc.type === 'municipal-albergue' || acc.bookable === false;
  if (isPublic) return { icon: '⚠️', text: FIRST_COME[lang] };
  if (typeof acc.beds === 'number' && acc.beds > 0 && acc.beds < SCARCE_BEDS) {
    return { icon: '⚡', text: SCARCE[lang] };
  }
  if (acc.bookable === true) return { icon: '💡', text: BOOKABLE[lang] };
  return null;
}

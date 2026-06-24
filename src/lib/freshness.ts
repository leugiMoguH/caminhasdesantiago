// Data-freshness helpers — surface and police the `lastVerified` signal so
// "monthly-verified" content cannot silently decay into stale data (audit R1).

export type Lang = 'en' | 'es' | 'pt';

const STALE_AFTER_DAYS = 30;

/**
 * Build-time guard. Logs a warning (does NOT fail the build) when an entry's
 * lastVerified is older than `maxDays`. Runs in Node during getStaticPaths /
 * page frontmatter, so it shows up in `npm run build` output.
 */
export function warnIfStale(label: string, lastVerified: string, maxDays = STALE_AFTER_DAYS): void {
  const verified = new Date(lastVerified);
  if (Number.isNaN(verified.getTime())) {
    console.warn(`[freshness] ${label}: invalid lastVerified "${lastVerified}"`);
    return;
  }
  const ageDays = Math.floor((Date.now() - verified.getTime()) / 86_400_000);
  if (ageDays > maxDays) {
    console.warn(
      `[freshness] STALE: ${label} verified ${lastVerified} (${ageDays} days ago, > ${maxDays}). Re-verify sources.`,
    );
  }
}

const VERIFIED_LABEL: Record<Lang, string> = {
  en: 'Verified',
  es: 'Verificado',
  pt: 'Verificado',
};

/** Localized user-visible freshness label, e.g. "Verified: 2026-06-15". */
export function freshnessLabel(lang: Lang, lastVerified: string): string {
  return `${VERIFIED_LABEL[lang]}: ${lastVerified}`;
}

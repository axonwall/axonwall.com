import releasesData from '@/data/releases.json';

export interface ReleaseNoteEntry {
  readonly version: string;
  readonly date: string;
  readonly tag: string;
  readonly highlights: readonly string[];
}

export interface ReleaseChangelogItem extends ReleaseNoteEntry {
  readonly tagName: string;
  readonly displayDate: string;
  readonly badge: string;
}

const SEMVER_RE = /^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/;
const ISO_DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

const LONG_DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

/** Format a release version string with a leading `v` prefix when absent. */
export function formatReleaseTag(version: string): string {
  const trimmed = version.trim();
  return trimmed.startsWith('v') ? trimmed : `v${trimmed}`;
}

/** Format an ISO `YYYY-MM-DD` date into a long UTC display date, or pass historical ranges through. */
export function formatDisplayDate(date: string): string {
  const trimmed = date.trim();
  const match = ISO_DATE_RE.exec(trimmed);
  if (!match) {
    return trimmed;
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const utc = new Date(Date.UTC(year, month - 1, day));
  if (
    utc.getUTCFullYear() !== year ||
    utc.getUTCMonth() !== month - 1 ||
    utc.getUTCDate() !== day
  ) {
    return trimmed;
  }
  return LONG_DATE_FORMATTER.format(utc);
}

const rawReleases = releasesData as ReleaseNoteEntry[];
if (!Array.isArray(rawReleases) || rawReleases.length === 0) {
  throw new Error('src/data/releases.json must contain at least one release entry');
}

const latestEntry = rawReleases[0];
const normalizedLatestVersion = latestEntry.version.trim().replace(/^v/, '');
if (!SEMVER_RE.test(normalizedLatestVersion)) {
  throw new Error(
    `src/data/releases.json[0].version "${latestEntry.version}" must be valid semver`
  );
}

export const RELEASES: readonly ReleaseNoteEntry[] = rawReleases;
export const LATEST_RELEASE: ReleaseNoteEntry = latestEntry;

export const RELEASE_VERSION: string = normalizedLatestVersion;
export const RELEASE_TAG: string = `v${RELEASE_VERSION}`;
export const RELEASE_DATE: string = latestEntry.date.trim();
export const RELEASE_DATE_LONG: string = formatDisplayDate(RELEASE_DATE);

export const GITHUB_REPO_URL = 'https://github.com/axonwall/axonwall';
export const GITHUB_RELEASE_URL = `${GITHUB_REPO_URL}/releases/tag/${RELEASE_TAG}`;

/** Build a GitHub Releases asset download URL for the specified release tag. */
export function releaseAssetUrl(filename: string, tag: string = RELEASE_TAG): string {
  return `${GITHUB_REPO_URL}/releases/download/${tag}/${filename}`;
}

export const RELEASE_CHANGELOG: readonly ReleaseChangelogItem[] = RELEASES.map((entry, idx) => ({
  ...entry,
  tagName: formatReleaseTag(entry.version),
  displayDate: formatDisplayDate(entry.date),
  badge: idx === 0 ? 'Latest Release' : entry.tag,
}));

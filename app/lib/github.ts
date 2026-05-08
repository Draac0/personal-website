export type ContribDay = {
  date: string;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContribData = {
  total: number;
  days: ContribDay[]; // chronological, oldest → newest
  weeks: ContribDay[][]; // weeks[col][row]; row 0 = Sunday, row 6 = Saturday
  username: string;
  fetchedAt: string;
};

export const PRIMARY_USERNAME = "asriram-bbp";

const TD_RE = /<td[^>]*class="ContributionCalendar-day"[^>]*>/g;
const ATTR_DATE = /data-date="([^"]+)"/;
const ATTR_LEVEL = /data-level="([0-9])"/;
// GitHub encodes the cell's grid position in the id as row-col,
// where row 0 = Sunday and col 0 = leftmost (oldest) week.
const ATTR_ID = /id="contribution-day-component-(\d+)-(\d+)"/;
const TOTAL_RE = /([0-9,]+)\s+contribution/;

function clampLevel(n: number): ContribDay["level"] {
  if (n <= 0) return 0;
  if (n >= 4) return 4;
  return n as ContribDay["level"];
}

export async function fetchContributions(
  username: string = PRIMARY_USERNAME
): Promise<ContribData> {
  const url = `https://github.com/users/${username}/contributions`;
  let html = "";
  try {
    const res = await fetch(url, {
      next: { revalidate: 60 * 60 * 24 },
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });
    if (res.ok) html = await res.text();
  } catch {
    html = "";
  }

  type Cell = { row: number; col: number; date: string; level: ContribDay["level"] };
  const cells: Cell[] = [];

  for (const td of html.match(TD_RE) ?? []) {
    const date = td.match(ATTR_DATE)?.[1];
    const lvl = td.match(ATTR_LEVEL)?.[1];
    const id = td.match(ATTR_ID);
    if (!date || lvl === undefined || !id) continue;
    cells.push({
      row: parseInt(id[1], 10),
      col: parseInt(id[2], 10),
      date,
      level: clampLevel(parseInt(lvl, 10)),
    });
  }

  const maxCol = cells.reduce((m, c) => (c.col > m ? c.col : m), -1);
  const weeks: ContribDay[][] = [];
  for (let col = 0; col <= maxCol; col++) {
    const week: ContribDay[] = [];
    for (let row = 0; row < 7; row++) week.push({ date: "", level: 0 });
    weeks.push(week);
  }
  for (const c of cells) {
    if (weeks[c.col] && c.row >= 0 && c.row < 7) {
      weeks[c.col][c.row] = { date: c.date, level: c.level };
    }
  }

  const days: ContribDay[] = cells
    .filter((c) => c.date)
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((c) => ({ date: c.date, level: c.level }));

  const totalMatch = html.match(TOTAL_RE);
  const total = totalMatch
    ? parseInt(totalMatch[1].replace(/,/g, ""), 10)
    : days.reduce((s, d) => s + (d.level > 0 ? 1 : 0), 0);

  return {
    total,
    days,
    weeks,
    username,
    fetchedAt: new Date().toISOString(),
  };
}

export function currentStreak(days: ContribDay[]): number {
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].level > 0) streak++;
    else break;
  }
  return streak;
}

export function maxStreak(days: ContribDay[]): number {
  let max = 0;
  let cur = 0;
  for (const d of days) {
    if (d.level > 0) {
      cur++;
      if (cur > max) max = cur;
    } else cur = 0;
  }
  return max;
}

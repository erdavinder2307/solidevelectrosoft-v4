import { useEffect, useState } from 'react';

const STATS_URL = 'https://raw.githubusercontent.com/erdavinder2307/ai-team-stats/master/stats.json';
const TIMEOUT_MS = 3000;

const COUNT_FIELDS = ['improvementsShipped', 'checksRun', 'problemsCaught', 'problemsFixed', 'reviewsWritten'];

// Shown straight away, and kept if the live file is slow, missing or malformed (values of 30 Sep 2026).
export const FALLBACK_AI_TEAM_STATS = {
  updated: '2026-09-30T12:30:00+05:30',
  improvementsShipped: 37,
  checksRun: 33,
  problemsCaught: 16,
  problemsFixed: 7,
  reviewsWritten: 0,
};

const isCount = (value) => Number.isInteger(value) && value >= 0;

const parseStats = (data) => {
  if (!data || typeof data !== 'object') return null;
  if (!COUNT_FIELDS.every((field) => isCount(data[field]))) return null;
  if (Number.isNaN(Date.parse(data.updated))) return null;
  const stats = { updated: data.updated };
  COUNT_FIELDS.forEach((field) => { stats[field] = data[field]; });
  return stats;
};

export const formatStatsDate = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' });

/**
 * Live counters of our own AI team (public, counts only), refreshed daily.
 * Returns the fallback first, then the live values once they load.
 */
export const useAiTeamStats = () => {
  const [stats, setStats] = useState(FALLBACK_AI_TEAM_STATS);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    fetch(STATS_URL, { cache: 'no-cache', signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        const live = parseStats(data);
        if (live) setStats(live);
      })
      .catch(() => {})
      .finally(() => clearTimeout(timer));

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, []);

  return stats;
};

import { describe, expect, it } from 'vitest';
import { calculatePriorityScore, calculateRecencyScore, getTopNotifications, getTypeWeight, rankNotificationsByPriority } from './ranking';
import type { Notification } from '@/types/notification';

const referenceTime = new Date('2026-06-08T12:00:00Z');

const notifications: Notification[] = [
  {
    id: '1',
    title: 'Placement update',
    description: 'Company hiring round announced.',
    category: 'Placement',
    createdAt: '2026-06-08T11:00:00Z',
    viewed: false,
  },
  {
    id: '2',
    title: 'Result released',
    description: 'Final exam results are live.',
    category: 'Result',
    createdAt: '2026-06-07T12:00:00Z',
    viewed: false,
  },
  {
    id: '3',
    title: 'Campus event',
    description: 'Guest lecture tomorrow.',
    category: 'Event',
    createdAt: '2026-06-08T10:00:00Z',
    viewed: true,
  },
];

describe('Notification ranking utilities', () => {
  it('returns the correct type weight for each notification type', () => {
    expect(getTypeWeight('Placement')).toBe(3);
    expect(getTypeWeight('Result')).toBe(2);
    expect(getTypeWeight('Event')).toBe(1);
  });

  it('calculates a recency score that decreases as notifications age', () => {
    expect(calculateRecencyScore('2026-06-08T12:00:00Z', referenceTime)).toBe(5);
    expect(calculateRecencyScore('2026-06-08T06:00:00Z', referenceTime)).toBeGreaterThanOrEqual(4);
    expect(calculateRecencyScore('2026-06-04T12:00:00Z', referenceTime)).toBe(0);
  });

  it('calculates a combined priority score using type weight plus recency', () => {
    const score = calculatePriorityScore(notifications[0], referenceTime);
    expect(score).toBeGreaterThanOrEqual(3);
    expect(score).toBeLessThanOrEqual(8);
  });

  it('sorts notifications by priority score and supports stable tie-breaking', () => {
    const ranked = rankNotificationsByPriority(notifications, { referenceTime });

    expect(ranked[0].id).toBe('1');
    expect(ranked[1].id).toBe('3');
    expect(ranked[2].id).toBe('2');
  });

  it('returns the requested top N notifications efficiently', () => {
    const top2 = getTopNotifications(notifications, 2, referenceTime);

    expect(top2).toHaveLength(2);
    expect(top2.map(item => item.id)).toEqual(['1', '3']);
  });
});

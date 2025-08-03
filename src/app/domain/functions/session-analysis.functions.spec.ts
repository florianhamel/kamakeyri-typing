import { generateSessionRecord } from '../../application/mocks/factories.tools';
import { SessionRecord } from '../types/session.types';
import { computeAccuracy, computeAccuracyDailyAverages } from './session-analysis.functions';

describe('SessionAnalysisFunctions', () => {
  it('should return up to one year averages by week when called', () => {
    // given
    const records: SessionRecord[] = [];
    const record0 = generateSessionRecord(new Date(2025, 2, 7));
    const record1 = generateSessionRecord(new Date(2025, 2, 7));
    const record2 = generateSessionRecord(new Date(2024, 1, 7));
    const record3 = generateSessionRecord(new Date(2025, 6, 12));
    const record4 = generateSessionRecord(new Date(2025, 6, 12));
    const record5 = generateSessionRecord(new Date(2025, 6, 13));
    records.push(record0, record1, record2, record3, record4, record5);

    // when
    const output = computeAccuracyDailyAverages(records);

    // then
    expect(output.length).toBe(4);
    expect(output[0]).toEqual({
      day: record0.createDate,
      average: (computeAccuracy(record0) + computeAccuracy(record1)) / 2
    });
    expect(output[1]).toEqual({ day: record2.createDate, average: computeAccuracy(record2) });
    expect(output[2]).toEqual({
      day: record3.createDate,
      average: (computeAccuracy(record3) + computeAccuracy(record4)) / 2
    });
    expect(output[3]).toEqual({ day: record5.createDate, average: computeAccuracy(record5) });
  });
});

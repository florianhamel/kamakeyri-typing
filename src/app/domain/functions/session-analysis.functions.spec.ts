import { generateSessionRecord } from '../../application/mocks/factories.tools';
import { SessionRecord } from '../types/session.types';
import { accuracy, computeAccuracyAveragesPerDay } from './session-analysis.functions';

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
    const output = computeAccuracyAveragesPerDay(records);

    // then
    expect(output.length).toBe(4);
    expect(output[0]).toEqual({ average: (accuracy(record0) + accuracy(record1)) / 2, date: record0.createDate });
    // expect(output[1]).toEqual(accuracy(record2));
    // expect(output[2]).toEqual((accuracy(record3) + accuracy(record4)) / 2);
    // expect(output[3]).toEqual(accuracy(record5));
  });
});

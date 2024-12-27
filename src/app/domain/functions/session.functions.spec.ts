import { SessionChar } from '../types/session.types';
import { initSessionChars } from './session-common.functions';
import { isUsInternational } from '../layouts/us-international.layout';

describe('session functions', () => {
  it('should init session chars', () => {
    // given
    const specialChar = '†';
    const content = 'Hi!' + specialChar;

    // when
    const sessionChars: ReadonlyArray<SessionChar> = initSessionChars(content, isUsInternational);

    // then
    expect(sessionChars.length).toBe(content.length);
    for (let i = 0; i < content.length; ++i) {
      expect(sessionChars[i].target).toBe(content[i]);
      expect(sessionChars[i].input).toBeNull();
      expect(sessionChars[i].enabled).toBe(content[i] !== specialChar);
      expect(sessionChars[i].isComposing).toBe(false);
    }
  });
});

import { ComponentHarness } from '@angular/cdk/testing';

export class SessionDataComponentHarness extends ComponentHarness {
  static hostSelector = 'kw-session-data';

  async debugInnerHTML(): Promise<string> {
    return (await this.host()).getProperty('innerHTML');
  }
}

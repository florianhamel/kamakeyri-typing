import { ComponentHarness } from '@angular/cdk/testing';

export class TmpTestComponentHarness extends ComponentHarness {
  static hostSelector = 'kw-tmp-test';

  public async debugInnerHTML(): Promise<string> {
    return (await this.host()).getProperty('innerHTML');
  }
}

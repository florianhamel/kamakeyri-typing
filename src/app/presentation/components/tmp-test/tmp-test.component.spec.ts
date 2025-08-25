import { Component } from '@angular/core';

import { TmpTestComponent } from './tmp-test.component';

@Component({
  imports: [TmpTestComponent],
  template: ` <div>
    <kw-tmp-test></kw-tmp-test>
  </div>`,
  standalone: true
})
class TestHost {}

describe('TmpTestComponent', () => {
  beforeEach(() => {});

  it('tmp', async () => {});
});

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TmpTestComponent } from './tmp-test.component';
import { TmpTestComponentHarness } from './tmp-test.component.harness';

@Component({
  imports: [TmpTestComponent],
  template: `<kw-tmp-test></kw-tmp-test>`,
  standalone: true
})
class TestHost {}

describe('TmpTestComponent', () => {
  let hostFixture: ComponentFixture<TestHost>;
  let harnessLoader: HarnessLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHost]
    });
      // .compileComponents()
      // .then(() => {
        hostFixture = TestBed.createComponent(TestHost);
        hostFixture.detectChanges();
      //   hostFixture.whenStable();
      // })
      // .then(() => {
        harnessLoader = TestbedHarnessEnvironment.loader(hostFixture);
      // });
  });

  it('tmp', async () => {
    harnessLoader = TestbedHarnessEnvironment.loader(hostFixture);
    const tmpHarness = await harnessLoader.getHarness(TmpTestComponentHarness);
    console.log('innerHTML', await tmpHarness.debugInnerHTML());
  });
});

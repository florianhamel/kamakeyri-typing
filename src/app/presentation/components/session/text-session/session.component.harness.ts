import { ComponentHarness } from '@angular/cdk/testing';

export class SessionComponentHarness extends ComponentHarness {
  static readonly hostSelector = 'kw-session';

  private container = this.locatorFor('div');
  private optionalTextarea = this.locatorForOptional('textarea');

  async clickContainer(): Promise<void> {
    return (await this.container()).click();
  }

  async isTextareaFocused(): Promise<boolean> {
    const textarea = await this.optionalTextarea();

    return textarea?.matchesSelector(':focus') ?? false;
  }

  async fireKeyboardEvent(key: string): Promise<void> {
    (await this.optionalTextarea())?.sendKeys(key);
    (await this.optionalTextarea())?.dispatchEvent('beforeinput', {
      data: key,
      inputType: 'insertText',
      isComposing: false
    });
  }
}

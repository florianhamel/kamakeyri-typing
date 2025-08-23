export const actionDispatched = (): { functional: true; dispatch: true } =>
  Object.freeze({
    functional: true,
    dispatch: true
  });

export const noActionDispatched = (): { functional: true; dispatch: false } =>
  Object.freeze({
    functional: true,
    dispatch: false
  });

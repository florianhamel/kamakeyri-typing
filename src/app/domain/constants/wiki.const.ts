export const WikiKey = {
  randomKey: 'ArrowLeft',
  relatedKey: 'ArrowRight'
};
export type WikiKey = (typeof WikiKey)[keyof typeof WikiKey];

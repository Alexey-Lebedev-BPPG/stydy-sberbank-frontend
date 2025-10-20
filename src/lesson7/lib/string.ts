import _ from 'lodash';

export const capitalize = (str: string): string => _.capitalize(str);

export const reverse = (str: string): string =>
  str.split('').reverse().join('');

export const stringInfo = (str: string): { length: number; words: number } => ({
  length: str.length,
  words: str.split(' ').length,
});

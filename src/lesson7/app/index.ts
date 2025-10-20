// @ts-ignore для того, чтоб не было варнинга о неиспользуемой функции
import { add, multiply } from './utils';

console.log(add(2, 3));

import('./lazy-module').then(module => {
  module.default();
});

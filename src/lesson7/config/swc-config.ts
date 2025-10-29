import type { Config } from '@swc/core';

export const swcConfig: Config = {
  jsc: {
    parser: {
      syntax: 'typescript',
      tsx: false,
      decorators: false,
      dynamicImport: true,
    },
    target: 'es2020',
    transform: { useDefineForClassFields: true },
    minify: { compress: { unused: true, dead_code: true }, mangle: true },
  },
  minify: true,
  sourceMaps: true,
  module: { type: 'es6' },
};

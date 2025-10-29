import { ModuleConfig, transform } from '@swc/core';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, extname, basename } from 'path';

const buildWithSWC = async (): Promise<void> => {
  const files = [
    'src/lesson7/lib/index.ts',
    'src/lesson7/lib/math.tsx',
    'src/lesson7/lib/string.ts',
  ];

  const configs: Array<{ type: ModuleConfig['type']; outDir: string }> = [
    { type: 'es6', outDir: 'src/lesson7/dist/swc-lib/esm' },
    { type: 'commonjs', outDir: 'src/lesson7/dist/swc-lib/cjs' },
  ];

  for (const config of configs) {
    for (const file of files) {
      try {
        const code = readFileSync(file, 'utf-8');

        const result = await transform(code, {
          jsc: {
            parser: { syntax: 'typescript', tsx: true },
            target: 'es2020',
            minify: { compress: true, mangle: true },
          },
          minify: true,
          sourceMaps: true,
          module: { type: config.type },
        });

        const outputDir = config.outDir;
        if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });

        const outputFile = join(
          outputDir,
          basename(file, extname(file)) +
            (config.type === 'es6' ? '.mjs' : '.cjs'),
        );

        writeFileSync(outputFile, result.code);

        if (result.map) writeFileSync(outputFile + '.map', result.map);

        console.log(`Built: ${outputFile}`);
      } catch (error) {
        console.error(`Error building ${file}:`, error);
      }
    }
  }
};

buildWithSWC().catch(console.error);

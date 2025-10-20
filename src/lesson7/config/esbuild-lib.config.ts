import esbuild from 'esbuild';

const buildLibrary = async (): Promise<void> => {
  const baseConfig: esbuild.BuildOptions = {
    entryPoints: [
      'src/lesson7/lib/index.ts',
      'src/lesson7/lib/math.tsx',
      'src/lesson7/lib/string.ts',
    ],
    bundle: true,
    external: ['react', 'lodash'],
    platform: 'neutral',
    target: 'es2020',
  };

  try {
    // ESM
    await esbuild.build({
      ...baseConfig,
      format: 'esm',
      outdir: 'src/lesson7/dist/lib/esm',
      outExtension: { '.js': '.mjs' },
    });

    // CJS
    await esbuild.build({
      ...baseConfig,
      format: 'cjs',
      outdir: 'src/lesson7/dist/lib/cjs',
      outExtension: { '.js': '.cjs' },
    });

    console.log('Library build completed!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
};

buildLibrary();

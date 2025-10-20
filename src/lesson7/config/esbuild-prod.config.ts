import esbuild from 'esbuild';

const buildProduction = async (): Promise<void> => {
  try {
    await esbuild.build({
      entryPoints: ['src/lesson7/app/index.ts'],
      bundle: true,
      outdir: 'src/lesson7/dist/app.js',
      sourcemap: true,
      splitting: true,
      format: 'esm',
      minify: true,
      treeShaking: true,
      target: 'es2020',
    });

    console.log('Production build completed!');
  } catch (error) {
    console.error('Production build failed:', error);
    process.exit(1);
  }
};

buildProduction();

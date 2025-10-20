import esbuild from 'esbuild';

const startDevServer = async (): Promise<void> => {
  const ctx = await esbuild.context({
    entryPoints: ['src/lesson7/app/index.ts'],
    bundle: true,
    outdir: 'src/lesson7/dist/app.js',
    sourcemap: true,
    splitting: true,
    format: 'esm',
    minify: false,
    target: 'es2020',
  });

  // Watch режим
  await ctx.watch();
  console.log('Watching for changes...');

  // Запуск сервера
  const server = await ctx.serve({ servedir: '.', port: 3000 });

  console.log(`Server running at http://localhost:${server.port}`);
};

startDevServer().catch(error => {
  console.error('Dev server error:', error);
  process.exit(1);
});

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ['**/.*'],
  server: './server/index.ts',
  serverBuildPath: './build/index.js',
  serverDependenciesToBundle: 'all',
  // serverMinify: true,
  serverModuleFormat: 'cjs',
  watchPaths: ['./server/**/*.ts'],
}

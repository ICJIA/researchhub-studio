module.exports = {
  apiBaseURL:
    process.env.VUE_APP_API_BASE_URL || 'https://researchhub.icjia-api.cloud',
  github: 'https://github.com/icjia/researchhub-studio',
  main: {
    baseURL:
      process.env.VUE_APP_MAIN_BASE_URL ||
      'https://icjia.illinois.gov/researchhub',
    buildHook: process.env.VUE_APP_MAIN_BUILD_HOOK
  },
  publicPath: process.env.VUE_APP_PUBLIC_PATH || '/researchhub/studio/'
}

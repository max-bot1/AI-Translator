// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
		OPENAI_API_KEY: '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'
	},})
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
		OPENAI_API_KEY: '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'
	},})
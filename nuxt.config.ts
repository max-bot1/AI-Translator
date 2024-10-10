// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
		OPENAI_API_KEY: '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'
	},})
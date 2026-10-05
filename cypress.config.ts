import { defineConfig } from 'cypress'

export default defineConfig({
  env: {
    baseUrl: process.env.baseUrl,
    CYPRESS_RECORD_KEY: process.env.CYPRESS_RECORD_KEY,
    CYPRESS_PROJECT_ID: process.env.CYPRESS_PROJECT_ID,
    CYPRESS_DIALECT: process.env.CYPRESS_DIALECT,
  },
  e2e: {
    supportFile: false,
  },
})

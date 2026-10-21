import { defineConfig } from 'cypress'
import createBundler from '@bahmutov/cypress-esbuild-preprocessor'
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor'
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild'

export default defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    specPattern: 'cypress/e2e/features/**/*.feature',
    supportFile: 'cypress/support/e2e.ts',
    viewportWidth: 1280,
    viewportHeight: 800,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    video: false,
    screenshotOnRunFailure: false,
    experimentalRunAllSpecs: false,
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config)
      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      )
      return config
    },
  },
})

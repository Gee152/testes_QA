import './commands'

// Suppress uncaught exceptions from DemoQA (external ads/scripts)
Cypress.on('uncaught:exception', () => false)

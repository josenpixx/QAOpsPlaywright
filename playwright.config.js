// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 40000,
    workers: 2,
  expect : {
     timeout: 5000,
  },
  reporter : [
    ['html'],['allure-playwright']
  ],
  use: {
    browserName: 'chromium',
    headless : true,
  
    launchOptions: {
            slowMo: 1
    },
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure'
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  
  },


});
module.exports = config

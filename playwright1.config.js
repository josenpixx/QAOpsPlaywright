// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 40000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
  retries: 1, //указываешь количество повторов теста в случае его падения
  
  projects: [
    {
      name: "safari",
      use: {
        browserName: 'webkit',
        headless: true,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        ...devices['iPhone 15 Pro Max'],
        launchOptions: {
          slowMo: 100
        },
      
      },
    },
    {
      name: "chrome",
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        //viewport: { width: 720, height: 720 },
        //...devices['Galaxy S9+'], 
        ignoreHTTPSErrors: true,
        permissions: ['geolocation'],
        video: 'retain-on-failure',
      }

    }
  ]

});
module.exports = config

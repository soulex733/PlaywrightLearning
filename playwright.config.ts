import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

require('dotenv').config();

export default defineConfig<TestOptions>({
  /* Run tests in files in parallel */
  fullyParallel: true,

  retries: 1,
  reporter: 'html',
  
  use: {
    globalsQaUrl: 'https://www.globalsqa.com/demo-site/draganddrop/',
    baseURL: process.env.DEV === '1' ? 'http://localhost:4201'
        : process.env.STAGING === '2' ? 'http://localhost:4202'
        : 'http://localhost:4200',

    trace: 'on-first-retry',
    actionTimeout: 20000,
    navigationTimeout: 25000,
    video: {
      mode: 'off',
      size: {width: 1920, height: 1080}
    }
  },

projects: [
    {
      name: 'dev',
      use: { ...devices['Desktop Chrome'], 
      baseURL: 'http://localhost:4201'
    },
    },

    {
      name: 'staging',
      use: { ...devices['Desktop Chrome'],
      baseURL: 'http://localhost:4202'
    },
    },

    {
      name: 'chromium',
    },

    {
      name: 'firefox',
      use: {
        browserName: 'firefox'
      }
    },

    

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

});

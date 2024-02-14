### Ngx-Admin Angular 14 application from akveo.com

This is modified and more lightweight version of original application to practice UI Automation with Playwright.

The original repo is here: https://github.com/akveo/ngx-admin

Install playwright 
npm init playwright@latest --force

Run server
npm start

Run test
npx playwright test

Show report
npx playwright show-report

Run test in specific browser
npx playwright test --project=chromium

Run test in ui mode
npx playwright test --ui
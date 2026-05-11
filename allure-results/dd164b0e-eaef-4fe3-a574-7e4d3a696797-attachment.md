# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: homeworks/homework2.spec.js >> buying a non-refundable tickets
- Location: tests/homeworks/homework2.spec.js:54:5

# Error details

```
Test timeout of 40000ms exceeded.
```

```
Error: locator.click: Test timeout of 40000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'View My Bookings' })

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - navigation [ref=e2]:
    - generic [ref=e4]:
      - link "EventHub" [ref=e5] [cursor=pointer]:
        - /url: /
        - img [ref=e7]
        - generic [ref=e9]: EventHub
      - generic [ref=e10]:
        - link "Home" [ref=e11] [cursor=pointer]:
          - /url: /
        - link "Events" [ref=e12] [cursor=pointer]:
          - /url: /events
        - link "My Bookings" [ref=e13] [cursor=pointer]:
          - /url: /bookings
        - link "API Docs" [ref=e14] [cursor=pointer]:
          - /url: https://api.eventhub.rahulshettyacademy.com/api/docs
        - button "Admin" [ref=e16] [cursor=pointer]:
          - text: Admin
          - img [ref=e17]
        - generic [ref=e19]:
          - generic "dontshakeit@gmail.com" [ref=e20]
          - button "Logout" [ref=e21] [cursor=pointer]
  - main [ref=e22]:
    - generic [ref=e23]:
      - navigation [ref=e24]:
        - link "Events" [ref=e25] [cursor=pointer]:
          - /url: /events
        - generic [ref=e26]: /
        - generic [ref=e27]: Dilli Diwali Mela
      - generic [ref=e28]:
        - generic [ref=e29]:
          - img "Dilli Diwali Mela" [ref=e31]
          - generic [ref=e32]:
            - generic [ref=e33]:
              - generic [ref=e34]: Festival
              - generic [ref=e35]: Featured
            - heading "Dilli Diwali Mela" [level=1] [ref=e36]
            - generic [ref=e37]:
              - img [ref=e38]
              - text: This is a featured event — always available for practice
            - generic [ref=e40]:
              - generic [ref=e41]:
                - generic [ref=e42]: 📅
                - generic [ref=e43]:
                  - paragraph [ref=e44]: Date
                  - paragraph [ref=e45]: Tuesday, 20 October
              - generic [ref=e46]:
                - generic [ref=e47]: 🕐
                - generic [ref=e48]:
                  - paragraph [ref=e49]: Time
                  - paragraph [ref=e50]: 08:00 pm
              - generic [ref=e51]:
                - generic [ref=e52]: 📍
                - generic [ref=e53]:
                  - paragraph [ref=e54]: Venue
                  - paragraph [ref=e55]: Pragati Maidan Exhibition Grounds
              - generic [ref=e56]:
                - generic [ref=e57]: 🌆
                - generic [ref=e58]:
                  - paragraph [ref=e59]: City
                  - paragraph [ref=e60]: Delhi
              - generic [ref=e61]:
                - generic [ref=e62]: 🎫
                - generic [ref=e63]:
                  - paragraph [ref=e64]: Available
                  - paragraph [ref=e65]: 9993 / 10000 seats
              - generic [ref=e66]:
                - generic [ref=e67]: 💰
                - generic [ref=e68]:
                  - paragraph [ref=e69]: Price per ticket
                  - paragraph [ref=e70]: $300
            - generic [ref=e71]:
              - heading "About this event" [level=2] [ref=e72]
              - paragraph [ref=e73]: Celebrate the Festival of Lights at the grandest Diwali Mela in North India. Enjoy 200+ stalls of artisanal crafts, street food, folk performances, fireworks, and cultural showcases spanning three vibrant evenings.
        - generic [ref=e75]:
          - generic [ref=e76]:
            - heading "Book Tickets" [level=2] [ref=e77]
            - generic [ref=e78]: $300
          - paragraph [ref=e79]: per ticket
          - generic [ref=e80]:
            - generic [ref=e81]:
              - generic [ref=e82]: Tickets
              - generic [ref=e83]:
                - button "−" [ref=e84] [cursor=pointer]
                - generic [ref=e85]: "3"
                - button "+" [ref=e86] [cursor=pointer]
                - generic [ref=e87]: (max 10)
            - generic [ref=e88]:
              - generic [ref=e89]: Full Name*
              - textbox "Full Name*" [ref=e90]:
                - /placeholder: Your full name
                - text: Josen Pix
            - generic [ref=e91]:
              - generic [ref=e92]: Email*
              - textbox "Email*" [ref=e93]:
                - /placeholder: you@email.com
                - text: dontshakeit@gmail.com
            - generic [ref=e94]:
              - generic [ref=e95]: Phone Number*
              - textbox "Phone Number*" [active] [ref=e96]:
                - /placeholder: +91 98765 43210
                - text: "+9999912121"
            - generic [ref=e97]:
              - generic [ref=e98]:
                - generic [ref=e99]: $300 × 3 tickets
                - generic [ref=e100]: $900
              - generic [ref=e101]:
                - generic [ref=e102]: Total
                - generic [ref=e103]: $900
            - button "Confirm Booking" [ref=e104] [cursor=pointer]
  - contentinfo [ref=e105]:
    - generic [ref=e106]:
      - generic [ref=e107]:
        - generic [ref=e108]:
          - heading "Rahul Shetty Academy" [level=3] [ref=e109]
          - paragraph [ref=e110]: India's leading QA automation training academy — empowering engineers to build real-world testing skills.
        - generic [ref=e111]:
          - heading "Popular Courses" [level=3] [ref=e112]
          - list [ref=e113]:
            - listitem [ref=e114]:
              - link "Selenium WebDriver with Java" [ref=e115] [cursor=pointer]:
                - /url: https://rahulshettyacademy.com
            - listitem [ref=e116]:
              - link "Playwright with JavaScript" [ref=e117] [cursor=pointer]:
                - /url: https://rahulshettyacademy.com
            - listitem [ref=e118]:
              - link "RestAssured API Testing" [ref=e119] [cursor=pointer]:
                - /url: https://rahulshettyacademy.com
            - listitem [ref=e120]:
              - link "Cypress End-to-End Testing" [ref=e121] [cursor=pointer]:
                - /url: https://rahulshettyacademy.com
            - listitem [ref=e122]:
              - link "Appium Mobile Testing" [ref=e123] [cursor=pointer]:
                - /url: https://rahulshettyacademy.com
        - generic [ref=e124]:
          - heading "QA Job Hiring Platform" [level=3] [ref=e125]
          - paragraph [ref=e126]: Get hired faster — take skill assessments trusted by top QA employers worldwide.
          - link "techsmarthire.com →" [ref=e127] [cursor=pointer]:
            - /url: https://techsmarthire.com
        - generic [ref=e128]:
          - heading "EventHub Practice App" [level=3] [ref=e129]
          - list [ref=e130]:
            - listitem [ref=e131]:
              - link "Browse Events" [ref=e132] [cursor=pointer]:
                - /url: /events
            - listitem [ref=e133]:
              - link "My Bookings" [ref=e134] [cursor=pointer]:
                - /url: /bookings
            - listitem [ref=e135]:
              - link "Manage Events" [ref=e136] [cursor=pointer]:
                - /url: /admin/events
            - listitem [ref=e137]:
              - link "API Documentation" [ref=e138] [cursor=pointer]:
                - /url: https://api.eventhub.rahulshettyacademy.com/api/docs
      - generic [ref=e139]:
        - paragraph [ref=e140]: © 2026 Rahul Shetty Academy. All rights reserved.
        - generic [ref=e141]:
          - link "rahulshettyacademy.com →" [ref=e142] [cursor=pointer]:
            - /url: https://rahulshettyacademy.com
          - link "techsmarthire.com →" [ref=e143] [cursor=pointer]:
            - /url: https://techsmarthire.com
  - alert [ref=e144]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
  4  | // ── Credentials ────────────────────────────────────────────────────────────────
  5  | const USER_EMAIL    = 'dontshakeit@gmail.com';
  6  | const USER_PASSWORD = 'Jojobinx321!'; 
  7  | // ── Helpers ────────────────────────────────────────────────────────────────────
  8  | async function loginAndGoToBooking(page){
  9  |     await page.goto(`${BASE_URL}/login`);
  10 | 
  11 |     await page.getByPlaceholder('you@email.com').fill(USER_EMAIL);
  12 |     await page.getByLabel('Password').fill(USER_PASSWORD);
  13 |     await page.locator('#login-btn').click();
  14 |     await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
  15 | 
  16 | }
  17 | test ('buying a refundable ticket', async ({page})=> {
  18 | 
  19 | //step 1
  20 | await loginAndGoToBooking(page);
  21 | 
  22 | //step 2
  23 | await page.goto(`${BASE_URL}/events`);
  24 | await page.getByTestId('event-card').first().getByTestId('book-now-btn').click();
  25 | 
  26 | await page.getByPlaceholder('Your full name').fill('Josen Pix');
  27 | await page.getByPlaceholder('you@email.com').fill(USER_EMAIL);
  28 | await page.getByPlaceholder('+91 98765 43210').fill('+9999912121');
  29 | await page.getByRole('button', {name: "Confirm Booking"}).click();
  30 | 
  31 | //step 3
  32 | await page.getByRole("button", {name: "View My Bookings"}).click();
  33 | await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  34 | await page.getByTestId('booking-card').first().getByRole('button', {name: "View Details"}).click();
  35 | await expect(page.locator("main")).toContainText('Booking Information');
  36 | 
  37 | //step 4
  38 | const bookingRef = (await page.locator(".flex .items-center.gap-3").textContent()).trim();
  39 | const bookingTitle = (await page.locator("h1").textContent()).trim();
  40 | await expect (bookingRef[0]).toBe(bookingTitle[0]);
  41 | 
  42 | //step 5
  43 | await page.getByTestId('check-refund-btn').click();
  44 | await expect(page.locator('#refund-spinner')).toBeVisible({ timeout: 500 });
  45 | await expect(page.locator('#refund-spinner')).toBeHidden({ timeout: 6000 });
  46 | 
  47 | //step 6
  48 | await expect(page.locator("#refund-result")).toBeVisible();
  49 | await expect(page.locator("#refund-result")).toContainText("Eligible for refund.");
  50 | await expect(page.locator("#refund-result")).toContainText("Single-ticket bookings qualify for a full refund.");
  51 | 
  52 | });
  53 | 
  54 | test ('buying a non-refundable tickets', async ({page})=> {
  55 | 
  56 | //step 1
  57 | await loginAndGoToBooking(page);
  58 | 
  59 | //step 2
  60 | await page.goto(`${BASE_URL}/events`);
  61 | await page.getByTestId('event-card').first().getByTestId('book-now-btn').click();
  62 | 
  63 | await page.getByRole('button', {name: "+"}).dblclick();
  64 | await page.getByPlaceholder('Your full name').fill('Josen Pix');
  65 | await page.getByPlaceholder('you@email.com').fill(USER_EMAIL);
  66 | await page.getByPlaceholder('+91 98765 43210').fill('+9999912121');
  67 | await page.getByRole('button', {name: "Confirm Booking"});
  68 | 
  69 | //step 3
> 70 | await page.getByRole("button", {name: "View My Bookings"}).click();
     |                                                            ^ Error: locator.click: Test timeout of 40000ms exceeded.
  71 | await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  72 | await page.getByTestId('booking-card').first().getByRole('button', {name: "View Details"}).click();
  73 | await expect(page.getByText('Booking Information')).toBeVisible();
  74 | 
  75 | //step 4
  76 | const bookingRef = (await page.locator(".flex .items-center.gap-3").textContent()).trim();
  77 | const bookingTitle = (await page.locator("h1").textContent()).trim();
  78 | await expect (bookingRef[0]).toBe(bookingTitle[0]);
  79 | 
  80 | //step 5
  81 | await page.getByTestId('check-refund-btn').click();
  82 | await expect(page.locator('#refund-spinner')).toBeVisible({ timeout: 500 });
  83 | await expect(page.locator('#refund-spinner')).toBeHidden({ timeout: 6000 });
  84 | 
  85 | //step 6
  86 | await expect(page.locator("#refund-result")).toBeVisible();
  87 | await expect(page.locator("#refund-result")).toContainText("Not eligible for refund.");
  88 | await expect(page.locator("#refund-result")).toContainText("Group bookings (3 tickets) are non-refundable.");
  89 | 
  90 | });
  91 | 
  92 | 
```
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: homeworks/h4Optimized.spec.js >> Checking other's user booking
- Location: tests/homeworks/h4Optimized.spec.js:20:5

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Test source

```ts
  1  | import { test, expect, request } from "@playwright/test";
  2  | 
  3  | const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
  4  | const API_URL = 'https://api.eventhub.rahulshettyacademy.com/api';
  5  | // ── Credentials ────────────────────────────────────────────────────────────────
  6  | const GMAIL_USER = { email: 'molon@gmail.com', password: 'Shisha123!' };
  7  | const YAHOO_USER = { email: 'molon@yahoo.com', password: 'Shisha123!' };
  8  | 
  9  | 
  10 | async function loginAsGmail(page) {
  11 |     await page.goto(`${BASE_URL}/login`);
  12 |     await page.getByLabel('email').fill(GMAIL_USER.email);
  13 |     await page.locator('#password').fill(GMAIL_USER.password);
  14 |     await page.locator('#login-btn').click();
  15 |     await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
  16 | 
  17 | }
  18 | 
  19 | 
  20 | test("Checking other's user booking", async ({ page, request }) => {
  21 | 
  22 |     // ── Step 1: Login as Yahoo user via API and get token ─────────────────────
  23 |     const yahooResponse = await request.post(`${API_URL}/auth/login`,
  24 |         {
  25 |             data: YAHOO_USER
  26 |         });
  27 | 
  28 | 
  29 |     expect(yahooResponse.ok()).toBeTruthy();
  30 |     const yahooResponseJson = await yahooResponse.json();
  31 |     const tokenY = yahooResponseJson.token;
  32 |     console.log(tokenY);
  33 | 
  34 | 
  35 |     //Grab Event via API - step2
  36 |     const grabEvent = await request.get(`${API_URL}/events`,
  37 |         {
  38 |             headers: {
  39 |                 "Authorization": `Bearer ${tokenY}`
  40 |             }
  41 | 
  42 |         });
  43 | 
  44 |     expect(grabEvent.ok()).toBeTruthy()
  45 |     const grabEventJson = await grabEvent.json();
  46 |     const eventId = grabEventJson.data[0].id;
  47 | 
  48 |     //Create a booking via API as Yahoo user - Step3
  49 |     const yahooPayload = {
  50 |         "customerName": "Yahoo Man",
  51 |         "customerEmail": YAHOO_USER.email,
  52 |         "customerPhone": "6969696969",
  53 |         "quantity": 1,
  54 |         "eventId": eventId
  55 |     };
  56 | 
  57 | 
  58 |     const yahooBooking = await request.post(`${API_URL}bookings`,
  59 |         {
  60 |             headers: {
  61 |                 "Authorization": `Bearer ${tokenY}`
  62 |             },
  63 |             data: yahooPayload
  64 | 
  65 |         });
  66 | 
> 67 |     expect(yahooBooking.ok()).toBeTruthy();
     |                               ^ Error: expect(received).toBeTruthy()
  68 |     const yahooBookingJson = await yahooBooking.json();
  69 |     const yahooBookingId = yahooBookingJson.data.id;
  70 | 
  71 |     console.log(`Yahoo booking created via API. ID: ${yahooBookingId}`);
  72 | 
  73 | 
  74 |     //Step 4 — Login as Gmail user via browser UI
  75 |     await loginAsGmail(page);
  76 | 
  77 |     //step5
  78 |     await page.goto(`${BASE_URL}/bookings/${yahooBookingId}`);
  79 |     await page.waitForLoadState("networkidle");
  80 | 
  81 |     //step6
  82 |     await expect(page.getByText("Access Denied")).toBeVisible();
  83 |     await expect(page.getByText("You are not authorized to view this booking")).toBeVisible();
  84 | 
  85 | 
  86 | });
  87 | 
  88 | 
  89 | 
  90 | 
  91 | 
  92 | 
  93 | 
  94 | 
```
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: homeworks/createAndCheckEvent(E2E)TeacherAnswer.spec.js >> create event via UI, book it, and verify seat reduction
- Location: tests/homeworks/createAndCheckEvent(E2E)TeacherAnswer.spec.js:26:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'Browse Events →' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('link', { name: 'Browse Events →' })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e4]:
        - generic [ref=e5]:
          - generic [ref=e6]: RSA
          - generic [ref=e7]: Rahul Shetty Academy
        - generic [ref=e8]:
          - generic [ref=e13]: eventhub.app
          - img "EventHub app preview" [ref=e14]
        - list [ref=e16]:
          - listitem [ref=e17]:
            - generic [ref=e18]: ⚡
            - generic [ref=e19]: Live REST APIs — test real endpoints, not mocks
          - listitem [ref=e20]:
            - generic [ref=e21]: 🔒
            - generic [ref=e22]: Isolated sandbox — your data, your tests, no conflicts
          - listitem [ref=e23]:
            - generic [ref=e24]: 🎫
            - generic [ref=e25]: Auth, CRUD, bookings — flows you'll face on the job
          - listitem [ref=e26]:
            - generic [ref=e27]: 🤖
            - generic [ref=e28]: Built for Selenium, Playwright, RestAssured & more
      - generic [ref=e30]:
        - paragraph [ref=e31]: 50,000+
        - paragraph [ref=e32]: QA engineers trained worldwide
    - generic [ref=e34]:
      - generic [ref=e35]:
        - 'heading "The #1 QA Practice Hub for Automation Engineers" [level=2] [ref=e36]':
          - text: "The #1 QA Practice Hub"
          - text: for Automation Engineers
        - paragraph [ref=e37]: EventHub is a production-grade practice app designed so you can sharpen your testing skills on real-world scenarios — before your next interview or project.
      - link "API Documentation (Swagger)" [ref=e38] [cursor=pointer]:
        - /url: https://api.eventhub.rahulshettyacademy.com/api/docs
        - img [ref=e39]
        - text: API Documentation (Swagger)
      - generic [ref=e41]:
        - generic [ref=e42]:
          - img [ref=e44]
          - heading "Sign in to EventHub" [level=1] [ref=e46]
          - paragraph [ref=e47]: Enter your credentials to continue
        - generic [ref=e48]:
          - generic [ref=e49]:
            - generic [ref=e50]: Email
            - textbox "Email" [ref=e51]:
              - /placeholder: you@email.com
              - text: replacewithyourcredentials@gmail.com
          - generic [ref=e52]:
            - generic [ref=e53]: Password
            - textbox "Password" [ref=e54]:
              - /placeholder: ••••••
              - text: yourpassword
          - button "Sign In" [ref=e55] [cursor=pointer]
        - paragraph [ref=e56]:
          - text: Don't have an account?
          - link "Register" [ref=e57] [cursor=pointer]:
            - /url: /register
      - paragraph [ref=e58]:
        - text: A practice environment by
        - link "RahulShettyAcademy.com" [ref=e59] [cursor=pointer]:
          - /url: https://rahulshettyacademy.com
        - text: — used by QA engineers worldwide to master automation testing.
  - generic [ref=e61]:
    - generic [ref=e63]: ✕
    - paragraph [ref=e64]: Invalid email or password
    - button "Dismiss" [ref=e65] [cursor=pointer]: ×
  - alert [ref=e66]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | const BASE_URL      = 'https://eventhub.rahulshettyacademy.com'
  4   | // ── Credentials ────────────────────────────────────────────────────────────────
  5   | const USER_EMAIL    = 'replacewithyourcredentials@gmail.com';// update email and password with your account
  6   | const USER_PASSWORD = 'yourpassword'; 
  7   | 
  8   | // ── Helpers ────────────────────────────────────────────────────────────────────
  9   | async function login(page) {
  10  |   await page.goto(`${BASE_URL}/login`);
  11  | 
  12  |   // Located by placeholder
  13  |   await page.getByPlaceholder('you@email.com').fill(USER_EMAIL);
  14  | 
  15  |   // Located by label
  16  |   await page.getByLabel('Password').fill(USER_PASSWORD);
  17  | 
  18  |   // Located by id
  19  |   await page.locator('#login-btn').click();
  20  | 
> 21  |   await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
      |                                                                     ^ Error: expect(locator).toBeVisible() failed
  22  | }
  23  | 
  24  | 
  25  | // ── Test ───────────────────────────────────────────────────────────────────────
  26  | test('create event via UI, book it, and verify seat reduction', async ({ page }) => {
  27  | 
  28  |   // ── Step 1: Log in ───────────────────────────────────────────────────────
  29  |   await login(page);
  30  | 
  31  |   // ── Step 2: Create a new event via the admin form ────────────────────────
  32  |   await page.goto(`${BASE_URL}/admin/events`);
  33  | 
  34  |   // Unique title so we can find this exact card later
  35  |   const eventTitle = `Test Event ${Date.now()}`;
  36  | 
  37  |   // Located by id (explicit on the component)
  38  |   await page.locator('#event-title-input').fill(eventTitle);
  39  | 
  40  |   // Description — only textarea in the form
  41  |   await page.locator('#admin-event-form textarea').fill('Playwright test event');
  42  | 
  43  |   // Located by label (Select auto-generates id from label text)
  44  |   await page.getByLabel('City').fill('Test City');
  45  |   await page.getByLabel('Venue').fill('Test Venue');
  46  | 
  47  |   // datetime-local input — located by label
  48  |   await page.getByLabel('Event Date & Time').fill('2027-12-31T10:00');
  49  | 
  50  |   await page.getByLabel('Price ($)').fill('100');
  51  |   await page.getByLabel('Total Seats').fill('50');
  52  | 
  53  |   // Located by id
  54  |   await page.locator('#add-event-btn').click();
  55  | 
  56  |   // Wait for success toast
  57  |   await expect(page.getByText('Event created!')).toBeVisible();
  58  | 
  59  |   console.log(`Created event: "${eventTitle}"`);
  60  | 
  61  |   // ── Step 3: Go to Events page and find the newly created card ─────────────
  62  |   await page.goto(`${BASE_URL}/events`);
  63  | 
  64  |   // Located by data-testid
  65  |   const eventCards = page.getByTestId('event-card');
  66  |   await expect(eventCards.first()).toBeVisible();
  67  | 
  68  |   // Scan all visible event cards for the one matching our created title
  69  |   const targetCard = eventCards.filter({ hasText: eventTitle }).first();
  70  |   await expect(targetCard).toBeVisible({ timeout: 5000 });
  71  | 
  72  |   // Capture seat count before booking
  73  |   const seatsBeforeBooking = parseInt(await targetCard.getByText('seat').first().innerText());
  74  |   console.log(`Seats before booking: ${seatsBeforeBooking}`);
  75  | 
  76  |   // Located by data-testid inside the matched card
  77  |   await targetCard.getByTestId('book-now-btn').click();
  78  | 
  79  |   // ── Step 4: Fill the booking form ────────────────────────────────────────
  80  | 
  81  |   // Quantity defaults to 1 — verify via id
  82  |   const ticketCount = page.locator('#ticket-count');
  83  |   await expect(ticketCount).toHaveText('1');
  84  | 
  85  |   // Located by label
  86  |   await page.getByLabel('Full Name').fill('Test Student');
  87  | 
  88  |   // Located by id
  89  |   await page.locator('#customer-email').fill('test.student@example.com');
  90  | 
  91  |   // Located by placeholder
  92  |   await page.getByPlaceholder('+91 98765 43210').fill('9876543210');
  93  | 
  94  |   // Located by CSS class
  95  |   await page.locator('.confirm-booking-btn').click();
  96  | 
  97  |   // ── Step 5: Verify booking confirmation ──────────────────────────────────
  98  | 
  99  |   // Located by CSS class
  100 |   const bookingRefEl = page.locator('.booking-ref').first();
  101 |   await expect(bookingRefEl).toBeVisible();
  102 | 
  103 |   const bookingRef = (await bookingRefEl.innerText()).trim();
  104 |   expect(bookingRef.charAt(0)).toBe(eventTitle.trim().charAt(0).toUpperCase());
  105 | 
  106 |   console.log(`Booking confirmed. Ref: ${bookingRef}`);
  107 | 
  108 |   // ── Step 6: Verify booking appears in My Bookings ────────────────────────
  109 |   await page.getByRole('link', { name: 'View My Bookings' }).click();
  110 |   await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  111 | 
  112 |   // Located by id
  113 |   const bookingCards = page.locator('#booking-card');
  114 |   await expect(bookingCards.first()).toBeVisible();
  115 | 
  116 |   // Find the card that contains our booking ref (via CSS class inside the card)
  117 |   const matchingCard = bookingCards.filter({ has: page.locator('.booking-ref', { hasText: bookingRef }) });
  118 |   await expect(matchingCard).toBeVisible();
  119 | 
  120 |   // Verify event title also appears in the same card
  121 |   await expect(matchingCard).toContainText(eventTitle);
```
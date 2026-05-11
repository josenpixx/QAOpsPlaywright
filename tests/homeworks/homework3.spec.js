import { test, expect, request } from "@playwright/test";

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
// ── Credentials ────────────────────────────────────────────────────────────────
const GMAIL_USER = { email: 'dontshakeit@gmail.com', password: 'Jojobinx321!' };

async function loginAndGoToEvents(page) {
    await page.goto(`${BASE_URL}/login`);
    await page.getByLabel('email').fill(GMAIL_USER.email);
    await page.locator('#password').fill(GMAIL_USER.password);
    await page.locator('#login-btn').click();
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();

}

const SIX_EVENTS_RESPONSE = {
  data: [
    { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
    { id: 2, title: 'Rock Night Live',  category: 'Concert',    eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
    { id: 3, title: 'IPL Finals',       category: 'Sports',     eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
    { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
    { id: 5, title: 'Lollapalooza India', category: 'Festival', eventDate: '2025-06-20T12:00:00.000Z', venue: 'Mahalaxmi Racecourse', city: 'Mumbai', price: '3000', totalSeats: 5000, availableSeats: 2000, imageUrl: null, isStatic: false },
    { id: 6, title: 'AI & ML Expo',    category: 'Conference',  eventDate: '2025-06-25T10:00:00.000Z', venue: 'Bangalore International Exhibition Centre', city: 'Bangalore', price: '750', totalSeats: 300, availableSeats: 180, imageUrl: null, isStatic: false },
  ],
  pagination: { page: 1, totalPages: 1, total: 6, limit: 12 },
};

const FOUR_EVENTS_RESPONSE = {
  data: [
    { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
    { id: 2, title: 'Rock Night Live',  category: 'Concert',    eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
    { id: 3, title: 'IPL Finals',       category: 'Sports',     eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
    { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
  ],
  pagination: { page: 1, totalPages: 1, total: 4, limit: 12 },
};

// ── Test 1: Banner IS visible when 6 events are returned ───────────────────────────────────────────────
test ("Banner IS visible when 6 events are returned", async ({page})=>
//Step 1 — Set up the API mock
    {
    await page.route("**/api/events**", 
        async route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(SIX_EVENTS_RESPONSE)
            })
        });
//Step 2 — Login and navigate
await loginAndGoToEvents(page);

await Promise.all([ // нужно для гарантии, что запросы не свалятся если что-то пойдёт не так, например, быстрее инет и т.д.
    page.waitForResponse("**/api/events**"),
    page.getByRole('link', { name: 'Browse Events →' }).click()
]);


//Step 3 — Verify cards loaded from mock
const eventCard = await page.getByTestId('event-card');
await expect(eventCard.first()).toBeVisible();
await expect(eventCard).toHaveCount(6);

//Step 4 — Verify banner is visible
const regBanner = page.getByText(/sandbox holds up to/i);
await expect(regBanner).toBeVisible();
await expect(regBanner).toContainText('9 bookings');

});

test("Banner is NOT visible when 4 events are returned", async ({page})=>

//Step 1 — Set up the API mock
    {
    await page.route("https://api.eventhub.rahulshettyacademy.com/api/events*", 
        async route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(FOUR_EVENTS_RESPONSE)
            })
        });
//Step 2 - Step 2 — Login and navigate
await loginAndGoToEvents(page);

await Promise.all([ // нужно для гарантии, что запросы не свалятся если что-то пойдёт не так, например, быстрее инет и т.д.
    page.waitForResponse("https://api.eventhub.rahulshettyacademy.com/api/events*"),
    page.getByRole('link', { name: 'Browse Events →' }).click()
]);

//Step 3 — Verify cards loaded from mock
const eventCard = await page.getByTestId('event-card');
await expect(eventCard.first()).toBeVisible();
await expect(eventCard).toHaveCount(4);

//Step 4 — Verify banner is hidden

const regBanner = page.getByText(/sandbox holds up to/i);
await expect(regBanner).toBeHidden();
await page.pause();

});
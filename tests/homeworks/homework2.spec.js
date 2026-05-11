import { test, expect } from '@playwright/test';

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
// ── Credentials ────────────────────────────────────────────────────────────────
const USER_EMAIL    = 'dontshakeit@gmail.com';
const USER_PASSWORD = 'Jojobinx321!'; 
// ── Helpers ────────────────────────────────────────────────────────────────────
async function loginAndGoToBooking(page){
    await page.goto(`${BASE_URL}/login`);

    await page.getByPlaceholder('you@email.com').fill(USER_EMAIL);
    await page.getByLabel('Password').fill(USER_PASSWORD);
    await page.locator('#login-btn').click();
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();

}
test ('buying a refundable ticket', async ({page})=> {

//step 1
await loginAndGoToBooking(page);

//step 2
await page.goto(`${BASE_URL}/events`);
await page.getByTestId('event-card').first().getByTestId('book-now-btn').click();

await page.getByPlaceholder('Your full name').fill('Josen Pix');
await page.getByPlaceholder('you@email.com').fill(USER_EMAIL);
await page.getByPlaceholder('+91 98765 43210').fill('+9999912121');
await page.getByRole('button', {name: "Confirm Booking"}).click();

//step 3
await page.getByRole("button", {name: "View My Bookings"}).click();
await expect(page).toHaveURL(`${BASE_URL}/bookings`);
await page.getByTestId('booking-card').first().getByRole('button', {name: "View Details"}).click();
await expect(page.locator("main")).toContainText('Booking Information');

//step 4
const bookingRef = (await page.locator(".flex .items-center.gap-3").textContent()).trim();
const bookingTitle = (await page.locator("h1").textContent()).trim();
await expect (bookingRef[0]).toBe(bookingTitle[0]);

//step 5
await page.getByTestId('check-refund-btn').click();
await expect(page.locator('#refund-spinner')).toBeVisible({ timeout: 500 });
await expect(page.locator('#refund-spinner')).toBeHidden({ timeout: 6000 });

//step 6
await expect(page.locator("#refund-result")).toBeVisible();
await expect(page.locator("#refund-result")).toContainText("Eligible for refund.");
await expect(page.locator("#refund-result")).toContainText("Single-ticket bookings qualify for a full refund.");

});

test ('buying a non-refundable tickets', async ({page})=> {

//step 1
await loginAndGoToBooking(page);

//step 2
await page.goto(`${BASE_URL}/events`);
await page.getByTestId('event-card').first().getByTestId('book-now-btn').click();

await page.getByRole('button', {name: "+"}).dblclick();
await page.getByPlaceholder('Your full name').fill('Josen Pix');
await page.getByPlaceholder('you@email.com').fill(USER_EMAIL);
await page.getByPlaceholder('+91 98765 43210').fill('+9999912121');
await page.getByRole('button', {name: "Confirm Booking"});

//step 3
await page.getByRole("button", {name: "View My Bookings"}).click();
await expect(page).toHaveURL(`${BASE_URL}/bookings`);
await page.getByTestId('booking-card').first().getByRole('button', {name: "View Details"}).click();
await expect(page.getByText('Booking Information')).toBeVisible();

//step 4
const bookingRef = (await page.locator(".flex .items-center.gap-3").textContent()).trim();
const bookingTitle = (await page.locator("h1").textContent()).trim();
await expect (bookingRef[0]).toBe(bookingTitle[0]);

//step 5
await page.getByTestId('check-refund-btn').click();
await expect(page.locator('#refund-spinner')).toBeVisible({ timeout: 500 });
await expect(page.locator('#refund-spinner')).toBeHidden({ timeout: 6000 });

//step 6
await expect(page.locator("#refund-result")).toBeVisible();
await expect(page.locator("#refund-result")).toContainText("Not eligible for refund.");
await expect(page.locator("#refund-result")).toContainText("Group bookings (3 tickets) are non-refundable.");

});


import { test, expect, request } from "@playwright/test";

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const API_URL = 'https://api.eventhub.rahulshettyacademy.com/api/';
// ── Credentials ────────────────────────────────────────────────────────────────
const GMAIL_USER = { email: 'molon@gmail.com', password: 'Shisha123!' };
const YAHOO_USER = { email: 'molon@yahoo.com', password: 'Shisha123!' };
let tokenY;
let eventId;
let yahooBookingId;


async function loginAsGmail(page) {
    await page.goto(`${BASE_URL}/login`);
    await page.getByLabel('email').fill(GMAIL_USER.email);
    await page.locator('#password').fill(GMAIL_USER.password);
    await page.locator('#login-btn').click();
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();

}


test.beforeAll(async () => {
    //Login API - step 1
    const apiContext = await request.newContext();
    const yahooResponse = await apiContext.post(`${API_URL}/auth/login`,
        {
            data: YAHOO_USER
        })
    expect(yahooResponse.ok()).toBeTruthy();
    const yahooResponseJson = await yahooResponse.json();
    tokenY = yahooResponseJson.token;
    console.log(tokenY);


    //Grab Event via API - step2
    const grabEvent = await apiContext.get(`${API_URL}/events`,
        {
            headers: {
                "Authorization": `Bearer ${tokenY}`
            }

        })
    expect(grabEvent.ok()).toBeTruthy()
    const grabEventJson = await grabEvent.json();
    eventId = grabEventJson.data[0].id;

    //Create a booking via API as Yahoo user - Step3
    const yahooPayload = {
        "customerName": "Yahoo Man",
        "customerEmail": YAHOO_USER.email,
        "customerPhone": "6969696969",
        "quantity": 1,
        "eventId": eventId
    }

    const yahooBooking = await apiContext.post(`${API_URL}bookings`,
        {
            headers: {
                "Authorization": `Bearer ${tokenY}`
            },
            data: yahooPayload

        })
    expect(yahooBooking.ok()).toBeTruthy();
    const yahooBookingJson = await yahooBooking.json();
    yahooBookingId = yahooBookingJson.data.id;

});

//Step 4 — Login as Gmail user via browser UI


test("Checking other's user booking", async ({ page }) => {
    //step4
    await loginAsGmail(page);

    //step5
    await page.goto(`${BASE_URL}/bookings/${yahooBookingId}`);
    await page.waitForLoadState("networkidle");

    //step6
    await expect(page.getByText("Access Denied")).toBeVisible();
    await expect(page.getByText("You are not authorized to view this booking")).toBeVisible();


});








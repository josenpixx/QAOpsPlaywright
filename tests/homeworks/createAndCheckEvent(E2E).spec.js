const {test, expect} = require("@playwright/test");

test('Booking an event', async ({page})=>
{

    //step 1
await page.goto("https://eventhub.rahulshettyacademy.com/login");
await page.getByPlaceholder("you@email.com").fill("dontshakeit@gmail.com");
await page.getByLabel("password").fill('Jojobinx321!');
await page.locator('#login-btn').click();
await expect (page.getByText("Browse Events →")).toBeVisible();

    //step 2
await page.getByRole("button", {name:'Admin'}).click();
await page.getByRole('navigation').getByRole('link', { name: 'Manage Events' }).click();
const myEvent = `Test Event ${Date.now()}`;
await page.locator("#event-title-input").fill(myEvent);
await page.locator("#admin-event-form textarea").fill("This is my first test event");
await page.locator("#category").selectOption("Festival");
await page.getByLabel("City").fill("Minsk");
await page.getByLabel("Venue").fill("Pritickaga, 45A, 345.");

function futureDateValue(){
   const date = new Date();

   //+1 day
   date.setDate(date.getDate() + 5);

   //receiving other parts
   let day = date.getDate();
   let month = date.getMonth() + 1;
   let year = date.getFullYear();
   let hours = date.getHours();
   let minutes = date.getMinutes();

   // добавление нуля если нужно

   if (day < 10) day = '0' + day;
   if (month < 10) month = '0' + month;
   if (hours < 10) hours = '0' + hours;
   if (minutes < 10) minutes = '0' + minutes;

   //gathering string
   return `${year}-${month}-${day}T${hours}:${minutes}`;
};

await page.getByLabel("Event Date & Time").fill(futureDateValue());

//await page.getByLabel('Event Date & Time').fill('2027-12-31T10:00'); - без функции если

await page.getByLabel("Price ($)").fill("100");
await page.getByLabel("Total Seats").fill("50");
await page.locator("#add-event-btn").click();
await expect(page.getByText("Event created!")).toBeVisible();
console.log(`Created event: "${myEvent}"`);

// step 3

await page.locator('#nav-events').click();
const cardName = await page.locator("[data-testid='event-card']");
await expect(cardName.first()).toBeVisible();
await expect(cardName.filter({hasText: myEvent})).toBeVisible();
const myCard = await cardName.filter({hasText: myEvent}).getByText("seats available").textContent();
const seatsBeforeBooking = parseInt(myCard);
console.log(`Seats before booking: ${seatsBeforeBooking}`);

// step 4
await cardName.filter({hasText: myEvent}).getByTestId('book-now-btn').click();

// step 5
await expect(page.locator("#ticket-count")).toHaveText("1");
await page.getByLabel('Full Name').fill('Josen Pix');
await page.locator('#customer-email').fill('dontshakeit@gmail.com');
await page.getByPlaceholder('+91 98765 43210').fill('+88005553535');
await page.locator(".confirm-booking-btn").click();
await expect(page.locator('.booking-ref')).toBeVisible();

// step 6
const bookingRef = (await page.locator('.booking-ref').textContent()).trim();
console.log(`Booking confirmed. Ref: ${bookingRef}`);

// step 7
await page.locator("#nav-bookings").click();
await expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/bookings");
const bookingsList = page.locator("#booking-card");

const inner = page.locator('.booking-ref', { hasText: bookingRef });

const matchedCard = bookingsList.filter({
  has: inner
});

await expect(bookingsList.first()).toBeVisible();
await expect(matchedCard).toBeVisible();
await expect(matchedCard).toContainText(myEvent);

console.log(`Booking card found in My Bookings for ref: ${bookingRef}`);

// step 8
await page.locator('#nav-events').click();
await expect(cardName.first()).toBeVisible();
await expect(cardName.filter({hasText: myEvent})).toBeVisible();
await expect(cardName.filter({hasText: myEvent})).toContainText(String(seatsBeforeBooking - 1));

const myCardAfterBooking = await cardName
    .filter({hasText: myEvent})
    .getByText("seats available")
    .textContent();

const seatsAfterBooking = parseInt(myCardAfterBooking);
console.log(`Seats after booking: ${seatsAfterBooking}`);
expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);
}


);
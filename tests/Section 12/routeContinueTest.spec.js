import { test, expect, request } from "@playwright/test";


test("Security test request intercept", async ({ page }) => {
  //login and reach orders page

  const products = page.locator(".card-body");
  const userEmail = page.locator('#userEmail');
  const signIn = page.locator('#login');
  const cardTitles = page.locator(".card-body b");
  const productName = 'ZARA COAT 3';
  
  await page.goto("https://rahulshettyacademy.com/client/");
  await userEmail.fill("dontshakeit@gmail.com");
  await page.locator("#userPassword").fill('Jojobinx321');
  await signIn.click();
  await page.waitForLoadState('networkidle');
  await cardTitles.first().waitFor();

  await page.locator("button[routerlink*='myorders']").click();
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    async route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=64ceb0487244490f9597ef94" }))

  await page.locator("button:has-text('View')").first().click();
  await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
});
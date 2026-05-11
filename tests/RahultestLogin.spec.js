const {test, expect} = require("@playwright/test");

test('Browser Context Playwright test', async ({browser})=>
{
//playwright code here
// chrome - plugins/ cookies
    
    const context = await browser.newContext();
    const page = await context.newPage();
    const userEmail = page.locator('#userEmail');
    const signIn = page.locator('#login');
    const cardTitles = page.locator(".card-body b")
    await page.goto("https://rahulshettyacademy.com/client/");
    //css xpath
    await userEmail.fill("dontshakeit@gmail.com");
    await page.locator("#userPassword").fill('Jojobinx321');
    await signIn.click();
   // await page.waitForLoadState('networkidle');
   await cardTitles.last().waitFor();
   /* console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");*/
    console.log(await cardTitles.allTextContents());
    /*console.log(await cardTitles.nth(2).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);*/
});

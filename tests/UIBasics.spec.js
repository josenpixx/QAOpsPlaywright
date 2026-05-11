const {test, expect} = require("@playwright/test");

test.describe.configure({mode: 'serial'}) //выполнение тестов в одном браузере, по порядку, без перезапуска страницы    
test('Browser Context Playwright test', async ({browser})=>
{
//playwright code here
// chrome - plugins/ cookies
    
    const context = await browser.newContext();
    const page = await context.newPage();
    //page.route('**/*.css', route=> route.abort());
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator(".card-body a")
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    //css xpath
    await userName.fill("rahulshetty");
    await page.locator("[type='password']").fill('Learning@830$3mK2');
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");
    // type - fill
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(2).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});

test('Page context Playwright test', async ({page})=>
{
//playwright code here
// chrome - plugins/ cookies
    await page.goto("https://google.com");
    //get title assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});


test('UI Controls', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const documentLink = page.locator("[href*='documents-request']");
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    //await page.pause();  
    await expect(documentLink).toHaveAttribute('class','blinkingText');
});   

test('Child window hadl', async ({browser})=>
{
    
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    
    const [newPage] = await Promise.all([

        context.waitForEvent('page'), //listen for any new pages opened in background
        documentLink.click(),  // new page is opening
    ])

    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    await page.locator("#username").fill(domain);
    console.log(await userName.inputValue());
})
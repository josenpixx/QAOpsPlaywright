const {test, expect} = require("@playwright/test");

test('Client App Login', async ({page})=>
{
    const products = page.locator(".card-body");
    const cardTitles = page.locator(".card-body b");
    const productName = 'ZARA COAT 3';

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.getByPlaceholder('email@example.com').fill("dontshakeit@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill('Jojobinx321');
    await page.getByRole('button', {name: 'Login'}).click();
    await page.waitForLoadState('networkidle');
    await cardTitles.first().waitFor();

    await page.locator(".card-body").filter({hasText: "ZARA COAT "})
    .getByRole("button", {name: "Add To Cart"}).click();

    await page.getByRole('listitem').getByRole('button', {name: 'Cart'}).click(); // c помощью двух getByRole сужаем поиск уникального локатора
    await page.locator("div li").first().waitFor();

    await expect (page.getByText("ZARA COAT 3")).toBeVisible();
    await page.pause();
    await page.getByRole('button', {name: 'Checkout'}).click();

    const paymentField = await page.locator('.input.txt');
    await paymentField.nth(0).fill('9999 9999 9999 9999');

    const dateCardMonth = await page.locator("select.input.ddl").first();
    const dateCardYear = await page.locator("select.input.ddl").last();
    await dateCardMonth.click();
    await dateCardMonth.selectOption("06");
    await dateCardYear.click(); 
    await dateCardYear.selectOption("31");

    await paymentField.nth(2).fill('Josen Pix');
    await paymentField.nth(1).fill('696');
    
    await page.locator("[name='coupon']").fill('rahulshettyacademy');
    await page.getByRole("button", {name:"Apply Coupon"}).click();

    await expect(page.locator(".mt-1.ng-star-inserted")).toContainText("* Coupon Applied");
 
    await page.getByPlaceholder("Select Country").pressSequentially('rus',{delay:150}); 
    
    await page.getByRole("button", {name: "Cyprus"}).click();

    await page.getByText('PLACE ORDER').click(); 
    await expect (page.getByText("Thankyou for the order.")).toBeVisible();

    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    await page.getByRole("button", {name: 'ORDERS'}).click();

    const orders = await page.locator('tr.ng-star-inserted');
    await orders.last().waitFor();

    




    const orderCount = await orders.count();



    for(let i=0; i < orderCount; ++i)
    {
        const rowOrderId = await orders.nth(i).locator("[scope='row']").textContent();

        if (orderId.includes(rowOrderId))
        {
            await orders.nth(i).locator(".btn.btn-primary").click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

    //await page.pause();
    //await cardTitles.last().waitFor();
    //console.log(await cardTitles.allTextContents());
});
const {test, expect} = require("@playwright/test");

test('Client App Login', async ({page})=>
{   
    //page.route('**/*.{jpg,png,jpeg}', route=> route.abort()); - запрещает прогружаться любым картинкам, что я указал в фигурных скобках
    //page.on('request', request => console.log(request.url())); - слушатель на страничке, которому дано задание если случается хоть какой-нибудь запрос, сразу выводить его в консоль
    //page.on('response', response => console.log(response.url(), response.status()));  - слушатель на страничке, которому дано задание если случается хоть какой-нибудь респонс, сразу выводить его в консоль
    const products = page.locator(".card-body");
    const userEmail = page.locator('#userEmail');
    const signIn = page.locator('#login');
    const cardTitles = page.locator(".card-body b");
    const productName = 'ZARA COAT 3';

    await page.goto("https://rahulshettyacademy.com/client/");
    await userEmail.fill("dontshakeit@gmail.com");
    await page.locator("#userPassword").fill('Jojobinx321');
    await signIn.click();
    
    //await page.waitForLoadState('networkidle');
    await cardTitles.first().waitFor();

    const count = await products.count();
    for(let i=0; i < count; ++i)
        {
        if (await products.nth(i).locator("b").textContent() === productName)
        {
            // add the product to cart
            await products.nth(i).locator("text=  Add To Cart").click();
            break;
            
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    
    await page.locator('text=Checkout').click();

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
    await page.locator(".btn-primary.mt-1").click();

    await expect(page.locator(".mt-1.ng-star-inserted")).toContainText("* Coupon Applied");
 
    await page.locator("[placeholder*='Country']").pressSequentially('rus',{delay:150}); 
    const dropdown = page.locator('.ta-results');
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();

    for(let i = 0; i < optionsCount; ++i)
    {
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text === " Cyprus")
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    expect(page.locator(".user__name [type='text']").first()).toHaveText("dontshakeit@gmail.com");
    await page.locator('.action__submit').click(); 
    await expect(page.locator('.hero-primary')).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    await page.locator(".fa.fa-handshake-o").click();

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
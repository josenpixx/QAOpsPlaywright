import {test, expect, request} from "@playwright/test";
const loginPayload = {userEmail: "dontshakeit@gmail.com", userPassword: "Jojobinx321"}; 
const ordetPayload = {orders: [{country: "Venezuela", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
let token;
let orderId;

test.beforeAll ( async()=>
{
    //Login API
    const apiContext = await request.newContext();
    
 
    //
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        data: ordetPayload,
        headers:{
            "Authorization": token,
            "Content-type":'application/json'
        },
    })
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    orderId = orderResponseJson.orders[0];
});

test('Place the order', async ({page})=>
{   
    //create order is success
    page.addInitScript(value => {
    window.localStorage.setItem('token',value);
    }, token);

    const cardTitles = page.locator(".card-body b");
    const productName = 'ZARA COAT 3';
    await page.goto("https://rahulshettyacademy.com/client/");
    await cardTitles.first().waitFor();

    

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
    await page.pause();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

    });

    //Verify if order created is showing is history page
    // Precondition - create order
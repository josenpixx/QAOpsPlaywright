import {test, expect, request} from "@playwright/test";
const loginPayload = {userEmail: "dontshakeit@gmail.com", userPassword: "Jojobinx321"}; 
const orderPayload = {orders: [{country: "Venezuela", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
const fakePayloadOrders = {data: [], message: "No Orders"};
let token;
let orderId;

test.beforeAll ( async()=>
{
    //Login API
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
        {
            data:loginPayload
        })// 200,201 and etc.
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);
 
    //
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        data: orderPayload,
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

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", // ставим тут звёздочку в конце запроса чтобы не только для моего юзера сработало, а для любого
        async route =>
    {
        //intercepting response - API response ->{playwright  fake response} -> browser -> render data on front end
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(fakePayloadOrders);
        route.fulfill(
        {
            response,
            body,
        });
    });

    await Promise.all([
    page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"),
    page.locator(".fa.fa-handshake-o").click()
    
    ]);
     // тут прописываем waitfor потому что у нас фейковый реквест приходит первым и затем иногда приходит настоящий реквест и наш тест становится flaky. Это ожидание через waitfor помогает этого избежать
    await expect(page.locator(".mt-4.ng-star-inserted")).toHaveText("You have No Orders to show at this time. Please Visit Back Us");
   });

    //Verify if order created is showing is history page
    // Precondition - create order
import {test, expect, request} from "@playwright/test";
const loginPayload = {userEmail: "dontshakeit@gmail.com", userPassword: "Jojobinx321"}; 
const orderPayload = {orders: [{country: "Venezuela", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
const fakePayloadOrders = {message: "No Product in Cart"};
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

    await page.route("https://rahulshettyacademy.com/api/ecom/user/get-cart-products/*", // тут мы говорим, ЧТО PRу нужно будет перехватывать если такой запрос будет
        // ставим тут звёздочку в конце запроса чтобы не только для моего юзера сработало, а для любого
        async route => // ЧТО будет в перехвате
    {
        //intercepting response - API response -> {playwright  fake response} -> browser -> render data on front end
        route.fulfill( //в этом моменте мы говорим PR, что заменяем респонс на этот респонс (на работе в основном его пользуют для заглушек и проверки UI)
        {
            status:200,
            contentType: 'application/json',
            body: JSON.stringify(fakePayloadOrders)
        });
        
    });

    await Promise.all([
    page.waitForResponse("https://rahulshettyacademy.com/api/ecom/user/get-cart-products/*"),  // тут прописываем waitfor потому что у нас фейковый реквест приходит первым и затем иногда приходит настоящий реквест и наш тест становится flaky. Это ожидание через waitfor помогает этого избежать
    page.locator('[routerlink="/dashboard/cart"]').click()
    
    ]);
    
    await expect(page.locator("h1").last()).toHaveText("No Products in Your Cart !");
   });

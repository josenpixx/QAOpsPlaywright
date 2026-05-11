const { test, expect } = require("@playwright/test");
const {customTest} = require("./Utils/test-base");

const { POManager } = require('./pageobjects/POManager');
const dataSet = JSON.parse(JSON.stringify(require("./Utils/placeorderTestData.json")));

for(const data of dataSet)
{
test(`Client App Login for ${data.productName}`, async ({ page }) => {
    const poManager = new POManager(page);
    const products = page.locator(".card-body");
    const cardTitles = page.locator(".card-body b");

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);

    const dashBoardPage = poManager.getDashboardPage();
    await dashBoardPage.searchProductAddCart(data.productName);
    await dashBoardPage.navigateToCart(data.productName); 
    await expect(page.getByText(data.productName)).toBeVisible();

    const createOrder = poManager.getCreateOrder();
    await createOrder.clickButtonCheckout();
    await createOrder.fillingOrderData();
    await expect(page.locator(".mt-1.ng-star-inserted")).toContainText("* Coupon Applied");
    await createOrder.chooseCountryAndOrder();

    await expect(page.getByText("Thankyou for the order.")).toBeVisible();

    const findOrder = poManager.getFindOrder();
    const { orderId, orderIdDetails } = await findOrder.searchOrder();

    expect(orderId.includes(orderIdDetails)).toBeTruthy();

    
});
}
customTest(`Custom test client`, async ({ page, testDataForOrder }) => {
    const poManager = new POManager(page);
    const products = page.locator(".card-body");
    const cardTitles = page.locator(".card-body b");

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

    const dashBoardPage = poManager.getDashboardPage();
    await dashBoardPage.searchProductAddCart(testDataForOrder.productName);
    await dashBoardPage.navigateToCart(testDataForOrder.productName); 
    await expect(page.getByText(testDataForOrder.productName)).toBeVisible();

    const createOrder = poManager.getCreateOrder();
    await createOrder.clickButtonCheckout();
    await createOrder.fillingOrderData();
    await expect(page.locator(".mt-1.ng-star-inserted")).toContainText("* Coupon Applied");
    await createOrder.chooseCountryAndOrder();

    await expect(page.getByText("Thankyou for the order.")).toBeVisible();

    const findOrder = poManager.getFindOrder();
    const { orderId, orderIdDetails } = await findOrder.searchOrder();

    expect(orderId.includes(orderIdDetails)).toBeTruthy();

    
});

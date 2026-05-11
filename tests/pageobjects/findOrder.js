class FindOrder 
{

    constructor(page) {
        this.page = page;
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.ordersButton = page.getByRole("button", { name: 'ORDERS' });
        this.orders = page.locator('tr.ng-star-inserted');
        this.orderIdDetails = page.locator(".col-text");
    }

    async searchOrder() {

        const orderId = await this.orderId.textContent();
        console.log(orderId);
        await this.ordersButton.click();
        await this.orders.first().waitFor();

        const count = await this.orders.count();

        for (let i = 0; i < count; ++i) {
            const rowOrderId = await this.orders.nth(i)
                .locator("[scope='row']")
                .textContent();

            if (orderId.includes(rowOrderId)) {
                await this.orders.nth(i)
                    .locator(".btn.btn-primary")
                    .click();
                break;
            }
        }

        

        const orderIdDetails = await this.orderIdDetails.textContent();

        return { orderId, orderIdDetails };
    }
}

module.exports = { FindOrder };
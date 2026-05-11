class CreateOrder {

    constructor(page) {
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.paymentField = page.locator('.input.txt');
        this.dateCardMonth = page.locator("select.input.ddl").first();
        this.dateCardYear = page.locator("select.input.ddl").last();
        this.couponPlaceholder = page.locator("[name='coupon']")
        this.applyCoupon = page.getByRole("button", { name: "Apply Coupon" });
        this.countrySelector = page.getByPlaceholder("Select Country");
        this.chooseCountry = page.getByRole("button", { name: "Cyprus" });
        this.orderButton = page.getByText('PLACE ORDER');

    }

    async clickButtonCheckout() {

        await this.checkoutButton.click();
    }

    async fillingOrderData() {

        await this.paymentField.nth(0).fill('9999 9999 9999 9999');

        await this.dateCardMonth.click();
        await this.dateCardMonth.selectOption("06");
        await this.dateCardYear.click();
        await this.dateCardYear.selectOption("31");

        await this.paymentField.nth(2).fill('Josen Pix');
        await this.paymentField.nth(1).fill('696');

        await this.couponPlaceholder.fill('rahulshettyacademy');
        await this.applyCoupon.click();

    }

    async chooseCountryAndOrder() {


        await this.countrySelector.pressSequentially('rus', { delay: 150 });

        await this.chooseCountry.click();

        await this.orderButton.click();
    }

}


module.exports = { CreateOrder };
import {Page, Locator} from '@playwright/test';

export class DashBoardPage
{
    products: Locator;
    productsText: Locator;
    cart: Locator;
    divli: Locator;
    page: Page;

    constructor(page: Page)
    {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.getByRole('listitem').getByRole('button', { name: 'Cart' });
        this.divli = page.locator("div li");

    }

    async searchProductAddCart(productName : string)
    {

    await this.productsText.first().waitFor();
    console.log(await this.productsText.allTextContents());

    await this.products.filter({ hasText: productName })
    .getByRole("button", { name: "Add To Cart" }).click();

    }

    async navigateToCart()
    {
        await this.cart.click();
        await this.divli.first().waitFor();
    }
};
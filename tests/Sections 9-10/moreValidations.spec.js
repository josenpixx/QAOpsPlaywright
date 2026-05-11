import {test, expect} from "@playwright/test";
import { access } from "node:fs";

test("Popup validations", async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    /*await page.goto("https://www.google.com/");
    await page.goBack();
    await page.goForward();*/
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    page.once('dialog', async dialog => {
    await new Promise(done => setTimeout(done, 500));
    await dialog.dismiss();
})
    await page.locator("#confirmbtn").click();

    await page.locator("#mousehover").hover();
    //await page.pause();
    await page.getByRole('link', {name:'Top'});
    await page.locator("#mousehover").hover();
    await page.getByRole('link', {name:'Reload'});
    //page.on('dialog', dialog => dialog.accept({ timeout: 5000 }));
    //await page.locator("#confirmbtn").click();
    //page.on('dialog', dialog => dialog.dismiss());
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.getByRole('link', { name: 'All Access plan' }).click();
    const textCheck = (await framesPage.locator('h2').first().textContent());
    const textNumber = parseInt(textCheck.split(" ")[1].replace(",", ""));
    console.log(textNumber);

});
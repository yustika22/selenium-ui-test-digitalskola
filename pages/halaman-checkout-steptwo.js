import { By } from "selenium-webdriver";

export default class HalamanCheckoutStepTwo {
    constructor(driver) {
        this.driver = driver;
        this.titlePrice = By.xpath("//div[.='Price Total']");
        this.titlePaymentFinish = By.xpath("//div[.='Payment Information:']");
        this.produkBackLabsBackpack = By.xpath("//div[.='Sauce Labs Backpack']");
        this.produkBackLabsBackLight = By.xpath("//div[.='Sauce Labs Bike Light']");
        this.buttonFinishCheckOut = By.xpath("//button[@id='finish']");

    }

    async getTitlePrice() {
        return await this.driver.findElement(this.titlePrice).getText();
    }

    async getTitlePayment() {
        return await this.driver.findElement(this.titlePaymentFinish).getText();
    }

    async displayedTitle() {
        return await this.driver.findElement(this.produkBackLabsBackpack);
    }

    async nextDisplayedTitle() {
        return await this.driver.findElement(this.produkBackLabsBackLight);
    }

    async clickButtonFinishCheckOutStepFinish() {
        await this.driver.findElement(this.buttonFinishCheckOut).click();
    }

}
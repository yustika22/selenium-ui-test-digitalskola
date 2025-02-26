import { By } from "selenium-webdriver";

export default class HalamanCheckoutStepOne {
    constructor(driver) {
        this.driver = driver;
        this.buttonCheckOut = By.id("checkout");
        this.titleChekoutStepsatu = By.css(".title");
        this.inputFirstName = By.id("first-name");
        this.inputLastName = By.id("last-name");
        this.inputPostalCode = By.id("postal-code");
        this.buttonContinue = By.id("continue");
        this.titleComplete = By.className("title");
    }



    async clickButtonChechkout() {
        await this.driver.findElement(this.buttonCheckOut).click();
    }

    async getTitleCheckoutsatu() {
        return await this.driver.findElement(this.titleChekoutStepsatu).getText();
    }

    async yourInformation(firstname, lastname, postalcode) {
        await this.driver.findElement(this.inputFirstName).sendKeys(firstname);
        await this.driver.findElement(this.inputLastName).sendKeys(lastname);
        await this.driver.findElement(this.inputPostalCode).sendKeys(postalcode);
        await this.driver.findElement(this.buttonContinue).click();
    }

    async getTitleComplete() {
        return await this.driver.findElement(this.titleComplete).getText();
    }
}


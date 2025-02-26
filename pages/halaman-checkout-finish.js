import { By } from "selenium-webdriver";

export default class HalamanFinish {
    constructor(driver) {
        this.driver = driver;
        this.iconCentang = By.css("[alt='Pony Express']");
        this.buttonBackHome = By.id("back-to-products");
    }

    async getIconCentang() {
        return await this.driver.findElement(this.iconCentang);
    }

    async tampilButtonBackHome() {
        return await this.driver.findElement(this.buttonBackHome);
    }
}
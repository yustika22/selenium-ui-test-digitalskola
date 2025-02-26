import { By } from "selenium-webdriver";

export default class HalamanCart {
  constructor(driver) {
    this.driver = driver;
    this.produkBackLabsBackpack = By.xpath("//div[.='Sauce Labs Backpack']");
    this.produkBackLabsBackLight = By.xpath("//div[.='Sauce Labs Bike Light']");
    this.buttonContinueShoping = By.id("continue-shopping");

  }

  async getTitleBackpack() {
    return await this.driver.findElement(this.produkBackLabsBackpack).getText();
  }

  async getTitleBackLight() {
    return await this.driver
      .findElement(this.produkBackLabsBackLight)
      .getText();
  }

  async tampilButtonContinueShopping() {
    return await this.driver.findElement(this.buttonContinueShoping);
  }


}

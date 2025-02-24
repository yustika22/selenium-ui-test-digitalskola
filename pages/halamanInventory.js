import { By } from "selenium-webdriver";

export default class halamanInventory {
  constructor(driver) {
    this.driver = driver;
    this.inventoryList = By.className("inventory_list");
    this.appLogo = By.css(".app_logo");
    this.hamburger = By.id("react-burger-menu-btn");
    this.jumlahItem = By.xpath("//a[.='2']");
    this.produkBackLabsBackpack = By.xpath("//div[.='Sauce Labs Backpack']");
    this.produkBackLabsBackLight = By.xpath("//div[.='Sauce Labs Bike Light']");
  }

  async getTitleText() {
    return await this.driver.findElement(this.appLogo).getText();
  }

  async getHumberger() {
    return await this.driver.findElement(this.hamburger);
  }

  async getIconCartAngkaDua() {
    return await this.driver.findElement(this.jumlahItem).getText();
  }

  async getTitleBackpack() {
    return await this.driver.findElement(this.produkBackLabsBackpack).getText();
  }

  async getTitleBackLight() {
    return await this.driver
      .findElement(this.produkBackLabsBackLight)
      .getText();
  }
}

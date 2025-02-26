import { By } from "selenium-webdriver";

export default class HalamanInventory {
  constructor(driver) {
    this.driver = driver;
    this.inventoryList = By.className("inventory_list");
    this.appLogo = By.css(".app_logo");
    this.hamburger = By.id("react-burger-menu-btn");
    this.jumlahItem = By.xpath("//a[.='2']");
    this.titleBackpack = By.id("add-to-cart-sauce-labs-backpack");
    this.titleBacklight = By.id("add-to-cart-sauce-labs-bike-light");
    this.buttonIconCart = By.css(".shopping_cart_link");
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

  async addDuaProdukInventory() {
    await this.driver.findElement(this.titleBackpack).click();
    await this.driver.findElement(this.titleBacklight).click();
  }

  async clickIconCart() {
    await this.driver.findElement(this.buttonIconCart).click();
  }
}

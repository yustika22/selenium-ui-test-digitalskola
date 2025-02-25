import { By } from "selenium-webdriver";

export default class halamanInventory {
  constructor(driver) {
    this.driver = driver;
    this.inventoryList = By.className("inventory_list");
    this.appLogo = By.css(".app_logo");
    this.hamburger = By.id("react-burger-menu-btn");
    this.jumlahItem = By.xpath("//a[.='2']");
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
}

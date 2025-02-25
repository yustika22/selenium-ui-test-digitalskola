import { By } from "selenium-webdriver";

export default class halamanCheckout {
  constructor(driver) {
    this.driver = driver;
    this.titleChekoutStepsatu = By.css(".title");
    this.inputFirstName = By.id("first-name");
    this.inputLastName = By.id("last-name");
    this.inputPostalCode = By.id("postal-code");
    this.buttonContinue = By.id("continue");
    this.titleCheckoutStepdua = By.xpath("//span[@class='title']");
    this.titlePrice = By.xpath("//div[.='Price Total']");
    this.produkBackLabsBackpack = By.xpath("//div[.='Sauce Labs Backpack']");
    this.produkBackLabsBackLight = By.xpath("//div[.='Sauce Labs Bike Light']");
    this.titleComplete = By.className("title");
    this.iconCentang = By.css("[alt='Pony Express']");
  }

  async getIconCentang() {
    return await this.driver.findElement(this.iconCentang);
  }

  async getTitleComplete() {
    return await this.driver.findElement(this.titleComplete).getText();
  }

  async getTitlePrice() {
    return await this.driver.findElement(this.titlePrice).getText();
  }

  async getTitleCheckoutsatu() {
    return await this.driver.findElement(this.titleChekoutStepsatu).getText();
  }

  async getTitleCheckoutdua() {
    return await this.driver.findElement(this.titleCheckoutStepdua).getText();
  }

  async yuorInformation(firstname, lastname, postalcode) {
    await this.driver.findElement(this.inputFirstName).sendKeys(firstname);
    await this.driver.findElement(this.inputLastName).sendKeys(lastname);
    await this.driver.findElement(this.inputPostalCode).sendKeys(postalcode);
    await this.driver.findElement(this.buttonContinue).click();
  }

  async displayedTitle() {
    return await this.driver.findElement(this.produkBackLabsBackpack);
  }

  async nextDisplayedTitle() {
    return await this.driver.findElement(this.produkBackLabsBackLight);
  }
}

import { By } from "selenium-webdriver";
import { expect } from "chai";

export default class halamanLogin {
  constructor(driver) {
    this.driver = driver;
    this.inputUsername = By.id("user-name");
    this.inputPassword = By.id("password");
    this.buttonLogin = By.id("login-button");
    this.errorMessage = By.css(".error-message-container");
  }
  async open(url) {
    await this.driver.get(url);
  }

  async login(username, password) {
    await this.driver.findElement(this.inputUsername).sendKeys(username);
    await this.driver.findElement(this.inputPassword).sendKeys(password);
    await this.driver.findElement(this.buttonLogin).click();
  }

  async getErrorMessage() {
    return await this.driver.findElement(this.errorMessage).getText();
  }

  async verifyLoginFailed(expectedText) {
    const errorMessage = await this.getErrorMessage();
    expect(errorMessage.includes(expectedText)).to.equal(true);
  }
}
// module.exports = halamanLogin;

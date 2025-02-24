import { Builder, By } from "selenium-webdriver";
import { expect } from "chai";
import halamanLogin from "../pages/halamanLogin.js";
import halamanInventory from "../pages/halamanInventory.js";

const testSaucedemo = async () => {
  let driver;
  let halamanlogin;
  let halamaninventory;

  const browsers = ["chrome", "firefox", "edge"];

  for (let browser of browsers) {
    if (browser === "chrome") {
      driver = await new Builder().forBrowser("chrome").build();
      halamanlogin = new halamanLogin(driver);
      halamaninventory = new halamanInventory(driver);
    } else if (browser === "firefox") {
      driver = await new Builder().forBrowser("firefox").build();
      halamanlogin = new halamanLogin(driver);
      halamaninventory = new halamanInventory(driver);
    } else if (browser === "edge") {
      driver = await new Builder().forBrowser("MicrosoftEdge").build();
      halamanlogin = new halamanLogin(driver);
      halamaninventory = new halamanInventory(driver);
    } else {
      console.log("browser tidak ada");
    }
    await driver.get("https://www.saucedemo.com/");
    await halamanlogin.login("standard_user", "secret_sauce");
    let titleText = await halamaninventory.getTitleText();
    expect(titleText.includes("Swag Labs")).to.equal(true);

    let menuButton = await halamaninventory.getHumberger();
    expect(await menuButton.isDisplayed()).to.equal(true);

    console.log("SUKSES LOGIN " + browser);
  }
  //   await driver.quit();
};
testSaucedemo();

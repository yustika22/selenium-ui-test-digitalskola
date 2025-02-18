import { expect } from "chai";
import { Builder, By, Key, until } from "selenium-webdriver";

const saucedemoLoginAndAddItem = async () => {
  //  ini adalah membuat koneksi ke webdriver
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://www.saucedemo.com/");
    await driver.findElement(By.id("user-name")).sendKeys("standard_user");
    await driver
      .findElement(By.css('input[placeholder="Password"]'))
      .sendKeys("secret_sauce");

    await driver.findElement(By.css("#login-button")).click();

    // validasi

    let titleText = await driver
      .findElement(By.xpath("//div[@class='app_logo']"))
      .getText();

    expect(titleText.includes("Swag Labs")).to.equal(true);

    let menuButton = await driver.findElement(By.id("react-burger-menu-btn"));

    expect(await menuButton.isDisplayed()).to.equal(true);

    //add item to cart
    await driver.findElement(By.id("add-to-cart-sauce-labs-backpack")).click();
    await driver
      .findElement(By.id("add-to-cart-sauce-labs-bike-light"))
      .click();
    let jumlahitem = await driver.findElement(By.xpath("//a[.='2']")).getText();

    // validasi
    expect(jumlahitem).to.equal("2");
  } finally {
    await driver.quit();
  }
};

saucedemoLoginAndAddItem();

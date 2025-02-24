import { Builder, By } from "selenium-webdriver";
import { expect } from "chai";
import halamanLogin from "../pages/halamanLogin.js";
import halamanInventory from "../pages/halamanInventory.js";

const testSauceDemoInventory = async () => {
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
    //  add item to cart 2
    await driver.findElement(By.id("add-to-cart-sauce-labs-backpack")).click();
    await driver
      .findElement(By.id("add-to-cart-sauce-labs-bike-light"))
      .click();

    //   validasi icon angka pada cart adalah 2
    let duaItemDiIcon = await halamaninventory.getIconCartAngkaDua();
    expect(duaItemDiIcon).to.equal(2);

    // validasi 2 produk berada di dalam halaman cart

    // klik icon cart
    await driver.findElement(By.css(".shopping_cart_link")).click();

    // validasi 2 produk
    let titleBackpack = await halamaninventory.getTitleBackpack();
    let titleBackLight = await halamaninventory.getTitleBackLight();

    expect(titleBackpack).to.equal("Sauce Labs Backpack");
    expect(titleBackLight).to.equal("Sauce Labs Bike Light");

    console.log("SUKSES LOGIN " + browser);
  }
};

testSauceDemoInventory();

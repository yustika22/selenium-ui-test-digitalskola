import { expect } from "chai";
import { Builder, By } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import firefox from "selenium-webdriver/firefox.js";
import edge from "selenium-webdriver/edge.js";

const testDemo = async () => {
  let driver;
  //inisialisasi untuk cross browser
  const browsers = ["chrome", "firefox", "edge"];

  for (let browser of browsers) {
    if (browser === "chrome") {
      let option = new chrome.Options();
      option.addArguments("--headless=new");
      driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(option)
        .build();
    } else if (browser === "firefox") {
      let option = new firefox.Options();
      option.addArguments("--headless");
      driver = await new Builder()
        .forBrowser("firefox")
        .setFirefoxOptions(option)
        .build();
    } else if (browser === "edge") {
      let option = new edge.Options();
      option.addArguments("--headless=new");
      driver = await new Builder()
        .forBrowser("MicrosoftEdge")
        .setEdgeOptions(option)
        .build();
    } else {
      console.log("browser tidak ada");
    }

    await driver.get("https://www.saucedemo.com/");
    await driver.findElement(By.id("user-name")).sendKeys("standard_user");
    await driver
      .findElement(By.css('input[placeholder="Password"]'))
      .sendKeys("secret_sauce");

    await driver.findElement(By.css("#login-button")).click();

    // validasi user berhasil login dan berada di halaman dashboard

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

    // validasi item berhasil ditambahkan di cart dengan jumlah 2 pada halaman dashboard
    let jumlahitem = await driver.findElement(By.xpath("//a[.='2']")).getText();

    expect(jumlahitem).to.equal("2");

    //validasi item berhasil ditambahkan di cart pada halaman cart
    await driver.findElement(By.css(".shopping_cart_link")).click();

    let titleProductBackpack = await driver
      .findElement(By.xpath("//div[.='Sauce Labs Backpack']"))
      .getText();

    let titleProductBackLight = await driver
      .findElement(By.xpath("//div[.='Sauce Labs Bike Light']"))
      .getText();

    expect(titleProductBackpack).to.equal("Sauce Labs Backpack");
    expect(titleProductBackLight).to.equal("Sauce Labs Bike Light");

    console.log(`testing ${browser} berhasil`);
  }
};
testDemo();

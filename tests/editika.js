import { Builder, By } from "selenium-webdriver";
import { expect } from "chai";
import halamanLogin from "../pages/halamanLogin.js";
import halamanInventory from "../pages/halamanInventory.js";
import halamanCart from "../pages/halamanCart.js";
import halamanCheckout from "../pages/halamanCheckout.js";
import fs from "fs";
import path from "path";
import { compireScreenShoot } from "../helper/halamanSS.js";

const testSaucedemo = async () => {
  describe("Saucedemo.com", () => {
    let driver;
    let halamanlogin;
    let halamaninventory;
    let halamancart;
    let halamancheckout;

    it("Bisa Login hingga berhasil checkout", async () => {
      const browsers = ["chrome", "firefox", "edge"];

      for (let browser of browsers) {
        if (browser === "chrome") {
          driver = await new Builder().forBrowser("chrome").build();
          halamanlogin = new halamanLogin(driver);
          halamaninventory = new halamanInventory(driver);
          halamancart = new halamanCart(driver);
          halamancheckout = new halamanCheckout(driver);
        } else if (browser === "firefox") {
          driver = await new Builder().forBrowser("firefox").build();
          halamanlogin = new halamanLogin(driver);
          halamaninventory = new halamanInventory(driver);
          halamancart = new halamanCart(driver);
          halamancheckout = new halamanCheckout(driver);
        } else if (browser === "edge") {
          driver = await new Builder().forBrowser("MicrosoftEdge").build();
          halamanlogin = new halamanLogin(driver);
          halamaninventory = new halamanInventory(driver);
          halamancart = new halamanCart(driver);
          halamancheckout = new halamanCheckout(driver);
        } else {
          console.log("browser tidak ada");
        }
        await driver.get("https://www.saucedemo.com/");
        await halamanlogin.login("standard_user", "secret_sauce");

        let titleText = await halamaninventory.getTitleText();
        expect(titleText.includes("Swag Labs")).to.equal(true);

        let menuButton = await halamaninventory.getHumberger();
        expect(await menuButton.isDisplayed()).to.equal(true);

        console.log(`Sukses Login di ${browser}`);

        //  halaman inventory
        //  add item to cart 2
        await driver
          .findElement(By.id("add-to-cart-sauce-labs-backpack"))
          .click();
        await driver
          .findElement(By.id("add-to-cart-sauce-labs-bike-light"))
          .click();
        console.log(
          `Berhasil menambahkan 2 item ke cart menggunakan ${browser}`
        );

        //   validasi icon angka pada cart adalah 2
        let duaItemDiIcon = await halamaninventory.getIconCartAngkaDua();
        expect(duaItemDiIcon).to.equal("2");

        // validasi 2 produk berada di dalam halaman cart

        // klik icon cart
        await driver.findElement(By.css(".shopping_cart_link")).click();

        // validasi 2 produk
        let titleBackpack = await halamancart.getTitleBackpack();
        let titleBackLight = await halamancart.getTitleBackLight();

        expect(titleBackpack).to.equal("Sauce Labs Backpack");
        expect(titleBackLight).to.equal("Sauce Labs Bike Light");

        // step 1 chechkout 2 item diatas
        await driver.findElement(By.id("checkout")).click();

        //  validasi berhasil masuk ke halaman step 2 chechk out

        let titleInformation = await halamancheckout.getTitleCheckoutsatu();
        expect(titleInformation).to.equal("Checkout: Your Information");

        //  isi data pada inputan dihalaman chechkout step 1

        await halamancheckout.yuorInformation(
          "yustika",
          "dyah shafira",
          "7723456"
        );

        // validasi berhasil masuk ke halaman checkout step 2
        let titleOverview = await halamancheckout.getTitleCheckoutdua();
        expect(titleOverview).to.equal("Checkout: Overview");

        let titlePrice = await halamancheckout.getTitlePrice();
        expect(titlePrice).to.equal("Price Total");

        //  validasi 2 product berhasil masuk ke halaman checkout step 2s
        let backpackProduk = await halamancheckout.displayedTitle();
        let backlightProduk = await halamancheckout.nextDisplayedTitle();
        expect(await backlightProduk.isDisplayed()).to.equal(true);
        expect(await backpackProduk.isDisplayed()).to.equal(true);

        //  menyelesaikan tahap chechkout
        await driver.findElement(By.xpath("//button[@id='finish']")).click();

        // validasi berhasil ke halaman chechkout step 3
        let titleComplete = await halamancheckout.getTitleComplete();
        expect(titleComplete).to.equal("Checkout: Complete!");

        let iconCentang = await halamancheckout.getIconCentang();
        expect(await iconCentang.isDisplayed()).to.equal(true);

        console.log(`Berhasil Checkout Menggunakan ${browser}`);
      }
      //   await driver.quit();
    });
    afterEach(async function () {
      const screenshotDir = path.join(__dirname, "../screenshots");
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir);
      }

      // Gunakan nama test case untuk screenshot
      const testCaseName = this.currentTest.title.replace(/\s+/g, "_"); // Ganti spasi dengan underscore
      const newImagePath = path.join(screenshotDir, `${testCaseName}_new.png`);
      const baselinePath = path.join(
        screenshotDir,
        `${testCaseName}_baseline.png`
      );

      // Simpan screenshot baru dengan nama test case
      const image = await driver.takeScreenshot();
      fs.writeFileSync(newImagePath, image, "base64");

      // Jika baseline belum ada, simpan screenshot pertama sebagai baseline
      if (!fs.existsSync(baselinePath)) {
        fs.copyFileSync(newImagePath, baselinePath);
      }

      // Bandingkan screenshot berdasarkan nama test case
      await compireScreenShoot(testCaseName);
      await driver.quit();
    });
  });
};
testSaucedemo();

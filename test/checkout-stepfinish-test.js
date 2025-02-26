import { Builder, By } from "selenium-webdriver";
import { expect } from "chai";
import HalamanLogin from "../pages/halaman-login.js";
import HalamanInventory from "../pages/halaman-inventory.js";
import HalamanCart from "../pages/halaman-cart.js";
import HalamanCheckoutStepOne from "../pages/halaman-checkout-stepone.js";
import HalamanCheckoutStepTwo from "../pages/halaman-checkout-steptwo.js";
import HalamanFinish from "../pages/halaman-checkout-finish.js";
import fs from "fs";
import path from "path";
import { compareScreenShoot } from "../helper/halamanSS.js";
import { data } from "../fixtures/data.js";

// Digunakan untuk afterEach
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const checkoutStepFinish = async () => {
    describe("Halaman Checkout Finish Saucedemo.com", () => {
        let driver;
        let halamanLogin;
        let halamanInventory;
        let halamanCart;
        let halamanCheckOutStepOne;
        let halamanCheckOutStepTwo;
        let halamanFinish;
        // variabel ini digunakan untuk melakukan cross browser testing
        let browserName = "chrome";

        beforeEach(async () => {
            driver = await new Builder().forBrowser(browserName).build();
            halamanLogin = new HalamanLogin(driver);
            halamanInventory = new HalamanInventory(driver);
            halamanCart = new HalamanCart(driver);
            halamanCheckOutStepOne = new HalamanCheckoutStepOne(driver);
            halamanCheckOutStepTwo = new HalamanCheckoutStepTwo(driver);
            halamanFinish = new HalamanFinish(driver);
            await halamanLogin.open(data.baseUrl);
            await halamanLogin.login(data.validLogin.username, data.validLogin.password);
            await halamanInventory.addDuaProdukInventory();
            await halamanInventory.clickIconCart();
            await halamanCheckOutStepOne.clickButtonChechkout();
            await halamanCheckOutStepOne.yourInformation(data.inputDataDiri.firstname, data.inputDataDiri.lastname, data.inputDataDiri.postalcode);
            await halamanCheckOutStepTwo.clickButtonFinishCheckOutStepFinish();
        })

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
            await compareScreenShoot(testCaseName);
            await driver.quit();
        });

        it("TC-Checkout (step finish)-01 - Memastikan Icon Centang Ditampilkan Dihalaman Checkout Finish", async () => {
            let iconCentang = await halamanFinish.getIconCentang();
            expect(await iconCentang.isDisplayed()).to.equal(true);
        })

        it("Memastikan Button BackHome Ditampilkan", async () => {
            let buttonBackHome = await halamanFinish.tampilButtonBackHome();
            expect(await buttonBackHome.isDisplayed()).to.equal(true);
        })




    })
}

await checkoutStepFinish();
import { Builder, By } from "selenium-webdriver";
import { expect } from "chai";
import HalamanLogin from "../pages/halaman-login.js";
import HalamanInventory from "../pages/halaman-inventory.js";
import HalamanCart from "../pages/halaman-cart.js";
import HalamanCheckoutStepOne from "../pages/halaman-checkout-stepone.js";
import HalamanCheckoutStepTwo from "../pages/halaman-checkout-steptwo.js";
import fs from "fs";
import path from "path";
import { compareScreenShoot } from "../helper/halamanSS.js";
import { data } from "../fixtures/data.js";

// Digunakan untuk afterEach
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const checkoutStepTwo = async () => {
    describe("Halaman CheckOut Step-2 Saucedemo.com", () => {
        let driver;
        let halamanLogin;
        let halamanInventory;
        let halamanCart;
        let halamanCheckOutStepOne;
        let halamanCheckOutStepTwo;
        // variabel ini digunakan untuk melakukan cross browser testing
        let browserName = "chrome";

        beforeEach(async () => {
            driver = await new Builder().forBrowser(browserName).build();
            halamanLogin = new HalamanLogin(driver);
            halamanInventory = new HalamanInventory(driver);
            halamanCart = new HalamanCart(driver);
            halamanCheckOutStepOne = new HalamanCheckoutStepOne(driver);
            halamanCheckOutStepTwo = new HalamanCheckoutStepTwo(driver);
            await halamanLogin.open(data.baseUrl);
            await halamanLogin.login(data.validLogin.username, data.validLogin.password);
            await halamanInventory.addDuaProdukInventory();
            await halamanInventory.clickIconCart();
            await halamanCheckOutStepOne.clickButtonChechkout();
            await halamanCheckOutStepOne.yourInformation(data.inputDataDiri.firstname, data.inputDataDiri.lastname, data.inputDataDiri.postalcode);
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


        it("TC-Checkout (step two)-01 - Memastikan Terdapat Title 'Price Total' pada halaman", async () => {
            let titlePrice = await halamanCheckOutStepTwo.getTitlePrice();
            expect(titlePrice).to.equal(data.title.titlePriceInform);
        })

        it("TC-Checkout (step two)-02 - Memastikan Terdapat Title 'Payment Information' pada halaman", async () => {
            let titleFinish = await halamanCheckOutStepTwo.getTitlePayment();
            expect(titleFinish).to.equal(data.title.titlePaymentInform);
        })

        it("TC-Checkout (step two)-03 - Memastikan 2 Items Ditampilkan Dihalaman Checkout Step-2", async () => {
            let backpackProduk = await halamanCheckOutStepTwo.displayedTitle();
            let backlightProduk = await halamanCheckOutStepTwo.nextDisplayedTitle();

            expect(await backlightProduk.isDisplayed()).to.equal(true);
            expect(await backpackProduk.isDisplayed()).to.equal(true);
        })
    })
}

await checkoutStepTwo();
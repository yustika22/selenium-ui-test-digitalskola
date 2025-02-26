import { Builder, By } from "selenium-webdriver";
import { expect } from "chai";
import HalamanLogin from "../pages/halaman-login.js";
import HalamanInventory from "../pages/halaman-inventory.js";
import HalamanCart from "../pages/halaman-cart.js";
import HalamanCheckoutStepOne from "../pages/halaman-checkout-stepone.js";
import fs from "fs";
import path from "path";
import { compareScreenShoot } from "../helper/halamanSS.js";
import { data } from "../fixtures/data.js";

// Digunakan untuk afterEach
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const checkoutStepOne = async () => {
    describe("Halaman Checkout Step-1 Saucedemo.com", () => {
        let driver;
        let halamanLogin;
        let halamanInventory;
        let halamanCart;
        let halamanCheckOutStepOne;
        // variabel ini digunakan untuk melakukan cross browser testing
        let browserName = "chrome";

        beforeEach(async () => {
            driver = await new Builder().forBrowser(browserName).build();
            halamanLogin = new HalamanLogin(driver);
            halamanInventory = new HalamanInventory(driver);
            halamanCart = new HalamanCart(driver);
            halamanCheckOutStepOne = new HalamanCheckoutStepOne(driver);
            await halamanLogin.open(data.baseUrl);
            await halamanLogin.login(data.validLogin.username, data.validLogin.password);
            await halamanInventory.addDuaProdukInventory();
            await halamanInventory.clickIconCart();
            await halamanCheckOutStepOne.clickButtonChechkout();
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

        it("TC-Checkout(step one)-01 - Memastikan Berhasil Masuk Dihalaman Checkout Step-1", async () => {
            let titleInformation = await halamanCheckOutStepOne.getTitleCheckoutsatu();
            expect(titleInformation).to.equal(data.title.pageCoStepOne);
        })

        it("TC-Checkout(step one)-02 - Berhasil Mengisi Inputan Firstname, Lastname, PostalCode", async () => {
            await halamanCheckOutStepOne.yourInformation(data.inputDataDiri.firstname, data.inputDataDiri.lastname, data.inputDataDiri.postalcode);


            //  validasi berada dihalaman checkout step 2
            let titleComplete = await halamanCheckOutStepOne.getTitleComplete();
            expect(titleComplete).to.equal(data.title.pageCoStepTwo);
        })

    })
}

await checkoutStepOne();
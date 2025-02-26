import { Builder, By } from "selenium-webdriver";
import { expect } from "chai";
import HalamanLogin from "../pages/halaman-login.js";
import HalamanInventory from "../pages/halaman-inventory.js";
import HalamanCart from "../pages/halaman-cart.js";
import fs from "fs";
import path from "path";
import { compareScreenShoot } from "../helper/halamanSS.js";
import { data } from "../fixtures/data.js";

// Digunakan untuk afterEach
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cartTest = async () => {
    describe("Halaman Cart Didalamnya Terdapat Item Yang Ditambahkan", () => {
        let driver;
        let halamanLogin;
        let halamanInventory;
        let halamanCart;
        // variabel ini digunakan untuk melakukan cross browser testing
        let browserName = "chrome";

        beforeEach(async function () {
            driver = await new Builder().forBrowser(browserName).build();
            halamanLogin = new HalamanLogin(driver);
            halamanInventory = new HalamanInventory(driver);
            halamanCart = new HalamanCart(driver);
            await halamanLogin.open(data.baseUrl);
            await halamanLogin.login(data.validLogin.username, data.validLogin.password);
            await halamanInventory.addDuaProdukInventory();
            await halamanInventory.clickIconCart();

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

        it("TC-Cart-01 - Memastikan 2 item berada dihalaman cart", async () => {

            let titleBackpack = await halamanCart.getTitleBackpack();
            let titleBackLight = await halamanCart.getTitleBackLight();

            expect(titleBackpack).to.equal(data.title.sauceBackpackTitle);
            expect(titleBackLight).to.equal(data.title.sauceBackLightTitle);

        })

        it("TC-Cart-02 - Memastikan Terdapat Button 'Continue Shoping' Pada Halaman Cart", async () => {
            let titleShopping = await halamanCart.tampilButtonContinueShopping();
            expect(await titleShopping.isDisplayed()).to.equal(true);
        })
    })

}

await cartTest()



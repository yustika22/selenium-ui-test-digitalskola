import { Builder, By } from "selenium-webdriver";
import { expect } from "chai";
import HalamanLogin from "../pages/halaman-login.js";
import HalamanInventory from "../pages/halaman-inventory.js";
import fs from "fs";
import path from "path";
import { compareScreenShoot } from "../helper/halamanSS.js";
import { data } from "../fixtures/data.js";

// Digunakan untuk afterEach
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const inventoryTest = async () => {
    describe("Halaman Inventory Saucedemo test", () => {
        let driver;
        let halamanLogin;
        let halamanInventory;
        // variabel ini digunakan untuk melakukan cross browser testing
        let browserName = "chrome";

        beforeEach(async () => {
            driver = await new Builder().forBrowser(browserName).build();
            halamanLogin = new HalamanLogin(driver);
            halamanInventory = new HalamanInventory(driver);
            await halamanLogin.open(data.baseUrl);
            await halamanLogin.login(data.validLogin.username, data.validLogin.password);

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

        it("TC-Inventory-01 - Memastikan Terdapat Button Humbergur Dihalaman Inventory", async () => {
            let menuButton = await halamanInventory.getHumberger();
            expect(await menuButton.isDisplayed()).to.equal(true);
        })

        it("TC-Inventory-02 - Menambahkan 2 Item Dikeranjang", async () => {
            await halamanInventory.addDuaProdukInventory();
            let duaItemDiIcon = await halamanInventory.getIconCartAngkaDua();
            expect(duaItemDiIcon).to.equal("2");
        })

    })

}

await inventoryTest();

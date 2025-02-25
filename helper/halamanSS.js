import fs from "fs";
import path from "path";
import resemble from "resemblejs";

const screenShoot = path.join(__dirname, "../screenshots");
if (!fs.existsSync(screenShoot)) {
  fs.mkdirSync(screenShoot);
}

export const compireScreenShoot = (testCaseName) => {
  const baselineImage = path.join(screenShoot, `${testCaseName}_baseline.png`);
  const newImage = path.join(screenShoot, `${testCaseName}_new.png`);
  const diffImage = path.join(screenShoot, `${testCaseName}_diff.png`);

  // simpan ss sebagai baseline
  if (!fs.existsSync(baselineImage)) {
    console.log(
      `Baseline image for ${testCaseName} not found. Saving new image as baseline.`
    );
    fs.copyFileSync(newImage, baselineImage);
    return;
  }

  return new Promise((resolve, reject) => {
    resemble(baselineImage)
      .compareTo(newImage)
      .ignoreColors()
      .onComplete((data) => {
        fs.writeFileSync(diffImage, data.getBuffer());
        console.log(`Visual difference: ${data.misMatchPercentage}%`);

        if (data.misMatchPercentage > 1) {
          console.error(`Visual regression detected! Check ${diffImage}`);
        } else {
          console.log(`No significant visual differences detected.`);
        }
        resolve();
      });
  });
};

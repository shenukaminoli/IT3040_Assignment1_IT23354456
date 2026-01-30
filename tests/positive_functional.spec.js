const { test, expect } = require('@playwright/test');

// 24 positive test inputs 
const positiveInputs = [
  'mama shenuka samaga paadam karanna yannam.',
  'mama asaneepa unu nisaa campus giya gaman amaaru unaa.',
  'mama akka ekka palli giyaa.',
  'api campus yamu.',
  'maGe mithuran eNa thuru maa balaa sitiyaa.',
  'Mama kohomadha ada gedhara yanne?',
  'Oyaage ammata kohomadha akke?',
  'suba raathriyak magee puthee!',
  'ah ah parissamin.',
  'Mata rupiyal 500 dhenna.',
  'Hari hari mn heta oyaata chocolate gennam.',
  'Mata heta viva ekak thiyenavaa.',
  'mama iyee godak bayen hitiyee.',
  'karunaakara mama ena thuru inna.',
  'Magee photos okkoma godak lassanata thiyenavaa thanks.',
  'Supiri yaaluvee! Oyaa hondhata karalaa. Magee photoes okkoma godak hondhata thiyenavaa.',
  'mama magee ammata thaaththata godak aadharei.',
  'Oyaa mechchara moda kenekdha?',
  'obata godaak sthuuthi maath samaga sitiyaata.',
  'anee mata ridmi samaga sellam karanna onee.',
  'gihan oyaagee vayasa kiiyadha?',
  'heta oyaa apith ekka sellam karanna enna. haamoma oyaa enakan balaagena innavaa.',
  'Magee studies okkoma complete unaata passe mama canada yanna inne.',
  'oyaa maath ekka heta nuwara yanna sudhaanam venna.'
];

for (const sentence of positiveInputs) {
  test(`Positive Test: "${sentence}"`, async ({ page }) => {
    // Go to Swift Translator
    await page.goto('https://www.swifttranslator.com/');

    // Type the Singlish text
    const input = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
    await input.fill(sentence);

    // Output div
    const output = page.locator('div.bg-slate-50');

    // Wait for output text to appear (up to 5 seconds)
    await expect(output).toHaveText(/.+/, { timeout: 5000 });

    // Get the text
    const translatedText = await output.textContent();

    console.log(`Input: "${sentence}" -> Translated text:`, translatedText);

    // Basic check: the output should not be empty
    expect(translatedText?.length).toBeGreaterThan(0);
  });
}


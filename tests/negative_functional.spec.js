const { test, expect } = require('@playwright/test');

// 10 negative test inputs
const negativeInputs = [
  'mama ehema karannee naehae.',           // Negative sentence
  'api heta ennee naehae.',                // Negative sentence
  'oyaa eeka hariyata kiyavalaa naehae.', // Negative sentence
  'mamagedharayanavaa',                    // Joined words / missing spaces
  'mata eeka karanna baee.',               // Negation
  'mata eeka epaa.',                       // Negation
  'ooo enna naee.',                        // Informal / slang
  'thx! machan',                           // Unsupported chat shorthand
  'mata 500 rupiyal dennee naehae.',       // Negative numeric sentence
  'eta passe office yanna naee.'           // Negative future plan
];

for (const sentence of negativeInputs) {
  test(`Negative Test: "${sentence}"`, async ({ page }) => {
    // Go to Swift Translator
    await page.goto('https://www.swifttranslator.com/');

    // Locate the Singlish input textarea
    const input = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
    await input.fill(sentence);

    // Locate the output div
    const output = page.locator('div.bg-slate-50');

    // Wait for output text to appear (up to 5 seconds)
    await expect(output).toHaveText(/.+/, { timeout: 5000 });

    // Get the text
    const translatedText = await output.textContent();

    // Log input and translator output
    console.log(`Input: "${sentence}" -> Translated text:`, translatedText);

    // Negative test: we still want some output, but it may not be correct
    expect(translatedText?.length).toBeGreaterThan(0);
  });
}


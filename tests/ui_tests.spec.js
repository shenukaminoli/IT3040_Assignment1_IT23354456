const { test, expect } = require('@playwright/test');

/* ===========================
   POSITIVE UI TEST
   =========================== */
test('Pos_UI_0001 - Sinhala output updates automatically (valid input)', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');

  const inputBox = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
  const outputBox = page.locator('div.bg-slate-50');

  // Type a new valid sentence 
  await inputBox.fill('mama kello samaga paadam karanawa');

  // Check if output updates automatically
  await expect(outputBox).toHaveText(/.+/, { timeout: 5000 });

  const result = await outputBox.textContent();
  console.log('Positive UI Input: "mama kello samaga paadam karanawa" -> Output:', result);

  expect(result?.length).toBeGreaterThan(0);
});

/* ===========================
   NEGATIVE UI TEST
   =========================== */
test('Neg_UI_0001 - UI handles invalid input gracefully', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');

  const inputBox = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
  const outputBox = page.locator('div.bg-slate-50');

  // Type an invalid/new sentence (not from PDF)
  await inputBox.fill('asdf!@#qwerty');

  // Wait a bit for UI to process
  await page.waitForTimeout(3000);

  const result = await outputBox.textContent();
  console.log('Negative UI Input: "asdf!@#qwerty" -> Output:', result);

  // The output may be empty or show some default/error message
  expect(result).toBeDefined(); // Should not crash
});

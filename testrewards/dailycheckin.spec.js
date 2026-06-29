const { test, chromium } = require('@playwright/test');

test.setTimeout(120000);

// ================= CONFIG =================
const REWARDS_URL = "https://rewards.santabrowser.com";

const QUEST = "//span[normalize-space()='Quest' or normalize-space()='Quests']";

const FILTER = "//button[text()='Filter']";

const USAGE = "//button[text()='Usage']";

const APPLY = "//button[text()='Apply']";

const DAILY_CHECKIN =
"//div[@class='space-y-3']//h3[text()='Daily Check-in']";

const CHECKIN_BUTTON =
"//div[@class='p-4']//button[text()='Check in']";

// ================= CLICK HELPER =================
async function click(page, xpath, name) {
    const el = page.locator(xpath).first();

    await el.waitFor({
        state: "visible",
        timeout: 30000
    });

    await el.scrollIntoViewIfNeeded();
    await el.click({ force: true });

    console.log("Clicked:", name);
}

// ================= TEST =================
test('Daily Check-in Flow', async () => {

    const browser = await chromium.launch({
        headless: false,
        executablePath: "C:\\Users\\DELL\\AppData\\Local\\Santa\\Application\\santa.exe"
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    // 1. Open site
    await page.goto(REWARDS_URL, {
        waitUntil: "domcontentloaded"
    });

    await page.waitForTimeout(4000);

    // 2. Quest
    await click(page, QUEST, "Quest");

    // 3. Filter
    await click(page, FILTER, "Filter");

    // 4. Usage
    await click(page, USAGE, "Usage");

    // 5. Apply
    await click(page, APPLY, "Apply");

    // 6. Daily Check-in section
    await click(page, DAILY_CHECKIN, "Daily Check-in");

    await page.waitForTimeout(2000);

    // 7. Check-in button
    const btn = page.locator(CHECKIN_BUTTON).first();

    if (await btn.isVisible().catch(() => false)) {

        console.log("⏳ Not completed → clicking Check-in");

        await btn.click({ force: true });

        await page.waitForTimeout(8000);

        console.log("✅ Check-in completed");

    } else {

        console.log("✅ Already completed or button not visible");
    }

    // Screenshot
    await page.screenshot({
        path: "daily_checkin_flow.png",
        fullPage: true
    });

    await browser.close();
});
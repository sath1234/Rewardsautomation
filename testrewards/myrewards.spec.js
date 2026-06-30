const { test, chromium } = require('@playwright/test');

test.setTimeout(120000);

// ===============================================
// CONFIG
// ===============================================

const REWARDS_URL = "https://rewards.santabrowser.com";
const CLID = "8da91acc7b09930";

// ===============================================
// LOCATORS
// ===============================================

const MY_REWARDS =
"//nav[@class='flex-1 pr-1']//span[text()='My Rewards']";

const TRANSACTION_HISTORY =
"//button[text()='Transaction history']";

const QUEST_HISTORY =
"//button[text()='Quest history']";

const EVENT_AWARDS =
"//button[text()='Event Awards']";

const CLICKS =
"//button[text()='Clicks']";

const IMPRESSIONS =
"//button[text()='Impressions']";

const MISC =
"//button[text()='Misc']";

const ALL =
"//button[text()='All']";

const QUEST_COMPLETIONS =
"//button[text()='Quest Completions']";

const REFERRAL_REWARDS =
"//button[text()='Referral Rewards']";

const PLAYWALL_HISTORY =
"//button[text()='Playwall history']";

const CASHBACK_HISTORY =
"//button[text()='Cashback history']";

// ===============================================
// CLICK FUNCTION
// ===============================================

async function clickElement(page, locator, name) {

    console.log(`Clicking ${name}`);

    const element = page.locator(locator).first();

    await element.waitFor({
        state: "visible",
        timeout: 30000
    });

    await element.scrollIntoViewIfNeeded();

    await element.click({
        force: true
    });

    console.log(`${name} clicked`);

    await page.waitForTimeout(2000);
}

// ===============================================
// TEST
// ===============================================

test('My Rewards Complete Flow', async () => {

    const browser = await chromium.launch({
        headless: false,
        executablePath: "C:\\Users\\DELL\\AppData\\Local\\Santa\\Application\\santa.exe"
    });

    const context = await browser.newContext();

    await context.addCookies([
        {
            name: "clid",
            value: CLID,
            domain: "rewards.santabrowser.com",
            path: "/"
        }
    ]);

    const page = await context.newPage();

    await page.goto(REWARDS_URL, {
        waitUntil: "domcontentloaded"
    });

    await page.waitForTimeout(5000);

    // ================= FLOW =================

    await clickElement(page, MY_REWARDS, "My Rewards");

    await clickElement(page, TRANSACTION_HISTORY, "Transaction History");

    await clickElement(page, QUEST_HISTORY, "Quest History");

    await clickElement(page, EVENT_AWARDS, "Event Awards");

    await clickElement(page, CLICKS, "Clicks");

    await clickElement(page, IMPRESSIONS, "Impressions");

    await clickElement(page, MISC, "Misc");

    await clickElement(page, ALL, "All");

    await clickElement(page, QUEST_COMPLETIONS, "Quest Completions");

    await clickElement(page, REFERRAL_REWARDS, "Referral Rewards");

    await clickElement(page, PLAYWALL_HISTORY, "Playwall History");

    await clickElement(page, CASHBACK_HISTORY, "Cashback History");

    await page.screenshot({
        path: "my_rewards_complete_flow.png",
        fullPage: true
    });

    console.log("🎉 My Rewards Complete Flow Executed Successfully");

    await browser.close();
});  


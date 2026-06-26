const { test, chromium } = require('@playwright/test');

test('RewardscategoryTest', async () => {
  const browser = await chromium.launch({
    headless: false,
  });

  const context = await browser.newContext();

  await context.addCookies([
    {
      name: 'clid',
      value: '8da91acc7b09930',
      domain: 'rewards.santabrowser.com',
      path: '/',
    },
  ]);

  const page = await context.newPage();

  await page.goto('https://rewards.santabrowser.com');  
  const Quests = page.locator("//nav[@class='flex-1 pr-1']//span[text()='Quests']");   
  const spaces = page.locator("//nav[@class='flex-1 pr-1']//span[text()='Spaces']");  
  const myrewards = page.locator("//span[text()='My Rewards']");  
  const rank = page.locator("//nav[@class='flex-1 pr-1']//span[text()='Rank']")
  await Quests.click();  
  await spaces.click();  
  await myrewards.click();   
  await rank.click(); 

  await browser.close();


});
import { chromium, expect, test } from '@playwright/test';

 //test script for the login process
test("Login test demo", async () => {

    const browser = await chromium.launch();        //launch the browser in chromium
    const context = await browser.newContext();    //create a new browser session for the test
    const page = await context.newPage();          //create new tab for the session

    //navigate to the online library
    await page.goto(" https://onlinelibrary.wiley.com/")  

    //click Login/Register button
    await page.click("'Login / Register'")

    //click on the "Individual login" button
    await page.locator("//a[contains(., 'Individual login')]").click();

    //enter email address in the input field
    await page.fill("input[name='email']", "user1@gmail.com")

    //click continue button
    await page.locator('#sign-in-btn').click();

    //wait for appear the password field
    await page.waitForSelector("input[name='password']");
    await page.fill("input[name='password']", "2000@User");
    
    //click continue to complete the login
    await page.waitForSelector("input[name='Continue']");
    await page.click("'Continue'")

    //assert that the library homepage is visible ,confirm successful login
    await expect(page.locator('#indivLogin')).toBeVisible();
})
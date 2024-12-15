import { chromium, expect, test } from '@playwright/test';

 //test script for the register process
test("Register test demo", async () => {

    const browser = await chromium.launch();        //launch the browser in chromium
    const context = await browser.newContext();    //create a new browser session for the test
    const page = await context.newPage();          //create new tab for the session

    //navigate to the online library
    await page.goto(" https://onlinelibrary.wiley.com/")  

    //click Login/Register button
    await page.click("'Login / Register'")

    //click on the "REGISTER" button
    await page.locator("//a[contains(., 'REGISTER')]").click();

    //enter email address in the input field
    await page.fill("input[name='email']", "user2@gmail.com")

    //click continue button
    await page.locator('#sign-up-btn').click();

    /*after click continue button it redirect to the verification code generator 
      page and it send verification code to the email. after fill, it automatically
      navigate to the signup form*/

    //enter first name in the input field
    await page.fill("input[name='firstname']", "Kamal")

    //enter last name in the input field
    await page.fill("input[name='lastname']", "Perera")

    //click on the search input field to display the dropdown menu
    await page.click('.MuiFormControl-root css-1fsz13r')

    //assert that the dropdown is visible
    await expect(page.locator('.class="MuiNativeSelect-select MuiNativeSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-h8h8y')).toBeVisible()

    //test letter in search box
    const testLetter = 's';
    await page.fill('MuiFormControl-root css-1fsz13r', testLetter);

    //wait for dropdown options to filter and visible
    await page.waitForSelector('option:visible')

    //assert that countries starting with the test letter are visible
    const visibleCountries = await page.locator('option:visible').allTextContents();
    const expectedCountries = ['Spain', 'Sweden', 'Switzerland'];
    expect(visibleCountries).toEqual(expectedCountries);

    //enter the password field
     await page.fill("input[name='password']", "2000@User2");

    //click continue to complete the signup
    await page.waitForSelector("input[name='Continue']");
    await page.click("'Continue'")

})
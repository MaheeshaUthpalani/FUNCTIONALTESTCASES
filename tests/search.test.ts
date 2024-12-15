import { chromium, expect, test } from '@playwright/test';

 //test script for the login process
test("Login test demo", async () => {

    const browser = await chromium.launch();        //launch the browser in chromium
    const context = await browser.newContext();    //create a new browser session for the test
    const page = await context.newPage();          //create new tab for the session

    //navigate to the online library
    await page.goto(" https://onlinelibrary.wiley.com/")  

    //type search value in the search bar
    const searchBarSelector = '#searchField1';
    await page.fill(searchBarSelector, 'data science')

    //click search button
    const searchButtonSelector = '.btn quick-search__button icon-search';
    await page.click(searchButtonSelector)

    //wait to load the selected result
    const resultSelector = '#ui-id-1';
    await page.waitForSelector(resultSelector)

    //assert that search results are displayed
    const resultsText = await page.locator(resultSelector).allTextContents();
    expect(resultsText.length).toBeGreaterThan(0);   //ensure the search results are not empty



})
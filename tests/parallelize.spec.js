const { test } = require('@playwright/test');
const config  = require('../playwright.config.js');

test.describe.configure({ 
    mode: 'parallel',
});


//const numUsers = 1;  // to have even loading needs to match workers in playwright.config.js -> could try import the js file and read the number or vise versa
                    // max number of workers relates to the number of logical cores/processors other wise could lead to stronger time stealing
const numUsers = config.workers;

//const loops = config.repeatEach;  // it is possible to loop each test in config  -> to get the loop number the worker index process.env.TEST_WORKER_INDEX may give the loop number
                                // Using this isn't a good idea because it will also load up workers at the same time repeatEach 2 could make them run in parallel vs just looping 1 worker
//console.log(loops);

const numIteration = 2;

for (let i=0; i<numUsers; i++){
    test(`User ${i}`, async ({ browser }) => {

        for(let j=0; j<numIteration; j++){
            await test.step(`Iteration ${j}`, async () => {
                const context = await browser.newContext();
                const page = await context.newPage();

                await test.step("loading", async() => {
                    await page.goto('https://google.ca/', { waitUntil: 'domcontentloaded' })
                })
                
                await page.getByRole('combobox', { name: 'Search' }).fill('hockey');                
                
                await test.step("search", async() =>{
                    await page.getByRole('button', { name: 'Google Search' }).first().click();
                    await page.waitForNavigation();
                    await page.waitForLoadState('domcontentloaded');
                })
                await context.close();  /// need to clear cache and storage between iterations
            })
        }
        
    });
}



const { test } = require('@playwright/test');

test.describe.configure({ 
    mode: 'parallel',
});


const numUsers = 1;  // to have even loading needs to match workers in playwright.config.js -> could try import the js file and read the number or vise versa
                    // max number of workers relates to the number of logical cores/processors other wise could lead to stronger time stealing

const numIteration = 4;

for (let i=0; i<numUsers; i++){
    test(`User ${i}`, async ({ browser }) => {

        for(let j=0; j<numIteration; j++){
            await test.step(`Iteration ${j}`, async () => {
                const context = await browser.newContext();
                // Create a new page inside context.
                const page = await context.newPage();

                await page.goto('https://google.ca/', { waitUntil: 'networkidle' })
                await page.getByRole('combobox', { name: 'Search' }).fill('hockey');
                await page.getByRole('button', { name: 'Google Search' }).first().click();
                await page.waitForNavigation();
                await page.waitForLoadState('networkidle');
    
                console.log(`User ${i} Loop ${j} - ${process.env.TEST_WORKER_INDEX}`);
                console.log(`User ${i} Loop ${j} - ${process.env.TEST_PARALLEL_INDEX}`);

                await context.close();  /// need to clear cache and storage between iterations
            })
        }
        
    });
}


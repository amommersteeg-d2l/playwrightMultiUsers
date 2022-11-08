This repo contains POC testing to run Playwright tests with multiple virtual users (VUs) completing the same test loop over multiple iterations. A simple load test.


# POC 1
- Using Playwright's Parallelize feature. While this feature is intended to be used to run different tests in parallel it can also be used to run the same test over and over
https://playwright.dev/docs/test-parallel#parallelize-tests-in-a-single-file
- Playwright does have a env variable to repeat tests, that was not used instead a for loop was used to keep better track of the number of iterations.
- This requires that variables in `playwright.config.js` to be updated, `workers` should be the number of VUs you would like to run
- The POC takes advantage of the `.step` method to loop iterations and nest the requests

- See test tests/parallelize.spec.js
```
npx playwright test parallelize.spec.js
```

 ## Issues
- The number of workers should be limited to the number of logic cores on the machine. This limits to about 12 workers on modern laptops.
    - When going above the number of logic cores it is unclear how the tests will be impacted, workers may start blocking each other impacting results


- There is an issue with POC on how to aggregate the results data
    - To address this issue a simple script was created to parse the result json file
    - See directory results-data-parse
    ```
    cd results-data-parse
    node parse.js
    ```


# POC 2
- Using node's worker threads to create VUs
- This POC was NOT completed because POC 1 had some successful
- POC 2 will have a similar issue with aggregating the result data
- See index.js


const fs = require('fs');
const path = require('path')

const json = JSON.parse(fs.readFileSync(path.join(__dirname + '/../playwright-report/test-results.json'), 'utf8'));

let iterations = [];

json.suites[0].specs[0].tests[0].results[0].steps.forEach( iteration => {
    tests = {}
    iteration.steps.forEach(step =>{
            tests[step.title] = step.duration
    });
    iterations.push(tests)
    
});

let metrics = {}

metrics.numSamples = iterations.length;


Object.keys(iterations[0]).forEach(key => {
    metrics[key] = {}
    metrics[key].average = average(key)
});

function average(key){
    let total = 0;
    let count = 0;

    iterations.forEach(test => {
        if (test.hasOwnProperty(key)){
            total = total + test[key];
            count++
        }
    })

    return (total/count)
}

console.log(metrics)
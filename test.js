const { workerData, parentPort } = require("worker_threads");

const { chromium } = require('playwright')
 
// you can do intensive sychronous stuff here
function theTest(name) {
  return `Hello World ${name}`;
}
 
const result = theTest(workerData.name);
 
parentPort.postMessage({ result });
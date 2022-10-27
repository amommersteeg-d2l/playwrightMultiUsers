const { Worker } = require("worker_threads");


function runPlaywright(name) {
    return new Promise((resolve, reject) => {
      const worker = new Worker("./test.js", { workerData: { name } });
   
      worker.on("message", resolve);
      worker.on("error", reject);
      worker.on("exit", (code) => {
        if (code !== 0) {
          reject(new Error(`stopped with exit code ${code}`));
        }
      });
    });
}
   
(async () => {
try {
    const result = await runPlaywright("John");
    console.log("Parent: ", result);
} catch (err) {
    console.log(err);
}
})();
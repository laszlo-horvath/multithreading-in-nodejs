const { parentPort } = require("node:worker_threads");
const { cpuIntensiveCalculation } = require("./../utils/index");

// Listen for initial message from parent thread
parentPort.on("message", ({ i, sharedData }) => {
  // Perform CPU-intensive calculation and store result in shared array
  sharedData[i] = cpuIntensiveCalculation();

  // Notify parent thread that this worker has finished
  parentPort.postMessage({ index: i });

  // Exit this worker thread
  process.exit();
});



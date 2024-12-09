const { parentPort } = require("worker_threads");

// Listen for initial message from parent thread
parentPort.on("message", ({ i, sharedData }) => {
  // Perform CPU-intensive calculation and store result in shared array
  sharedData[i] = cpuIntensiveCalculation();

  // Notify parent thread that this worker has finished
  parentPort.postMessage({ index: i });

  // Exit this worker thread
  process.exit();
});

function cpuIntensiveCalculation() {
  let sum = 0;

  // Perform 1 billion additions
  for (let i = 0; i < 1e9; i++) {
    sum += i;
  }

  return sum;
}

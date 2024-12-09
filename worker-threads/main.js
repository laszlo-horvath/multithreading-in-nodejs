const { Worker } = require("node:worker_threads");

// Define how many parallel worker threads to create
const NUMBER_OF_WORKERS = 4;

function createSharedArray(length) {
  const sharedBuffer = new SharedArrayBuffer(length * Uint32Array.BYTES_PER_ELEMENT);
  const sharedArray = new Uint32Array(sharedBuffer);

  return sharedArray;
};

// Create a SharedArrayBuffer to allow workers to share data
const sharedData = createSharedArray(NUMBER_OF_WORKERS);

// Spawn worker threads
for (let i = 0; i < NUMBER_OF_WORKERS; i++) {
  // Create a new worker thread
  const worker = new Worker("./worker-threads/worker.js");

  // Send the worker its index and the shared data array
  worker.postMessage({ i, sharedData });

   // Listen for completion message from worker
  worker.on("message", ({ index }) =>
    console.log(`Index ${index} finished.`)
  );
}

// When all workers are done and process exits, display final results
process.on("exit", () => console.table(sharedData));

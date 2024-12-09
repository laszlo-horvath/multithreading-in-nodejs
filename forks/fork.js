const { fork } = require("node:child_process");
const express = require("express");

const { cpuIntensiveCalculation } = require("./../utils/index");

const app = express();

// Route 1: Synchronous CPU-heavy task
// This will block the event loop while processing
app.get("/sync", (_, res) => {
  const sum = cpuIntensiveCalculation();
  res.send({ sum });
});

// Route 2: Async wrapper around CPU-heavy task
// Still blocks the event loop, just wrapped in a Promise
app.get("/async", async (_, res) => {
  const sum = await asyncCpuHeavyTask();
  res.send({ sum });
});

// Route 3: Using child process to handle CPU-heavy task
// This prevents blocking the main event loop
app.get("/fork", (_, res) => {
  // Create a new child process
  const child = fork("./forks/cpu-heavy-task.js");

  // Send message to child process to start computation
  child.send("start");

  // Listen for result from child process
  child.on("message", (message) => {
    res.send({ sum: message });
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));

// Wraps the CPU-heavy task in a Promise
// Note: This doesn't actually make it non-blocking,
// it just returns a Promise that resolves with the result
function asyncCpuHeavyTask() {
  return new Promise((resolve) => {
    resolve(cpuIntensiveCalculation());
  });
}

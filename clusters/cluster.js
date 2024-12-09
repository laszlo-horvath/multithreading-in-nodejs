const cluster = require("node:cluster");
const os = require("node:os");
const express = require("express");

const { cpuIntensiveCalculation } = require("../utils/index");

// Get the number of CPU cores available on the system
const cpuCount = os.cpus().length;

const app = express();

// Define route that performs CPU-heavy work and simulates crashes
app.get("/", (_, res) => {
  // Perform CPU-intensive task
  cpuIntensiveCalculation();

  // Randomly crash the worker (50% chance)
  // This demonstrates cluster's auto-recovery feature
  if (Math.random() > 0.5) {
    console.log(`Worker ${process.pid} crashed`);
    process.exit(1);
  }

  // If we didn't crash, send response with worker's process ID
  res.send(`Done. ${process.pid}`);
});

// Check if this is the master process
if (cluster.isMaster) {
  // ---- Master process: Create worker processes ---- //

  // Fork worker processes equal to number of CPU cores
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }

  // Handle worker process exits
  // This enables auto-recovery when workers crash
  cluster.on("exit", (worker, _code, _signal) => {
    console.log(`Worker ${worker.process.pid} exited. Restarting.`);
    cluster.fork();
  });
} else {
  // ---- Worker process: Start the Express server ---- //

  // Each worker listens on the same port
  // Node.js handles the port sharing automatically
  app.listen(3000, () =>
    console.log(`Server ${process.pid} is running on port 3000`),
  );
}

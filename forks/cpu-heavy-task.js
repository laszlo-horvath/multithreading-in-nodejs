const { cpuIntensiveCalculation } = require("./../utils/index");

// Listen for message from parent process
process.on("message", (message) => {
  if (message === "start") {
    // Perform CPU-intensive calculation
    const sum = cpuIntensiveCalculation();

    // Send result back to parent process
    process.send(sum);
  }
});

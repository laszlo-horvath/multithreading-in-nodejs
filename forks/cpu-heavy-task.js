const { cpuIntensiveCalculation } = require("./../utils/index");

process.on("message", (message) => {
  if (message === "start") {
    const sum = cpuIntensiveCalculation();
    process.send(sum);
  }
});

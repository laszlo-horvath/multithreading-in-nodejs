const { fork } = require("node:child_process");
const express = require("express");

const { cpuIntensiveCalculation } = require("./../utils/index");

const app = express();

app.get("/sync", (_, res) => {
  const sum = cpuIntensiveCalculation();
  res.send({ sum });
});

app.get("/async", async (_, res) => {
  const sum = await asyncCpuHeavyTask();
  res.send({ sum });
});

app.get("/fork", (_, res) => {
  const child = fork("./forks/cpu-heavy-task.js");
  child.send("start");

  child.on("message", (message) => {
    res.send({ sum: message });
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));

function asyncCpuHeavyTask() {
  return new Promise((resolve) => {
    resolve(cpuIntensiveCalculation());
  });
}

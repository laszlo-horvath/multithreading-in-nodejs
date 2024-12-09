function cpuIntensiveCalculation() {
  let sum = 0;

  // Perform 1 billion additions
  for (let i = 0; i < 1e9; i++) {
    sum += i;
  }

  return sum;
}

module.exports = {
  cpuIntensiveCalculation
};

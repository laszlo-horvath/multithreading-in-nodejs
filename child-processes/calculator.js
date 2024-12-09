// Gets two numbers as command line arguments and performs calculations

const num1 = parseInt(process.argv[2]);
const num2 = parseInt(process.argv[3]);

console.log(`Performing calculations with ${num1} and ${num2}`);
console.log(`Addition: ${num1 + num2}`);
console.log(`Subtraction: ${num1 - num2}`);
console.log(`Multiplication: ${num1 * num2}`);
console.log(`Division: ${num1 / num2}`);

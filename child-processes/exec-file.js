const { execFile } = require('node:child_process');

// execFile - Directly executes a file without using a shell
execFile('node', ['./child-processes/calculator.js', '5', '10'], (error, stdout, stderr) => {
  if (error) {
    console.error(`execFile error: ${error}`);
    return;
  }

  console.log('execFile output:');
  console.log(stdout);
});

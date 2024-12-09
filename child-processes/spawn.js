const { spawn } = require('node:child_process');

// spawn - Streams the output, better for long-running processes
// or processes with large outputs
const ls = spawn('ls', ['-la']);

ls.stdout.on('data', (data) => {
  console.log('spawn output:');
  console.log(`${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`spawn error: ${data}`);
});

ls.on('close', (code) => {
  console.log(`spawn child process exited with code ${code}`);
});

// Example of spawn with a more complex command
// Creating a process that counts from 1 to 5 with a delay
const count = spawn('bash', [
  '-c',
  'for i in {1..5}; do echo $i; sleep 1; done'
]);

count.stdout.on('data', (data) => {
  console.log(`Count: ${data}`);
});

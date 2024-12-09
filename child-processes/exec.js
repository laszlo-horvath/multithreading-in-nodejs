const { exec, execFile, spawn } = require('node:child_process');

// exec - Executes a command in a shell, buffers the output
exec('ls -la', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }

  console.log('exec output:');
  console.log(stdout);
});

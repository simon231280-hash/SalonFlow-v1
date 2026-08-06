const { spawn } = require("child_process");
const { app } = require("electron");
const path = require("path");

let backendProcess = null;

function startBackend() {
  if (backendProcess) return;

  console.log("Starting SalonFlow backend...");

  let executable;
  let cwd;

  if (app.isPackaged) {
    executable = path.join(process.resourcesPath, "SalonFlowAPI");
    cwd = process.resourcesPath;
  } else {
    executable = path.join(
      __dirname,
      "../../backend/dist/SalonFlowAPI"
    );
    cwd = path.join(__dirname, "../../backend");
  }

  backendProcess = spawn(executable, [], {
    cwd,
    env: process.env,
    stdio: "pipe",
  });

  backendProcess.stdout.on("data", (data) => {
    console.log(`[Backend] ${data}`);
  });

  backendProcess.stderr.on("data", (data) => {
    console.error(`[Backend] ${data}`);
  });

  backendProcess.on("error", (err) => {
    console.error("Failed to start backend:", err);
  });

  backendProcess.on("close", (code) => {
    console.log(`Backend exited with code ${code}`);
    backendProcess = null;
  });
}

function stopBackend() {
  if (backendProcess) {
    backendProcess.kill();
    backendProcess = null;
  }
}

module.exports = {
  startBackend,
  stopBackend,
};

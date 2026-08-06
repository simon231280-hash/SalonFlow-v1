const { app, BrowserWindow } = require("electron");
const path = require("path");
const axios = require("axios");

const launcher = require("./launcher");

const isDev = !app.isPackaged;

async function waitForBackend() {
  const url = "http://127.0.0.1:8000";

  for (let i = 0; i < 30; i++) {
    try {
      await axios.get(url);
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  throw new Error("Backend failed to start.");
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    autoHideMenuBar: true,
  });

  if (isDev) {
    mainWindow.loadFile(
      path.join(__dirname, "../../frontend/dist/index.html")
    );

    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(
      path.join(process.resourcesPath, "frontend", "index.html")
    );
  }
}

app.whenReady().then(async () => {
  try {
    launcher.startBackend();

    console.log("Waiting for backend...");

    await waitForBackend();

    console.log("Backend ready.");

    createWindow();
  } catch (error) {
    console.error(error);
    app.quit();
  }
});

app.on("window-all-closed", () => {
  launcher.stopBackend();

  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

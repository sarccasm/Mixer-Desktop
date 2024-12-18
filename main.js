const path = require("path");
const { app, BrowserWindow } = require("electron");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    titleBarStyle: "hidden",
    backgroundColor: "#141828",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // Переконайтеся, що preload.js існує
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Завантаження локального index.html
  mainWindow
    .loadFile("index.html")
    .catch((err) => console.error("Error loading file:", err));

  mainWindow.setMenu(null);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

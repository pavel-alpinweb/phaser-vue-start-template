import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const appDir = dirname(fileURLToPath(import.meta.url));

const DEFAULT_WIDTH = 1365;
const DEFAULT_HEIGHT = 768;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const win = new BrowserWindow({
    width: width || DEFAULT_WIDTH,
    height: height || DEFAULT_HEIGHT,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.setMenu(null);
  win.loadFile(path.join(appDir, 'dist', 'index.html'));
  if(!app.isPackaged) win.webContents.openDevTools({ mode: 'detach' });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') app.quit();
});
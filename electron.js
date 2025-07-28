import { app, BrowserWindow } from 'electron';
import { LEVEL_WIDTH, LEVEL_HEIGHT } from './src/configs/engine.config.js';

function createWindow() {
  const win = new BrowserWindow({
    width: LEVEL_WIDTH,
    height: LEVEL_HEIGHT,
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.setMenu(null);
  win.loadFile('dist/index.html');
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
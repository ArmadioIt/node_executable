const {app, dialog, ipcMain, BrowserWindow } = require('electron');
var path = require('path');
var fs = require('fs');

var exec = require('child_process').execFile;

var read_file = (full_path) => {
  let data = fs.readFileSync(full_path, 'utf8').split('\n')

  let i = 0;
  while(i < data.length){
    let line = data[i]
    console.log("Line: ", line)
    i++;
  }
  fs.unlinkSync(full_path);
  //dialog.showErrorBox("First Line of file: ", data[0]);
  let options = {title : "First Line of file: ", message: data[0]}
  dialog.showMessageBox(win, options)
}

var generateRaport = async function(full_path, executable_path, working_directory){

  exec(executable_path, {
    cwd: working_directory
  }, function(error, stdout, stderr) {
    if (error) {
      console.error(`error: ${error.message}`);
      return;
    }
  
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
  
    console.log(`stdout:\n${stdout}`);
    read_file(full_path)
  });

  
}

function createWindow () {

win = new BrowserWindow({
  width: 800,
  height: 600,
  icon: __dirname + '/icon.ico',
  autoHideMenuBar: true,
  webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
});

global.win = win;

win.loadFile('mainWindow.html');

ipcMain.on("open-dialog", function(event)
{
  let app_path = app.getAppPath()
  let full_path = path.join(app_path, 'executable', 'test.txt');
  let working_directory = path.join(app_path, 'executable');
  let executable_path = path.join(app_path, 'executable', 'sleep_create_file.exe');

  console.log("full_path", full_path)
  console.log("executable_path", executable_path)
  generateRaport(full_path, executable_path, working_directory)

})

}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
})

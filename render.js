const { ipcRenderer } = require('electron')

error = document.getElementById("error");

error.addEventListener("click", function(event) {
  ipcRenderer.send("open-dialog")
});

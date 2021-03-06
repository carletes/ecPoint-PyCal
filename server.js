const electron = require('electron')
const path = require('path')

const { app, BrowserWindow, dialog } = electron

/*
 * Python process
 */

const PY_FOLDER = 'core'
const PY_MODULE = 'api' // without .py suffix

let pyProc = null

const getScriptPath = () =>
  path.join(__dirname, PY_FOLDER, `${PY_MODULE}.py`)

const createPyProc = () => {
  const script = getScriptPath()

  pyProc = require('child_process').spawn('python', [script], {
    stdio: 'inherit',
  })

  if (pyProc != null) {
    console.log(`child process success`)
  }
}

const exitPyProc = () => {
  pyProc.kill()
  pyProc = null
}

app.on('ready', createPyProc)
app.on('will-quit', exitPyProc)

/*
 * Electron Window Management
 */

let mainWindow = null

const createWindow = () => {
  mainWindow = new BrowserWindow()
  mainWindow.maximize()
  mainWindow.loadURL(
    require('url').format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true,
    })
  )

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

exports.selectMultiDirectory = () =>
  dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory', 'multiSelections'],
  }) || []

exports.selectDirectory = () =>
  dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'],
  })

exports.saveFile = () =>
  dialog.showSaveDialog(mainWindow, {
    title: 'Output file path',
    defaultPath: 'test.ascii',
  })

exports.openFile = () =>
  dialog.showOpenDialog(mainWindow, {
    title: 'Input file path',
    properties: ['openFile'],
  })
const { app, Menu, BrowserWindow, ipcMain} = require('electron')
const fs = require('fs')
const { dialog } = require('electron')
const path = require("path")
const storage = require('electron-localstorage')
const nativeImage = require('electron').nativeImage

process.env.NODE_ENV = 'production'

let mainWindow;
let configWindow;

let versao = "1.0"

const sobreURL = path.join(__dirname, "sobre.html") 
const projetoURL = path.join(__dirname, "gantt.html")
const configURL = path.join(__dirname, "config.html")

storage.setItem('opr','')
storage.setItem('filename', process.argv[2]);

const template = [
  {
  label: "Menu",
  submenu: [
    {
      label: 'Nova rede',
      icon: nativeImage.createFromPath(__dirname + '/res/new.png').resize({width:16}),
      click: () => { novaRede() }
    },
    {
      label: 'Abrir rede',
      icon: nativeImage.createFromPath(__dirname + '/res/open.png').resize({width:16}),
      click: () => { abrirRede() }
    },
    // {
    //   label: 'Salvar como',
    //   icon: nativeImage.createFromPath(__dirname + '/res/save.png').resize({width:16}),
    //   click: () => { salvarRede() }
    // },
    { 
      type: 'separator'
    },
    {
        label: 'Sair',
        click: () => { appQuit() }
    }
  ]
},
{
  label: 'Sobre',
  icon: nativeImage.createFromPath(__dirname + '/res/miniProject.png').resize({width:16}),
  click: () => { mainWindow.loadFile(sobreURL)}
}
// {
//   label: "Opções",
//   click: () => { createConfigWindow() }
// },
// {
//   label: "Ajuda",
//   submenu: [
//     {
//       label: 'Ajuda do miniProject',
//       icon: nativeImage.createFromPath(__dirname + '/res/help.png').resize({width:16}),
//       click: () => { mainWindow.loadURL(sobreURL) }
//     },
//     {
//       label: 'Suporte técnico',
//       click: () => { suporte(); }
//     },    {
//       label: 'Atualização de versão',
//       click: () => { mainWindow.loadURL(sobreURL) }
//     },
//     {
//       label: 'Sobre',
//       icon: nativeImage.createFromPath(__dirname + '/res/miniProject.png').resize({width:16}),
//       click: () => { mainWindow.loadFile(sobreURL)}
//     }]
// }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

// ******* mainWindow
function createWindow () {
  mainWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    icon: 'c:/dev/miniproject/appelectron/icons/png/256x256.png',
    width: 1200,
    height: 750,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      worldSafeExecuteJavaScript: false
      // preload: path.join(__dirname, "preload.js")
    }
  })
  // mainWindow.maximize()
  mainWindow.setTitle("miniProject")
  mainWindow.loadURL(projetoURL)
  
  // Abrir o DevTools (aba de ferramentas para desenvolvedores).
  if (process.env.NODE_ENV !== 'production') {
    mainWindow.webContents.openDevTools()
  }
}

// ************ config Window
function createConfigWindow() {
  configWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    icon: '',
    width: 600,
    height: 500,
    title: 'Configurações',
    modal: true,
    parent: mainWindow,
    show: false
  })
  configWindow.once('ready-to-show', () => {
    configWindow.show()
  })
  configWindow.loadURL(configURL)
  configWindow.setMenu(null)
  configWindow.on('close', function() {
    configWindow = null
  })
  
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

function appQuit() {
  if (process.platform !== 'darwin')
      app.quit();
}

function novaRede() {
  storage.setItem('filename', '');
  storage.setItem('opr','new')
  mainWindow.setTitle("miniProject ")
  mainWindow.loadURL(projetoURL)
}

function abrirRede() {
  const options = {
    defaultPath: app.getPath('documents'),
    filters: [{name: 'miniProject', extensions: ['mpjt']}]
  }
  dialog.showOpenDialog(options).then(result => {
    const filename = result.filePaths
    if (filename == undefined) {
      return
    } else {
      storage.setItem('filename', filename[0])
      storage.setItem('opr','open')
      mainWindow.setTitle("miniProject" + " - " + filename[0])
      mainWindow.loadURL(projetoURL)
    }
  })
}

function salvarRede(data) {
  const options = {
    defaultPath: app.getPath('documents'),
    filters: [{name: 'miniProject', extensions: ['mpjt']}]
  }
  dialog.showSaveDialog(options).then(result => { 
    var filename = result.filePath
    if (filename == undefined || filename == '') {
      return
    } else {
      fs.writeFile(filename, data, function (err) {
        if (err) {
          console.log("Não foi possível salvar")
        } else {
          storage.setItem('filename', filename)
          mainWindow.setTitle("miniProject" + " - " + filename)
          mainWindow.loadURL(projetoURL)
        }
      })
    }
  }).catch(err => { console.log(err)})
}

ipcMain.on('get-file', function (event, data) {
  console.log("openfile")
  if (process.platform == 'win32' && process.argv.length >=2) {
    const openFile = process.argv[1]
    console.log(openFile)
    storage.setItem('filename', openFile)
    storage.setItem('opr','open')
    mainWindow.setTitle("miniProject" + " - " + openFile)
    mainWindow.loadURL(projetoURL)
  } else {
    alert("filenamen vazio")
  }
})

ipcMain.on('salvarComo', function(event,data) {
  salvarRede(data)
})
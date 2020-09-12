var { app, BrowserWindow } = require('electron')

let MainWindow = null
// app -> window 
app.on('ready', () => {
  // init a new Window
  // main process
  MainWindow = new BrowserWindow({
    width: 1000,
    hight: 800,
    webPreferences: {
      nodeIntegration: true,      // 渲染进程中可以使用 nodejs
      enableRemoteModule: true    // 渲染进程中可以使用 remote (用来获取 electron 中的对象)
    }
  })

  // 打开的主页面
  MainWindow.loadFile('index.html')
  // 默认打开调试窗口
  MainWindow.webContents.openDevTools()  
  // 引入菜单栏，重新定义菜单栏
  require('./src/menu.js')

  // 页面关闭事件
  MainWindow.on('closed', () => {
    MainWindow = null
  })
})
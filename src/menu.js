const { Menu } = require('electron')

// 自定义菜单栏
let menuTempalte = [
  // {
  //   label: '自行车构成',                    // 名称 
  //   submenu: [                              // 子级菜单
  //     {
  //       label: '轱辘',
  //       accelerator: `ctrl+n`,              // 快捷键
  //       click: () => {                      // 触发事件
  //         win = new BrowserWindow({
  //           width: 500,
  //           height: 500,
  //           webPreferences: {
  //             nodeIntegration: true,
  //             enableRemoteModule: true
  //           }
  //         })
  //         win.loadFile('xianglong.html')
  //         win.on('closed', () => {
  //           win = null
  //         })
  //       }
  //     },
  //     { label: '车架' }
  //   ]
  // },
]

let menu = Menu.buildFromTemplate(menuTempalte)
Menu.setApplicationMenu(menu)
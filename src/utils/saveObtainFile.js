const { writeFile, readFile } = window.top.require('fs')
const { resolve } = window.top.require('path')

function saveFile(data) {
  let path = resolve('./') + '\\src\\content\\' + data.title + '.txt'
  writeFile(path, JSON.stringify(data), { flag: 'w', encoding: "utf-8" }, function(err) {
    if (err) {
      let option = {
        title: '文件存储结果',
        body: '存储失败',
      }
      new window.Notification(option.title, option)
    } else {
      console.log('存储完成');
    }
  })
}
// 根据文件名获取文件，设置 tinymce 的内容，文件名是根据 sidebar 中的 node 链表获取倒的
// 使用方法  tinyMCE.activeEditor.setContent("<h2>Hello, World!</h2>")
function obtainFile(filePath) {
  readFile(filePath, { flag: 'r', encoding: "utf-8"}, function(err, data) {
    if (error) {
      let option = {
        title: '文件读取结果',
        body: '读取失败',
      }
      new window.Notification(option.title, option)
    } else {
      return JSON.parse(data)
    }
  })
}

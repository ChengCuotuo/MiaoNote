const { writeFile, readFileSync, existsSync } = window.top.require('fs')
const { resolve } = window.top.require('path')

// 保存文件
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
  return readFileSync(filePath, { flag: 'r', encoding: "utf-8"}, function(err, data) {
    if (err) {
      let option = {
        title: '文件读取结果',
        body: '读取失败',
      }
      new window.Notification(option.title, option)
    }
  })
}

// 将 Node 对象转换成 json 对象
function translateNode2JSON(obj, node) {
  obj.id = node.id             
  obj.type = node.type          
  obj.name = node.name        
  obj.filePath = node.filePath  
  obj.preNode = {}
  obj.nextNodes = new Array(node.nextNodes.length)
  if (node.nextNodes && node.nextNodes.length > 0) {
    for (let i = 0; i < node.nextNodes.length; i++) {
      // 一定要声明为新的对象，否则不会分配内存
      translateNode2JSON(obj.nextNodes[i] = new Object(), node.nextNodes[i])
    }
  } else {
    return
  }
}

// 提取 content 文件夹下的 menu.txt 文件。并解析出目录 nodes
function translateMenu() {
  let path = resolve('./') + '\\src\\content\\menu.txt'
  // 判断文件是否存在
  let hasFile = existsSync(path, function(exists) {
    return exists
  })

  if (!hasFile) return false
  let result = obtainFile(path)
  // console.log("result", JSON.parse(result).data);
  let node = {}
  recursionMenuToLink(null, node, JSON.parse(result).data)
  return node
}

function recursionMenuToLink (preNodeObj, nodeObj, menuObj) {
  nodeObj.id = menuObj.id             
  nodeObj.type = menuObj.type          
  nodeObj.name = menuObj.name        
  nodeObj.filePath = menuObj.filePath  
  nodeObj.preNode = preNodeObj
  nodeObj.nextNodes = new Array(menuObj.nextNodes.length)
  if (menuObj.nextNodes && menuObj.nextNodes.length > 0) {
    for (let i = 0; i < menuObj.nextNodes.length; i++) {
      // 一定要声明为新的对象，否则不会分配内存
      recursionMenuToLink(nodeObj, nodeObj.nextNodes[i] = new Object(), menuObj.nextNodes[i])
    }
  } else {
    return
  }
}


// 存储菜单
function saveMenu() {
  var jsonNode = {}
  translateNode2JSON(jsonNode, rootNode)
  let data = {
    title: "menu",
    data: jsonNode,
    delete: deleteMenu
  }
  saveFile(data)
}
const { writeFile, readFileSync, existsSync, mkdirSync } = window.top.require('fs')
const { resolve } = window.top.require('path')

// 保存文件
function saveFile(filePath, data) {
  let path = filePath
  if (path === 'menu') {
    path = resolve('./') + '\\src\\content\\' + data.title + '.txt'
  } 
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
function obtainFile(filePath, fileName) {
  // 判断读取的文件是否存在
  let newPath = filePath
  if (fileName) {
    newPath = filePath + "\\" + fileName
  } else {
    newPath = newPath + "\\"
  }
  // console.log('newPath', newPath);
  let hasFile = existsSync(newPath)
  if (fileName && hasFile) {
    return readFileSync(newPath, { flag: 'r', encoding: "utf-8"}, function(err, data) {
      if (err) {
        let option = {
          title: '文件读取结果',
          body: '读取失败',
        }
        new window.Notification(option.title, option)
      } else {
        console.log(data);
      }
    })
  } else if (fileName && !hasFile) {
    // 创建文件目录
    createFileMenu(newPath.substring(0, newPath.lastIndexOf('\\')) + '\\')
    // 创建文件
    let data = {
      title: '新建文件夹',
      data: 'Hello, World!'
    }
    writeFile(newPath, JSON.stringify(data), { flag: 'w', encoding: "utf-8" }, function(err) {
      if (err) {
        console.log(err, '创建失败');
      } else {
        console.log(filePath, '文件创建成功');
      }
    })
  } else if (!fileName && !hasFile){
    // 根据给的路径创建文件
    // 创建文件夹，nodejs 不能直接创建所有层级的文件夹，需要一个层级一个层级的创建
    createFileMenu(newPath) 
  }
}

// 创建文件目录
function createFileMenu(newPath) {
  const dirCache = {};
  const arr = newPath.split('\\');
  let dir = arr[0];
  for(let i = 1; i < arr.length; i++){
    // console.log(dirCache[dir], existsSync(dir));
    if(!dirCache[dir] && !existsSync(dir)){
      dirCache[dir] = true;
      mkdirSync(dir);
    }
    dir = dir + '\\' + arr[i];
  }
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
  let path = resolve('./') + '\\src\\content'
  // 判断文件是否存在
  let hasFile = existsSync(path, function(exists) {
    return exists
  })

  if (!hasFile) return false
  let result = obtainFile(path, 'menu.txt')
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
  console.log('rootNode', rootNode);
  let data = {
    title: "menu",
    data: jsonNode,
    delete: deleteMenu
  }
  saveFile('menu', data)
}
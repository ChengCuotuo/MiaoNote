let _this = this
// 使用 electron 中的 对话框
const { dialog } = window.top.require('electron').remote
window.onload = function() {
  let name = document.querySelector('#name span')
  let header = document.querySelector('#imgshell')

  // 第三个参数，阻止事件冒泡
  header.addEventListener('mouseenter', function() {
    name.className = 'spanin'
  }, true) 

  header.addEventListener('mouseout', function() {
    name.className = 'spanout'
  }, true)

  // console.log(rootNode);
  let parentElement = document.getElementById('menuBody')
  // 添加所有的节点
  recursionAddMenu(rootNode, 0, parentElement)
  
  // 给 menuRoot 添加 图标
  let menuRoot = document.getElementById('menuRoot')
  menuRoot.style.paddingLeft = '20px'
  menuRoot.getElementsByTagName('span')[0].style.paddingLeft = '0px'
  let img = `<img src="../../../assets/folder_icon.svg">`
  menuRoot.innerHTML = img + menuRoot.innerHTML


  let dirTitles = document.getElementsByClassName('dirTitle')
  let recentopenDiv = document.getElementById('recentopen')
  for (let item of dirTitles) {
    this.dirTitleNodeAction(item, recentopenDiv, false, _this)
  }

  recentopenDiv.addEventListener('click', function() {
    recentopenDiv.classList.add('clickMainmenu')
    for (let item of dirTitles) {
      item.classList.remove('clickDirTitle')
    }

    rightClickMenu = null
    rightClickNode = null
  })


  //-----------------------------------监听主页面的事件------------------------------------
  // 添加创建的文件夹的监听事件
  let addDir = window.top.document.getElementById('addDir')
  let operateDiv = window.top.document.getElementById('operateDiv')
  addDir.addEventListener('click', function() {
    if (rightClickMenu && rightClickNode) {
      operateDiv.style.display = 'none'
      // 渲染节点
      rightClickNode.classList.add('triangleDown')
      let floor = rightClickNode.getAttribute('floor')
      let uuid = _this.uuid()
      let filePath = (rightClickMenu.filePath + '\\' + uuid)
      let node = new Node(uuid, 'dir', '', filePath, rightClickMenu, [])
      let { divSpan, containerDiv } = _this.createChildNode('input', '', floor, uuid, filePath, false, node)
      // 渲染菜单文件
      rightClickMenu.nextNodes.push(node)
  
      rightClickNode.nextSibling.style.display = 'block'
      rightClickNode.nextSibling.appendChild(containerDiv)
      _this.dirTitleNodeAction(divSpan, recentopenDiv, true, _this)
    }
    
  })

  // 添加删除的文件夹的监听事件
  let deleteDir = window.top.document.getElementById('deleteDir')
  deleteDir.addEventListener('click', function() {
    if (rightClickMenu && rightClickNode && rightClickMenu.type === 'dir') {
      operateDiv.style.display = 'none'
      // 弹出提示框
      dialog.showMessageBox({
        type: 'warning',
        title: '提示',
        message: '该文件夹下的文件也将被删除，确认删除吗？',
        buttons: ['删除', '取消']
      }).then(result => {
        // 删除页面上的节点
        // 删除目录文件
        if (result.response === 0) {
          // 遍历 rightClickMenu.preNode 根据 rightClickMenu.id 将其删除
          let nextNodes = rightClickMenu.preNode.nextNodes
          // console.log(nextNodes.length);
          for (let i = 0; i < nextNodes.length; i++) {
            if (nextNodes[i].id === rightClickMenu.id) {
              nextNodes.splice(i, 1)
              break
            }
          }
          // console.log(nextNodes.length);
          if (nextNodes.length === 0) {
            rightClickNode.parentNode.parentNode.parentNode.firstChild.classList.remove('triangleDown')
          }
          rightClickNode.parentNode.parentNode.removeChild(rightClickNode.parentNode)
          // 存储目录文件
          saveMenu()  
        }
      })
    }
  })

  // 添加创建文件的监听事件
  let addFile = window.top.document.getElementById('addFile')
  addFile.addEventListener('click', function() {
    if (rightClickMenu && rightClickNode) {
      operateDiv.style.display = 'none'
      let uuid = _this.uuid()
      let filePath = (rightClickMenu.filePath + '\\' + uuid)
      let node = new Node(uuid, 'file', '', filePath, rightClickMenu, [])
      rightClickMenu.nextNodes.push(node)
      // 创建文件节点
      _this.createFileNode(node)
    }
  })

  // 添加删除文件的监听事件
  let deleteFile = window.top.document.getElementById('deleteFile')
  deleteFile.addEventListener('click', function() {
    if (rightClickMenu && rightClickNode && rightClickMenu.type === 'file') {
      operateDiv.style.display = 'none'
      let nextNodes = rightClickMenu.preNode.nextNodes
      for (let i = 0; i < nextNodes.length; i++) {
        if (nextNodes[i].id === rightClickMenu.id) {
          nextNodes.splice(i, 1)
          break
        }
      }
      rightClickNode.parentNode.removeChild(rightClickNode)
      saveMenu()
    }
  })
}


// ----------------------------------------methods------------------------------------------------

// dirTitleNode 的事件
function dirTitleNodeAction(item, recentopenDiv, newNode, _this) {
  let dirTitles = document.getElementsByClassName('dirTitle')
  // 添加点击监听事件，做样式停留
  item.addEventListener('click', function() {
    recentopenDiv.classList.remove('clickMainmenu')
    item.classList.add('clickDirTitle')
    for (let other of dirTitles) {
      if (other.getAttribute('path') !== item.getAttribute('path')) {
        other.classList.remove('clickDirTitle')
      }
    }

    // 将选中的节点存起来--> 选中节点有两种，左键选中菜单和右键选中菜单
    if (item.getAttribute('id') != _this.findId) {
      _this.recursionFind(rootNode, item.getAttribute('id'))
      // 将点击的菜单记录到 menu 的 rightClickMenu 中
      rightClickMenu = findResult
      rightClickNode = item

      // 渲染文件到 directory 部分
      _this.renderDirectory(rightClickMenu)
    }
  })

  // 监听双击事件，将子级的 div dirContent 展示出来
  item.addEventListener('dblclick', function() {
    if(item.classList.contains('triangleRight') || item.classList.contains('triangleDown')) {
      let dirContent = item.nextSibling
      if (dirContent) {
        if (dirContent.style.display == 'block') {
          item.classList.remove('triangleDown')
          item.classList.add('triangleRight')
          dirContent.style.display = 'none'
        } else {
          item.classList.remove('triangleRight')
          item.classList.add('triangleDown')
          dirContent.style.display = 'block'
        }
        
      }
    }
  }, true)

  // 监听右键点击菜单样式变化，以及存储点击元素
  item.addEventListener('contextmenu', function(event) {
    recentopenDiv.classList.remove('clickMainmenu')
    item.classList.add('clickDirTitle')
    for (let other of dirTitles) {
      if (other.getAttribute('path') !== item.getAttribute('path')) {
        other.classList.remove('clickDirTitle')
      }
    }

    // 加载 nextNodes 中的内容到 directory 中
    if (item.getAttribute('id') != _this.findId) {
      _this.recursionFind(rootNode, item.getAttribute('id'))
      // 将点击的菜单记录到 menu 的 rightClickMenu 中
      rightClickMenu = findResult
      rightClickNode = item
    }

    if (newNode) {
      let operateDiv = window.top.document.getElementById('operateDiv')
      let clientX = event.clientX
      let clientY = event.clientY

      operateDiv.style.left = clientX + 'px'
      operateDiv.style.top = clientY + 'px'

      operateDiv.style.display = 'block'
    }
  })
}

// 根据 menu 数据递归的添加数据
// 默认只打开第一层级的数据
function recursionAddMenu(node, floor, parentElement) {
  // 空节点结束
  if (!node) return

  // 处理文件夹类型的节点
  // 如果下一层节点中有文件夹节点，这一层需要显示三角号
  if (node.type === 'dir') {
    if(nextFloorHasDir(node.nextNodes)) {  // 下一层级中包含文件夹
      // console.log(node.name + '----->' + floor)

      let { divEle, containerDiv } = this.createChildNode('span', node.name, floor, node.id, node.filePath, true, null)
      parentElement.appendChild(containerDiv)


      // 只将目录结构的文件显示，文本文件显示在 directory 区域
      for (let item of node.nextNodes) {
        if (item.type === 'dir') {
          // console.log(divEle);
          recursionAddMenu(item, floor + 1, divEle)
        } 
        // 文件夹下的文本文件不显示在目录树中
        // else if (item.type === 'file') {
        //   console.log(item.name + '----->')
        // }
      }
    } else {  // 下一层级的都是文本文件
      parentElement.appendChild(this.createChildNode('span', node.name, floor, node.id, node.filePath, false, null).containerDiv)
    }
  } 
  // 从根目录进入，所有文本文件都会在 dir 文件夹下进行处理
}

// 创建一个子节点
// 节点类型 节点名称 节点层级 节点 id 节点对应存储位置  该节点下一层是否还有文件夹  
function createChildNode(type, name, floor, id, filePath, hasDir, node) {
  let inputName = name
  let spanEle = document.createElement(type)
  if (type === 'input') {
    spanEle.style.marginLeft = '20px'
  } else if (type == 'span') {
    spanEle.style.paddingLeft = '20px'
    let spanTxt = document.createTextNode(name)
    spanEle.appendChild(spanTxt)
  }

  let divSpan = document.createElement('div')
  divSpan.className = 'dirTitle'
  divSpan.style.paddingLeft = (floor * 20) + "px"
  divSpan.setAttribute('id', id)
  divSpan.setAttribute('path', filePath)
  if (hasDir) {
    divSpan.classList.add('triangleRight')
  }
  divSpan.setAttribute('floor', parseInt(floor) + 1)
  divSpan.appendChild(spanEle)

  let divEle = document.createElement('div')
  divEle.style.display = 'none'
  divEle.className = 'dirContent'

  let containerDiv = document.createElement('div')
  containerDiv.setAttribute('floor', floor)
  containerDiv.className = 'singleDir'
  containerDiv.appendChild(divSpan)
  containerDiv.appendChild(divEle)


  if (type === 'input') {
    spanEle.addEventListener('change', function () {
      let newSpanEle = document.createElement('span')
      newSpanEle.style.paddingLeft = '20px'
      inputName = spanEle.value
      let newSpanTxt = document.createTextNode(spanEle.value)
      newSpanEle.appendChild(newSpanTxt)
      divSpan.appendChild(newSpanEle)
      divSpan.removeChild(spanEle)
      node.name = inputName
      // 存储目录文件
      saveMenu()
    }) 
  }

  return {divSpan: divSpan, divEle: divEle, containerDiv: containerDiv}
}

function nextFloorHasDir(nodes) {
  if (!nodes || nodes.length <= 0) return false
  for (let item of nodes) {
    if (item.type === 'dir') {
      return true
    }
  }

  return false
}

// 根绝给定的 id 查询节点, node 为传递的根节点
var findResult = {}
var findId = null

// 根据节点 id 查找 node
function recursionFind(node, id) {
  this.findResult = {}
  if (this.findId != id) {
    this.findId = id
    this.findNode(node, id)
  }
}

function findNode (node, id) {
  if (node.id == id) {
    this.findResult = node
    return
  } else {
    node.nextNodes.forEach(element => {
      findNode(element, id)
    }); 
  }
}

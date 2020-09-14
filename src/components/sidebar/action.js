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
  menuRoot.getElementsByTagName('span')[0].style.paddingLeft = '0px'
  let img = `<img src="../../../assets/folder_icon.svg">`
  menuRoot.innerHTML = img + menuRoot.innerHTML


  let dirTitles = document.getElementsByClassName('dirTitle')
  let recentopenDiv = document.getElementById('recentopen')
  let _this = this
  for (let item of dirTitles) {
    // 添加点击监听事件，做样式停留
    item.addEventListener('click', function() {
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
        console.log(findResult);
      }
    })

    // 监听双击事件，将子级的 div dirContent 展示出来
    item.addEventListener('dblclick', function() {
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
    })
  }

  recentopenDiv.addEventListener('click', function() {
    recentopenDiv.classList.add('clickMainmenu')
    for (let item of dirTitles) {
      item.classList.remove('clickDirTitle')
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
      let spanEle = document.createElement('span')
      spanEle.style.paddingLeft = (floor * 20) + 'px'
      let spanTxt = document.createTextNode(node.name)
      spanEle.appendChild(spanTxt)

      let divSpan = document.createElement('div')
      divSpan.className = 'dirTitle'
      divSpan.setAttribute('id', node.id)
      divSpan.setAttribute('path', node.filePath)
      divSpan.classList.add('triangleRight')
      divSpan.appendChild(spanEle)
      
      let divEle = document.createElement('div')
      divEle.style.display = 'none'
      divEle.className = 'dirContent'

      let containerDiv = document.createElement('div')
      containerDiv.className = 'singleDir'
      containerDiv.appendChild(divSpan)
      containerDiv.appendChild(divEle)

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
      // console.log(node.name + '----->' + floor)
      let spanEle = document.createElement('span')
      spanEle.setAttribute('path', node.filePath)
      spanEle.style.paddingLeft = (floor * 20) + 'px'
      let spanTxt = document.createTextNode(node.name)
      spanEle.appendChild(spanTxt)

      let divSpan = document.createElement('div')
      divSpan.className = 'dirTitle'
      divSpan.setAttribute('path', node.filePath)
      divSpan.appendChild(spanEle)

      let containerDiv = document.createElement('div')
      containerDiv.className = 'singleDir'
      containerDiv.appendChild(divSpan)

      parentElement.appendChild(containerDiv)
     

      // if (node.nextNodes && node.nextNodes.length > 0) {
      //   console.log(node.nextNodes);
      // }
    }
  } 
  // 从根目录进入，所有文本文件都会在 dir 文件夹下进行处理
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

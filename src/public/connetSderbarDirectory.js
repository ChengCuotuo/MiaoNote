let directoryDocument = window.top.document.getElementsByName('directory')[0].contentDocument
let that = window.top.document.getElementsByName('filePage')[0].contentWindow
let fileDocument = window.top.document.getElementsByName('filePage')[0].contentDocument
let afterRenderDirectory = false
function renderDirectory(rightClickMenu) {
  rightClickMenu.nextNodes.sort((first, second) => {
    if (first.type === 'file' && second.type === 'dir') {
      return 1
    } else if (second.type === 'file' && first.type === 'dir') {
      return -1
    }
  })

  let filesDiv = directoryDocument.getElementById('filesDiv')
  let pathSpan = directoryDocument.getElementById('pathSpan')
  pathSpan.innerHTML = rightClickMenu.nextNodes.length > 0 ? rightClickMenu.nextNodes[0].name : ''
  
  filesDiv.innerHTML = ''
  // 将选中的菜单加载出来
  rightClickMenu.nextNodes.forEach(node => {
    let name = document.createTextNode(node.name)
    let fileName = document.createElement('span')
    fileName.appendChild(name)
    fileName.classList.add('fileName')

    let fileNameDiv = document.createElement('div')
    fileNameDiv.classList.add('fileNameDiv')

    let img = document.createElement('img')
    
    if (node.type === 'dir') {
      img.setAttribute('src', '../../../assets/directory_icon.svg')
    } else if (node.type === 'file') {
      img.setAttribute('src', '../../../assets/file_icon.svg')
    }
    fileNameDiv.appendChild(img)
    fileNameDiv.appendChild(fileName)

    let singleFileDiv = document.createElement('div')
    singleFileDiv.classList.add('singleFile')
    singleFileDiv.appendChild(fileNameDiv)
    singleFileDiv.setAttribute('id', node.id)

    // 添加文件的简要描述
    // 添加文件的创建信息
    filesDiv.appendChild(singleFileDiv)
    singleFileDiv.addEventListener('click', function() {
      pathSpan.innerHTML = node.name

      _this.recursionFind(rootNode, node.id)
      // 将点击的菜单记录到 menu 的 rightClickMenu 中
      _this.rightClickMenu = _this.findResult
      _this.rightClickNode = singleFileDiv

      // 监听，如果当前点击的是 file 读取文件加载在 filepage 的编辑页面中
      handleReloadFileRead(_this.rightClickMenu)
    })
  });
}

// 创建一个文件节点
function createFileNode(node) {
  let filesDiv = directoryDocument.getElementById('filesDiv')
  let pathSpan = directoryDocument.getElementById('pathSpan')
  let input = document.createElement('input')
  input.style.width = '80vw'
  input.style.lineHeight = '24px'

  let singleFileDiv = document.createElement('div')
  singleFileDiv.classList.add('singleFile')
  singleFileDiv.appendChild(input)
  singleFileDiv.setAttribute('id', node.id)

  filesDiv.appendChild(singleFileDiv)

  input.addEventListener('change', function() {
    singleFileDiv.innerHTML = ''
    let name = document.createTextNode(input.value)
    _this.rightClickMenu.name = input.value
    let fileName = document.createElement('span')
    fileName.appendChild(name)
    fileName.classList.add('fileName')

    let fileNameDiv = document.createElement('div')
    fileNameDiv.classList.add('fileNameDiv')

    let img = document.createElement('img')
    img.setAttribute('src', '../../../assets/file_icon.svg')
    fileNameDiv.appendChild(img)
    fileNameDiv.appendChild(fileName)
    singleFileDiv.appendChild(fileNameDiv)
    _this.saveMenu()
  })

  singleFileDiv.addEventListener('click', function() {
    pathSpan.innerHTML = input.value
    if (singleFileDiv.getAttribute('id') != _this.findId) {
      _this.recursionFind(rootNode, singleFileDiv.getAttribute('id'))
      // 将点击的菜单记录到 menu 的 rightClickMenu 中
      rightClickMenu = findResult
      rightClickNode = singleFileDiv
    }

    handleReloadFileRead(rightClickMenu)
  })
}

// 调用 util 中的读取文件
function handleReloadFileRead(menu) {
  if (menu.type === 'file') {
    let fileName = menu.filePath.substring(menu.filePath.lastIndexOf('\\'))
    let data = obtainFile(menu.filePath, fileName + ".txt")
    // 数据读取成功，写入到编辑面板
    if (data) {
      let parseData = JSON.parse(data)
      that.filePath = menu.filePath + "\\" + fileName + ".txt"
      that._this = _this
      that.rightClickNode = _this.rightClickNode
      // 设置标题
      let titleInput = fileDocument.getElementById('titleInput')
      // console.log(titleInput);
      titleInput.value = parseData.title
      // 设置编辑面板内容
      that.tinyMCE.activeEditor.setContent(parseData.data)
    }
  } else {
    obtainFile(menu.filePath)
  }
}
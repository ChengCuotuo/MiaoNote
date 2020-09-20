let directoryDocument = window.top.document.getElementsByName('directory')[0].contentDocument
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

      // console.log(_this.rightClickMenu);
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
  })
}
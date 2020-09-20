window.onload = function () {
  let sidebarDoc = document.getElementsByName('sidebar')[0].contentDocument
  let directoryDoc = document.getElementsByName('directory')[0].contentDocument
  let filePageDoc = document.getElementsByName('filePage')[0].contentDocument.getElementById('miaonote_ifr').contentDocument
  let dirTitles = sidebarDoc.getElementsByClassName('dirTitle')
  let operateDiv = document.getElementById('operateDiv')
  let createBtn = sidebarDoc.getElementById('createBtn')
  let deleteFile = document.getElementById('deleteFile')

  for (let item of dirTitles) {
    item.addEventListener('contextmenu', function(event) {
      deleteFile.style.display = 'none'
      let clientX = event.clientX
      let clientY = event.clientY

      operateDiv.style.left = clientX + 'px'
      operateDiv.style.top = clientY + 'px'

      operateDiv.style.display = 'block'
    })
  }

  // 点击窗体，将创建文本/文件夹的弹窗隐藏
  sidebarDoc.addEventListener('click', function() {
    operateDiv.style.display = 'none'
  }, true)

  directoryDoc.addEventListener('click', function() {
    operateDiv.style.display = 'none'
  }, true)

  filePageDoc.addEventListener('click', function() {
    operateDiv.style.display = 'none'
  }, true)

  // 监听点击添加按钮
  createBtn.addEventListener('click', function() {
    deleteFile.style.display = 'block'

    operateDiv.style.left = '36px'
    operateDiv.style.top = '140px'
    operateDiv.style.display = 'block'
  })
}
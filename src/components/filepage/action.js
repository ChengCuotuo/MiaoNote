window.onload = function() {
  let titleArea = document.getElementById('titleInput')
  titleArea.addEventListener('keydown', function(event) {
    if(event.key == 'Enter'){
      event.preventDefault()
    }

    // 重写 ctrl + s
    if (event.key === 's' && event.ctrlKey) {
      let titleValue = titleArea.value
      let data = {
        title: titleValue ? titleValue : '',
        data: tinyMCE.activeEditor.getContent() ? tinyMCE.activeEditor.getContent() : ''
      }
      
      _this.rightClickNode.getElementsByClassName('fileName')[0].innerHTML = titleValue
      _this.rightClickMenu.name = titleValue
      // console.log('rightClickMenu', _this.rightClickMenu);
      _this.saveFile(that.filePath, data)
      _this.saveMenu()
    }
  })

  // 监听 ctrl + s
  let container = document.getElementById('miaonote_ifr').contentDocument
  container.addEventListener('keydown', function(event) {
    if (event.key === 's' && event.ctrlKey) {
      let titleValue = document.getElementById('titleInput').value
      let data = {
        title: titleValue ? titleValue : '',
        data: tinyMCE.activeEditor.getContent()
      }
      _this.rightClickNode.getElementsByClassName('fileName')[0].innerHTML = titleValue
      _this.rightClickMenu.name = titleValue
      console.log('rightClickMenu', _this.rightClickMenu);
      _this.saveFile(that.filePath, data)
      _this.saveMenu()
    }
  })
}
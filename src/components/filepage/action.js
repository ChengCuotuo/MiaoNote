window.onload = function() {
  let _this = this

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
      _this.saveFile(JSON.stringify(data))
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
        _this.saveFile(JSON.stringify(data))
      }
    })
}

let fs = window.top.require('fs')

// 根据传递过来的 title 和 data 创建一个 文件名为 title.txt 的文件
function saveFile(data) {
  
}
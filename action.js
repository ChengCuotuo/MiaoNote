window.onload = function () {
  let sidebarDoc = document.getElementsByName('sidebar')[0].contentDocument
  let directoryDoc = document.getElementsByName('directory')[0].contentDocument
  let filePageDoc = document.getElementsByName('filePage')[0].contentDocument
  let dirTitles = sidebarDoc.getElementsByClassName('dirTitle')
  let operateDiv = document.getElementById('operateDiv')
  let createBtn = sidebarDoc.getElementById('createBtn')

  for (let item of dirTitles) {
    item.addEventListener('contextmenu', function(event) {
      let clientX = event.clientX
      let clientY = event.clientY

      operateDiv.style.left = clientX + 'px'
      operateDiv.style.top = clientY + 'px'

      operateDiv.style.display = 'block'
    })
  }

  sidebarDoc.addEventListener('click', function() {
    operateDiv.style.display = 'none'
  }, true)

  directoryDoc.addEventListener('click', function() {
    operateDiv.style.display = 'none'
  }, true)

  filePageDoc.addEventListener('click', function() {
    operateDiv.style.display = 'none'
  }, true)

  createBtn.addEventListener('click', function() {
    operateDiv.style.left = '36px'
    operateDiv.style.top = '140px'
    operateDiv.style.display = 'block'
  })

}
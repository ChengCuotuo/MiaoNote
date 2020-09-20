window.onload = function() {
  let searchTextArea = document.getElementById('searchTextArea')
  searchTextArea.addEventListener('keydown', function(event) {
    if(event.key == 'Enter'){
      event.preventDefault()
    }
  })
}

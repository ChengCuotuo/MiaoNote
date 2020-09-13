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
}
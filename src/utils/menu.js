// 文件节点类
class Node {
  constructor(id, type, name, filePath, preNode, nextNodes) {
    this.id = id,                 // 唯一标识
    this.type = type              // 文件类型 directory  / file
    this.name = name              // 文件名称
    this.filePath = filePath      // 文件路径
    this.preNode = preNode        // 前一个结点
    this.nextNodes = nextNodes    // 下一个节点
  }
}
var rightClickMenu = {}
var rightClickNode

// 首先判断 menu.txt 菜单文件是否存在，如果不存在就创建，同时将 rootNode 写入到菜单中
// 如果存在读取文件内容生成菜单 node 对象
// 提取文件中存储的 目录结构
let appPath = resolve('./')
let rootNode = translateMenu()
let deleteMenu = []
if (!rootNode) {
  rootNode = new Node('menuRoot', 'dir', '主目录', `${appPath}`, null, [])  
  // 先创建文件路径
  createFileMenu(resolve('./') + '\\src\\content\\')
  saveMenu()
}

// 造一些假数据
// const dir0 = new Node(1, 'dir', 'dir0', `${appPath}\\a`, null, [])
// const dir1 = new Node(2, 'dir', 'dir1', `${appPath}\\b`, null, [])
// const dir2 = new Node(3, 'dir', 'dir2', `${appPath}\\c`, null, [])

// rootNode.nextNodes = [dir0, dir1, dir2]

// const dir0_0 = new Node(11, 'dir', 'dir0_0', `${appPath}\\a\\a0`, dir0, [])
// const dir1_0 = new Node(21, 'dir', 'dir1_0', `${appPath}\\b\\b0`, dir1, [])
// const file1_0_0 = new Node(22, 'file', 'file1_0_0', `${appPath}\\b\\b0`, dir1, [])
// const file1_0_0_0 = new Node(212, 'file', 'file1_0_0_0', `${appPath}\\b\\b0`, dir1_0, [])
// dir0.nextNodes.push(dir0_0)
// dir1.nextNodes.push(dir1_0)
// dir1.nextNodes.push(file1_0_0)
// dir1_0.nextNodes.push(file1_0_0_0)
// saveMenu()
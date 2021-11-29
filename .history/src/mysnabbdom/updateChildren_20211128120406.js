import patchVnode from './patchVnode';

// 判断是否是同一个虚拟节点
function checkSameVnode(a, b) {
    return a.sel == b.sel && a.key == b.key;
}

export default function updateChildren(parentElm, oldCh, newCh) {
    console.log('我是updateChildren');
    console.log(parentElm, oldCh, newCh);
    // 旧前
    let oldStartIdx = 0;
    // 新前
    let newStartIdx = 0;
    // 旧后
    let oldEndIdx = oldCh.length - 1;
    // 新后
    let newEndIdx = newCh.length - 1;
    // 旧前节点
    let oldStartNode = oldCh[0];
    // 新前节点
    let newStartNode = newCh[0];
    // 旧后节点
    let oldEndNode = oldCh[oldEndIdx];
    // 新后节点
    let newEndNode = newCh[newEndIdx];

    // 开始大 while 循环
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        console.log("❤")
        if (checkSameVnode(oldStartNode, newStartNode)) {
            patchVnode(oldStartNode, newStartNode);
            oldStartNode = oldCh[++oldStartIdx];
            newStartNode = newCh[++newStartIdx];
        }
    }
}
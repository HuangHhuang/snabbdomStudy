import patchVnode from './patchVnode';
import createElement from './createElement';

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

    let keyMap = null;

    // 开始大 while 循环
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        console.log("❤")
        if (oldStartNode == null || oldCh[oldStartIdx] == undefined) {
            console.log(1)
            oldStartNode = oldCh[++oldStartIdx];
        } else if (oldEndNode == null || oldCh[oldEndIdx] == undefined) {
            console.log(2)
            oldEndNode = oldCh[--oldEndIdx];
        } else if (newStartNode == null || newCh[newStartIdx] == undefined) {
            console.log(3)
            newStartNode = newCh[++newStartIdx];
        } else if (newEndNode == null || newCh[newEndIdx] == undefined) {
            console.log(4)
            newEndNode = newCh[--newEndIdx];
        } else if (checkSameVnode(oldStartNode, newStartNode)) {
            console.log('①新前和旧前命中');
            patchVnode(oldStartNode, newStartNode);
            oldStartNode = oldCh[++oldStartIdx];
            newStartNode = newCh[++newStartIdx];
        } else if (checkSameVnode(oldEndNode, newEndNode)) {
            console.log('②新后和旧后命中');
            patchVnode(oldEndNode, newEndNode);
            oldEndNode = oldCh[--oldEndIdx];
            newEndNode = newCh[--newEndIdx];
        } else if (checkSameVnode(oldStartNode, newEndNode)) {
            console.log('②新后和旧前命中');
            patchVnode(oldStartNode, newEndNode);
            parentElm.insertBefore(oldStartNode.elm, oldEndNode.elm.nextSibling);
            oldStartNode = oldCh[++oldStartIdx];
            newEndNode = newCh[--newEndIdx];
        } else if (checkSameVnode(oldEndNode, newStartNode)) {
            console.log('②新前和旧后命中');
            patchVnode(oldEndNode, newStartNode);
            parentElm.insertBefore(oldEndNode.elm, oldStartNode.elm);
            oldEndNode = oldCh[--oldEndIdx];
            newStartNode = newCh[++newStartIdx];
        } else {
            // 四种命中都没有命中
            // 寻找key的map
            if (!keyMap) {
                keyMap = {};
                for (let i = oldStartIdx; i <= oldEndIdx; i++) {
                    const key = oldCh[i].key;
                    if (key != undefined) {
                        keyMap[key] = i;
                    }
                }
            }
            console.log(keyMap);
            const idxInOld = keyMap[newStartNode.key];
            if(idxInOld == undefined) {
                // 判断，如果idxInOld是undefined表示它是全新的项

            } else {
                // 如果不是undefined，不是全新的项，而是要移动
                const elmToMove = oldCh[idxInOld];
                console.log(oldCh[idxInOld])
                patchVnode(elmToMove, newStartNode);
                // 把这项设置为undefined，表示我已经处理完了
                oldCh[idxInOld] = undefined;
                parentElm.insertBefore(elmToMove.elm, oldStartNode.elm);
            }
            // 指针下移，只移动新头
            newStartNode = newCh[++newStartIdx];
        }
    }

    if (newStartIdx <= newEndIdx) {
        console.log('new还有剩余节点没有处理');
        let before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
        for(let i = newStartIdx; i <= newEndIdx; i++) {
            // insertBefore方法可以自动识别null，如果是null就会自动排到队尾去。和appendChildren是一致的
            // newCh[i] 现在还没有真正的dom，所以要调用createElement函数变为dom
            parentElm.insertBefore(createElement(newCh[i]), before);
        }
    } else if (oldStartIdx <= oldEndIdx) {
        console.log('old还有剩余节点没有处理');
        for(let i = oldStartIdx; i <= oldEndIdx; i++) {
            if (oldCh[i]) {
                parentElm.removeChild(oldCh[i].elm);
            }
        }
    }
}
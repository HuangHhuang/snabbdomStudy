import vnode from './vnode';
import createElement from './createElement';

export default function (oldNode, newNode){
    // 判断传入的第一个参数是dom节点还是虚拟节点
    if(oldNode.sel == "" || oldNode.sel == undefined){
        // 如果是dom节点的话将它包装成虚拟节点
        oldNode = vnode(oldNode.tagName.toLowerCase(), {}, [], undefined, oldNode);
    }

    // 判断虚拟节点是不是同一个节点
    if(oldNode.key == newNode.key && oldNode.sel == newNode.sel){
        // 判断新旧节点是不是同一个对象
        if(oldNode === newNode) return;
        // 判断newNode有没有text属性
        if(newNode.text != undefined && (newNode.children == undefined || newNode.children.length == 0)){
            // newNode 有text属性
            if(newNode.text != oldNode.text){
                // 如果新虚拟节点中的text和老的虚拟节点中的text不同，那么直接让新的text写入老的elm中即可。如果老的elm中是 children，那么也会立即消失掉。
                oldNode.elm.innerText = newNode.text;
            }
        }
    } else {
        console.log("不是同一个节点")
        var newNodeElm = createElement(newNode)
        // 将节点上树
        if( oldNode.elm.parentNode && newNode.elm){
            oldNode.elm.parentNode.insertBefore(newNodeElm, oldNode.elm)
        }
        // 删除老节点
        oldNode.elm.parentNode.removeChild(oldNode.elm);
    }
}
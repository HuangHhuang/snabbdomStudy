import vnode from './vnode';
import createElement from './createElement';
import patchVnode from './patchVnode';

export default function (oldNode, newNode){
    // 判断传入的第一个参数是dom节点还是虚拟节点
    if(oldNode.sel == "" || oldNode.sel == undefined){
        // 如果是dom节点的话将它包装成虚拟节点
        oldNode = vnode(oldNode.tagName.toLowerCase(), {}, [], undefined, oldNode);
    }

    // 判断虚拟节点是不是同一个节点
    if(oldNode.key == newNode.key && oldNode.sel == newNode.sel){
        patchVnode(oldNode, newNode)
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
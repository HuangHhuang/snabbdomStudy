import createElement from './createElement';
import updateChildren from './updateChildren';

export default function patchVnode(oldNode, newNode) {
    // 判断新旧节点是不是同一个对象
    if(oldNode === newNode) return;
    // 判断newNode有没有text属性
    if(newNode.text != undefined && (newNode.children == undefined || newNode.children.length == 0)){
        // newNode 有text属性
        if(newNode.text != oldNode.text){
            // 如果新虚拟节点中的text和老的虚拟节点中的text不同，那么直接让新的text写入老的elm中即可。如果老的elm中是 children，那么也会立即消失掉。
            oldNode.elm.innerText = newNode.text;
        }   
    } else {
        // newNode没有text属性，有children
        // 判断老的有没有children
        if(oldNode.children != undefined && oldNode.children.length > 0){
            // 老的有children，此时就是最复杂的情况。新的和老的都有children
            
        } else {
            // 老的没有children，新的有children
            // 清空老的的节点内容
            oldNode.elm.innerText = "";
            // 遍历newNode的子节点，创建DOM，上树
            for(let i = 0; i < newNode.children.length; i++){
                let dom = createElement(newNode.children[i])
                oldNode.elm.appendChild(dom)
            } 
        }
    }
}
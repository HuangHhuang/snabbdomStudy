// 真正地创建一个节点。将VNode创建为dom，插入到pivot这个元素之前
export default function createElement(vnode){
    let domNode = document.createElement(vnode.sel);
    // 判断是有子节点还是有文本？
    if(vnode.text != "" && (vnode.children == undefined || vnode.children.length == 0)){
        domNode.innerText = vnode.text;
        // 让孤儿节点上树。pivot节点的父节点调用insertBefore方法
        
    } else if(Array.isArray(vnode.children) && vnode.children.length > 0){
        // 如果内部是子节点，就要追加创建子节点
        for(let i = 0; i < vnode.children.length; i++) {
            let ch = vnode.children[i];
            // console.log(ch);
            // 递归创建子节点
            let chElm = createElement(ch);
            // 将子节点挂到父节点（即刚创建的上一级的节点）上
            domNode.appendChild(chElm);
        }
    }
    vnode.elm = domNode;
    return vnode.elm;
}
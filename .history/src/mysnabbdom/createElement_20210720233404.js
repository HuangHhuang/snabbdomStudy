// 真正地创建一个节点。将VNode创建为dom，插入到pivot这个元素之前
export default function (vnode, pivot){
    let domNode = document.createElement(vnode.sel);
    // 判断是有子节点还是有文本？
    if(vnode.text != "" && (vnode.children == undefined || vnode.children.length == 0)){
        domNode.innerText = vnode.text;
        // 让孤儿节点上树。pivot节点的父节点调用insertBefore方法
        pivot.parentNode.insertBefore(domNode, pivot);
    } else if(Array.isArray(vnode.children) && vnode.children.length > 0){
    
    }
    

}
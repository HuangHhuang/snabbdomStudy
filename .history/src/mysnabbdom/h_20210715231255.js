import vNode from "./vnode"

export default function(sel, data, c) {
    // 判断传入的参数长度
    if(arguments.length != 3) throw new Error("对不起，函数必须传入三个参数")
    // 判断传入的第三个参数的类型
    if(typeof c == "string" || typeof c == "number") {
        // 是文字类型
        return vNode(sel, data, undefined, c, undefined)
    } else if(Array.isArray(c)) {
        // 是调用h函数形式
    } else if(typeof c == "Object" && c.hasOwnProperty("sel")){
        // 传入的是数组形式
        console.log(1)
        let children = []
        // 判断传入的数组的参数是否正确
        for(let i = 0; i < c.length; i++) {
            if(!(typeof c == "object" && c[i].hasOwnProperty("sel")))
             throw new Error("传入的数组参数类型不正确")
            children.push(c[i])
            
        }

        return vNode(sel, data, children, undefined, undefined)
    } else {
        throw new Error("传入的参数类型有误")
    }
}
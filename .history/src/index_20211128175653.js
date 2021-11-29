import h from "./mysnabbdom/h.js"
import patch from "./mysnabbdom/patch.js"

var myVnode1 = h('ul', {}, [
    h('li', {key: "A"}, "A"),
    h('li', {key: "B"}, "B"),
    h('li', {key: "C"}, "C"),
    h('li', {key: "D"}, "D"),
    h('li', {key: "E"}, "E"),
    h('li', {key: "F"}, "F"),
  ])
  
  // 得到盒子和按钮
  const container = document.getElementById('container')
  const btn = document.getElementById('btn')
  
  // 第一次上树
  patch(container, myVnode1);
  
  const myVnode2 = h('ul', {}, [
    h('li', {key: "A"}, "A"),
    h('li', {key: "B"}, "B"),
    h('li', {key: "C"}, "C"),
    h('li', {key: "D"}, "D"),
    
  ]);
  
  btn.onclick = function(){
      patch(myVnode1, myVnode2);
  }
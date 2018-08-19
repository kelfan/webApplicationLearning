# React-Router4
# Redux
# Redux-thunk
# Redux-saga
# Immutable.js
# React 组件 - 慕课网
coding迪斯尼...
全栈工程师
# React响应用户输入 - 慕课网
coding迪斯尼...
全栈工程师
# React知识点综合运用实例 - 慕课网
coding迪斯尼...
全栈工程师
# React16.4 快速上手 - 慕课网
DellLee
Web前端工程师

# State: 组件内部属性
# props: 从其他组件传进来的数据
# error Module build failed: SyntaxError: Adjacent JSX elements must be wrapped in an enclosing tag (12:6)
需要把render的输出包裹在一个div中,不能输出两个元素
```js
render() {
  return(
    <com1/>
    <com2/>
  )
}
需要改为
render() {
  return(
    <div>
      <com1/>
      <com2/>
    </div>
  )
}
```

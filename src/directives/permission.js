import store from '@/store'
//el->指令绑定到的元素。这可用于直接操作 DOM。
//binding->包含以下 property 的对象:value：传递给指令的值|oldValue：先前的值，仅在 beforeUpdate 和 updated 中可用。无论值是否有更改都可用。|arg：传递给指令的参数(如果有的话)。
function checkPermission(el, binding) {
  // 获取绑定的值，此处为权限
  const { value } = binding
  // 获取所有的功能指令
  const points = store.getters.userInfo.permission.points
  console.log(points)
  // 传入的指令集必须是数组
  if (value && value instanceof Array) {
    // 匹配对应的指令
    const hasPermission = points.some((point) => {
      return value.includes(point) //传入的值数组里有没有所有功能指令的某一个
    })
    // 如果无法匹配，则表示当前用户无该指令，那么删除对应的功能按钮的dom
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error('v-permission value is ["admin","editor"]')
  }
}

export default {
  // 在绑定元素的父组件被挂载后调用
  mounted(el, binding) {
    checkPermission(el, binding)
  },
  // 在包含组件的 VNode 及其子组件的 VNode 更新后调用
  updated(el, binding) {
    checkPermission(el, binding)
  }
}

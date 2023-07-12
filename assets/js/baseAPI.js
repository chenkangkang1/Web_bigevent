//jQuery中提供了一个过滤器，可以帮我们统一去进行设置，而这个过滤器调用的时机是在我们调用 $.ajax() 之后，请求真正发给后台之前调用的： $.ajax() > ajaxPrefilter过滤器 -> 发送请求给服务器
// 调用$.ajaxPrefilter()函数，里面传递一个回调函数，回调函数里面有一个形成options，这个形成里面就包含了这一次请求的相关信息。

//注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，会先调用 ajaxPrefilter 这个函数。在这个函数中，可以拿到我们给Ajax提供的配置对象

$.ajaxPrefilter(function (options) {
  options.url = 'http://big-event-api-t.itheima.net' + options.url
  // 统一为有权限的接口，设置 headers 请求头
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || '',
    }
  }
  // 全局统一挂载 complete 回调函数
  options.complete = function (res) {
    // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      // 1. 强制清空 token
      localStorage.removeItem('token')
      // 2. 强制跳转到登录页面
      location.href = '/login.html'
    }
  }
})

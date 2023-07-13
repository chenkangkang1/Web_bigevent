$(function () {
  getUserInfo()

  // 退出功能
  var layer = layui.layer

  // 点击按钮，实现退出功能
  $('#btnLogout').on('click', function () {
    // 提示用户是否确认退出
    layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function (index) {
      // 清除本地储存的token
      localStorage.removeItem('token')
      // 重新跳回登陆页面
      location.href = './login.html'
      // 关闭弹出框
      layer.close(index)
    })
  })
})

// 获取用户基本信息

function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers 就是请求头配置对象
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败！')
      }
      //调用 renderAvater 渲染用户头像
      renderAvatar(res.data)
      console.log(res.data)
      // layui.layer.msg('获取用户信息成功！')
    },
  })
}

// 渲染用户头像和名称
function renderAvatar(user) {
  // 1.获取用户的名称
  var name = user.nickname || user.username
  // 2.设置欢迎的文本
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  // 3.按需渲染用户的头像
  if (user.user_pic !== null) {
    // 渲染图片头像
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    // 渲染文本头像
    $('.layui-nav-img').hide()
    $('.text-avatar').html(name[0]).show()
  }
}

$(function () {
  // 校验表单数据
  var form = layui.form
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度必须在1~6个字符之间!'
      }
    },
  })

  //获取用户的基本信息
  initUserInfo()
  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layer.meg('获取用户信息失败！')
        }
        console.log(res)
        form.val('formUserInfo', res.data)
      },
    })
  }

  //实现表单的重置效果
  $('#btnReset').on('click', function (e) {
    e.preventDefault()
    initUserInfo()
  })

  //发起请求更新用户的信息
  // 监听表单的提交事件
  $('.layui-form').on('submit', function (e) {
    console.log('点击了提交修改')
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新失败！')
        }
        layer.msg('更新成功！')
        // 调用父页面中的方法，重新渲染用户的头像和用户的信息
        window.parent.getUserInfo()
        // console.log(window.parent.getUserInfo())
      },
    })
  })
})

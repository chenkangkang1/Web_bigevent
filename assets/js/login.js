$(function () {
  // 点击“去注册账号”的链接
  $('#link_reg').on('click', function (e) {
    console.log('点击了注册')
    // 登录隐藏，注册显示
    $('.login-box').hide()
    $('.reg-box').show()
  })
  $('#link_login').on('click', function (e) {
    // 点击去登陆
    console.log('点击了登录')
    $('.login-box').show()
    $('.reg-box').hide()
  })
})

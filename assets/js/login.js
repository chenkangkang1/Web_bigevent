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

  // 自定义校验规则
  var form = layui.form
  form.verify({
    // 自定义了一个叫做 pwd 校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 校验两次密码是否一致的规则
    repwd: function (value) {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于的判断
      // 如果判断失败，则return 一个提示消息
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致！'
      }
    },
  })

  // 发起注册用户的ajax请求
  $('#form_reg').on('click', function (e) {
    console.log('点击了注册完成按钮')
    // 组织默认的提交行为
    e.preventDefault()
    // 发起ajax的post请求
    var data = {
      // username: $('#form_reg [name=username]').val(),
      // password: $('#form_reg [name=password]').val(),
      username: $('.zc-zh').val(),
      password: $('.zc-pwd1').val(),
    }
    $.post('http://big-event-api-t.itheima.net/api/reguser', data, function (res) {
      // console.log(res)
      if (res.status !== 0) {
        console.log('注册失败')
        return layer.msg(res.message)
      }
      layer.msg('注册成功，请登录！')
      console.log('成功了')

      $('#link_login').click()
    })
  })

  // 发起登录的Ajax请求
  $('#form-login').click(function (e) {
    // 组阻止默认提交行为
    e.preventDefault()
    console.log('点击了登录按钮')
    console.log($('.dl-zh').val())
    console.log($('.dl-pwd').val())

    if ($('.dl-zh').val() && $('.dl-pwd').val()) {
      $.ajax({
        type: 'POST',
        url: 'http://big-event-api-t.itheima.net/api/login',
        data: {
          username: $('.dl-zh').val(),
          password: $('.dl-pwd').val(),
        },
        success: function (res) {
          if (res.status == 0) {
            layer.msg('登录成功！')
            // 将登陆成功得到的token字符串，保存到localStorage中
            localStorage.setItem('token', res.token)
            console.log(res.token)
            // 跳转页面到index后台页面
            setTimeout(function () {
              location.href = './index.html'
            }, 1000)
          } else {
            return layer.msg('登陆失败！')
          }
        },
      })
    }
  })
})

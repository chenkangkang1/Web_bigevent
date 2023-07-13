$(function () {
  // 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比：1
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview',
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  $('#btnChooseImage').on('click', function (e) {
    $('#file').click()
  })

  //更换裁剪区域的图片
  // 为文件选择框绑定 change 事件
  $('#file').on('change', function (e) {
    //获取用户选择的文件
    var filelist = e.target.files
    if (filelist.length === 0) {
      return console.log('请选择图片')
    }
    console.log(111)
    // 1.拿到用户选择的文件
    var file = e.target.files[0]
    console.log(file)
    // 2.将文件，转化为路径
    var imgURL = URL.createObjectURL(file)
    console.log(imgURL)
    // 3.重新初始化裁剪区域
    $image.cropper('destroy').attr('src', imgURL).cropper(options)
  })

  //为确定按钮，绑定事件
  $('#btnUpload').on('click', function (e) {
    // 将裁剪后的头像上传到服务器
    var dataURL = $image
      .cropper('getCroppedCanvas', {
        //创建一个Canvas画布
        width: 100,
        height: 100,
      })
      .toDataURL('image/png')

    $.ajax({
      method: 'POST',
      url: '/my/update/avatar',
      data: {
        avatar: dataURL,
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更换头像失败！')
        }
        layer.msg('更换头像成功！')
        window.parent.getUserInfo()
      },
    })
  })
})

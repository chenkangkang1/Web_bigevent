$(function () {
  initArtCateList()

  var layer = layui.layer
  var form = layui.form

  // 获取文章分类的列表
  function initArtCateList() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('数据加载失败！')
        }
        console.log(res)
        var htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)
      },
    })
  }
  // 弹出层
  var indexAdd = null
  $('#btnAddCate').on('click', function (e) {
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '200px'],
      title: '添加文章分类',
      content: $('#dialog-add').html(),
    })
  })

  //实现添加文章分类的功能
  // 这个弹出的部分是动态生成的，所以需要通过事件委托来添加事件
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('新增分类失败！')
        }
        initArtCateList()
        layer.msg('新增分类成功！')
        // 根据索引，关闭对应的弹出层
        layer.close(indexAdd)
      },
    })
  })

  // 通过事件委托的形式，为btn-edit按钮绑定点击事件
  var indexEdit = null
  $('tbody').on('click', '.btn-edit', function () {
    // 弹出一个修改文章分类信息的层
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#dialog-edit').html(),
    })
    // 为编辑按钮绑定 adta-id 自定义属性。
    //根据id的值发起请求获取文章分类的数据，并填充到表单中
    console.log($(this).attr('data-id'))
    var id = $(this).attr('data-id')
    // 发起请求获取对应分类的数据
    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' + id,
      success: function (res) {
        form.val('form-edit', res.data)
      },
    })
  })

  // 通过事件委托的方式，给修改按钮绑定点击事件
  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新文章失败，请重试！')
        }
        layer.msg('更新成功！')
        layer.close(indexEdit)
        initArtCateList()
      },
    })
  })

  // 删除文章功能
  // 为删除按钮绑定事件，添加自定义属性 id，通过代理绑定
  $('tbody').on('click', '.btn-delete', function (e) {
    var id = $(this).attr('data-id')
    layer.confirm('确认删除？', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg('删除分类失败！')
          }
          layer.msg('删除分类成功！')
          layer.close(index)
          initArtCateList()
        },
      })
    })
  })
})

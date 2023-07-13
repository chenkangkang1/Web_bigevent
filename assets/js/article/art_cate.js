$(function () {
  initArtCateList()

  var layer = layui.layer

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
})

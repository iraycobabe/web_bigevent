$(function() {
   //点击“去注册账号”的链接
  $('#link_reg').on('click', function() {
    $('.log-box').hide()
    $('.reg-box').show()
  })

  //点击“去登录”的链接
  $('#link_login').on('click', function() {
    $('.reg-box').hide()
    $('.log-box').show()
  })

  //从layui中获取form对象
  var form = layui.form 
  //从layui中获取layer对象
  var layer = layui.layer
  //通过form.verify()函数来自定义规则
  form.verify({
    //自定义了一个叫做pwd的校验规则
    pwd:[/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    //检验两次密码是否一致的规则
    repwd: function(value) {
      //通过形参拿到的是确认密码框中的内容
      //还需要拿到密码框中的内容
      //然后进行一次等于的判断
      //如果判断失败则return一个提示消息即可

      //$(父元素加[属性名=值])定位到密码输入框
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致！'
      }
    }
  })

  //监听注册表单的提交事件
  $('#form_reg').on('submit', function(e) {
    //1.阻止事件的默认提交行为
    e.preventDefault()
    //2.发起ajax的post请求 
    //$.post('url地址', 
    //var = data {请求对象 键值对的方式 键:值 值通过name属性来取}，
    //最后执行回调 通过res参数响应拿到回来的数据)
    var data = {username:$('#form_reg [name=username]').val(), password:$ ('#form_reg [name=password]').val()}
    $.post('/api/reguser', data,function(res) {
      if (res.status !== 0) {
        // return console.log(res.message);
        return layer.msg(res.message)
      }
      // console.log('注册成功！');
      layer.msg('注册成功，请登录！') 
      //模拟人的点击行为 自动从注册页面跳转到登录页面 
      $('#link_login').click()
    })
  })

  //监听登录表单的提交事件
  $('#form_login').on('submit', function(e) {
    e.preventDefault()
    $.ajax ({
      url:'/api/login',
      method: 'POST',
      //快速获取表单，serialize()是将input数据序列化为键值对的方式 (username=ls&password=123456)
      data:$(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('登录失败!')
        }
        layer.msg('登录成功！')
        console.log(res.token);
        // 将登录成功得到的token字符串保存到localStorage中
        //后续才有权限访问主页等页面
        localStorage.setItem('token', res.token)
        //跳转到后台主页
        location.href = '/index作业.html'
      }
    })
  })
})


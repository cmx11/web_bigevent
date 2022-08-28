$(function () {
    getUserInfo()
    let layer = layui.layer

    $('#btnLogout').on('click', function () {

        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token')
            location.href = 'http://127.0.0.1:5500/node.js/大事件项目/login.html'
            layer.close(index);
        })
    })

})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data)
        },
        // 不论成功还是失败都会调用
        // complete: function(res){
        //     // console.log(res);
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
        //         localStorage.removeItem('token')
        //         location.href = 'http://127.0.0.1:5500/node.js/大事件项目/login.html'
        //     }
        // }
    })
}

// 渲染用户头像
function renderAvatar(user) {
    let name = user.nickname || user.username
    $('.welcome').html(`欢迎&nbsp;&nbsp;` + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user
            .user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}
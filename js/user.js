$.ajax({
	type: 'get',
	async: false,
	url: `${APP.baseUrl}/employee/checkRootLogin`,
	success: function (response) {
		if (response.error) {
			location.href = 'login.html'
		}
	}
})



$(function () {
	$.ajax({
		type: 'get',
		url: `${APP.baseUrl}/user/queryUser`,
		data: {
			page: 1,
			pageSize: 100
		},
		success: function (response) {
			var html = template('userTemp', response);
			$('#userBox').append(html);
		}
	})

	$('#userBox').on('click', '.changeStatus', function () {
		
		var id = $(this).data('user-id');

		// 获取用户当前状态
		var isDelete = $(this).data('user-isdelete');

		$.ajax({
			type: 'post',
			url: `${APP.baseUrl}/user/updateUser`,
			data: {
				id: id,
				isDelete: isDelete == 1 ? 0 : 1
			},
			success: function (response) {
				if (response.success) {
					location.reload();
				}else {
					alert(response.message);
				}
			}
		})
	})
})
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
			console.log(response);
			var html = template('userTemp', response);
			$('#userBox').html(html);
		}
	})

	$('#userBox').on('click', '.changeStatus', function () {
		
		var id = $(this).attr('data-user-id');

		var isdelete = $(this).attr('data-user-isdelete');

		$.ajax({
			type: 'post',
			url: `${APP.baseUrl}/user/updateUser`,
			data: {
				id: id,
				isdelete: isdelete == 1 ? 0 : 1
			},
			success: function (response) {
				if (response.success) {
					location.reload();
				} else {
					alert(response.message);
				}
			}
		})
	})
})
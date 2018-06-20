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
})
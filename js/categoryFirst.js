$(function () {

	var page = 1;

	var pagesize = 5;

	var pages = 0;

	getData();

	$('#prevBtn').on('click', function () {
		page--;
		if (page < 1) {
			page = 1;
			alert('已经是第一页了');
			return;
		}
		getData();
	})

	$('#nextBtn').on('click', function () {
		page++;
		if (page > pages) {
			page = pages;
			alert('已经是最后一页了');
			return;
		}
		getData();
	})



	function getData () {
		$.ajax({
			type: 'get',
			url: `${APP.baseUrl}/category/queryTopCategoryPaging`,
			data: {
				page: page,
				pageSize: pagesize
			},
			success: function (response) {
				if (response.error) {
					location.href = 'login.html';
				} else {
					var html = template('categoryFirstTemp', response);
					$('#categoryFirstBox').html(html);
				}
				pages = Math.ceil(response.total / pagesize);
			}
		})
	}

	$('#addFirstBtn').on('click', function () {
		var categoryName = $.trim($('#addFirstTxt').val());
		if (!categoryName) {
			alert('请输入分类关键词');
		} 

		$.ajax({
			type: 'post',
			url: `${APP.baseUrl}/category/addTopCategory`,
			data: {
				categoryName
			},
			success: function (response) {
				if (response.error) {
					alert(response.error);
				} else {
					location.reload();
				}

			}
		})
	})


})
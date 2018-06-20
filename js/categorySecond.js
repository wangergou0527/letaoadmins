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
			url: `${APP.baseUrl}/category/querySecondCategoryPaging`,
			data: {
				page: page,
				pageSize: pagesize
			},
			success: function (response) {
				if (response.error) {
					location.href = 'login.html';
				} else {
					var html = template('categorySecondTemp', {
						list: response,
						api: APP.baseUrl
					});
					$('#categorySecondBox').html(html);
				}
				pages = Math.ceil(response.total / pagesize);
			}
		})
	}


	$.ajax({
		type: 'get',
		url: `${APP.baseUrl}/category/queryTopCategoryPaging`,
		data: {
			page: 1,
			pageSize: 100000
		},
		success: function (response) {
			if (response.error) {
				location.href = 'login.html';
			} else {
				var html = template('categoryFirstTemps', response);
				$('#categoryFirstBoxs').html(html);
			}
		}
	})

	var brandLogo = '';

	// 文件上传第三步 插件调用
	$('#fileUpload').fileupload({
	    dataType: 'json',
	    done: function (e, data) {
	    	console.log(data);
	    	// 存储图片地址
	    	brandLogo = data._response.result.picAddr;
	    	// 拼接图片url
	    	var imgUrl= APP.baseUrl + data._response.result.picAddr;
	    	// 将图片渲染到页面中
	     	$("#showBrand").attr("src",imgUrl);
	    }
	});

	var hot = 1;

	$('#addSecondBtn').on('click', function () {
		var result = $('#categorySecondForm').serializeToJson();
		var categoryId = result.categoryId;
		var brandName = result.brandName;

		$.ajax({
			type: 'post',
			url: `${APP.baseUrl}/category/addSecondCategory`,
			data: {
				brandName,
				categoryId,
				brandLogo,
				hot
			},
			success: function (response) {
				if (response.success) {
					location.reload();
				} else {
					alert(response.message);
				}
			}
		})
		// $.ajax({
		// 	type: 'post',
		// 	url: `${APP.baseUrl}/category/addTopCategory`,
		// 	data: {
		// 		categoryName
		// 	},
		// 	success: function (response) {
		// 		if (response.error) {
		// 			alert(response.error);
		// 		} else {
		// 			location.reload();
		// 		}

		// 	}
		// })
	})
})
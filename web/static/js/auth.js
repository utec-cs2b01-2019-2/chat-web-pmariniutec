(function ($) {
	$.fn.serializeFormJSON = function () {
		var o = {}
		var a = this.serializeArray()
		$.each(a, function () {
			if (o[this.name]) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]]
				}
				o[this.name].push(this.value || '')
			} else {
				o[this.name] = this.value || ''
			}
		})
		return o
	}
})(jQuery)

function login(data) {
	var url = '/authenticate'
	$.ajax({
		type: 'POST',
		data: JSON.stringify(data),
		url,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		success: function (data) {
			if (data['status'] === 'success') {
				window.location.href = '/user-table'
			}
		},
		error: function (data) {
			console.log(data)
			const response = data.responseJSON
			$('#server-results').text(response['message'])
		}
	})
}

function register(data) {
	var url = '/users'
	$.ajax({
		type: 'POST',
		data: JSON.stringify(data),
		url,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		success: function (data) {
			$('#server-results').text(data['message'])
		},
		error: function (data) {
			const response = data.responseJSON
			$('#server-results').text(response['message'])
		}
	})
}

// Listeners
$(function () {
	$('#login-form').submit(function(event) {
		event.preventDefault()
		var data = $(this).serializeFormJSON()
		login(data)
	})

	$('#register-form').submit(function(event) {
		event.preventDefault()
		var data = $(this).serializeFormJSON()
		register(data)
	})
})

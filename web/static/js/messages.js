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

function getMessagesFromUser(from, to) {
	$.getJSON('/messages/' + from + '/' + to, function(data) {
		$.each(data, function(){
			console.log(data)
		})
	})
}

function getAllMessages() {
	$.getJSON('/messages', function(data) {
		console.log(data)
	})
}

function sendMessage(data) {
	var url = '/send_message'
	$.ajax({
		type: 'POST',
		data: JSON.stringify(data),
		url,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		success: function (data) {
			$('#send-message-input').val('')
			$('#server-response').text(data['message'])
			setTimeout(function(){
				$('#server-response').fadeOut('fast')
			}, 2000)
		},
		error: function (data) {
			$('#server-response').text(data['message'])
		}
	})
}

$(function () {
	$('#send-message-form').submit(function(event){
		event.preventDefault()
		var data = $(this).serializeFormJSON()
		$('#send-message-btn').attr('disabled', true)
		sendMessage(data)
	})
})

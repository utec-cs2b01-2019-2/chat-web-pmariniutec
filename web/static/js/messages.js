function getMessagesFromUser(from, to) {
	$.getJSON('/messages/' + from + '/' + to, function(data){
		$.each(data, function(){
			console.log(data)
		})
	})
}

function getAllMessages() {
	$.getJSON('/messages', function(data){
		console.log(data)
	})
}

$(function () {
})

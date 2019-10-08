function sendMessage(){
	alert('Heyyyy')
}

function getAllUsers(){
	$.getJSON('/users', function(data){
		var i = 0
		$.each(data, function(){
			const user_to = data[i]['id']
			let e = '<div class="alert" role="alert" >'
			e += '<div>'+ data[i]['username'] + '</div>'
			e += '</div>'
			i++
			$('<div/>',{html:e}).appendTo('#users')
		})
	})
}

$(document).ready(function(){
	$('#Rbutton').click(function(event){
		var name = $('#username').val();
		var pswd = $('#password').val();
		var repeatpswd = $('#repeatpassword').val();
		
		if(name = "" || pswd = "" || repeatpswd = ""){
			alert("Information can not be blank");
			event.preventDefault();
		}
		
		if(pswd != repeatpswd){
			alert('Passwords do not match');
			event.preventDefault();
		}
	});
});
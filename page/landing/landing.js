function(){

	$('html, body').animate({
        scrollTop: $(`body`).offset().top
    }, 500);


	$("[scroll]").click(function(event) {
		event.preventDefault();
		var href = event.target.getAttribute('href');

		$('html, body').animate({
	        scrollTop: $(`#${href}`).offset().top - 130
	    }, 500);

	});



	if (sessionStorage.getItem('scroll') != null) {
		$('html, body').animate({
	        scrollTop: $(`#${sessionStorage.getItem('scroll')}`).offset().top - 130
	    }, 500);

		setTimeout(() => {
		  sessionStorage.removeItem('scroll');
		}, 1000);
	}


}

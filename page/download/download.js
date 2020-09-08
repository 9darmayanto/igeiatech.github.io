function(){

	$('html, body').animate({
        scrollTop: $(`body`).offset().top
    }, 500);

	$("[scroll]").click(function(event) {
		event.preventDefault();
		var href = event.target.getAttribute('href');

		location.href = '#/home';

		sessionStorage.setItem('scroll', href);
	});

}

function(){

	$('html, body').animate({
    scrollTop: $(`body`).offset().top
  }, 100);

	$("[scroll]").click(function(event) {
		event.preventDefault();
		var href = event.target.getAttribute('href');
		location.href = '#/home';
		sessionStorage.setItem('scroll', href);
	});

}
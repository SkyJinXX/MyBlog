module.exports = function(){
	let t = 0,
		p = 0;
	$(window).scroll(function(e){
		p = $(this).scrollTop();
		if(p>t){
			$('.sidebar').addClass('is-hidden');
		}else{
			$('.sidebar').removeClass('is-hidden');
		}
		t = p;
	});
};
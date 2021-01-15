document.getElementById("header__open-menu").onclick = function(){
	document.getElementById("header__overlay").classList.remove("header__overlay--hidden");
	this.classList.add("hidden");
	document.getElementById("header__close-menu").classList.remove("hidden");
};

document.getElementById("header__close-menu").onclick = function(){
	document.getElementById("header__overlay").classList.add("header__overlay--hidden");
	this.classList.add("hidden");
	document.getElementById("header__open-menu").classList.remove("hidden");
};

// if code is in prototype page
if(document.getElementsByClassName("prototype-gallery").length > 0){
	new SimpleLightbox({elements: '.prototype-gallery__wrapper a'});
}

// if code is in homepage
if(document.getElementById("home-intro")){

	$(function () {
		var height = 3500;
		var speed = 1.5;
		$("#home-intro").css({
			'height': height + 'px'
		}); 

		$(window).scroll(function () {
			
			var window_width = $(window).width();
			var window_height = $(window).width();

			var scroll_position = $(window).scrollTop();
			var object_position_left = window_width * (scroll_position / height);
			var object_position_top = window_height * (scroll_position / height);
	
			$('#external').css({
				'top': 0.05*speed*object_position_top + 'px'
			});
			// $('#back').css({
			// 	'top': -0.2*speed*object_position_top + 'px'
			// });
			$('#external').css({
				'left': 0.9*speed*object_position_left + 'px'
			}); 
			// $('#back').css({
			// 	'left': -0.5*speed*object_position_left + 'px'
			// });
		});
	});


	// OLD ANIMATION
	// var winHeight = window.innerHeight;
	// var animDuration = winHeight * 3;
	// document.getElementById('home-intro').style.height = (animDuration+winHeight) +'px';
	// var animationData;

	// animationData = (function () {
	// 	var json = null;
	// 	$.ajax({
	// 		'async': false,
	// 		'global': false,
	// 		'url': "/static/js/data.json",
	// 		'dataType': "json",
	// 		'success': function (data) {
	// 			json = data;
	// 		}
	// 	});
	// 	return json;
	// })(); 

	// var animData = {
	// 	container: document.getElementById('animation-container'),
	// 	renderer: 'svg',
	// 	loop: false,
	// 	autoplay: false,
	// 	animationData: animationData,
	// };

	// var anim = bodymovin.loadAnimation(animData);
	// window.addEventListener('scroll', function() {
	// 	animatebodymovin(animDuration, anim);
	// });

	// function animatebodymovin(duration, animObject) {
	// 	var scrollPosition = window.scrollY;
	// 	var maxFrames = animObject.totalFrames;
	// 	var frame = (maxFrames / 100) * (scrollPosition / (duration / 100));
	// 	animObject.goToAndStop(frame, true);
	// }

	// function loadJSON(callback) {   

	// 	var xobj = new XMLHttpRequest();
	// 	xobj.overrideMimeType("application/json");
	// 	xobj.open('GET', '/static/js/data.json', true);
	// 	xobj.onreadystatechange = function () {
	// 		if (xobj.readyState == 4 && xobj.status == "200") {
	// 			// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
	// 			callback(xobj.responseText);
	// 			console.log(xobj.responseText)
	// 		}
	// 	};
	// 	xobj.send(null);  
	// }
}
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

// if code is in whpsc page
if(document.getElementsByClassName("race-parts-wrapper").length > 0){
	var galleries = document.getElementsByClassName("race__gallery");
	for (var i=0; i < galleries.length; i++){
		new SimpleLightbox({elements: galleries[i].querySelectorAll('a')});
	}
}


// if code is in homepage
if(document.getElementById("home-intro")){

	$(function () {
		// It's possible to adjust the animation speed by changing wrapper height
		var height = 1500; 
		$("#home-intro").css({
			'height': height + $(window).height() + 'px'
		}); 

		$(window).scroll(function () {
			var scroll_position = $(window).scrollTop();
			if (scroll_position > height) return; // If animation passed don't go on
			var width = $("#home-intro").width();
			var progress = scroll_position/height;
			// apply easeOutQuad function see: https://easings.net/#easeOutQuad
			progress = 1 - (1-progress)*(1-progress);
			
			var object_position_left = progress*width;
			var object_position_top = 0.2*object_position_left;

			// back opacity is twice fastest
			var opacity = 1-progress*2;

			$('#back').css({
				'opacity': (opacity < 0.05 ? 0 : opacity) + ''
			});
			$('#external').css({
				'left': object_position_left + 'px',
				'top': object_position_top + 'px'
			}); 
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
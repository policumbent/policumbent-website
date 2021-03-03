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

// if code is in article page
if(document.getElementsByClassName("article-content").length > 0){
	var btns_copy = document.getElementsByClassName("code-buttons-copy");
	for (var i = 0; i < btns_copy.length; i++) {
		btns_copy.item(i).addEventListener("click", function(e){
			//select the hljs block
			var elem = e.target.parentNode.nextElementSibling || e.target.parentNode.nextSibling;
			var text = elem.textContent || elem.innerText;
	
			// Create a textblock and assign the text and add to document
			var el = document.createElement('textarea');
			el.value = text.trim();
			document.body.appendChild(el);
			el.style.display = "block";
	
			// select the entire textblock
			if (window.document.documentMode)
				el.setSelectionRange(0, el.value.length);
			else
				el.select();
	
			// copy to clipboard
			document.execCommand('copy');
	
			// clean up element
			document.body.removeChild(el);
			
			e.target.classList.add("ok-icon");
	
			setTimeout( function(){ 
				e.target.classList.remove("ok-icon");
			}, 4000);
		});
	}
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

	// using jQuery
	// $(function () {
	// 	// It's possible to adjust the animation speed by changing wrapper height
	// 	var height = 1500; 
	// 	$("#home-intro").css({
	// 		'height': height + $(window).height() + 'px'
	// 	}); 

	// 	$(window).scroll(function () {
	// 		var scroll_position = $(window).scrollTop();
	// 		if (scroll_position > height) return; // If animation passed don't go on
	// 		var width = $("#home-intro").width();
	// 		var progress = scroll_position/height;
	// 		// apply easeOutQuad function see: https://easings.net/#easeOutQuad
	// 		progress = 1 - (1-progress)*(1-progress);
			
	// 		var object_position_left = progress*width;
	// 		var object_position_top = 0.2*object_position_left;

	// 		// back opacity is twice fastest
	// 		var opacity = 1-progress*2;

	// 		$('#back').css({
	// 			'opacity': (opacity < 0.05 ? 0 : opacity) + ''
	// 		});
	// 		$('#external').css({
	// 			'left': object_position_left + 'px',
	// 			'top': object_position_top + 'px'
	// 		}); 
	// 	});
	// });
	
	// vanilla js
	// It's possible to adjust the animation speed by changing wrapper height
	var height = 1500; 
	document.getElementById("home-intro").style.height = height + window.innerHeight + 'px';

	window.addEventListener('scroll', function() {
		var scroll_position = window.scrollY;
		if (scroll_position > height) return; // If animation passed don't go on
		var width =  document.getElementById("home-intro").offsetWidth;
		var progress = scroll_position/height;
		// apply easeOutQuad function see: https://easings.net/#easeOutQuad
		progress = 1 - (1-progress)*(1-progress);
		
		var object_position_left = progress*width;
		var object_position_top = 0.2*object_position_left;

		// back opacity is twice fastest
		var opacity = 1-progress*2;

		document.getElementById("back").style.opacity = (opacity < 0.05 ? 0 : opacity) + '';
		document.getElementById("external").style.left = object_position_left + 'px';
		document.getElementById("external").style.top = object_position_top + 'px';
	});
}
var winHeight = window.innerHeight;
var animDuration = winHeight * 3;
document.getElementById('home-intro').style.height = (animDuration+winHeight) +'px';
var animationData;

animationData = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "/static/js/data.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})(); 

var animData = {
	container: document.getElementById('animation-container'),
	renderer: 'svg',
	loop: false,
	autoplay: false,
	animationData: animationData,
};

var anim = bodymovin.loadAnimation(animData);
window.addEventListener('scroll', function() {
	animatebodymovin(animDuration, anim);
});

function animatebodymovin(duration, animObject) {
	var scrollPosition = window.scrollY;
	var maxFrames = animObject.totalFrames;
	var frame = (maxFrames / 100) * (scrollPosition / (duration / 100));
	animObject.goToAndStop(frame, true);
}

function loadJSON(callback) {   

	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', '/static/js/data.json', true);
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {
			// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
			callback(xobj.responseText);
			console.log(xobj.responseText)
		}
	};
	xobj.send(null);  
}
/**
 * Carousel Javascript
 * Custom button state handler for enabling/disabling button state. 
 * Called when the carousel has determined that the previous button
 * state should be changed.
 * Specified to the carousel as the configuration
 * parameter: prevButtonStateHandler
 **/
var handlePrevButtonState = function(type, args) {

	var enabling = args[0];
	var leftImage = args[1];
	if(enabling) {
		leftImage.src = "http://media.collegepublisher.com/media/assets/icons/control_start_blue.gif";	
	} else {
		leftImage.src = "http://media.collegepublisher.com/media/assets/icons/control_start.gif";	
	}
	
};
/**
 * Custom button state handler for enabling/disabling button state. 
 * Called when the carousel has determined that the next button
 * state should be changed.
 * Specified to the carousel as the configuration
 * parameter: nextButtonStateHandler
 **/
var handleNextButtonState = function(type, args) {

	var enabling = args[0];
	var rightImage = args[1];
	
	if(enabling) {
		rightImage.src = "http://media.collegepublisher.com/media/assets/icons/control_end_blue.gif";
	} else {
		rightImage.src = "http://media.collegepublisher.com/media/assets/icons/control_end.gif";
	}
	
};
/**
 * You must create the carousel after the page is loaded since it is
 * dependent on an HTML element (in this case 'mycarousel'.) See the
 * HTML code below.
 **/
var pageLoad = function() 
{
	var carousel = new YAHOO.extension.Carousel("mycarousel", 
		{
			numVisible:        2,
			animationSpeed:   .3,
			scrollInc:         1,
			navMargin:         17,
			prevElement:     "prev-arrow",
			nextElement:     "next-arrow",
			size:              10,
			prevButtonStateHandler:   handlePrevButtonState,
			nextButtonStateHandler:   handleNextButtonState
		}
	);

};
YAHOO.util.Event.addListener(window, 'load', pageLoad);
/* End of carosel javascript. */


document.write('<div id="roo_component_wrapper">');
document.write('	<ul id="roo_component_header">');
document.write('		<li><h5>Top Videos</h5></li>');
document.write('		<li><a href="/videos/">more video...</a></li>');
document.write('	</ul>');
document.write('	<div id="roo_component">');
document.write('		<div id="mycarousel" class="carousel-component">');
document.write('			<div class="carousel-prev"> <img id="prev-arrow" class="left-button-image" src="http://media.collegepublisher.com/media/assets/icons/control_start_blue.gif"/> </div>');
document.write('			<div class="carousel-next"> <img id="next-arrow" class="right-button-image" src="http://media.collegepublisher.com/media/assets/icons/control_end_blue.gif"/> </div>');
document.write('			<div class="carousel-clip-region">');
document.write('				<ul class="carousel-list">');
					
					
document.write('						<li id="mycarousel-item-1"><a href="/videos/?stream=http%3A%2F%2Fpublish%2Evx%2Eroo%2Ecom%2Fdailyvan%2Fportal%2F%3FChannel%3DAsia%2BBusiness%26ClipId%3D884445%26Format%3Dflash%26Bitrate%3D300">');
document.write('						<img src="http://publish.vx.roo.com/thumbnails/1285/884445_1.jpg" />');
document.write('						<div class="roo_module_title">Asian Markets Softer<span class="roo_module_play">play</span></div></a>');
document.write('						</li>');
					
					
					
					
document.write('						<li id="mycarousel-item-2"><a href="/videos/?stream=http%3A%2F%2Fpublish%2Evx%2Eroo%2Ecom%2Fdailyvan%2Fportal%2F%3FChannel%3DEntertainment%2BNews%26ClipId%3D884395%26Format%3Dflash%26Bitrate%3D300">');
document.write('						<img src="http://publish.vx.roo.com/thumbnails/1243/884395_1.jpg" />');
document.write('						<div class="roo_module_title">Vince McMahon - Dead?<span class="roo_module_play">play</span></div></a>');
document.write('						</li>');
					
					
					
					
document.write('						<li id="mycarousel-item-3"><a href="/videos/?stream=http%3A%2F%2Fpublish%2Evx%2Eroo%2Ecom%2Fdailyvan%2Fportal%2F%3FChannel%3DEntertainment%2BNews%26ClipId%3D884434%26Format%3Dflash%26Bitrate%3D300">');
document.write('						<img src="http://publish.vx.roo.com/thumbnails/1223/884434_1.jpg" />');
document.write('						<div class="roo_module_title">Lohan Sued Over Beverly Hills Car Crash<span class="roo_module_play">play</span></div></a>');
document.write('						</li>');
					
					
					
					
document.write('						<li id="mycarousel-item-4"><a href="/videos/?stream=http%3A%2F%2Fpublish%2Evx%2Eroo%2Ecom%2Fdailyvan%2Fportal%2F%3FChannel%3DEurope%2BBusiness%26ClipId%3D884316%26Format%3Dflash%26Bitrate%3D300">');
document.write('						<img src="http://publish.vx.roo.com/thumbnails/1285/884316_1.jpg" />');
document.write('						<div class="roo_module_title">UK Inflation Slows<span class="roo_module_play">play</span></div></a>');
document.write('						</li>');
					
					
					
					
document.write('						<li id="mycarousel-item-5"><a href="/videos/?stream=http%3A%2F%2Fpublish%2Evx%2Eroo%2Ecom%2Fdailyvan%2Fportal%2F%3FChannel%3DExtreme%26ClipId%3D879022%26Format%3Dflash%26Bitrate%3D300">');
document.write('						<img src="http://publish.vx.roo.com/thumbnails/1356/879022_1.jpg" />');
document.write('						<div class="roo_module_title">G MAC Speaks<span class="roo_module_play">play</span></div></a>');
document.write('						</li>');
					
					
					
					
document.write('						<li id="mycarousel-item-6"><a href="/videos/?stream=http%3A%2F%2Fpublish%2Evx%2Eroo%2Ecom%2Fdailyvan%2Fportal%2F%3FChannel%3DGolf%26ClipId%3D884362%26Format%3Dflash%26Bitrate%3D300">');
document.write('						<img src="http://publish.vx.roo.com/thumbnails/1285/884362_1.jpg" />');
document.write('						<div class="roo_module_title">US Open Golfers Prepare<span class="roo_module_play">play</span></div></a>');
document.write('						</li>');
					
					
					
					
document.write('						<li id="mycarousel-item-7"><a href="/videos/?stream=http%3A%2F%2Fpublish%2Evx%2Eroo%2Ecom%2Fdailyvan%2Fportal%2F%3FChannel%3DMovie%2BNews%26ClipId%3D95912%26Format%3Dflash%26Bitrate%3D300">');
document.write('						<img src="http://publish.vx.roo.com/thumbnails/1223/95912_1.jpg" />');
document.write('						<div class="roo_module_title">Check Out New \'Fantastic Four\' Movie Trailer<span class="roo_module_play">play</span></div></a>');
document.write('						</li>');
					
					
					
					
document.write('						<li id="mycarousel-item-8"><a href="/videos/?stream=http%3A%2F%2Fpublish%2Evx%2Eroo%2Ecom%2Fdailyvan%2Fportal%2F%3FChannel%3DMovie%2BReviews%26ClipId%3D883209%26Format%3Dflash%26Bitrate%3D300">');
document.write('						<img src="http://publish.vx.roo.com/thumbnails/1255/883209_1.jpg" />');
document.write('						<div class="roo_module_title">Hot Rod - Preview<span class="roo_module_play">play</span></div></a>');
document.write('						</li>');
					
					
					
					
document.write('						<li id="mycarousel-item-9"><a href="/videos/?stream=http%3A%2F%2Fpublish%2Evx%2Eroo%2Ecom%2Fdailyvan%2Fportal%2F%3FChannel%3DMusic%2BNews%26ClipId%3D884471%26Format%3Dflash%26Bitrate%3D300">');
document.write('						<img src="http://publish.vx.roo.com/thumbnails/1316/884471_1.jpg" />');
document.write('						<div class="roo_module_title">Undercover Minute - Ash<span class="roo_module_play">play</span></div></a>');
document.write('						</li>');
					
					
					
					
document.write('						<li id="mycarousel-item-10"><a href="/videos/?stream=http%3A%2F%2Fpublish%2Evx%2Eroo%2Ecom%2Fdailyvan%2Fportal%2F%3FChannel%3DOffbeat%2BNews%26ClipId%3D884364%26Format%3Dflash%26Bitrate%3D300">');
document.write('						<img src="http://publish.vx.roo.com/thumbnails/1285/884364_1.jpg" />');
document.write('						<div class="roo_module_title">Let Them Eat Cake!<span class="roo_module_play">play</span></div></a>');
document.write('						</li>');
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
document.write('				</ul>');
document.write('			</div>');
document.write('		</div>');
document.write('	</div>');
document.write('</div>');
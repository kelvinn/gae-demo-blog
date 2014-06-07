function toggleLayer(whichLayer)
{
	if (document.getElementById)
	{
		// this is the way the standards work
		var style2 = document.getElementById(whichLayer).style;
		style2.display = style2.display? "":"block";
	}
	else if (document.all)
	{
		// this is the way old msie versions work
		var style2 = document.all[whichLayer].style;
		style2.display = style2.display? "":"block";
	}
	else if (document.layers)
	{
		// this is the way nn4 works
		var style2 = document.layers[whichLayer].style;
		style2.display = style2.display? "":"block";
	}
}

function popUp(URL,WIDTH,HEIGHT) {
	day = new Date();
	id = day.getTime();
	eval("page" + id + " = window.open(URL, '" + id + "', 'toolbar=0,scrollbars=1,location=0,statusbar=1,menubar=0,resizable=1,width=" + WIDTH + ",height=" + HEIGHT + "');");
}

function successNotification(ID) {
	new Effect.Highlight(ID, {duration: 1, startcolor: '#ffff99', endcolor: '#e7fbe7', restorecolor: '#e7fbe7'});
}
function failureNotification(ID) {
	new Effect.Highlight(ID, {duration: 1, startcolor: '#ff0000', endcolor: '#cc0000', restorecolor: '#cc0000'});
}

// used for the 'X Close' button on Add/Edit story success
function slideClosed(ID) {
	new Effect.toggle(ID,'appear', {duration: 1});
}

// used for the 'What does this page do?' tabs
function tabSlide(ID) {
	new Effect.toggle(ID,'slide', {duration: .5});
}
// first used for 'add batch tags' in new photo manager
function fadeIt(ID) {
	new Effect.Appear(ID);
}
// change from one background color to another, permandently
function highlightIt(ID,start,end) {
	new Effect.Highlight(ID,{startcolor:start,endcolor:end,restorecolor:end});
}

// This is used for content swapping. Originally setup by Matt C.
function displayBlocks() {
  allNodes = document.getElementsByClassName("cp_ajax");
  for(i = 0; i < allNodes.length; i++) {
      var url = allNodes[i].href;
      allNodes[i].style.display = 'none';
      var myAjax = new Ajax.Request (url,{method: 'get', onComplete: showResponse});
  }
}
function showResponse(originalRequest) {
  for(i = 0; i < allNodes.length; i++) {
    $(allNodes[i].title).innerHTML = originalRequest.responseText;
  }
}

// Grabs html for tooltips.
function getTooltipText(id) {
	lasttooltipevent = 'mouseover';
		var tooltipLocation = '/other/tooltips/?q=' + id;
		//var tooltipLocation = 'media/sample.xml';
		xmlhttp.open("GET",tooltipLocation,true);
		xmlhttp.onreadystatechange=function()	{
	 		if (xmlhttp.readyState==4) {
			 	if (lasttooltipevent=='mouseover') {
				  	var response = xmlhttp.responseText;
					overlib(response, STICKY, CAPTION,'just ignore this but keep it',CLOSECLICK, ABOVE, RIGHT, OFFSETY, -15, OFFSETX, 19);
				}
	 		}
		}
	xmlhttp.send(null);
}

/*var lasttooltipevent = '';*/
/*
 We remember the last tool tip event (Mouseout, mouseover) when deciding to open the bubble info.
*/
function closeToolTip(id) {
	lasttooltipevent = 'mouseout';
	cClick();
}

// Create Ajax Popup Login Box
function popup(url,ie5url,width,height) {
  // if a "closeable" boolean is passed, track it. It is the 4th item on the index of arguments.
  if (arguments.length == 5) {
   closeable = arguments[4];
  } else {
   closeable = 0;
  }
  if (closeable == 1) {
	url = url + '&closeable=1';
  }
  if ((navigator.userAgent.indexOf("MSIE")!=-1) && (navigator.userAgent.indexOf("Mac")!=-1)) {
    document.location.href = ie5url;   
  } else {
    var win = new Dialog.alert({url: url, options: {method: 'get'}}, {windowParameters: {className: "popup", width: width, height: height, zindex: 1500}, okLabel: "x", buttonClass: "hideClose"});
    // To prevent ugliness, we hide all object tags (flash movies)
    document.getElementsByTagName("object").className = "hide";
    document.getElementsByTagName("embed").className = "hide";
  }
}

// Create Ajax Popup Login Box
function popup_new(url,ie5url,width,height) {
/*
  // if a "closeable" boolean is passed, track it. It is the 4th item on the index of arguments.
  if (arguments.length == 5) {
	  closeable = arguments[4];
  } 
  else {
	  closeable = 0;
  }
  if (closeable == 1) {
	  url = url + '&closeable=1';
  }

  if ((navigator.userAgent.indexOf("MSIE")!=-1) && (navigator.userAgent.indexOf("Mac")!=-1)) {
    document.location.href = ie5url;   
  } 
  else {
	// Windows with an URL as content
	// We want this to not be resizable or draggable so we set those to false
	// The dialog2 is the name of the class prefix for use in the style sheets
	// Title sets the title of the window (this can be blank for the login window)
	y2mcp_win2 = new Window('y2mcp_regdialog2', {
								  bottom:0, left:0, width:width, height:height, 
								  resizable: false, closable: closeable, minimizable: false, maximizable: false, draggable: false, 
								  url: url, showEffectOptions: {duration:0}, hideEffectOptions: {duration:0}})
	y2mcp_win2.setDestroyOnClose();
	// We now set the window to show center and set modal to true
	y2mcp_win2.showCenter(true);
  }
  */
}


function getCurrentDateTime(theFormat){
	//
	// returns a nice date/time string for the current timestamp, depending on what format you request
	// INPUT:	date format - REQUIREd
	// 			formats:
	//				1 - US short date (mm/dd/yyyy):		01/01/2006
	//				2 - long date: 						Monday, January 1, 2006
	//				3 - long date and time (12-hour): 	Monday, January 1, 2006 9:00 AM
	//				4 - time (12-hour): 				9:00 AM
	// OUTPUT:	formatted date/time string
	//
	// NOTES/CAVEATS/WARNINGS:
	//			This function works with a local time string (not GMT/UTC)
	//
	var theReturnVal = "";
	var today = new Date();
	
	var arDays = new Array('Sunday','Monday','Tuesday','Wednesday',
	'Thursday','Friday','Saturday');

	var arFullMonths = new Array('January','February','March','April',
	'May','June','July','August','September','October','November','December');

	var Year = today.getFullYear();
	var Month = leadingZero(today.getMonth()+1);
	var DayName = arDays[today.getDay()];
	var MonthFullName = arFullMonths[today.getMonth()];
	var Day = today.getDate();
	var DayLeading = leadingZero(today.getDate());
	var Hours = today.getHours();
	var ampm = "AM";
	
	if (Hours == 0) Hours = 12;
	if (Hours > 11)
		ampm = "PM";
	if (Hours > 12)
		Hours -= 12;
	var HoursLeading = leadingZero(Hours);
	var Minutes = leadingZero(today.getMinutes());
	var Seconds = leadingZero(today.getSeconds());

	switch(theFormat){
		case 1:
			theReturnVal = Month + '/' + Day + '/' + Year;
			break;

		case 2:
			theReturnVal = DayName + ', ' + MonthFullName + ' ' + Day + ', ' + Year;
			break;

		case 3:
			theReturnVal = DayName + ', ' + MonthFullName + ' ' + Day + ', ' + Year + ' ' + Hours + ':' + Minutes + ' ' + ampm;
			break;

		case 4:
			theReturnVal = Hours + ':' + Minutes + ' ' + ampm;
			break;

		default:
			theReturnVal = Month + '/' + Day + '/' + Year;
	}

	return theReturnVal;
}

function leadingZero(nr)
{
	if (nr < 10){ 
		nr = "0" + nr;
	}
	return nr;
}

function getCurrentIssue(theFormat) {
	// writes "Dayname Monthname DD, YYYY"
	// within div#cp_current_issue
	//
	// so if you're going to do some styling, use selectors as follows:
	//
	// #cp_current_issue .day {font-weight: bold;}
	//
	// 			formats:
	//				1 - US short date (mm/dd/yyyy):		01/01/2006
	//					spans:							.day/.month/.year
	//				2 - long date: 						Monday January 1, 2006
	//					spans:							.dayname .monthname .day, .year

	var openDiv = '<div id="cp_current_issue">';
	var closeDiv = '</div>';
	var s = "/";
	var n = "&nbsp;"

	function writeSpan(className,whichVar) {
		var spanWrap = '<span class="' + className + '">' + whichVar + '</span>';
		return spanWrap;
	}

	switch(theFormat) {
		case 1: 
			thisIssue = writeSpan("day",currentissueday) + s + writeSpan("month",currentissuemonth) + s + writeSpan("year",currentissueyear);
			break;
		case 2:
			thisIssue = writeSpan("dayname",currentissuedayname) + n + writeSpan("monthname",currentissuemonthname) + n + writeSpan("day",currentissueday) + "," + n + writeSpan("year",currentissueyear);
			break;

		default: 
			thisIssue = writeSpan("day",currentissueday) + s + writeSpan("month",currentissuemonth) + s + writeSpan("year",currentissueyear);
	}

	thisIssue = openDiv + thisIssue + closeDiv
	return thisIssue;
}

/*
pullquote function by Roger Johansson, http://www.456bereastreet.com/
*/
var cp_pullquote = {
	init : function() {
	// Check that the browser supports the methods used
		if (!document.getElementById || !document.createElement || !document.appendChild) return false;
		var oElement, ocp_pullquote, ocp_pullquoteP, oQuoteContent, i, j;
	// Find all span elements with a class name of cp_pullquote
		var arrElements = document.getElementsByTagName('span');
		var oRegExp = new RegExp("(^|\\s)cp_pullquote(\\s|$)");
		for (i=0; i<arrElements.length; i++) {
	// Save the current element
			oElement = arrElements[i];
			if (oRegExp.test(oElement.className)) {
	// Create the blockquote and p elements
				ocp_pullquote = document.createElement('blockquote');
				ocp_pullquote.className = oElement.className
				ocp_pullquoteP = document.createElement('p');
	// Insert the cp_pullquote text
				for(j=0;j<oElement.childNodes.length;j++) {
					ocp_pullquoteP.appendChild(oElement.childNodes[j].cloneNode(true));
				}
				ocp_pullquote.appendChild(ocp_pullquoteP);
	// Insert the blockquote element before the span elements parent element
				oElement.parentNode.parentNode.insertBefore(ocp_pullquote,oElement.parentNode);
			}
		}
	}
};

// addEvent function from http://www.quirksmode.org/blog/archives/2005/10/_and_the_winner_1.html
function addEvent(obj, type, fn) {
	if (obj.addEventListener)
		obj.addEventListener( type, fn, false );
	else if (obj.attachEvent)
	{
		obj["e"+type+fn] = fn;
		obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
		obj.attachEvent( "on"+type, obj[type+fn] );
	}
}
addEvent(window, 'load', cp_pullquote.init);

// CSS Browser Selector   v0.2.5
// Documentation:         http://rafael.adm.br/css_browser_selector
// License:               http://creativecommons.org/licenses/by/2.5/
// Author:                Rafael Lima (http://rafael.adm.br)
// Contributors:          http://rafael.adm.br/css_browser_selector#contributors
var css_browser_selector = function() {
	var 
		ua=navigator.userAgent.toLowerCase(),
		is=function(t){ return ua.indexOf(t) != -1; },
		h=document.getElementsByTagName('html')[0],
		b=(!(/opera|webtv/i.test(ua))&&/msie (\d)/.test(ua))?('ie ie'+RegExp.$1):is('gecko/')? 'gecko':is('opera/9')?'opera opera9':/opera (\d)/.test(ua)?'opera opera'+RegExp.$1:is('konqueror')?'konqueror':is('applewebkit/')?'webkit safari':is('mozilla/')?'gecko':'',
		os=(is('x11')||is('linux'))?' linux':is('mac')?' mac':is('win')?' win':'';
	var c=b+os+' js';
	h.className += h.className?' '+c:c;
}();

// Add event to page load http://simonwillison.net/2004/May/26/addLoadEvent/
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}

function addClass(elem,name) {
	return elem.addClassName(name);
}

function disableSubmitOnClick() {
	var xyz = $('submit');
	xyz.onclick = buildADiv;
}

function buildADiv() {
	var width = $('cp_form').getWidth();
	var height = $('cp_form').getHeight();
	var div = document.createElement('div');
	div.className = "disabledBox";
	div.style.width = width;
	div.style.height = height;
	$('cp_form').appendChild(div);
}

// Sets other text field input values with the class whatClass to be the same as that of elemWithValue 
function setAllElementsValues(elemWithText,elemWithValue,whatTextClass,whatValueClass) {
	var textField = $(elemWithText).value;
	var hiddenID = $(elemWithValue).value;
	var fieldGroup = document.getElementsByTagName("input"); 
	for (var i=0; i < fieldGroup.length; i++) {
		if (fieldGroup[i].hasClassName(whatTextClass)) {
			fieldGroup[i].value = textField;
		};
		if (fieldGroup[i].hasClassName(whatValueClass)) {
			fieldGroup[i].value = hiddenID;
		};
	};
};
// Here are some useful functions.

//Gives you url paramaters.
function aryValueOf(ary, index) {
	for(i = 0; i < ary.length; i++)
		if(ary[i] == index) break;
	if(i <= ary.length) 
		return ary[i+1];
	else return "";
}

//This will return the value of a URL variable under "&" notation, or "/" notation.
function QueryString( param ) {
	var begin,end;

	var locStr = window.location.toString();
       // (& Version)
       // If the amount of characters after the filename is greater than 1 AND
       // the paramater name we want is in the query string....
       if(self.location.search.length > 1 && self.location.search.indexOf(param) > -1) {
		begin=self.location.search.indexOf(param) +param.length+1;
		end=self.location.search.indexOf("&",begin);

		if(end==(-1)) {
			end=self.location.search.length;
		}

		return(self.location.search.substring(begin,end));

       } else {
              locStr = locStr.split('/');
              return(aryValueOf(locStr, param));
       }
}

//Returns the value of a cookie.
function GetCookie (name) {
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;

	while (i < clen) {
		var j = i + alen;
    	if (document.cookie.substring(i, j) == arg) {
    	  return getCookieVal (j);
    	}

    	i = document.cookie.indexOf(" ", i) + 1; 
		if (i == 0) {
			break;
		}
    }
  return null;
}

//This function is used to extract the value once the cookie is found based on its offset.
//This function is used by GetCookie 
function getCookieVal(offset) {
	var endstr = document.cookie.indexOf (";", offset);
	if (endstr == -1) endstr = document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
}

//This sets a cookie.
function SetCookie (name, value) { 
	var argv = SetCookie.arguments;
	var argc = SetCookie.arguments.length;
	var expires = (argc > 2) ? argv[2] : null; 
	var path = (argc > 3) ? argv[3] : null; 
	var domain = (argc > 4) ? argv[4] : null; 
	var secure = (argc > 5) ? argv[5] : false; 
	document.cookie = name + "=" + escape (value) + ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + ((path == null) ? "" : ("; path=" + path)) + ((domain == null) ? "" : ("; domain=" + domain)) + ((secure == true) ? "; secure" : "");
}

// This script will try to find a section matching the variable below. If it finds
// one, it will forward the page to that section page.
function goToSection(specialSection) {
	for (i=0;i<aSectionNames.length;i++) {
		
		if (aSectionNames[i].toLowerCase() == specialSection.toLowerCase()) {
			safeSectionName = PCase(specialSection);
			safeSectionName = safeSectionName.replace(/[^a-zA-Z0-9]/g, '');
			xmonth = currentissuedate.substring(0,2);
			xday = currentissuedate.substring(3,5);
			xyear = currentissuedate.substring(6,8);
			if (xyear.length == 2 && xyear.substring(0,1) == 0) {
				xyear = '20' + xyear;
			} else {
				xyear = '19' + xyear;
			}
			issuepath = xyear + '/' + xmonth + '/' + xday + '/';
			linkpath = 'http://' + paper_domain + '/news/' + issuepath + safeSectionName + '/';
			document.location = linkpath;
		}
	}
}

function PCase(STRING) {
	var strReturn_Value = "";
	var iTemp = STRING.length;
	if(iTemp==0){
		return"";
	}	
	var UcaseNext = false;
	strReturn_Value += STRING.charAt(0).toUpperCase();
	for(var iCounter=1;iCounter < iTemp;iCounter++) {
		if(UcaseNext == true){
			strReturn_Value += STRING.charAt(iCounter).toUpperCase();
		} else{
			strReturn_Value += STRING.charAt(iCounter).toLowerCase();
		}
		var iChar = STRING.charCodeAt(iCounter);
		if(iChar == 32 || iChar == 45 || iChar == 46) {
			UcaseNext = true;
		} else {
			UcaseNext = false
		}
		if(iChar == 99 || iChar == 67) {
			if(STRING.charCodeAt(iCounter-1)==77 || STRING.charCodeAt(iCounter-1)==109) {
				UcaseNext = true;
			}
		}
	} //End For
	return strReturn_Value;
} //End Function

// If a "goToSection" paramater is passed on the URL, direct the browser to the corresponding section.
if (typeof(QueryString('goToSection')) != 'undefined') {
	goToSection(QueryString('goToSection'));
}

var ads_local = new Array(); //  // Build up the arrays that contain the rotating ad information.
var aAdLinkLocations_local; // This will keep track of where our links are on the page that we want to manipulate.

function isNumeric(strString)
   //  check for valid numeric strings	
   {
   var strValidChars = "0123456789.-";
   var strChar;
   var blnResult = true;

   if (strString.length == 0) return false;

   //  test strString consists of valid characters listed above
   for (i = 0; i < strString.length && blnResult == true; i++)
      {
      strChar = strString.charAt(i);
      if (strValidChars.indexOf(strChar) == -1)
         {
         blnResult = false;
         }
      }
   return blnResult;
}

// Pass in a number and this will return a random number between 0 and the whole integer you pass.
// This is useful for picking a random entry on an array.
function randomIndex_local(topRange_local) {
	return Math.round(Math.random()*topRange_local);
}
// This will tell you if a given ad is allowed to display on the page.
// Pass in an array containing sections where this ad can run.
// This function will check the js enviornment for a section name
// variable and inform you as to whether or not this ad can appear
// on this page.
// Returns true or false.
function adCanAppearInThisSection_local(asectionrestrictions_local) {
	canappear_local = false;
	
	if (asectionrestrictions_local.length == 0) {
		canappear_local = true;
	} else if (asectionrestrictions_local.length > 0 && typeof isectioncategoryid != 'undefined') {
		thissectionname_local = isectioncategoryid;
		// Loop over each section name passed.
		for(i_local=0;i_local<asectionrestrictions_local.length;i_local++) {
			thistestsection_local = asectionrestrictions_local[i_local];
			if (thissectionname_local.indexOf(thistestsection_local + ',')>-1) {
				canappear_local = true;
			}
		}
	
	} else {
		canappear_local = false;
	}
	return canappear_local;
}

function frontpagerequirementspass_local(bfrontpageonly_local, bexcludefrontpage_local) {
	if (bfrontpageonly_local == 0 && bexcludefrontpage_local == 0) {
		return true;
	}
	//-----------
	if (bfrontpageonly_local == 1) {
		theloc_local = document.URL;
		// If this is the front page, return true; 
		 if(theloc_local.match(/^http(?:s|)\:\/\/(?:media\.|)(?:www|[a-zA-Z_0-9\-]+?)\.[a-zA-Z_0-9\-]+?\.\w{2,3}\/??(?:home)*?\/??(?:index\.cfm)*?$/)){
		    return true;
		} else {
		    return false;
		}
	}
	//-----------
	if (bexcludefrontpage_local == 1) {
		theloc_local = document.URL;
		// If this is the front page, return false; 
		 if(theloc_local.match(/^http(?:s|)\:\/\/(?:media\.|)(?:www|[a-zA-Z_0-9\-]+?)\.[a-zA-Z_0-9\-]+?\.\w{2,3}\/??(?:home)*?\/??(?:index\.cfm)*?$/)){
		    return false;
		} else {
		    return true;
		}
	}
	//-----------
}

// This function will return a new number every time you call it. Good for cache busting.
function cacheBust_local() {
	x_local = new Date();
	return x_local.getTime() + '' + randomIndex_local(1000);
}

// In order to be able to change the click through URL's, we'll need to find the link
// index of each of the ads. This function will build an associative array of the ad link
// locations. The key is the banner position and the value is the link index on the page.
function lookUpAdLinks_local() {
	aLinkLocationsX_local = new Array();
	// Loop over each of the links on this page 
	// searching for the rotating ad positions.
	for (i_local=1;i_local<=document.links.length;i_local++) {
		// If this image object appears to be one of the banner positions, try to figure out which it is.
		if (typeof(document.links[i_local-1]) != 'undefined' && document.links[i_local-1].name.indexOf('cpstilladclicklocal') > -1) {
			aLinkLocationsX_local['' + document.links[i_local-1].name.substring(19,document.links[i_local-1].name.length+1)] = i_local-1;
		}
	}
	return aLinkLocationsX_local;
}

// Takes a url like "http://www.example.com:81/" and returns "www.example.com:81"
function cleanBaseHref_local(baseHrefIn_local){ 
	baseHrefOut_local = baseHrefIn_local;
	baseHrefOut_local =  replaceSubstring_local(baseHrefOut_local, "http://", "");
	baseHrefOut_local =  replaceSubstring_local(baseHrefOut_local, "/", "");	
	return escape(baseHrefOut_local);
}	
function replaceSubstring_local(inputString_local, fromString_local, toString_local) {
   // Goes through the inputString and replaces every occurrence of fromString with toString
   var temp_local = inputString_local;
   if (fromString_local == "") {
      return inputString_local;
   }
   if (toString_local.indexOf(fromString_local) == -1) { // If the string being replaced is not a part of the replacement string (normal situation)
      while (temp_local.indexOf(fromString_local) != -1) {
         var toTheLeft_local = temp_local.substring(0, temp_local.indexOf(fromString_local));
         var toTheRight_local = temp_local.substring(temp_local.indexOf(fromString_local)+fromString_local.length, temp_local.length);
         temp_local = toTheLeft_local + toString_local + toTheRight_local;
      }
   } else { // String being replaced is part of replacement string (like "+" being replaced with "++") - prevent an infinite loop
      var midStrings_local = new Array("~", "`", "_", "^", "#");
      var midStringLen_local = 1;
      var midString_local = "";
      // Find a string that doesn't exist in the inputString to be used
      // as an "inbetween" string
      while (midString_local == "") {
         for (var i_local=0; i_local < midStrings_local.length; i_local++) {
            var tempMidString_local = "";
            for (var j_local=0; j_local < midStringLen_local; j_local++) { tempMidString += midStrings[i_local]; }
            if (fromString_local.indexOf(tempMidString_local) == -1) {
               midString_local = tempMidString_local;
               i_local = midStrings_local.length + 1;
            }
         }
      } // Keep on going until we build an "inbetween" string that doesn't exist
      // Now go through and do two replaces - first, replace the "fromString" with the "inbetween" string
      while (temp_local.indexOf(fromString) != -1) {
         var toTheLeft_local = temp_local.substring(0, temp_local.indexOf(fromString_local));
         var toTheRight_local = temp_local.substring(temp_local.indexOf(fromString_local)+fromString_local.length, temp_local.length);
         temp_local = toTheLeft_local + midString_local + toTheRight_local;
      }
      // Next, replace the "inbetween" string with the "toString"
      while (temp_local.indexOf(midString_local) != -1) {
         var toTheLeft_local = temp_local.substring(0, temp_local.indexOf(midString_local));
         var toTheRight_local = temp_local.substring(temp_local.indexOf(midString_local)+midString_local.length, temp_local.length);
         temp_local = toTheLeft_local + toString_local + toTheRight_local;
      }
   } // Ends the check to see if the string being replaced is part of the replacement string or not
   return temp_local; // Send the updated string back to the user
} // Ends the "replaceSubstring" function
// Pass an array of ads to this function and the SRC of the ad currently running. This function
// will find the index of the current ad..
function findRotationIndex_local(aAds_local, position_local) {
	if (aAds_local.length == 0 || aAds_local.length == 1 || eval("typeof document.cpstillad" + position_local + "local == 'undefined'")) {
		return 0;
	} else {
		chosenIndex_local = null;
		// Find the index of the currently displayed ad.
		for (i_local=0;i_local<aAds_local.length;i_local++) {
			if (aAds_local[i_local][0] == eval("document.cpstillad" + position_local + "local.src")) {
				chosenIndex_local = i_local;
				break;
			}
		}
		return chosenIndex_local;
	}
}

// Resolves timestamp variable in addition to resolving values for all of the other optional values that you pass after richmedia.
function resolveSimpleVars_local(richmedia_local, redirectURL_local, ibanner_ad_id_local, ipaper_id_local) {
	argv_local = resolveSimpleVars_local.arguments;
	argc_local = resolveSimpleVars_local.arguments.length;
	redirectURL_local = (argc_local > 1) ? argv_local[1] : '';
	ibanner_ad_id_local = (argc_local >2) ? argv_local[2] : '';
	ipaper_id_local = (argc_local >3) ? argv_local[3] : '';
	stringout_local = richmedia_local; // This input param is the only required input. If you don't pass the other optional values, they won't get resolved.
	
	basicClickThrough_local = redirectURL_local;
	
	stringout_local = replaceSubstring_local(stringout_local, "[BAS-CLICKTHROUGH]", escape(basicClickThrough_local));
	stringout_local = replaceSubstring_local(stringout_local, "[BAS-CLICKTHROUGH-PLAIN]", basicClickThrough_local);
	stringout_local = replaceSubstring_local(stringout_local, "[BAS-FLASHCLICKTHROUGH]", replaceSubstring_local(basicClickThrough_local, "&", "!"));
	stringout_local = replaceSubstring_local(stringout_local, "[ID]", ibanner_ad_id_local);
	stringout_local = replaceSubstring_local(stringout_local, "[paperid]", ipaper_id_local);
	stringout_local = replaceSubstring_local(stringout_local, "[timestamp]", makeTimeStamp_local());
	trimmedbasehref_local = basehref.substring(7,basehref.length-1);
	stringout_local = replaceSubstring_local(stringout_local, "[callingSite]", trimmedbasehref_local);
	return stringout_local;
}

function makeTimeStamp_local() {
	pcdateobject_local=new Date();
	timestamp_local=pcdateobject_local.getTime();
	return timestamp_local.toString();
}

// Pick a banner ad that should be running for the given position. This will randomly pick one out of the array.
// It will output plain <IMG> tags for plain image display or output direct rich media source code.
function pickAnAdForThisPositionAndDisplayIt_local(aAdsForPosition_local, position_local) {
	 if (aAdsForPosition_local.length>0) {
		 indexOfBannerToStartWith_local = randomIndex_local(aAdsForPosition_local.length-1);
		 chosenBanner_local = aAdsForPosition_local[indexOfBannerToStartWith_local];
		 stillCreative_local = chosenBanner_local[0];
		 clickThrough_local = chosenBanner_local[1];
		 impressionLink_local = chosenBanner_local[2];
		 type_local = chosenBanner_local[3];
		 richmediacode_local = chosenBanner_local[4];
		 pbaid_local = chosenBanner_local[5];
		 ibanner_ad_id_local = chosenBanner_local[6];
		 ipaper_id_local = chosenBanner_local[7];
		 ubanner_ad_id_local = chosenBanner_local[8];
		 
		if (type_local == 'stillimage') {
		 	document.write('<div class="cp_local_ad">');
			document.write('<a href="' + resolveSimpleVars_local(clickThrough_local, clickThrough_local, ibanner_ad_id_local, ipaper_id_local) + '" alt="advertisement" target="_blank" name="cpstilladclicklocal' + position_local + '"><img src="' + resolveSimpleVars_local(stillCreative_local, clickThrough_local, ibanner_ad_id_local, ipaper_id_local) + '" border="0" name="cpstillad' + position_local + 'local"></a>');
			document.write('</div>');
		} else {
			document.write(resolveSimpleVars_local(richmediacode_local, clickThrough_local, ibanner_ad_id_local, ipaper_id_local));
		}
		
		// Increment the impressions counter for this ad. 
		newimageobject_local = new Image();
		eval('impressionIMG' + position_local + '= newimageobject_local');
		eval('impressionIMG' + position_local + '.src = "http://localads.collegepublisher.com/localImp.cfm?ubanner_ad_id=' + ubanner_ad_id_local + '&random=" + cacheBust_local()');
	}
}
		
function getAdsInTag_local (iposition_local) {
	return 0;
}
// This site has no local ads deployed.
function showClientBanner(iposition_local) {
	adDisplayed_local = 0;
	switch (iposition_local) {
	}
	return adDisplayed_local;
}
var clientBannersAvailable = 1;
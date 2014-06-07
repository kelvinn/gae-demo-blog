function showNetworkBanner (iposition) {
//
// show me the banner!
//
	adDisplayed = 0;

	/* we want to avoid recoding sites at the moment.
	so, we're translating old CP ad positions to fit with the DART ad system.
		CP position 11 os DART position 1
		CP position 13 is DART position 2
		CP positions 9 and 10 (120x240 tombstone) get replaced by DART position3 (300x250)

		variables we need to at least exist:
		-- section_category and optional subsection OR mach-ii app name and event
		dart_paper_name:	paper's domain name with the 'www.' and '.com' removed

	*/

	var adSize = '';
	/* this might not be the best way to do this, but it will work as long as we don't move the ad positions
	'fold' is not really condusive to a screen environment */
	var adLocation = '';
	var vchDcopt = '';

	//no popup ads for the 728x90
	if(dart_tileNumber == 1 && iposition != 11){
		vchDcopt = 'dcopt=ist;';
	}
	switch(iposition){
		case 11:
		//case 1:
			adSize='728x90';
			adLocation = 'atf';
			break;

		case 13:
			adLocation = 'atf';
			adSize='300x250';
			break;

		case 9:// 9 and 10 merge to form the new 3, which is a 300x250
			adLocation = 'btf';
			adSize='300x250';
			break;

		default:
			return 1;
	}
/*
ad.doubleclick.net/adj/y2m.mtvi/cpstaging4/sports/atf;gw=cpstaging4;sec_0=sports;pos=atf;u=|gw-cpstaging4|sec_0-sports|pos-atf|;dcopt=ist;tile=1;sz=728x90;ord=2012144804384422?
*/
	document.write('<scr' + 'ipt language="JavaScript" src="http://ad.doubleclick.net/adj/y2m.mtvi/' + dart_paper_name+ '/' + dart_primary_section + '/' + adLocation + ';gw=' + dart_paper_name + ';sec_0=' + dart_primary_section + ';pos=' + adLocation + ';u=|gw-' + dart_paper_name + '|sec_0-' + dart_primary_section + '|pos-' + adLocation + '|;' + vchDcopt + 'tile=' + dart_tileNumber + ';sz=' + adSize + ';ord=' + dart_ord + '?" type="text/javascript"></scr' + 'ipt>');
	dart_tileNumber++;

	return adDisplayed;
}

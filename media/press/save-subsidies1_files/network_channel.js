// Search Engine Submit
function sesubmit() {
	a = document.cpsearch;					

	document.cpsearch.submit();
	
}

function showhide_search(){
			
		var cptoggle = document.getElementById('net_search_choose_options').className;

		if (cptoggle == 'show'){
			document.getElementById('net_search_choose_options').className="hide";
			document.getElementById('net_search_choose_link').className="unselected";
		}
		else{
			document.getElementById('net_search_choose_options').className="show";
			document.getElementById('net_search_choose_link').className="selected";
			document.getElementById('net_cp_nav_list').className="hide";
			document.getElementById('net_cp_a').className="unselected";
		}
}

function showhide_links(){
		var cptoggle = document.getElementById('net_cp_nav_list').className;

		if (cptoggle == 'show'){
			document.getElementById('net_cp_nav_list').className="hide";
			document.getElementById('net_cp_a').className="unselected";
		}
		else{
			document.getElementById('net_cp_nav_list').className="show";
			document.getElementById('net_cp_a').className="selected";
			document.getElementById('net_search_choose_options').className="hide";
			document.getElementById('net_search_choose_link').className="unselected";
		}
}

function change_search_this() {

		var a = document.cpsearch;	
		
		document.getElementById('net_search_choose_options').className="hide";
		document.getElementById('net_search_choose_link').className="unselected";
		
		a.action='/home/index.cfm';
}

function change_search_google() {
	
		var a = document.cpsearch;
		
		document.getElementById('net_search_choose_options').className="hide";
		document.getElementById('net_search_choose_link').className="unselected";
		
		a.action='http://www.google.com/custom';
}
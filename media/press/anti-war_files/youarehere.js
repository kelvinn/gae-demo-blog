YouAreHere = function(element) {
    var login = document.getElementById('cp_tab_login');
    var verify = document.getElementById('cp_tab_verify');
    var loginBox = document.getElementById('cp_box_login');
    var verifyBox = document.getElementById('cp_box_verify');
    var tabHeader = document.getElementById('cp_tab_header');
    var emailBox = document.getElementById('email');
	var usernameBox = document.getElementById('username');
	
    if (element == 'cp_tab_login') {
      login.className = 'cp_active';
      verify.className = '';
      loginBox.className = 'cp_show';
      verifyBox.className = 'cp_hide';
	  usernameBox.focus();
    }
    if (element == 'cp_tab_verify') {
      verify.className = 'cp_active';
      login.className = '';
      loginBox.className = 'cp_hide';
      verifyBox.className = 'cp_show';
	  emailBox.focus();
    }
}
function greyoutbox(theformbutton) {
	theformbutton.disabled = 1;
}
// UDMv4.5 //
///////////////////////////////////////////////////////////////////
var um={'menuClasses':[],'itemClasses':[],'menuCode':[]};
///////////////////////////////////////////////////////////////////
//                                                               //
//  ULTIMATE DROP DOWN MENU Version 4.5 by Brothercake          //
//  http://www.udm4.com/                                         //
//                                                               //
//  This script may not be used or distributed without license   //
//                                                               //
///////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////////
// CORE CONFIGURATION                                            //
///////////////////////////////////////////////////////////////////


//path to images folder
um.baseSRC = "/lib/js/udm-resources/";


//initialization trigger element ["id"];
um.trigger = "";


//navbar orientation
um.orientation = [
	"popup",	// alignment ["vertical"|"horizontal"|"popup"|"expanding"]
	"left",		// h align ["left"|"right"]
	"top",		// v align ["top"|"bottom"]
	"absolute",	// positioning ["relative"|"absolute"|"fixed"|"allfixed"]
	"0",	// x position ["em"|"ex"|"px"|"0"]
	"0",	// y position ["em"|"ex"|"px"|"0"]
	"1000",		// z order ["0" to "10000"] (menu takes 20000 headroom)
	];


//navbar list output
um.list = [
	"flexible",	// horizontal overflow ["rigid"|"flexible"]
	"yes",		// -SPARE-
	"no", 		// -SPARE-
	];


//menu behaviors
um.behaviors = [
	"200",		// open timer ["milliseconds"|"0"]
	"500",		// close timer ["milliseconds"|"never"|"0"]
	"yes",		// reposition menus to stay inside the viewport ["yes"|"no"]
	"default",	// manage windowed controls for win/ie ["default","hide","iframe","none"]
	];


//reset behaviors
um.reset = [
	"yes",		// reset from document mouse click ["yes"|"no"]
	"yes",		// reset from window resize ["yes"|"no"]
	"yes",		// reset from text resize ["yes"|"no"]
	"no",		// reset after following link ["yes"|"no"]
	];


//horizontal continuation strip
um.hstrip = [
	"none",		// background ["color"|"#hex"|"rgb()"|"image.gif"|"none"]
	"yes",		// copy navbar item margin-right to margin-bottom ["yes"|"no"]
	];




///////////////////////////////////////////////////////////////////
// MODULE SETTINGS                                               //
///////////////////////////////////////////////////////////////////


//keyboard navigation [comment out or remove if not using]
um.keys = [
	"38",		// up ["n"] ("38" = up arrow key)
	"39",		// right ["n"] ("39" = right arrow key)
	"40",		// down ["n"] ("40" = down arrow key)
	"37",		// left ["n"] ("37" = left arrow key)
	"123",		// hotkey ["n"] ("38" = F12]
	"none",		// hotkey modifier ["none"|"shiftKey"|"ctrlKey"|"altKey"|"metaKey"]
	"27",		// escape ["n"|"none"] ("27" = escape key)
	"document.getElementsByTagName('a')[0]", // exit focus ["js-expression"]
	];




///////////////////////////////////////////////////////////////////
// NAVBAR DEFAULT STYLES                                         //
///////////////////////////////////////////////////////////////////


//styles which apply to the navbar
um.navbar = [
	"0",		// nav -> menu x-offset (+-)["n" pixels]
	"0",		// nav -> menu y-offset (+-)["n" pixels]
	"7.5em",	// width ["em"|"ex"|"px"] (vertical navbar only - horizontal navbar items have "auto" width) ("%" doesn't work right)
	];


//styles which apply to each navbar item
um.items = [
	"0",		// margin between items ["n" pixels]
	"1",		// border size ["n" pixels] (single value only)
	"separate",	// border collapse ["collapse"|"separate"] (only applies when margin = "0")
	"#D9EFF3 #FFFFFF #D9EFF3 #D9EFF3",// border colors ["color"|"#hex"|"rgb()"] (single, double or four values)
	"solid",	// border styles ["solid"|"double"|"dotted"|"dashed"|"groove"|"ridge"|"inset"|"outset"] (single, double or four values; be careful with using "none")
	"#D9EFF3 #FFFFFF #D9EFF3 #D9EFF3",// hover/focus border colors ["color"|"#hex"|"rgb()"] (single, double or four values)
	"solid",	// hover/focus border styles ["solid"|"double"|"dotted"|"dashed"|"groove"|"ridge"|"inset"|"outset"] (single, double or four values; be careful with using "none")
	"#D9EFF3 #FFFFFF #D9EFF3 #D9EFF3",// visited border colors ["color"|"#hex"|"rgb()"] (single, double or four values)
	"solid",// visited border styles ["solid"|"double"|"dotted"|"dashed"|"groove"|"ridge"|"inset"|"outset"] (single, double or four values; be careful with using "none")
	"10",		// left/right padding ["n" pixels] (single value only)
	"7",		// top/bottom padding ["n" pixels] (single value only)
	"#D9EFF3",		// background ["color"|"#hex"|"rgb()"|"image.gif"]
	"#C1E4EB",		// hover/focus background ["color"|"#hex"|"rgb()"|"image.gif"]
	"#D9EFF3",		// visited background ["color"|"#hex"|"rgb()"|"image.gif"]
	"19px",		// font size ["em"|"ex"|"%"|"px"|"pt"|"absolute-size"|"relative-size"]
	"Garamond,serif",// font family ["font1,font2,font3"] (always end with a generic family name)
	"normal",		// font weight ["normal"|"bold"|"bolder"|"lighter|"100" to "900"]
	"none",		// text decoration ["none"|"underline"|"overline"|"line-through"]
	"center",		// text-align ["left"|"right"|"center"]
	"#3D3D2D",	// color ["color"|"#hex"|"rgb()"]
	"#3D3D2D",	// hover/focus color ["color"|"#hex"|"rgb()"]
	"#3D3D2D",	// visited color ["color"|"#hex"|"rgb()"]
	"normal",	// font-style ["normal"|"italic"|"oblique"]
	"normal",	// hover/focus font-style ["normal"|"italic"|"oblique"]
	"normal",	// visited font-style ["normal"|"italic"|"oblique"]
	"",// additional link CSS (careful!)
	"",		// additional hover/focus CSS (careful!)
	"",		// additional visited CSS (careful!)
	"none",// menu indicator character/image ["text"|"image.gif"|"none"]
	"none",// menu indicator rollover character/image ["text"|"image.gif"|"none"] (must be same type)
	"7",		// clipping width of indicator image ["n" pixels] (only when using image arrows)
	"..",		// alt text of indicator image ["text"] (only when using image arrows)
	];




///////////////////////////////////////////////////////////////////
// MENU DEFAULT STYLES                                           //
///////////////////////////////////////////////////////////////////


//styles which apply to each menu
um.menus = [
	"0",		// menu -> menu x-offset (+-)["n" pixels]
	"0",		// menu -> menu y-offset (+-)["n" pixels]
	"0",		// border size ["n" pixels] (single value only)
	"#D9EFF3 #FFFFFF #D9EFF3 #D9EFF3",// border colors ["color"|"#hex"|"rgb()"] (single, double or four values)
	"solid",	// border styles ["solid"|"double"|"dotted"|"dashed"|"groove"|"ridge"|"inset"|"outset"] (single, double or four values; be careful with using "none")
	"154px",	// width ["em"|"ex"|"px"]
	"0",		// padding ["n" pixels] (single value only)
	"none",	// background ["color"|"#hex"|"rgb()"|"image.gif"]
	"",		// additional menu CSS (careful!) (you can use a transition here but *not* a static filter)
	"none",// shadow background ["color"|"#hex"|"rgb()"|"image.gif"|"none"]
	"0",		// shadow offset (+-) ["em"|"px"|"pt"|"%"|"0"]
	"filter:alpha(opacity=50);",// additional shadow layer CSS (if you use a Microsoft.Shadow filter here then Win/IE5.5+ will do that *instead* of default shadow)
	];


//styles which apply to each menu item
um.menuItems = [
	"0",		// margin around items ["n" pixels] (single value only; margins are like table cellspacing)
	"1",		// border size ["n" pixels] (single value only)
	"collapse",	// border collapse ["collapse"|"separate"] (only applies when margin = "0")
	"#bcbcb7",	// border colors ["color"|"#hex"|"rgb()"] (single, double or four values)
	"solid",	// border styles ["solid"|"double"|"dotted"|"dashed"|"groove"|"ridge"|"inset"|"outset"] (single, double or four values; be careful with using "none")
	"#bcbcb7",		// hover/focus border colors ["color"|"#hex"|"rgb()"] (single, double or four values)
	"solid",	// hover/focus border styles ["solid"|"double"|"dotted"|"dashed"|"groove"|"ridge"|"inset"|"outset"] (single, double or four values; be careful with using "none")
	"#bcbcb7",	// visited border colors ["color"|"#hex"|"rgb()"] (single, double or four values)
	"solid",	// visited border styles ["solid"|"double"|"dotted"|"dashed"|"groove"|"ridge"|"inset"|"outset"] (single, double or four values; be careful with using "none")
	"10",		// left/right padding ["n" pixels] (single value only)
	"4",		// top/bottom padding ["n" pixels] (single value only)
	"#e5e5dc",	// background ["color"|"#hex"|"rgb()"|"image.gif"]
	"#bcbcb7",	// hover/focus background ["color"|"#hex"|"rgb()"|"image.gif"]
	"#e5e5dc",	// visited background ["color"|"#hex"|"rgb()"|"image.gif"]
	"11px",		// font size ["em"|"ex"|"%"|"px"|"pt"|"absolute-size"|"relative-size"]
	"Verdana,sans-serif",// font family ["font1,font2,font3"] (always end with a generic family name)
	"normal",	// font weight ["normal"|"bold"|"bolder"|"lighter|"100" to "900"]
	"none",		// text decoration ["none"|"underline"|"overline"|"line-through"]
	"left",		// text-align ["left"|"right"|"center"]
	"#3D3D2D",		// color ["color"|"#hex"|"rgb()"]
	"#3D3D2D",		// hover/focus color ["color"|"#hex"|"rgb()"]
	"#3D3D2D",		// visited color ["color"|"#hex"|"rgb()"]
	"normal",	// font-style ["normal"|"italic"|"oblique"]
	"normal",	// hover/focus font-style ["normal"|"italic"|"oblique"]
	"normal",	// visited font-style ["normal"|"italic"|"oblique"]
	"",		// additional link CSS (careful!)
	"",		// additional hover/focus CSS (careful!)
	"",		// additional visited CSS (careful!)
	">",// submenu indicator character/image ["text"|"image.gif"|"none"]
	">",// submenu indicator rollover character/image ["text"|"image.gif"|"none"] (must be the same type)
	"3",		// clipping width of indicator image ["n" pixels] (only when using image arrows)
	"..",		// alt text of indicator image ["text"] (only when using image arrows)
	];

//open menu with given ID
function openMenu(menuID,linkObj)
{
    //if the menu code is ready
    if(um.ready)
    {
        //find co-ordinates of link object
        var coords = {
            'x' : um.getRealPosition(linkObj,'x'),
            'y' : um.getRealPosition(linkObj,'y')
            };

        //increase y-position to place it below the link
        coords.y += (linkObj.offsetHeight + 7);

        //activate menu at returned co-ordinates
        um.activateMenu(menuID, coords.x + 'px', coords.y + 'px');
    }
}

//close menu with given ID
function closeMenu(menuID)
{
    //if the menu code is ready
    if(um.ready)
    {
        //deactive menu
        um.deactivateMenu(menuID);
    }
}

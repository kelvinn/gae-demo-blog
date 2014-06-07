document.write('<!-- Template Id = 1 Template Name = Banner Creative (Flash) -->\n<!-- Copyright 2002 DoubleClick Inc., All rights reserved. --><script src=\"http://m1.2mdn.net/879366/flashwrite_1_2.js\"><\/script>');document.write('\n');
 
var dcswf = "http://m1.2mdn.net/1381192/sta_m620_c4_300x250_39k_3.swf"; 
var dcgif = "http://m1.2mdn.net/1381192/sta_m620_c4_300x250_39k_3.gif"; 
var advurl = "http://ad.doubleclick.net/click%3Bh=v8/3571/3/0/%2a/q%3B107323644%3B0-0%3B0%3B17379675%3B4307-300/250%3B21283847/21301739/1%3Bu%3D|gw-PortlandStateUniversity_941|sec_0-home|pos-btf|%3B%7Efdr%3D107396369%3B0-0%3B0%3B15944633%3B4307-300/250%3B21302489/21320379/1%3Bu%3D|gw-PortlandStateUniversity_941|sec_0-home|pos-btf|%3B%7Esscs%3D%3fhttp://www.samsungmobileusa.com/upstage";
var dcadvurl = escape(advurl);
var dcminversion = 6;
var dcmaxversion = 9;
var plugin = false;
var dccreativewidth = "300";
var dccreativeheight = "250";
var dcwmode = "opaque";
var dcbgcolor = "";

if (((navigator.appName == "Netscape") && (navigator.userAgent.indexOf("Mozilla") != -1) && (parseFloat(navigator.appVersion) >= 4) && (navigator.javaEnabled()) && navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"] && navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin)) {
var plugname=navigator.plugins['Shockwave Flash'].description;var plugsub=plugname.substring(plugname.indexOf("."),-1); var plugsubstr=plugsub.substr(-1)
if( plugsubstr >= dcminversion) { plugin = true;}
}
else if (navigator.userAgent && navigator.userAgent.indexOf("MSIE")>=0 && (navigator.userAgent.indexOf("Opera")<0) && (navigator.userAgent.indexOf("Windows 95")>=0 || navigator.userAgent.indexOf("Windows 98")>=0 || navigator.userAgent.indexOf("Windows NT")>=0) && document.all) 
{
document.write('<script language=VBScript>' + '\n' +
   'dcmaxversion = '+dcmaxversion + '\n' +
   'dcminversion = '+dcminversion + '\n' +
   'Do' + '\n' +
    'On Error Resume Next' + '\n' +
    'plugin = (IsObject(CreateObject(\"ShockwaveFlash.ShockwaveFlash.\" & dcmaxversion & \"\")))' + '\n' +
    'If plugin = true Then Exit Do' + '\n' +
    'dcmaxversion = dcmaxversion - 1' + '\n' +
    'Loop While dcmaxversion >= dcminversion' + '\n' +
  '<\/script>');
}
if ( plugin )  {
 adcode = '<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+
  ' ID=FLASH_AD WIDTH="'+ dccreativewidth +'" HEIGHT="'+ dccreativeheight +'">'+
  '<PARAM NAME=movie VALUE="' + dcswf + '?clickTag='+ dcadvurl +'"><PARAM NAME=quality VALUE=high><PARAM NAME=bgcolor VALUE=#'+ dcbgcolor +'><PARAM NAME=wmode VALUE='+ dcwmode +'><PARAM NAME="AllowScriptAccess" VALUE="always">'+
  '<EMBED src="' + dcswf + '?clickTag='+ dcadvurl +'" quality=high wmode='+dcwmode+
  ' swLiveConnect=TRUE WIDTH="'+ dccreativewidth +'" HEIGHT="'+ dccreativeheight +'" bgcolor=#'+ dcbgcolor+
  ' TYPE="application/x-shockwave-flash" AllowScriptAccess="always"></EMBED></OBJECT>';
if(('j'!="j")&&(typeof dclkFlashWrite!="undefined")){dclkFlashWrite(adcode);}else{document.write(adcode);}
} else {
 document.write('<A TARGET="_top" HREF="http://ad.doubleclick.net/click%3Bh=v8/3571/3/0/%2a/q%3B107323644%3B0-0%3B0%3B17379675%3B4307-300/250%3B21283847/21301739/1%3Bu%3D|gw-PortlandStateUniversity_941|sec_0-home|pos-btf|%3B%7Efdr%3D107396369%3B0-0%3B0%3B15944633%3B4307-300/250%3B21302489/21320379/1%3Bu%3D|gw-PortlandStateUniversity_941|sec_0-home|pos-btf|%3B%7Esscs%3D%3fhttp://www.samsungmobileusa.com/upstage"><IMG SRC="' + dcgif + '" BORDER=0></A>');
}
//-->
document.write('<NOSCRIPT><A TARGET=\"_top\" HREF=\"http://ad.doubleclick.net/click%3Bh=v8/3571/3/0/%2a/q%3B107323644%3B0-0%3B0%3B17379675%3B4307-300/250%3B21283847/21301739/1%3Bu%3D|gw-PortlandStateUniversity_941|sec_0-home|pos-btf|%3B%7Efdr%3D107396369%3B0-0%3B0%3B15944633%3B4307-300/250%3B21302489/21320379/1%3Bu%3D|gw-PortlandStateUniversity_941|sec_0-home|pos-btf|%3B%7Esscs%3D%3fhttp://www.samsungmobileusa.com/upstage\"><IMG SRC=\"http://m1.2mdn.net/1381192/sta_m620_c4_300x250_39k_3.gif\" BORDER=0></A></NOSCRIPT>');

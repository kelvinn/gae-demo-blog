if (typeof sectioncategory=="undefined" || sectioncategory == '') {
	var spryregex = "//item [collegepublisher:papername!='" + paper_name + "']";
	var spryregexlocal = "//item";
	var nationalcategoryname = 'Top Stories';
} else {
	var spryregex = "//item [collegepublisher:papername!='" + paper_name + "']";
	var spryregexlocal = "//item [collegepublisher:sectioncategory='" + sectioncategory + "']";
	//var spryregexlocal = "//item [collegepublisher:sectioncategory='" + sectioncategory + "' and collegepublisher:papername!='Northeastern News']";
	var nationalcategoryname = sectioncategory;
}

switch (nationalcategoryname) {
	
	case ("Sports"):
	 rssfilename = '76242771-1e0a-4afb-a06e-357ebd180320';
		collegeheadlineslink = 'channel/index.cfm?event=section&uglobal_section_id=' + rssfilename;
		break;
	case ("Campus News"):
	  rssfilename = '885de8be-9d29-405f-9cf1-a15a527b43d6';
  		collegeheadlineslink = 'channel/index.cfm?event=section&uglobal_section_id=' + rssfilename;
		break;
	case ("Arts/Entertainment"):
	 rssfilename = 'a610293f-66e8-4113-94d1-48e7758fee16';
	 collegeheadlineslink = 'channel/index.cfm?event=section&uglobal_section_id=' + rssfilename;
		break;
	case ("City/Metro"):
	 rssfilename = '44f657f4-0a38-4680-a4c9-2edae0bbe0ed';
	 collegeheadlineslink = 'channel/index.cfm?event=section&uglobal_section_id=' + rssfilename;
		break;
	case ("Features/Campus Life"):
	  rssfilename = 'd1da40af-509e-499f-9e91-53a10fc49dda';
	  collegeheadlineslink = 'channel/index.cfm?event=section&uglobal_section_id=' + rssfilename;
		break;
	case ("Opinion/Editorial"):
	 rssfilename = '5453e5f7-d9fd-464e-9c70-621d07899ade';
	 collegeheadlineslink = 'channel/index.cfm?event=section&uglobal_section_id=' + rssfilename;
		break;
	case ("Police Blotter"):
	 rssfilename = 'bcce18b6-354e-4402-b6c5-1e03cd408326';
	 collegeheadlineslink = 'channel/index.cfm?event=section&uglobal_section_id=' + rssfilename;
		break;
	case ("Other"):
	 rssfilename = 'b801975b-edc0-48e7-b967-e5abdaae5bb9';
	 collegeheadlineslink = 'channel/index.cfm?event=section&uglobal_section_id=' + rssfilename;
		break;
	case ("vatech"):
	  	rssfilename = 'vatech';
		collegeheadlineslink = 'channel/index.cfm?event=vatech';
		break;
	default:
		rssfilename = 'nationalmostpopular';
		collegeheadlineslink = 'channel/index.cfm?event=collegeheadlines';
		break;
	
}

/* Default the spry datasets with null URL's and regular expressions. */
var dsArticles = new Spry.Data.XMLDataSet(null, spryregexlocal, {useCache:true});
var dsArticlesNationalNew = new Spry.Data.XMLDataSet(null, spryregex, {useCache:true});
var dsArticlesNational = new Spry.Data.XMLDataSet(null, spryregex, {useCache:true});
var dsArticlesvatech = new Spry.Data.XMLDataSet(null, "//item", {useCache:true});


 
 
 

/* This listens for new tab click notifications and then fires up spry. */
function tabClickedListener(indexclicked) {
	switch (indexclicked) {
		case (5):
			if (dsArticles.getURL() == null) {
				dsArticles.setURL("http://" + origserver + "/media/paper" + paper_id + "/template/articles.rss");
				dsArticles.loadData();
			}
			break;
		case (6):
			if (dsArticlesNational.getURL() == null) {
				dsArticlesNational.setURL("http://" + origserver + "/channel/rssfeed/zip/" + paperzip + "/");
				dsArticlesNational.loadData();
			}
			break;
		case (7):
			if (dsArticlesNationalNew.getURL() == null) {
				dsArticlesNationalNew.setURL("http://" + origserver + "/media/syndication/collegeheadlines/"+rssfilename+".rss");
				dsArticlesNationalNew.loadData();
			}
			break;
		case (-1):
			if (dsArticlesvatech.getURL() == null) {
				dsArticlesvatech.setURL("http://" + origserver + "/media/syndication/collegeheadlines/vatech.rss");
				dsArticlesvatech.loadData();
			}
			break;
		default:
			break;
	}
	
}

document.write('<div id="slider2_wrap">');
document.write('	<div class="pagination_wrap">');
document.write('		<div class="pagination" id="paginate-slider2">');
document.write('		<ul>');

	
		document.write('			<li><a title="Most Commented" id="tab_mc" class="" href="#" onclick="ContentSlider.turnpage(\'slider2\', 0); return false"><span>Most&nbsp;Commented</span></a></li>');		
		

	
		document.write('			<li><a title="Most Popular" id="tab_mp" class="" href="#" onclick="ContentSlider.turnpage(\'slider2\', 1); return false"><span>Most&nbsp;Popular</span></a></li>');
		

	
		document.write('			<li><a title="Most Emailed" id="tab_me" class="" href="#" onclick="ContentSlider.turnpage(\'slider2\', 2); return false"><span>Most&nbsp;Emailed</span></a></li>');
		

	
		document.write('			<li><a title="Message Board" id="tab_mb" class="" href="#" onclick="ContentSlider.turnpage(\'slider2\', 3); return false"><span>Message&nbsp;Board</span></a></li>');
		

	
		document.write('			<li><a title="Podcasts" id="tab_pc" class="" href="#" onclick="ContentSlider.turnpage(\'slider2\', 4); return false"><span>Podcasts</span></a></li>');
		

	
		document.write('			<li><a title="Current Issue Content" id="tab_ci" class="" href="#" onclick="ContentSlider.turnpage(\'slider2\', 5); return false"><span>Current&nbsp;Issue&nbsp;Content</span></a></li>');
		

	
		document.write('			<li><a title="Nearby Popular Content" id="tab_rc" class="" href="#" onclick="ContentSlider.turnpage(\'slider2\', 6); return false"><span>Nearby&nbsp;Popular&nbsp;Content</span></a></li>');
		

	
		document.write('			<li><a title="National Popular Content" id="tab_nc" class="" href="#" onclick="ContentSlider.turnpage(\'slider2\', 7); return false"><span>National&nbsp;Popular&nbsp;Content</span></a></li>');
		




//document.write('			<li><a rel="2" href="#" class="pagination_next" style="font-weight: bold;" onclick="ContentSlider.turnpage(\'slider2\', parseInt(this.getAttribute(\'rel\'))); return false"><img src="http://media.collegepublisher.com/media/assets/icons/fff/control_end.png" border="0" /></a></li>');
document.write('		  </ul>');
document.write('		<div style="clear: left;"></div>');
document.write('		</div>');
document.write('	</div>');
document.write('	<div class="lead_wrap">');
document.write('		<div id="slider2" class="contentslide">');




document.write('<div style="display: none;" class="contentdiv">');
document.write('	<div class="contentdiv_scroller">');
document.write('		<h3>Most Recently Commented</h3>				');

document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/ArtsAndCulture/Looking.Inside.The.Human.Body-2913155.shtml?reffeature=recentlycommentedstoriestab" class="popularStory"><div class=" RSSItemListRow">Looking inside the human body (1)</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/05/News/Tuition.Fees.Could.Increase.Up.To.10.Percent-2911796.shtml?reffeature=recentlycommentedstoriestab" class="popularStory"><div class="FlippyEvenRow RSSItemListRow">Tuition, fees could increase up to 10 percent (2)</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/05/Opinion/God-Puts.Scientists.Out.Of.Work-2911813.shtml?reffeature=recentlycommentedstoriestab" class="popularStory"><div class=" RSSItemListRow">God puts scientists out of work (8)</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/05/News/Panel.Tackles.Consensual.Relationships-2911798.shtml?reffeature=recentlycommentedstoriestab" class="popularStory"><div class="FlippyEvenRow RSSItemListRow">Panel tackles consensual relationships (2)</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/05/News/Food-For.Thought.Cafe.May.Accept.Meal.Plan.Dollars-2911797.shtml?reffeature=recentlycommentedstoriestab" class="popularStory"><div class=" RSSItemListRow">Food for Thought Cafe may accept meal plan dollars (3)</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/01/Sports/Ways-To.Fix.The.Nba.Playoffs.Dreary.Days-2910931.shtml?reffeature=recentlycommentedstoriestab" class="popularStory"><div class="FlippyEvenRow RSSItemListRow">Ways to fix the NBA playoffs\' dreary days (1)</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/01/Opinion/Lets-Make.Polygamy.Legal-2910948.shtml?reffeature=recentlycommentedstoriestab" class="popularStory"><div class=" RSSItemListRow">Let\'s make polygamy legal (7)</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/01/Opinion/Reflection.On.The.Election-2910942.shtml?reffeature=recentlycommentedstoriestab" class="popularStory"><div class="FlippyEvenRow RSSItemListRow">Reflection on the election (1)</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/01/News/The-President.Speaks-2910961.shtml?reffeature=recentlycommentedstoriestab" class="popularStory"><div class=" RSSItemListRow">The president speaks (1)</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/01/Sports/Football.Schedule-2910930.shtml?reffeature=recentlycommentedstoriestab" class="popularStory"><div class="FlippyEvenRow RSSItemListRow">Football schedule (1)</div></a>');

			
document.write('	</div>');
document.write('	<div class="linkbar">');
document.write('		Select an article from the above list');
document.write('	</div>');
document.write('</div>');
		


document.write('<div style="display: none;" class="contentdiv">');
document.write('	<div class="contentdiv_scroller">');
document.write('		<h3>Most Popular</h3>				');

document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/Graduation2007/Graduation.2007-2913297.shtml?reffeature=popuarstoriestab" class="popularStory"><div class=" RSSItemListRow">Graduation 2007</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/Sports/Bringing.The.Man.In.Black.To.The.Park.Blocks-2913188.shtml?reffeature=popuarstoriestab" class="popularStory"><div class="FlippyEvenRow RSSItemListRow">Bringing the man in black to the Park Blocks</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/News/No.Sign.Of.Home-2913230.shtml?reffeature=popuarstoriestab" class="popularStory"><div class=" RSSItemListRow">No sign of home</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/Opinion/Screwing.You.An.Ode.To.Prostitution.And.Brothels-2913180.shtml?reffeature=popuarstoriestab" class="popularStory"><div class="FlippyEvenRow RSSItemListRow">Screwing you: an ode to prostitution and brothels</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/Sports/Taking.The.Right.Steps-2913227.shtml?reffeature=popuarstoriestab" class="popularStory"><div class=" RSSItemListRow">Taking the right steps</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/ArtsAndCulture/Looking.Inside.The.Human.Body-2913155.shtml?reffeature=popuarstoriestab" class="popularStory"><div class="FlippyEvenRow RSSItemListRow">Looking inside the human body</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/Sports/Football.Looks.To.Glanville.For.Hope-2913192.shtml?reffeature=popuarstoriestab" class="popularStory"><div class=" RSSItemListRow">Football looks to Glanville for hope</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/News/Former.Administrator.Named.Interim.President-2913435.shtml?reffeature=popuarstoriestab" class="popularStory"><div class="FlippyEvenRow RSSItemListRow">Former administrator named interim president</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/ArtsAndCulture/Cant-Say.It.With.Love.Try.Hate-2913149.shtml?reffeature=popuarstoriestab" class="popularStory"><div class=" RSSItemListRow">Can\'t say it with love? Try hate</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/Opinion/Light.Up.For.The.Kids-2913179.shtml?reffeature=popuarstoriestab" class="popularStory"><div class="FlippyEvenRow RSSItemListRow">Light up for the kids!</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/ArtsAndCulture/Oceans.13.Is.Forgettable.Fun-2913167.shtml?reffeature=popuarstoriestab" class="popularStory"><div class=" RSSItemListRow"><i>Ocean\'s 13</i> is forgettable fun</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/Opinion/Affirmative.Action-2913181.shtml?reffeature=popuarstoriestab" class="popularStory"><div class="FlippyEvenRow RSSItemListRow">Affirmative action</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/Sports/A.Season.To.Remember-2913217.shtml?reffeature=popuarstoriestab" class="popularStory"><div class=" RSSItemListRow">A season to remember</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/News/Students.Faculty.WeighIn.Win.Big.In.Biggest.Loser-2913238.shtml?reffeature=popuarstoriestab" class="popularStory"><div class="FlippyEvenRow RSSItemListRow">Students, faculty weigh-in, win big in Biggest Loser</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/Opinion/God-Wars-2913184.shtml?reffeature=popuarstoriestab" class="popularStory"><div class=" RSSItemListRow">God Wars</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/Graduation2007/The-Year.In.Review-2913274.shtml?reffeature=popuarstoriestab" class="popularStory"><div class="FlippyEvenRow RSSItemListRow">The year in review</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/Sports/The-State.Of.Portland.State.Athletics-2913223.shtml?reffeature=popuarstoriestab" class="popularStory"><div class=" RSSItemListRow">The state of Portland State athletics</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/Graduation2007/Dear-President.Bernstine-2913270.shtml?reffeature=popuarstoriestab" class="popularStory"><div class="FlippyEvenRow RSSItemListRow">Dear President Bernstine</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/Graduation2007/John-Eliot.Awards-2913295.shtml?reffeature=popuarstoriestab" class="popularStory"><div class=" RSSItemListRow">John Eliot Awards</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/Sports/More-Than.An.Interim-2913219.shtml?reffeature=popuarstoriestab" class="popularStory"><div class="FlippyEvenRow RSSItemListRow">More than an interim</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/News/Crime.Blotter-2913246.shtml?reffeature=popuarstoriestab" class="popularStory"><div class=" RSSItemListRow">Crime Blotter</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/News/Psu-Engineering.Faculty.Granted.1.Million-2913244.shtml?reffeature=popuarstoriestab" class="popularStory"><div class="FlippyEvenRow RSSItemListRow">PSU engineering faculty granted $1 million</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/Graduation2007/The-Changing.Administration-2913284.shtml?reffeature=popuarstoriestab" class="popularStory"><div class=" RSSItemListRow">The changing administration</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/News/Traffic.Delays.Expected.During.June.Green.Line.Construction-2913233.shtml?reffeature=popuarstoriestab" class="popularStory"><div class="FlippyEvenRow RSSItemListRow">Traffic delays expected during June Green Line construction</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/Graduation2007/All-About.Commencement-2913269.shtml?reffeature=popuarstoriestab" class="popularStory"><div class=" RSSItemListRow">All about commencement</div></a>');

			
document.write('	</div>');
document.write('	<div class="linkbar">');
document.write('		Select an article from the above list');
document.write('	</div>');
document.write('</div>');
		


document.write('<div style="display: none;" class="contentdiv">');
document.write('	<div class="contentdiv_scroller">');
document.write('		<h3>Most Emailed</h3>				');

document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/Graduation2007/Dear-President.Bernstine-2913270.shtml?reffeature=mostemailedtab" class="popularStory"><div class=" RSSItemListRow">Dear President Bernstine</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/ArtsAndCulture/Looking.Inside.The.Human.Body-2913155.shtml?reffeature=mostemailedtab" class="popularStory"><div class="FlippyEvenRow RSSItemListRow">Looking inside the human body</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/News/No.Sign.Of.Home-2913230.shtml?reffeature=mostemailedtab" class="popularStory"><div class=" RSSItemListRow">No sign of home</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/Graduation2007/Staff.To.Be.Honored.At.Graduation-2913291.shtml?reffeature=mostemailedtab" class="popularStory"><div class="FlippyEvenRow RSSItemListRow">Staff to be honored at graduation</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/Graduation2007/The-Changing.Administration-2913284.shtml?reffeature=mostemailedtab" class="popularStory"><div class=" RSSItemListRow">The changing administration</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/Graduation2007/The-Year.In.Review-2913274.shtml?reffeature=mostemailedtab" class="popularStory"><div class="FlippyEvenRow RSSItemListRow">The year in review</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/ArtsAndCulture/Cant-Say.It.With.Love.Try.Hate-2913149.shtml?reffeature=mostemailedtab" class="popularStory"><div class=" RSSItemListRow">Can\'t say it with love? Try hate</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/Graduation2007/All-About.Commencement-2913269.shtml?reffeature=mostemailedtab" class="popularStory"><div class="FlippyEvenRow RSSItemListRow">All about commencement</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/Graduation2007/Parting.Wisdom-2913267.shtml?reffeature=mostemailedtab" class="popularStory"><div class=" RSSItemListRow">Parting wisdom</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/Graduation2007/Dealing.With.Debt-2913265.shtml?reffeature=mostemailedtab" class="popularStory"><div class="FlippyEvenRow RSSItemListRow">Dealing with debt</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/ArtsAndCulture/Pictures.with.Words-2913177.shtml?reffeature=mostemailedtab" class="popularStory"><div class=" RSSItemListRow">Pictures (with words)</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/ArtsAndCulture/Harveys.Comedy.Club-2913175.shtml?reffeature=mostemailedtab" class="popularStory"><div class="FlippyEvenRow RSSItemListRow">Harvey\'s Comedy Club</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/ArtsAndCulture/The-Last.The.Street.Savage-2913172.shtml?reffeature=mostemailedtab" class="popularStory"><div class=" RSSItemListRow">The last The Street Savage</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/ArtsAndCulture/Games.Of.Summer-2913170.shtml?reffeature=mostemailedtab" class="popularStory"><div class="FlippyEvenRow RSSItemListRow">Games of summer</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/ArtsAndCulture/Oceans.13.Is.Forgettable.Fun-2913167.shtml?reffeature=mostemailedtab" class="popularStory"><div class=" RSSItemListRow"><i>Ocean\'s 13</i> is forgettable fun</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/ArtsAndCulture/Pull-An.AllNighter-2913157.shtml?reffeature=mostemailedtab" class="popularStory"><div class="FlippyEvenRow RSSItemListRow">Pull an all-nighter</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/Sports/Taking.The.Right.Steps-2913227.shtml?reffeature=mostemailedtab" class="popularStory"><div class=" RSSItemListRow">Taking the right steps</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/Sports/The-State.Of.Portland.State.Athletics-2913223.shtml?reffeature=mostemailedtab" class="popularStory"><div class="FlippyEvenRow RSSItemListRow">The state of Portland State athletics</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/Sports/Softball.Team.Unable.To.Repeat-2913222.shtml?reffeature=mostemailedtab" class="popularStory"><div class=" RSSItemListRow">Softball team unable to repeat</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/Sports/More-Than.An.Interim-2913219.shtml?reffeature=mostemailedtab" class="popularStory"><div class="FlippyEvenRow RSSItemListRow">More than an interim</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/Sports/A.Season.To.Remember-2913217.shtml?reffeature=mostemailedtab" class="popularStory"><div class=" RSSItemListRow">A season to remember</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/Sports/Sophomore.Success-2913213.shtml?reffeature=mostemailedtab" class="popularStory"><div class="FlippyEvenRow RSSItemListRow">Sophomore success</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/Sports/Spiked.Dreams-2913204.shtml?reffeature=mostemailedtab" class="popularStory"><div class=" RSSItemListRow">Spiked dreams</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/Sports/Football.Looks.To.Glanville.For.Hope-2913192.shtml?reffeature=mostemailedtab" class="popularStory"><div class="FlippyEvenRow RSSItemListRow">Football looks to Glanville for hope</div></a>');
document.write('<a href="http://www.dailyvanguard.com/news/2007/06/08/Sports/Bringing.The.Man.In.Black.To.The.Park.Blocks-2913188.shtml?reffeature=mostemailedtab" class="popularStory"><div class=" RSSItemListRow">Bringing the man in black to the Park Blocks</div></a>');

			
document.write('	</div>');
document.write('	<div class="linkbar">');
document.write('		Select an article from the above list');
document.write('	</div>');
document.write('</div>');
		


document.write('<div style="display: none;" class="contentdiv">');
document.write('	<div class="contentdiv_scroller">');
document.write('		<h3>New Message Board Posts</h3>				');

document.write('<a href="http://' + origserver + '/messageboard/index.cfm?event=viewtopic&umessage_id=77e8c746-d5b3-4b9f-bf63-299cbff09455&reffeature=messageboardtab" class="popularStory"><div class=" RSSItemListRow">Dr. Frank Stearns Giese - 7 replies</div></a>');
document.write('<a href="http://' + origserver + '/messageboard/index.cfm?event=viewtopic&umessage_id=a3bf4849-c25f-4133-b217-cf6002723fec&reffeature=messageboardtab" class="popularStory"><div class="FlippyEvenRow RSSItemListRow">$5M Reward - Adnan G. El Shukrijumah - 12 replies</div></a>');
document.write('<a href="http://' + origserver + '/messageboard/index.cfm?event=viewtopic&umessage_id=990ea338-732a-423b-ab8d-184bc141dadf&reffeature=messageboardtab" class="popularStory"><div class=" RSSItemListRow">Bush Demands Iran Release Americans - 0 replies</div></a>');
document.write('<a href="http://' + origserver + '/messageboard/index.cfm?event=viewtopic&umessage_id=0579a69d-74fc-48d2-b3b4-977469106001&reffeature=messageboardtab" class="popularStory"><div class="FlippyEvenRow RSSItemListRow">RUSSIAN MOTIVES - 0 replies</div></a>');
document.write('<a href="http://' + origserver + '/messageboard/index.cfm?event=viewtopic&umessage_id=c49fdd34-eada-40d6-b245-e459036c8a43&reffeature=messageboardtab" class="popularStory"><div class=" RSSItemListRow">Denial of Justice? - 23 replies</div></a>');
document.write('<a href="http://' + origserver + '/messageboard/index.cfm?event=viewtopic&umessage_id=0e7b143e-bbbd-46fd-9b68-c528ebf5e9a0&reffeature=messageboardtab" class="popularStory"><div class="FlippyEvenRow RSSItemListRow">Conspiratorial Tendencies Or Gullibility and Naïveté? - 1 reply</div></a>');
document.write('<a href="http://' + origserver + '/messageboard/index.cfm?event=viewtopic&umessage_id=aca6b1d6-5b27-4725-8d07-e79df40665e6&reffeature=messageboardtab" class="popularStory"><div class=" RSSItemListRow">robert stanely assault case - 0 replies</div></a>');
document.write('<a href="http://' + origserver + '/messageboard/index.cfm?event=viewtopic&umessage_id=f0d109d4-0dcc-4b61-b95f-7780271db6ea&reffeature=messageboardtab" class="popularStory"><div class="FlippyEvenRow RSSItemListRow">street preacher dangerous - 2 replies</div></a>');
document.write('<a href="http://' + origserver + '/messageboard/index.cfm?event=viewtopic&umessage_id=e193d4ac-73c9-4abc-b1c7-8af29515c7dc&reffeature=messageboardtab" class="popularStory"><div class=" RSSItemListRow">Vegan couple gets life over baby\'s death - 0 replies</div></a>');

			
document.write('	</div>');
document.write('	<div class="linkbar">');
document.write('		<a href="http://'+origserver+'/messageboard/index.cfm?reffeature=messageboardtabviewall"><img src="http://media.collegepublisher.com/media/assets/icons/fff/bullet_go.png" border="0" /> View All Message Boards</a>');
document.write('	</div>');
document.write('</div>');
		


document.write('<div style="display: none;" class="contentdiv">');
document.write('	<div class="contentdiv_scroller">');
document.write('		<h3>New Podcasts</h3>				');

document.write('<a title="Flesh Storm" href="http://' + origserver + '/podcasts/index.cfm?event=displaychannel&upodcast_channel_id=22100c14-8d64-4581-be59-7da1a03ce6e7&reffeature=postcasttab" class="popularStory"><div class=" RSSItemListRow">Slayer - 6/6/06</div></a>');

			
				 
			
			
document.write('	</div>');
document.write('	<div class="linkbar">');
document.write('		<a href="http://'+origserver+'/podcasts/index.cfm?reffeature=postcaststabmore"><img src="http://media.collegepublisher.com/media/assets/icons/fff/bullet_go.png" alt="icon" border="0" /> View All Podcast Channels</a>');
document.write('	</div>');
document.write('</div>');
		


document.write('<div style="display: none;" class="contentdiv">');
document.write('	<div class="contentdiv_scroller">');
document.write('		<h3 >Current ' + sectioncategory + ' Stories</h3>				');


document.write('		<div class="syndicationdisplaybox" id="localsyndicationbox">');
document.write('   		<div id="RSSItemsListLocal" spry:region="dsArticles" class="SpryHiddenRegion RSSItemsList">');
document.write('     		<div spry:state="ready" spry:repeat="dsArticles">');
document.write('     			<div spry:choose="spry:choose">');
document.write('     	   		<div spry:when="{ds_RowNumber}%2 != 0" class="FlippyEvenRow RSSItemListRow" onclick="document.location=\'{link}?reffeature=currentstoriestab\';" spry:selectgroup="itemsList" spry:select="SelectedListBoxItem" spry:hover="ListBoxItemHover">');
document.write('       		   	<div class="SubjectColumn" title="{description}">{title}</div>');
document.write('       			</div>');
document.write('           	<div spry:default="spry:default" class="RSSItemListRow" onclick="document.location=\'{link}?reffeature=currentstoriestab\';" spry:selectgroup="itemsList" spry:select="SelectedListBoxItem" spry:hover="ListBoxItemHover">');
document.write('             	<div class="SubjectColumn" title="{description}">{title}</div>');
document.write('           	</div>');
document.write('         	</div>');
document.write('       	</div>');
document.write('				<table spry:state="ready" spry:if="{ds_RowCount} == 0" class="RSSItemListFeedback"><tr><td valign="middle">Feed contains no items.</td></tr></table>');
document.write('				<table spry:state="loading" class="RSSItemListFeedback"><tr><td class="RSSItemListLoading" valign="middle"><img src="/media/assets/images/collegeheadlines/loading.gif" border="0" /></td></tr></table>');
document.write('       	<table spry:state="error" class="RSSItemListFeedback"><tr><td valign="middle">Failed to load feed items.</td></tr></table>');
document.write('     	</div>');
document.write(' 			<div class="ClearAll">&nbsp;</div>');
document.write('		</div>');
document.write('	</div>');

document.write('	<div class="linkbar">');
document.write('		Select an article from the above list');
document.write('	</div>');
document.write('</div>');
		


document.write('<div style="display: none;" class="contentdiv">');
document.write('	<div class="contentdiv_scroller">');

document.write('		<h3>Nearby College ' + nationalcategoryname + '</h3>');

document.write('		<div class="syndicationdisplaybox" id="nationalsyndicationbox">');
document.write('    	<div id="RSSItemsListNational" spry:region="dsArticlesNational" class="SpryHiddenRegion RSSItemsList">');
document.write('        <div spry:state="ready" spry:repeat="dsArticlesNational">');
document.write('          <div spry:choose="spry:choose">');
document.write('            <div spry:when="{ds_RowNumber}%2 != 0" class="FlippyEvenRow RSSItemListRow" onclick="document.location=\'{link}&reffeature=nearbystoriestab\';" spry:selectgroup="itemsList" spry:select="SelectedListBoxItem" spry:hover="ListBoxItemHover">');
document.write('            	<div class="SubjectColumn" title="{description}"><span spry:if="{collegepublisher:ishot} == 1" class="slider2_hot"><strong>Hot Article! </strong></span>{title}<br /> <div class="RSSItemListSchool">{collegepublisher:schoolname}, {collegepublisher:state}</div></div>');
document.write('            </div>');
document.write('            <div spry:default="spry:default" class="RSSItemListRow" onclick="document.location=\'{link}&reffeature=nearbystoriestab\';" spry:selectgroup="itemsList" spry:select="SelectedListBoxItem" spry:hover="ListBoxItemHover">');
document.write('              <div class="SubjectColumn" title="{description}"><span spry:if="{collegepublisher:ishot} == 1" class="slider2_hot"><strong>Hot Article! </strong></span>{title}<br /> <div class="RSSItemListSchool">{collegepublisher:schoolname}, {collegepublisher:state}</div></div>');
document.write('            </div>');
document.write('          </div>');
document.write('        </div>');
document.write('        <table spry:state="ready" spry:if="{ds_RowCount} == 0" class="RSSItemListFeedback"><tr><td valign="middle">Feed contains no items.</td></tr></table>');
document.write('				<table spry:state="loading" class="RSSItemListFeedback"><tr><td class="RSSItemListLoading" valign="middle"><img src="/media/assets/images/collegeheadlines/loading.gif" border="0" /></td></tr></table>');
document.write('        <table spry:state="error" class="RSSItemListFeedback"><tr><td valign="middle">Failed to load feed items.</td></tr></table>');
document.write('     	</div>');
document.write(' 			<div class="ClearAll">&nbsp;</div>');
document.write('		</div>');
document.write('	</div>');

document.write('	<div class="linkbar">');
document.write('		<a href="http://media.' + paper_domain + '/' + collegeheadlineslink + '&zip=' + paperzip + '&reffeature=nearbystoriestabviewall" title="View All Nearby College News"><img src="http://media.collegepublisher.com/media/assets/icons/fff/bullet_go.png" alt="icon" border="0" />View All Nearby College ' + nationalcategoryname + '</a>');
document.write('	</div>');
document.write('</div>');
		


document.write('<div style="display: none;" class="contentdiv">');
document.write('	<div class="contentdiv_scroller">');
document.write('		<h3>National College ' + nationalcategoryname + '</h3>');
document.write('		<div class="syndicationdisplaybox" id="nationalsyndicationboxnew">');
document.write('      <div id="RSSItemsListNationalnew" spry:region="dsArticlesNationalNew" class="SpryHiddenRegion RSSItemsList">');
document.write('        <div spry:state="ready" spry:repeat="dsArticlesNationalNew">');
document.write('          <div spry:choose="spry:choose">');
document.write('            <div spry:when="{ds_RowNumber}%2 != 0" class="FlippyEvenRow RSSItemListRow" onclick="document.location=\'{link}&reffeature=nationalstoriestab\';" spry:selectgroup="itemsList" spry:select="SelectedListBoxItem" spry:hover="ListBoxItemHover">');
document.write('              <div class="SubjectColumn" title="{description}"><span spry:if="{collegepublisher:ishot} == 1" class="slider2_hot"><strong>Hot Article! </strong></span>{title}<br /> <div class="RSSItemListSchool">{collegepublisher:schoolname}, {collegepublisher:state}</div></div>');
document.write('            </div>');
document.write('            <div spry:default="spry:default" class="RSSItemListRow" onclick="document.location=\'{link}&reffeature=nationalstoriestab\';" spry:selectgroup="itemsList" spry:select="SelectedListBoxItem" spry:hover="ListBoxItemHover">');
document.write('              <div class="SubjectColumn" title="{description}"><span spry:if="{collegepublisher:ishot} == 1" class="slider2_hot"><strong>Hot Article! </strong></span>{title}<br /> <div class="RSSItemListSchool">{collegepublisher:schoolname}, {collegepublisher:state}</div></div>');
document.write('            </div>');
document.write('          </div>');
document.write('        </div>');
document.write('        <table spry:state="ready" spry:if="{ds_RowCount} == 0" class="RSSItemListFeedback"><tr><td valign="middle">Feed contains no items.</td></tr></table>');
document.write('        <table spry:state="loading" class="RSSItemListFeedback"><tr><td class="RSSItemListLoading" valign="middle"><img src="/media/assets/images/collegeheadlines/loading.gif" border="0" /></td></tr></table>');
document.write('        <table spry:state="error" class="RSSItemListFeedback"><tr><td valign="middle">Failed to load feed items.</td></tr></table>');
document.write('     	</div>');
document.write(' 			<div class="ClearAll">&nbsp;</div>');
document.write('		</div>');
document.write('	</div>');


document.write('	<div class="linkbar">');
document.write('		<a href="http://media.' + paper_domain + '/' + collegeheadlineslink + '&zip=all&reffeature=nationalstoriestabviewall" title="View All National ' + nationalcategoryname + ' News"><img src="http://media.collegepublisher.com/media/assets/icons/fff/bullet_go.png" alt="icon" border="0" />View All National College ' + nationalcategoryname + '</a>');
document.write('	</div>');
document.write('</div>');
		



document.write('				</div>');
document.write('			</div>');
document.write('	</div>');
// This starts the rotation and sets the duration of tab to the milliseconds defined in the 2nd param.
ContentSlider("slider2", 12000);
$(document).ready(function() {

	var param = window.location.search;

	//todo: fix this to parse params
	if (param == "?toggle=node")
	{
		//makes Node tab active
		$(".tabs-thumb:last-of-type").addClass("is-active").closest(".tabs").find(".tabs-panel:last-of-type").show();

	} else {

		//makes Go tab active
		$(".tabs-thumb:first-of-type").addClass("is-active").closest(".tabs").find(".tabs-panel:first-of-type").show();
	
	}
	
	//on click, shows Node tab and hides Go tab
	$(".tabs-thumb:last-of-type").click(function() {
		
		$(this).closest(".tabs").children().find(".tabs-panel:first-of-type").hide();
	  	$(this).siblings().removeClass("is-active");

	  	$(this).addClass("is-active");
	  	$(this).closest(".tabs").children().find(".tabs-panel:last-of-type").show();

	});

	// on click, shows Go tab and hides Node tab
	$(".tabs-thumb:first-of-type").click(function() {
	  
	  	$(this).closest(".tabs").children().find(".tabs-panel:last-of-type").hide();
	  	$(this).siblings().removeClass("is-active");

	  	$(this).addClass("is-active");
	  	$(this).closest(".tabs").children().find(".tabs-panel:first-of-type").show();

	});

});
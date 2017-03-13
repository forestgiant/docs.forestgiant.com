$(document).ready(function() {

//makes Go tab active
$(".tabs-thumb:first-of-type").addClass("is-active").closest(".tabs").find(".tabs-panel:first-of-type").show();

//on click, shows Node tab and hides Go tab
$(".tabs-thumb:last-of-type").click(function() {
  $(this).removeClass("is-active").closest(".tabs").find(".tabs-panel:first-of-type").hide();
  $(this).addClass("is-active").closest(".tabs").find(".tabs-panel:last-of-type").show();
});

// on click, shows Go tab and hides Node tab
$(".tabs-thumb:first-of-type").click(function() {
  $(this).removeClass("is-active").closest(".tabs").find(".tabs-panel:last-of-type").hide();
  $(this).addClass("is-active").closest(".tabs").find(".tabs-panel:first-of-type").show();
});

});

$(document).ready(function () {
	var anchor;
	anchor = window.location.hash;

	if(anchor === '#inc') {
		$("#container-in").show();
		$("#inc").addClass("active");
		$("#table-in").show();
	} else if(anchor === '#paper') {
		$("#container-in").show();
		$("#paper").addClass("active");
		$("#table-in").show();
	} else if(anchor === '#office') {
		$("#container-in").show();
		$("#office").addClass("active");
		$("#table-in").show();
	} else if(anchor === '#centrals') {
		$("#container-out").show();
		$("#centrals").addClass("active");
		$("#table-out").show();
	} else if(anchor === '#wholesalers') {
		$("#container-out").show();
		$("#wholesalers").addClass("active");
		$("#table-out").show();
	} else if(anchor === '#persons') {
		$("#container-out").show();
		$("#persons").addClass("active");
		$("#table-out").show();
	} else if(anchor === '#order') {
		$("#container-order").show();
	}
});

$("#in-li").click(function() {
	$("#container-out").hide();
	$("#container-order").hide();
	$("#container-in").show();

	if($("#paper").hasClass("active")) {
		location.hash = '#paper';
	} else if($("#office").hasClass("active")) {
		location.hash = '#office';
	} else {
		location.hash = '#inc';
	}
});

$("#out-li").click(function() {
	$("#container-in").hide();
	$("#container-order").hide();
	$("#container-out").show();

	if($("#wholesalers").hasClass("active")) {
		location.hash = '#wholesalers';
	} else if($("#persons").hasClass("active")) {
		location.hash = '#persons';
	} else {
		location.hash = '#centrals';
	}
});

$("#order-li").click(function() {
	location.hash = '#order';
	$("#container-in").hide();
	$("#container-out").hide();
	$("#container-order").show();
});

$("#inc").click(function() {
	location.hash = '#inc';
	$("#paper").removeClass("active");
	$("#office").removeClass("active");
	$("#inc").addClass("active");
	$("#table-in").show();
});

$("#paper").click(function() {
	location.hash = '#paper';
	$("#inc").removeClass("active");
	$("#office").removeClass("active");
	$("#paper").addClass("active");
	$("#table-in").show();
});

$("#office").click(function() {
	location.hash = '#office';
	$("#paper").removeClass("active");
	$("#inc").removeClass("active");
	$("#office").addClass("active");
	$("#table-in").show();
});

$("#centrals").click(function() {
	location.hash = '#centrals';
	$("#persons").removeClass("active");
	$("#wholesalers").removeClass("active");
	$("#centrals").addClass("active");
	$("#table-out").show();
});

$("#wholesalers").click(function() {
	location.hash = '#wholesalers';
	$("#centrals").removeClass("active");
	$("#persons").removeClass("active");
	$("#wholesalers").addClass("active");
	$("#table-out").show();
});

$("#persons").click(function() {
	location.hash = '#persons';
	$("#centrals").removeClass("active");
	$("#wholesalers").removeClass("active");
	$("#persons").addClass("active");
	$("#table-out").show();
});

$('.datepicker').datepicker();
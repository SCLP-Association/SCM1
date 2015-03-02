function getArticles() {
	$.ajax({
		type: "GET",
		url: "../articles.php",
		dataType: "jsonp",
		success:	function(articlesResult) {
			if(articlesResult.successful){
				// HTML generieren
				$.each(articlesResult, function(index, entry) {
					if(index !== 'successful') {
					  	$("#articles-grp").append("<a id=" + entry[0] + " class='list-group-item'>" + entry[1] + "</a>");
					  	$("#" + entry[0]).click(function() {
							// Jeder Link lässt Tabelle erscheinen und aktualisiert Daten!
							//$("#container-in").show();
							$("#articles-grp > a").removeClass("active");
							$("#"+entry[0]+"").addClass("active");
							$("#table-in").show();
							$.ajax({
								type: "POST",
								url: "../buy.php",
								dataType: "jsonp",
								data: {id: entry[0]},
								success:	function(buyResult) {
									if(buyResult.successful){
										// HTML generieren
										$.each(buyResult, function(index, value) {
											if(index !== 'successful') {
												$("#table-in > tbody").remove("tr:nth-cild(2)");
												$("#table-in > tbody").append("<tr><td>"+value[0]+"</td><td>"+value[1]+"</td><td>"+value[2]+"</td><td>"+value[3]+"</td><td>3 Tage</td><td>100</td><td>500</td><td>85</td></tr>");
											}
										});
									} else {
										alert("Keine Lieferanten in der Datenbank vorhanden!");
									}
								},
							});
						});
					}
				});
			} else {
				alert("Keine Artikel in der Datenbank vorhanden!");
			}
		},
	});
}

function getRanking(durance, grade, count, countAll) {
	var rDurance = 100/(3*durance);
	var rGrade = 5*grade;
	var rCount = (100*count)/(6*countAll);
	var ranking = rDurance + rGrade + rCount;
	return ranking;
}

$(document).ready(function () {
	var anchor;
	anchor = window.location.hash;

	/*if(anchor === '#inc') {
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
	}*/

	getArticles();
});

//Generated Click-Handler for articles
//$("#articles-grp>a")
//-------


$("#in-li").click(function() {

	$("#container-out").hide();
	$("#container-order").hide();
	$("#container-in").show();

	/*if($("#paper").hasClass("active")) {
		location.hash = '#paper';
	} else if($("#office").hasClass("active")) {
		location.hash = '#office';
	} else {
		location.hash = '#inc';
	}*/
});

$("#out-li").click(function() {
	$("#container-in").hide();
	$("#container-order").hide();
	$("#container-out").show();

	if($("#wholesalers").hasClass("active")) {
		location.hash = '#wholesalers';
	} else {
		location.hash = '#persons';
	}
});

$("#order-li").click(function() {
	location.hash = '#order';
	$("#container-in").hide();
	$("#container-out").hide();
	$("#container-order").show();
});

/*$("#inc").click(function() {
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
});*/

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
function ajaxBuy(button) {
	var lieferant = $("#lieferantInput").val();
	var ort = $("#ortInput").val();

	$.ajax({
		type: "POST",
		url: "../buy.php",
		dataType: "jsonp",
		data: {id: button, lieferant: lieferant, ort: ort},
		success:	function(buyResult) {
			if(buyResult.successful){
				// HTML generieren
				$("#table-in > tbody").remove();
				$("#table-in").append("<tr><th>Firma</th><th>Ort</th><th>Email</th><th>Telefon</th><th>Lieferdauer</th><th>min. Menge</th><th>max. Menge</th><th>Ranking</th></tr>");
				var count = buyResult.count * 3;
				for(var i = 0; i < count; i++) {
					var grade = parseInt(buyResult[i+2]);
					var dur = buyResult[i+1][0];
					var ranking = getRanking(dur, grade, 100, 200);
					$("#table-in > tbody").append("<tr><td>"+buyResult[i][1]+"</td><td>"+buyResult[i][2]+"</td><td>"+buyResult[i][3]+"</td><td>"+buyResult[i][4]+"</td><td>"+buyResult[i+1][0]+"</td><td>"+buyResult[i+1][2]+"</td><td>"+buyResult[i+1][1]+"</td><td>"+ranking+"</td></tr>");
					i++;
					i++;
				};
			} else {
				alert("Keine Treffer in der Datenbank vorhanden!");
			}
		},
	});
}

function getArticles() {
	$.ajax({
		type: "GET",
		url: "../articles.php",
		dataType: "jsonp",
		success:	function(articlesResult) {
			if(articlesResult.successful){
				// HTML generieren
				$("#articles-grp > *").remove();
				$.each(articlesResult, function(index, entry) {
					if(index !== 'successful') {
					  	$("#articles-grp").append("<a id=" + entry[0] + " class='list-group-item'>" + entry[1] + "</a>");
					  	$("#" + entry[0]).click(function() {
							// Jeder Link lässt Tabelle erscheinen und aktualisiert Daten!
							//$("#container-in").show();
							$("#articles-grp > a").removeClass("active");
							$("#"+entry[0]+"").addClass("active");
							$("#table-in").show();
							ajaxBuy(entry[0]);
						});
					}
				});
			} else {
				alert("Keine Artikel in der Datenbank vorhanden!");
			}
		},
	});
}

function getTableWholesalers() {
	var lieferant = $("#lieferantInputS").val();
	var ort = $("#ortInputS").val();

	$.ajax({
		type: "POST",
		url: "../sell.php",
		dataType: "jsonp",
		data: {type: 0, lieferant: lieferant, ort: ort},
		success:	function(wholesalers) {
			if(wholesalers.successful){
				// HTML generieren
				$("#table-out > tbody").remove();
				$("#table-out").append("<tbody><tr><th>Name</th><th>Ort</th><th>Straße</th><th>Abonnement</th></tr></tbody>");
				$.each(wholesalers, function(index, entry) {
					if(index !== 'successful') {
						$("#table-out").append("<tr><td>"+entry[0]+"</td><td>"+entry[1]+"</td><td>"+entry[2]+"</td><td>"+entry[3]+"</td></td>");
					}
				});
			} else {
				alert("Keine Grossisten in der Datenbank vorhanden!");
			}
		},
	});
}

function getTablePersons() {
	var lieferant = $("#lieferantInputS").val();
	var ort = $("#ortInputS").val();

	$.ajax({
		type: "POST",
		url: "../sell.php",
		dataType: "jsonp",
		data: {type: 1, lieferant: lieferant, ort: ort},
		success:	function(persons) {
			if(persons.successful){
				// HTML generieren
				$("#table-out > tbody").remove();
				$("#table-out").append("<tbody><tr><th>Name</th><th>Ort</th><th>Straße</th><th>Abonnement</th></tr></tbody>");
				$.each(persons, function(index, entry) {
					if(index !== 'successful') {
						$("#table-out").append("<tr><td>"+entry[0]+"</td><td>"+entry[1]+"</td><td>"+entry[2]+"</td><td>"+entry[3]+"</td></td>");
					}
				});
			} else {
				alert("Keine Personen in der Datenbank vorhanden!");
			}
		},
	});
}

function getTableOrder() {
	$.ajax({
		type: "GET",
		url: "../order.php",
		dataType: "jsonp",
		success:	function(order) {
			if(order.successful){
				// HTML generieren
				$("#table-order > tbody").remove();
				$("#table-order").append("<tbody><tr><th>Firma</th><th>Ort</th><th>Bestelldatum</th><th>Lieferdatum</th><th>Bewertung</th></tr></tbody>");
				$.each(order, function(index, entry) {
					if(index !== 'successful') {
						$("#table-order > tbody").append("<tr><td>"+entry[0]+"</td><td>"+entry[1]+"</td><td>"+entry[2]+"</td><td>"+entry[3]+"</td><td>"+entry[4]+"</td></td>");
					}
				});
			} else {
				alert("Keine Personen in der Datenbank vorhanden!");
			}
		},
	});
}

function getRanking(durance, grade, count, countAll) {
	var rDurance = 100/(3*durance);
	var rGrade = 5*grade;
	var rCount = (100*count)/(6*countAll);
	var ranking = rDurance + rGrade + rCount;
	return parseInt(ranking);
}

$(document).ready(function () {
	var anchor;
	anchor = window.location.hash;

	if(anchor === '#buy') {
		$("#container-out").hide();
		$("#container-order").hide();
		getArticles();
		$("#container-in").show();
	} else if(anchor === '#sell') {
		$("#container-in").hide();
		$("#container-order").hide();
		$("#container-out").show();
	} else if(anchor === '#order') {
		$("#container-in").hide();
		$("#container-out").hide();
		$("#container-order").show();
		getTableOrder();
	}
});


$("#in-li").click(function() {
	location.hash = '#buy';
	$("#container-out").hide();
	$("#container-order").hide();
	getArticles();
	$("#container-in").show();
});

$("#out-li").click(function() {
	location.hash = '#sell';
	$("#container-in").hide();
	$("#container-order").hide();
	$("#container-out").show();
});

$("#order-li").click(function() {
	location.hash = '#order';
	$("#container-in").hide();
	$("#container-out").hide();
	$("#container-order").show();
	getTableOrder();
});

$("#wholesalers").click(function() {
	$("#persons").removeClass("active");
	$("#wholesalers").addClass("active");
	$("#table-out").show();
	getTableWholesalers();
});

$("#persons").click(function() {
	$("#wholesalers").removeClass("active");
	$("#persons").addClass("active");
	$("#table-out").show();
	getTablePersons();
});

$("#filter-in").click(function() {
	var buttonId = $("#articles-grp > a.active").attr("id");
	ajaxBuy(buttonId);
});

$("#refreshSell").click(function() {
	if ($("#wholesalers.active").attr("id") == "wholesalers") {
		getTableWholesalers();
	} else {
		getTablePersons();
	}
});

$('.datepicker').datepicker();
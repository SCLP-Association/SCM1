<?php
header('Content-Type: text/javascript; charset=UTF-8');

$db = mysqli_connect("lvps87-230-14-183.dedicated.hosteurope.de", "bas-erp", "erplogin");
mysqli_query($db, "SET NAMES 'utf8'");

if(!$db)
{
  echo "Verbindungsfehler: ".mysqli_connect_error();
}

$sqlQuery = "SELECT p.firma,p.ort,a.bestelldatum,a.lieferdatum,a.bewertung FROM erp.auftraege_bestellung a LEFT JOIN erp.person p ON (a.person_id = p.id) ORDER BY a.bestelldatum DESC LIMIT 50";
$result = mysqli_query($db, $sqlQuery);
$rows = $result->num_rows;
$successful = ($rows >= 1);


if($successful) {
	$seller = array('successful' => true);

	for($i=0; $i < $rows; $i++) {
		array_push($seller, mysqli_fetch_array($result, MYSQL_NUM));
	}

	echo  $_GET['callback'].'('.json_encode($seller) .')';
} else {
	echo  $_GET['callback'].'('.json_encode(array('successful' => false)) .')';
}

mysqli_free_result($result);
?>
<?php
header('Content-Type: text/javascript; charset=UTF-8');

$db = mysqli_connect("lvps87-230-14-183.dedicated.hosteurope.de", "bas-erp", "erplogin");
mysqli_query($db, "SET NAMES 'utf8'");

if(!$db)
{
  echo "Verbindungsfehler: ".mysqli_connect_error();
}

$pid = $_POST['id'];
$sqlQuery = "SELECT firma,ort,email,telefon_nr FROM erp.person p LEFT JOIN erp.lieferanten_betriebsmittel l ON (p.id = l.person_id) WHERE l.betriebsmittel_id = '1'";
$result = mysqli_query($db, $sqlQuery);
$rows = $result->num_rows;
$successful = ($rows >= 1);

// Jedem Lieferanten den Druchschnitt der Bewertungen berechnen!!!

if($successful) {
	$seller = array('successful' => true);
	for($i=0; $i < $rows; $i++) {
		$mysql_array = mysqli_fetch_array($result, MYSQL_NUM);
		//array_push($mysql_array, "8.5")
		array_push($seller, $mysql_array);
	}
	

	echo  $_GET['callback'].'('.json_encode($seller) .')';
} else {
	echo  $_GET['callback'].'('.json_encode(array('successful' => false)) .')';
}
mysqli_free_result($result);
?>
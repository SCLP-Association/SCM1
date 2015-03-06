<?php
header('Content-Type: text/javascript; charset=UTF-8');

$db = mysqli_connect("lvps87-230-14-183.dedicated.hosteurope.de", "bas-erp", "erplogin");
mysqli_query($db, "SET NAMES 'utf8'");

if(!$db)
{
  echo "Verbindungsfehler: ".mysqli_connect_error();
}

$pid = $_POST['id'];
$sqlQuery = "SELECT p.id,firma,ort,email,telefon_nr FROM erp.person p LEFT JOIN erp.lieferanten_betriebsmittel l ON (p.id = l.person_id) WHERE l.betriebsmittel_id = '$pid'";
$result = mysqli_query($db, $sqlQuery);
$rows = $result->num_rows;
$successful = ($rows >= 1);


// Lieferzeit
$sqlQueryDuration = "SELECT lieferdauer,max_bestellmenge,min_bestellmenge FROM erp.kreditor k LEFT JOIN erp.lieferanten_betriebsmittel l ON (k.person_id = l.person_id) WHERE l.betriebsmittel_id = '$pid'";
$resultKreditor = mysqli_query($db, $sqlQueryDuration);
$rowsKreditor = $resultKreditor->num_rows;

$seller = array('successful' => true, 'count' => $rows);

for($i=0; $i < $rows; $i++) {
	$mysql_array = mysqli_fetch_array($result, MYSQL_NUM);
	array_push($seller, $mysql_array);
	$array_Kreditor = mysqli_fetch_array($resultKreditor, MYSQL_NUM);
	array_push($seller, $array_Kreditor);

	$id = $mysql_array[0];
	$sqlQueryRank = "SELECT bewertung FROM erp.auftraege_bestellung b  WHERE b.person_id = '$id'";
	$resultRank = mysqli_query($db, $sqlQueryRank);
	$rowsRank = $resultRank->num_rows;
	$ranking = 0;
	if ($rowsRank > 0) {
		$add = 0;
		for($j=0; $j < $rowsRank; $j++) {
			$array_Rank = mysqli_fetch_array($resultRank, MYSQL_NUM);
			$rank = $array_Rank[0];
			$add =+ $rank;
		}
		$ranking = ($add / $rowsRank);
		array_push($seller, $ranking);
	}
}


if($successful) {
	//$seller = array('successful' => true);	
		
	echo  $_GET['callback'].'('.json_encode($seller) .')';
} else {
	echo  $_GET['callback'].'('.json_encode(array('successful' => false)) .')';
}
mysqli_free_result($result);
?>
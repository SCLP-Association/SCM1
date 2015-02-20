<?php
header('Content-Type: text/javascript; charset=UTF-8');

$db = mysqli_connect("87.230.14.183", "bas-erp", "erplogin");
mysqli_query($db, "SET NAMES 'utf8'");

if(!$db)
{
  echo "Verbindungsfehler: ".mysqli_connect_error();
}

$sqlQuery = "SELECT bezeichnung FROM erp.artikel";
$result = mysqli_query($db, $sqlQuery);
$rows = $result->num_rows;
$successful = ($rows == 1);

if($successful) {
	$resultData = $result->fetch_array();

	$articles = array('successful' => true);

	for($i=0; $i<$rows; $i++) {
		array_push($articles, $result[$i]);
	}
	

	echo  $_GET['callback'].'('.json_encode($articles) .')';
} else {
	echo  $_GET['callback'].'('.json_encode(array('successful' => false)) .')';
}
?>
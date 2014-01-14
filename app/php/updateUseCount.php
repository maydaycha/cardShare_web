<?php
require_once("DB_config.php");
require_once("DB_class.php");
header("Content-Type:text/html; charset=utf-8");

$cardNo = $_GET['cardNo'];
// $cardNo = 'A030378';

if(!isset($cardNo))
	echo 'fail';
else{
	$db = new DB();
	$db->connect_db($_DB['host'], $_DB['username'], $_DB['password'], $_DB['dbname']);

	$query ="SELECT useCount FROM card WHERE cardNo = '".$cardNo."' ";
	$db->query($query);
	$result = array();
	$i = 0;
	while($result[$i++] = $db->fetch_array());
	array_pop($result);

	// print_r($result);
	// echo json_encode($result);
	// echo $result[0]['useCount'];
	$newCount = $result[0]['useCount'] + 1;
	// echo $newCount;
	$query ="UPDATE card SET useCount='".$newCount."' WHERE cardNo = '".$cardNo."' ";
	$db->query($query);
	// echo "{status: "."\"success\"}";
	
}
?>
<?php
require_once("DB_config.php");
require_once("DB_class.php");
header("Content-Type:text/html; charset=utf-8");

$storeName = $_GET["storeName"];
$cardNo = $_GET["cardNo"];
$showType = $_GET['showType'];


// $storeName = "EDWIN";
// $cardNo = "A230224";
// $showType = "0";

if(isset($storeName) && isset($cardNo)){
	$db = new DB();
	$db->connect_db($_DB['host'], $_DB['username'], $_DB['password'], $_DB['dbname']);
	$query = "UPDATE card SET showType = '".$showType."' WHERE storeName = '".$storeName."' AND cardNo = '".$cardNo."' ";
	$db->query($query);

	$result = array("status" => "ok");
	echo json_encode($result);
}

?>
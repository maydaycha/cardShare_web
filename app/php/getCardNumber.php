<?php
require_once("DB_config.php");
require_once("DB_class.php");
header("Content-Type:text/html; charset=utf-8");
$db = new DB();
$db->connect_db($_DB['host'], $_DB['username'], $_DB['password'], $_DB['dbname']);

$shopName = $_GET["shopNmae"];
// $shopName = "EDWIN";
$sort = $_GET["sort"];

if($sort)
	$query ="SELECT * FROM card WHERE storeName = '".$shopName."' ORDER BY useCount";
else
	$query ="SELECT * FROM card WHERE storeName = '".$shopName."' ";

$db->query($query);

$result = array();
$i = 0;
while($result[$i++] = $db->fetch_array());
array_pop($result);
echo json_encode($result);
?>

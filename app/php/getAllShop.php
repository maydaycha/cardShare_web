<?php
require_once("DB_config.php");
require_once("DB_class.php");
header("Content-Type:text/html; charset=utf-8");
$db = new DB();
$db->connect_db($_DB['host'], $_DB['username'], $_DB['password'], $_DB['dbname']);

// $shopName = $_GET["shopNmae"];
$shopName = "EDWIN";
$query ="SELECT storeName FROM store ";
$db->query($query);

$result = array();
$i = 0;
$result[$i] = $db->fetch_array();
while($result[$i++] = $db->fetch_array());
echo json_encode($result, JSON_UNESCAPED_UNICODE);
?>

<?php
require_once("DB_config.php");
require_once("DB_class.php");
header("Content-Type:text/html; charset=utf-8");
$db = new DB();
$db->connect_db($_DB['host'], $_DB['username'], $_DB['password'], $_DB['dbname']);

$query ="SELECT * FROM store ";
$db->query($query);

$result = array();
$i = 0;
// $result[$i] = $db->fetch_array();
while($result[$i++] = $db->fetch_array());
// pop out false object
array_pop($result);
echo json_encode($result, JSON_UNESCAPED_UNICODE);
?>

<?php
session_start();
require_once("DB_config.php");
require_once("DB_class.php");
header("Content-Type:text/html; charset=utf-8");
$db = new DB();
$db->connect_db($_DB['host'], $_DB['username'], $_DB['password'], $_DB['dbname']);

$query ="SELECT * FROM member WHERE account='".$_SESSION["account"]."' ";
$db->query($query);

$result = array();
$i = 0;
while($result[$i++] = $db->fetch_array());
array_pop($result);
echo json_encode($result, JSON_UNESCAPED_UNICODE);
?>

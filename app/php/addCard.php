<?php
require_once("DB_config.php");
require_once("DB_class.php");
header("Content-Type:text/html; charset=utf-8");

$storeName = $_POST["storeName"];
$cardNo = $_POST["cardNo"];
$ownType = $_POST["ownType"];
$owner = $_POST["owner"];
$cardPhone = $_POST["cardPhone"];
$expireTime = $_POST["expireTime"];

// $storeName = "abc";
// $cardNo = "A1234";
// $ownType = "maydaycha";
// $owner = "陳";
// $cardPhone = "0912312";
// $expireTime = "2013-13-13";


$db = new DB();
$db->connect_db($_DB['host'], $_DB['username'], $_DB['password'], $_DB['dbname']);

$query ="INSERT INTO card(`storeName`, `cardNo`, `ownType`, `owner`, `cardPhone`, `showType`, `expireTime`, `url`, `useCount`, `topDeadLine`) VALUES('".$storeName."', '".$cardNo."', '".$ownType."', '".$owner."', '".$cardPhone."', '1', '2013-12-12', 'www.ggg.ggg', '0', '2014-12-12')";
$db->query($query);

// echo json_encode($result);
// echo json_encode($result, JSON_UNESCAPED_UNICODE);


?>

<?php
session_start();
require_once("DB_config.php");
require_once("DB_class.php");
header("Content-Type:text/html; charset=utf-8");

$acc = $_POST["account"];
$pass = $_POST["password"];

// $acc = 'nctuIIM';
// $pass = 'nctu123';
$auth = false;


if(!isset($acc) || !isset($pass))
	$auth = false;
else{
	$db = new DB();
	$db->connect_db($_DB['host'], $_DB['username'], $_DB['password'], $_DB['dbname']);
	$query ="SELECT password FROM member WHERE account = '".$acc."' ";
	$db->query($query);
	$result = array();
	$i = 0;
	while($result[$i++] = $db->fetch_array());
	array_pop($result);

	if($result[0]['password'] == $pass)
	{
		$_SESSION['account'] = $acc;
		$auth = true;
	}
	else
		$auth = false;
	// print_r($result);
}

if($auth){
	$response["status"] = "permit";
	header("HTTP/1.1 301 Moved Permanently");
	header("Location: ../index2.html");
} 
else{
	$response["status"] = "denied";
	header("HTTP/1.1 301 Moved Permanently");
	header("Location: ../login.html");
} 

// echo json_encode($response);
?>
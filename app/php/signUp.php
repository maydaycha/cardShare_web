<?php
require_once("DB_config.php");
require_once("DB_class.php");
header("Content-Type:text/html; charset=utf-8");

$account = $_POST['account'];
$password = $_POST['password'];
$username = $_POST['username'];
$sexual = $_POST['sexual'];
$height = $_POST['height'];
$weight = $_POST['weight'];
$birthday = $_POST['birthday'];
$mobilenum = $_POST['mobilenum'];
$email = $_POST['email'];
$address = $_POST['address'];


// $account = "maydaycha1222";
// $password = "1234";
// $username = "yaochong";
// $sexual = 1;
// $height = 170;
// $weight = 60;
// $birthday = '2010-03-01';
// $mobilenum = "091212121";
// $email = "maydahca@13123.com";
// $address = "123123sadas";
if(isset($account) && isset($password) &&isset($username) &&isset($sexual)&&isset($height)&&isset($weight )&&isset($birthday )&&isset($mobilenum )&&isset($email )&&isset($address )){
	$db = new DB();
	$db->connect_db($_DB['host'], $_DB['username'], $_DB['password'], $_DB['dbname']);
// $query = "INSERT INTO member(name, account, password, sexual, birthday, height, weight, mobileNum, eMail, address) VALUES ('".$username."', '".$account."', '".$password."', '".$sexual."', '".$birthday."', '".$height."', '".$weight."', '".$mobilenum."', '".$eamil."', '".$address."') ";
	$query = "INSERT INTO `CardShare`.`member` (`name`, `account`, `password`, `sexual`, `birthday`, `height`, `weight`, `mobileNum`, `eMail`, `address`) VALUES ('".$username."', '".$account."', '".$password."', '".$sexual."', '".$birthday."', '".$height."', '".$weight."', '".$mobilenum."', '".$email."', '".$address."')";
	echo $db->query($query);
// echo "hi";

// $result = array("status" => "ok");
// echo json_encode($result);
}
else{
	echo "fail";
}



?>

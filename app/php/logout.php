<?php
session_start();

header("Content-Type:text/html; charset=utf-8");
header("Cache-Control: no-store, no-cache, must-revalidate");
// session_unset(); 
// unset($_SESSION["account"]);
unset($_SESSION['account']);
// session_unregister("account");
// session_destroy();
// echo $_SESSION["account"];
// echo "hi";
header("HTTP/1.1 301 Moved Permanently");
header("Location: ../login.html");


?>
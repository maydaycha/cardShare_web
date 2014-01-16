<?php
session_start();
header("Content-Type:text/html; charset=utf-8");
header("Cache-Control: no-store, no-cache, must-revalidate");
unset($_SESSION['account']);
session_destroy();
header("HTTP/1.1 301 Moved Permanently");
header("Location: ../login.html");
?>
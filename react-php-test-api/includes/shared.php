<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");

include("../DbConnect.php");
$conn = new DbConnect();
$db = $conn->connect();
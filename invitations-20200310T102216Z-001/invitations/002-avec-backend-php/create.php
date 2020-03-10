<?php
$json = file_get_contents('php://input');
$params = json_decode($json);

var_dump($params);
?>
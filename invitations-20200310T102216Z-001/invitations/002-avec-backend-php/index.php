<?php
require("./db-connection.php");

$request = $db->query('SELECT * FROM invitations');
$invitations = $request->fetchAll();

echo json_encode($invitations);
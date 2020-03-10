<?php
define('DEBUG', true);

define('DB_HOST', '127.0.0.1');
define('DB_NAME', 'cagnottes');
define('DB_USER', 'root');
define('DB_PASSWORD', 'scretforroot');
define('DB_PORT', 32781);

$connDSN = 'mysql:host=' . DB_HOST . ';port=' . DB_PORT . ';dbname=' . DB_NAME;

try {
	// Connect database
	$db = new PDO($connDSN, DB_USER, DB_PASSWORD);

	// Config PDO
	$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
	$db->exec('SET CHARACTER SET utf8');
	if (DEBUG) :
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
	endif;
}
catch (Exception $e) {
	if (DEBUG) :
		$message = utf8_encode($e->getMessage());
		echo $message;
	else :
		echo 'Erreur de connexion à la base de données.';
	endif;
	die();
}

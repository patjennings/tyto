<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include("ForbiddenChar.php");
    
// Result
if (isset($_POST['title'])) { $t = $_POST['title']; }
if (isset($_POST['content'])) { $c = $_POST['content']; }

// formattage du titre pour avoir un nom de fichier propre
$unwanted_array = getForbiddenChar();
$tNoAccents = strtr( $t, $unwanted_array );
$tFrmt = strtolower($tNoAccents);

if ($t) {
    file_put_contents("../dist/content/".$tFrmt.".md", $c); 
}

?>
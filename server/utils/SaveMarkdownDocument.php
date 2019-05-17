<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include("ForbiddenChar.php");

$conf = include("../config.php");
    
// Result
if (isset($_POST['title'])) { $t = $_POST['title']; }
if (isset($_POST['content'])) { $c = $_POST['content']; }
if (isset($_POST['space'])) { $space = $_POST['space']; }

// formattage du titre pour avoir un nom de fichier propre
$unwanted_array = getForbiddenChar();
$tNoAccents = strtr( $t, $unwanted_array);
$tFrmt = strtolower($tNoAccents);

if ($t) {
    if(file_put_contents("../../dist/spaces/".$space."/content/".$tFrmt.".md", $c)){
        echo "Fichier markdown ".$t.".md créé";
    } else {
        echo "Erreur pendant la création du fichier";
    }
}

// echo qqchose pour tracer

?>

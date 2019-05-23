<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$conf = include("../config.php");
    
// Result
if (isset($_POST['title'])) { $t = $_POST['title']; }
if (isset($_POST['space'])) { $space = $_POST['space']; }

// echo($space);

if ($t) {
    if(unlink("../../dist/spaces/".$space."/content/".$t.".md")){
        echo "Fichier markdown ".$t.".md supprimé";
    } else {
        echo "Erreur pendant la suppression du fichier";
    }
}

// echo qqchose pour tracer

?>

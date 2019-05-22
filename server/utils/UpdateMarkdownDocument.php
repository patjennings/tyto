<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include("Parsedown.php");
include("ForbiddenChar.php");
include("GetMarkdownContent.php");

$conf = include("../config.php");


// Result
if (isset($_POST['newlongitude'])) { $newlongitude = $_POST['newlongitude']; } // nouvelle position en paramètre
if (isset($_POST['newlatitude'])) { $newlatitude = $_POST['newlatitude']; } // nouvelle position en paramètre
if (isset($_POST['titleraw'])) { $titleraw = $_POST['titleraw']; } // identifiant du fichier en paramètre (nom de fichier)
if (isset($_POST['space'])) { $space = $_POST['space']; } // l'espace courant
if (isset($_POST['user'])) { $user = $_POST['user']; } // l'utilisateur courant

// on prend le fichier, on l'ouvre
$filepath = $conf["serverDir"]."dist/spaces/".$space."/content/".$titleraw.".md";

$content = file_get_contents($filepath); 

// on sépare tout : titre, position, relations, contenu, qu'on colle dans des variables
$contentSplitted = getMarkdownContent($content, $filepath);

$now = date("Y-m-d H:i");
// echo var_dump($contentSplitted);

// on prend la nouvelle position, on la colle à la place de l'ancienne, dans la variable qui correspond
// on concatène tout
$newContent;
$newContent = "title: ".$contentSplitted['title'];
$newContent .= "position: ".$newlatitude.", ".$newlongitude."\n";
$newContent .= "created: ".$contentSplitted['created']['user'].", ".$contentSplitted['created']['date']."\n";
$newContent .= "lastupdated: ".$user.", ".$now." \n";
$newContent .= "tags: ".implode(",", $contentSplitted['tags'])."\n";
$newContent .= "relations: ".implode(",", $contentSplitted['relations'])."\n";
$newContent .= "\n";
$newContent .= "---";
$newContent .= "\n";
$newContent .= $contentSplitted['content']['low'];

// echo $newContent;

// on écrit tout dans le fichier
if(file_put_contents($filepath, $newContent)){
    echo "Mise à jour effectuée :  ".$filepath;
} else {
    echo "Erreur pendant l'écriture dans le fichier";
}

// echo qqchose pour tracer

?>

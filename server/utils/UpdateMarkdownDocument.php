<?php

// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

include("Parsedown.php");
include("ForbiddenChar.php");
include("GetMarkdownContent.php");

$conf = include("../config.php");

// Result
if (isset($_POST['newlongitude'])) { $newlongitude = $_POST['newlongitude']; } // nouvelle position en paramètre
if (isset($_POST['newlatitude'])) { $newlatitude = $_POST['newlatitude']; } // nouvelle position en paramètre
if (isset($_POST['titleraw'])) { $titleraw = $_POST['titleraw']; } // identifiant du fichier en paramètre (nom de fichier)

// on prend le fichier, on l'ouvre
$filepath = $conf["serverDir"]."dist/content/".$titleraw.".md";
$content = file_get_contents($filepath); 

// on sépare tout : titre, position, relations, contenu, qu'on colle dans des variables
$contentSplitted = getMarkdownContent($content, $filepath);
// echo var_dump($contentSplitted);

// on prend la nouvelle position, on la colle à la place de l'ancienne, dans la variable qui correspond
// on concatène tout
$newContent;
$newContent = "title: ".$contentSplitted['title'];
$newContent .= "position: ".$newlatitude.", ".$newlongitude."\n";
$newContent .= "relations: 0"."\n";
$newContent .= "\n";
$newContent .= "---";
$newContent .= "\n";
$newContent .= $contentSplitted['content']['low'];



// on écrit tout dans le fichier
if(file_put_contents($filepath, $newContent)){
    echo "Mise à jour effectuée :  ".$filepath;
} else {
    echo "Erreur pendant l'écriture dans le fichier";
}

// echo qqchose pour tracer

?>

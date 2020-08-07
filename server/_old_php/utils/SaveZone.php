<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// require('../conf.php');

if (isset($_POST['title'])) { $getTitle = $_POST['title']; }
if (isset($_POST['latitude'])) { $getLat = $_POST['latitude']; }
if (isset($_POST['longitude'])) { $getLong = $_POST['longitude']; }
if (isset($_POST['space'])) { $space = $_POST['space']; }

$json = file_get_contents("../../dist/spaces/".$space."/zones.json");
$json = json_decode($json, true);

// Les variables qui contiennent les infos du joueur
$title = $getTitle;
$lat = $getLat;
$long = $getLong;
		
addNewZone($json);

// Ajouter une nouvelle zone à la liste des réponses
function addNewZone($json){
    global $title;
    global $lat;
    global $long;
    global $space;

    $newNode = ["title" => $title, "location" => array("latitude" => $lat, "longitude" => $long)];
		    
    array_push($json, $newNode); 
    $newJsonString = json_encode($json);

    if(file_put_contents("../../dist/spaces/".$space."/zones.json", $newJsonString)) {
        echo "Zone ".$title." créée";
    }
    else
    {
        echo "Erreur lors de la création de la zone : ".$title." non créé";
    }    
}
?>

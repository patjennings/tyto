<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Result

// require('../conf.php');

// $getTitle = $_POST['title'];
// $getLat = $_POST['latitude'];
// $getLong = $_POST['longitude'];

if (isset($_POST['title'])) { $getTitle = $_POST['title']; }
if (isset($_POST['latitude'])) { $getLat = $_POST['latitude']; }
if (isset($_POST['longitude'])) { $getLong = $_POST['longitude']; }

// $getTitle = "test title";
// $getLat = 36.5498;
// $getLong = 25.5358;

$json = file_get_contents("../dist/zones.json");
$json = json_decode($json, true);

//$backUrl = $pageUrl;
// Les variables qui contiennent les infos du joueur
$title = $getTitle;
$lat = $getLat;
$long = $getLong;

// echo $json;
// on remplit le tableau 

// On renseigne les infos grâce à l'id, et grâce à la liste complète des joueurs
// foreach ($json as $key => $value) {

//     // $title = $value['title'];

//         // $ = $id;
//         // $theFirstName = $value['prenom'];
//         // $theSecondName = $value['nom'];
            
//         // if($status == 'present'){
//         //     $thePresence = true;
//         // } else {
//         //     $thePresence = false;
//         // }
			
//     // }
// }
		
addNewPlayer($json);

// Ajouter un nouveau joueur à la liste des réponses
function addNewPlayer($json){
    global $title;
    global $lat;
    global $long;

    // echo $title;

    // echo $jsonAnswersUrl;
            
    $newNode = ["title" => $title, "location" => array("latitude" => $lat, "longitude" => $long)];
		    
    array_push($json, $newNode); 
    $newJsonString = json_encode($json);

    // echo var_dump($json);
		    
    if(file_put_contents("../dist/zones.json", $newJsonString)) {
        echo "Joueur créé";
        // redirectToPage();
    }
    else
    {
        echo "Il y a eu une erreur";
    }    
}
?>

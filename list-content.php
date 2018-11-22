<?php

// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

$fileList = glob('content/*.md');
$filesArray = array();

$obj;
$json;

//Loop through the array that glob returned.
foreach($fileList as $filename){
    array_push($filesArray, $filename);
}

foreach($filesArray as $file){
    $content;
    $content = file_get_contents($file);
    // echo $content."<br/><br/><br/>";
    
    writeJSON($content);
    
    // parser le markdown
}
// writeJSON($content);


function writeJSON($content){

    // echo $content;

    $metadata = explode("--", $content);
    // echo $metadata;

    // à chaque titre, on supprime et on remplace par un car. spécial
    $p1 = "/title: /";
    $p2 = "/position: /";
    $p3 = "/relations: /";
    $removep1 = preg_replace($p1, "{{##}}", $metadata[0]);
    $removep2 = preg_replace($p2, "{{##}}", $removep1);
    $removep3 = preg_replace($p3, "{{##}}", $removep2);

    // Ce car. spécial, on explode la string avec
    $metaExplode = explode("{{##}}", $removep3);

    $meta = array();

    foreach ($metaExplode as $item) {
        if($item == ""){
            // do nothing, that's crap
        }else{
            array_push($meta, $item); // on remplit le tableau des entrées
            echo "- ".$item."<br/>";            
        }

    }

    
    
    global $obj;
    global $json;

    $obj->id = 0;
    $obj->title = "Banks in the service of the NRA";
    $obj->content->top = "Cuomo is using strained argument... further regulation of guns";
    $obj->content->middle ="New York Governor Cuomo is using strained arguments... I also support further regulation of guns... I would also support a campaign calling on an insurance company to refuse to work with the NRA to sell insurance to other parties";
    $obj->content->low =" New York Governor Cuomo is using strained arguments to pressure banks to stop serving the NRA. This reminds me of how US marijuana businesses find it impossible to get bank accounts. I support petition campaigns calling on companies to break their special deals with the NRA. These campaigns follow a legitimate pathway. I also support further regulation of guns, including prohibition of high-velocity rifles (often called \"assault weapons\") and large magazines. I would also support a campaign calling on an insurance company to refuse to work with the NRA to sell insurance to other parties. (It sounds like that's what the insurance company is doing.) However, the state should not pressure banks or insurance companies to refuse to provide lawful services to the NRA, or to any other lawful organization, based on what it stands for. ";
    $obj->location->latitude = 36.8714;
    $obj->location->longitude = 25.5099;
    $obj->relations[0]->id = 0;
    $obj->relations[1]->id = 2;
    $obj->relations[2]->id = 5;

    $json = json_encode($obj);

    // echo $myJSON;
    
    // global $theId;
    // global $theFirstName;
    // global $theSecondName;
    // global $thePresence;
    // global $jsonContent;
    // global $jsonAnswersUrl;

    // // echo $jsonAnswersUrl;
            
    // $newNode = [
    //     "id" => intval($theId),
    //     "title" => $theFirstName,
    //     "content" => $theSecondName,
    //     "location" => $thePresence,
    //     "relations" => $thePresence
    // ];
		    
    // // array_push($jsonAnswers['list'], $newNode);
    // $newJsonString = json_encode($jsonAnswers);
		    
    // if(file_put_contents($jsonAnswersUrl, $newJsonString)) {
    //     echo "Joueur créé";
    //     // redirectToPage();
    // }
    // else
    // {
    //     echo "Il y a eu une erreur";
    // }    
}

?>

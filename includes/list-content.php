<?php
header('Content-Type: application/json');

// $rootPath = "http://localhost/tyto";

// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

include("Parsedown.php");

$fileList = glob("../dist/content/*.md");
$filesArray = array();

$obj = array();
$json;

//Loop through the array that glob returned.
foreach($fileList as $filename){
    array_push($filesArray, $filename);
}

foreach($filesArray as $file){
    $content;
    $content = file_get_contents($file);    
    getContent($content, $file);
}

function getContent($content, $file){

    $data = explode("---", $content);

    /////////////////
    // métadonnées
    //////////////////

    // à chaque titre, on supprime et on remplace par un car. spécial
    $p1 = "/title: /";
    $p2 = "/position: /";
    $p3 = "/relations: /";
    $removep1 = preg_replace($p1, "{{##}}", $data[0]);
    $removep2 = preg_replace($p2, "{{##}}", $removep1);
    $removep3 = preg_replace($p3, "{{##}}", $removep2);

    // Ce car. spécial, on explode la string avec
    $metaExplode = explode("{{##}}", $removep3);

    $meta = array();

    foreach ($metaExplode as $item) {
        if($item == ""){
            // if empty, do nothing, that's crap
        }else{
            array_push($meta, $item); // on remplit le tableau des entrées
        }
    }

    $getTitle = $meta[0];

    $meta[1] = str_replace(" ", "", $meta[1]); // on évacue les espaces
    $meta[1] = str_replace("\n", "", $meta[1]); // éventuellement, les sauts de lignes
    $getPosition = explode(",", $meta[1]); // et on éclate
    $meta[2] = str_replace(" ", "", $meta[2]);
    $meta[2] = str_replace("\n", "", $meta[2]);
    $getRelations = explode(",", $meta[2]);

    
    /////////////////////
    // contenu
    /////////////////
    $Parsedown = new Parsedown(); 
    $parsedText = $Parsedown->text($data[1]);

    preg_match_all("|<strong>(.*)</strong>|U", $parsedText, $matchTop, PREG_PATTERN_ORDER);
    preg_match_all("|<em>(.*)</em>|U", $parsedText, $matchMiddle, PREG_PATTERN_ORDER);
    
    $contentTop = "";
    $contentMiddle = "";
    $contentLow = $parsedText;
    
    foreach($matchTop[1] as $part){
        $contentTop .= $part."... ";
    }
    foreach($matchMiddle[1] as $part){
        $contentMiddle .= $part."... ";
    }

    writeJSON($getTitle, $contentTop, $contentMiddle, $contentLow, $getPosition, $getRelations, $file);
}

function writeJSON($title, $contentTop, $contentMiddle, $contentLow, $position, $relations, $path){
    
    global $obj;
    global $json;

    $relationsFormat = array();

    foreach($relations as $r){
        array_push($relationsFormat, array('id' => intval("$r")));
    }

    $rq = array(
        'id' => 0,
        'title' => $title,
        'path' => $path,
        'content' => array(
            'top' => $contentTop,
            'middle' => $contentMiddle,
            'low' => truncate($contentLow, 1200)
        ),
        'location' => array(
            'latitude' => floatval($position[0]),
            'longitude' => floatval($position[1])
        ),
        'relations' => $relationsFormat
    );

    array_push($obj, $rq);
}

function truncate($string,$length=100,$append="&hellip;") {
  $string = trim($string);

  if(strlen($string) > $length) {
    $string = wordwrap($string, $length);
    $string = explode("\n", $string, 2);
    $string = $string[0] . $append;
  }

  return $string;
}

echo json_encode($obj);

?>

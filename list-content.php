<?php
header('Content-Type: application/json');

// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

include("includes/Parsedown.php");

$fileList = glob('content/*.md');
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
    // echo $content."<br/><br/><br/>";
    
    // writeJSON($content);

    getContent($content);
    
    // parser le markdown
}
// writeJSON($content);

function getContent($content){

    // echo $content;

    $data = explode("--", $content);

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
            // echo "- ".$item."<br/>";            
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
    // echo $data[1];


    $Parsedown = new Parsedown();
    
    $parsedText = $Parsedown->text($data[1]);

    preg_match_all("|<strong>(.*)</strong>|U", $parsedText, $matchTop, PREG_PATTERN_ORDER);
    preg_match_all("|<em>(.*)</em>|U", $parsedText, $matchMiddle, PREG_PATTERN_ORDER);
    
    // print_r($matches[1]);
    
    $contentTop = "";
    $contentMiddle = "";
    $contentLow = $parsedText;
    
    foreach($matchTop[1] as $part){
        $contentTop .= $part."... ";
        // echo $part;
    }
    foreach($matchMiddle[1] as $part){
        $contentMiddle .= $part."... ";
        // echo $part;
    }
    // var_dump($matches);
    // echo $contentTop;
    // echo "<hr/>";
    // echo $contentMiddle;
    // echo "<hr/>";
    // echo $contentLow;
    
    // $searchl1 = preg
// $str = $data[1];
// $pattern = ;
// preg_match_all("\[a]\", $str, $matches, PREG_PATTERN_ORDER, 3);
// var_dump($matches);

// echo "toto";

    
    // $getSliced;

    writeJSON($getTitle, $contentTop, $contentMiddle, $contentLow, $getPosition, $getRelations);
}
function writeJSON($title, $contentTop, $contentMiddle, $contentLow, $position, $relations){

    // echo $title, $contentTop, $contentMiddle, $contentLow, $position[0], $relations[0];
    
    global $obj;
    global $json;

    $relationsFormat = array();

    foreach($relations as $r){
        array_push($relationsFormat, array('id' => intval("$r")));
    }

    $rq = array(
        'id' => 0,
        'title' => $title,
        'content' => array(
            'top' => $contentTop,
            'middle' => $contentMiddle,
            'low' => $contentLow
        ),
        'location' => array(
            'latitude' => floatval($position[0]),
            'longitude' => floatval($position[1])
        ),
        'relations' => $relationsFormat
    );

    array_push($obj, $rq);
}
echo json_encode(json$obj);
?>

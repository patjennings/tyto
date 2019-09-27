<?php
header('Content-Type: application/json');

// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

$conf = include("config.php");

include("utils/Parsedown.php");
include("utils/ForbiddenChar.php");
include("utils/GetMarkdownContent.php");

$space = $_GET["space"];

$fileList = glob($conf["serverDir"]."dist/spaces/".$space."/content/*.md");
$filesArray = array();

$obj = array();
$json;

// echo $conf["baseUrl"];

//Loop through the array that glob returned.
foreach($fileList as $filename){
    array_push($filesArray, $filename);
}

foreach($filesArray as $file){
    $content;
    $content = file_get_contents($file);
    
    $contentSplitted = getMarkdownContent($content, $file); // retourne un array des valeurs du markdown

    writeJSON($contentSplitted['all'],
              $contentSplitted['title'],
              $contentSplitted['content']['top'],
              $contentSplitted['content']['middle'],
              $contentSplitted['content']['low'],
              $contentSplitted['location'],
              $contentSplitted['created'],
              $contentSplitted['lastupdated'],
              $contentSplitted['tags'],
              $contentSplitted['relations'],
              $contentSplitted['path'],
              $contentSplitted['raw']);
}


function writeJSON($all, $title, $contentTop, $contentMiddle, $contentLow, $position, $created, $lastUpdated, $tags, $relations, $path, $raw){
    
    global $obj;
    global $json;
    global $conf;

    $relationsFormat = array();

    foreach($relations as $r){
        array_push($relationsFormat, array('id' => intval("$r")));
    }

    // on parse le contenu
    $parser = new Parsedown();
    $contentLow = $parser->text($contentLow);
    
    $rq = array(
        'id' => 0,
        'all' => $all,
        'title' => $title,
        'path' => $path,
        'raw' => $raw,
        'created' => $created,
        'lastUpdated' => $lastUpdated,
        'tags' => $tags,
        'content' => array(
            'top' => $contentTop,
            'middle' => $contentMiddle,
            'low' => truncate($contentLow, 1200),
            'full' => $contentLow
        ),
        'location' => array(
            'latitude' => floatval($position['latitude']),
            'longitude' => floatval($position['longitude'])
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

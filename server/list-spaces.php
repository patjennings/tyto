
<?php
header('Content-Type: application/json');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$conf = include("config.php");

// include("utils/Parsedown.php");
// include("utils/ForbiddenChar.php");
// include("utils/GetMarkdownContent.php");

// $space = $_GET["space"];

$folderList = glob($conf["serverDir"]."dist/spaces/*");
// $filesArray = array();

$obj = array();
$json;

// echo $conf["baseUrl"];

//Loop through the array that glob returned.
foreach($folderList as $folder){
    $folder = explode("/", $folder);
    array_push($obj, array_pop($folder));
}

echo json_encode($obj);

?>

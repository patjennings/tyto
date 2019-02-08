a<?php
// $jsonPath = file_get_contents("../data/time.json");
// $json = json_decode($jsonPath, true);

// Result
$title = $_POST['title'];
$content = $_POST['content'];

    

if ($_POST) {
    file_put_contents("../content/".$title.".md", $content); 
}

?>

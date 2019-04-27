<?php
// header('Content-Type: application/json');

// $rootPath = "http://localhost/tyto";



// getMarkdownContent("zrgzrt", "rty/rty/toto.md");

// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

function getMarkdownContent($content, $file){
    global $conf;
    
    $path = explode("/", $file);
    $path = array_pop($path);
    $path = $conf["baseUrl"].$conf["contentPath"].$path;

    $data = explode("---", $content);

    // echo $conf["baseUrl"];
    
    // echo $content;

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
    
    // titre raw
    $unwanted_array = getForbiddenChar();
    $getRawTitle = strtr( $getTitle, $unwanted_array);
    $getRawTitle = strtolower($getRawTitle);
    $getRawTitle = str_replace("\n", "", $getRawTitle);

    $meta[1] = str_replace(" ", "", $meta[1]); // on évacue les espaces
    $meta[1] = str_replace("\n", "", $meta[1]); // éventuellement, les sauts de lignes
    $getPosition = explode(",", $meta[1]); // et on éclate
    $meta[2] = str_replace(" ", "", $meta[2]);
    $meta[2] = str_replace("\n", "", $meta[2]);
    $getRelations = explode(",", $meta[2]);

    
    /////////////////////
    // contenu
    /////////////////

    $parser = new Parsedown(); // on parse juste parce que c'est plus facile à regexper, mais on return quand même le markdown (pour contentLow)
    $parsedText = $parser->text($data[1]);
    
    preg_match_all("|<strong>(.*)</strong>|U", $parsedText, $matchTop, PREG_PATTERN_ORDER);
    preg_match_all("|<em>(.*)</em>|U", $parsedText, $matchMiddle, PREG_PATTERN_ORDER);
    
    $contentTop = "";
    $contentMiddle = "";
    $contentLow = $data[1]; // là, donc, le contentLow, c'erst bien le contenu NON parsé

    // echo var_dump($matchTop[3]);
    
    foreach($matchTop[1] as $part){
        $contentTop .= $part."... ";
    }
    foreach($matchMiddle[1] as $part){
        $contentMiddle .= $part."... ";
    }

    $contentArray = array(
        'title' => $getTitle,
        'path' => $path,
        'raw' => $getRawTitle,
        'content' => array(
            'top' => $contentTop,
            'middle' => $contentMiddle,
            'low' => $contentLow
        ),
        'location' => array(
            'latitude' => $getPosition[0],
            'longitude' => $getPosition[1]
        ),
        'relations' => $relationsFormat
    );
    
    return $contentArray;
}


?>

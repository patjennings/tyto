<?php
// header('Content-Type: application/json');

// $rootPath = "http://localhost/tyto";



// getMarkdownContent("zrgzrt", "rty/rty/toto.md");

// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

function getMarkdownContent($content, $file){
    global $conf;
    global $space;
    
    $path = explode("/", $file);
    $path = array_pop($path);
    $path = $conf["baseUrl"].$conf["contentPath"].$space."/content/".$path;

    $data = explode("---", $content);

    /////////////////
    // métadonnées
    //////////////////

    // à chaque titre, on supprime et on remplace par un car. spécial
    $p1 = "/title: /";
    $p2 = "/position: /";
    $p3 = "/created: /";
    $p4 = "/lastupdated: /";
    $p5 = "/tags: /";
    $p6 = "/relations: /";
    
    $removep1 = preg_replace($p1, "{{##}}", $data[0]);
    $removep2 = preg_replace($p2, "{{##}}", $removep1);
    $removep3 = preg_replace($p3, "{{##}}", $removep2);
    $removep4 = preg_replace($p4, "{{##}}", $removep3);
    $removep5 = preg_replace($p5, "{{##}}", $removep4);
    $removep6 = preg_replace($p6, "{{##}}", $removep5);

    // Ce car. spécial, on explode la string avec
    $metaExplode = explode("{{##}}", $removep6);

    $meta = array();

    foreach ($metaExplode as $item) {
        if($item !== ""){
            array_push($meta, $item); // on remplit le tableau des entrées
        }            
    }

    $getTitle = $meta[0];

// 0	""
// 1	"egre\n"
// 2	"36.884577759108716, 25.52793354925575\n"
// 3	"thomas, 2019-05-22 23:32\nlastUpdated: \n"
// 4	"tag1, tag2\n"
// 5	"0\n\n"
    
    // titre raw
    $unwanted_array = getForbiddenChar();
    $getRawTitle = strtr( $getTitle, $unwanted_array);
    $getRawTitle = strtolower($getRawTitle);
    $getRawTitle = str_replace("\n", "", $getRawTitle);

    // positions
    $meta[1] = str_replace(" ", "", $meta[1]); // on évacue les espaces
    $meta[1] = str_replace("\n", "", $meta[1]); // éventuellement, les sauts de lignes
    $getPosition = explode(",", $meta[1]); // et on éclate

    // created
    // $meta[2] = str_replace(" ", "", $meta[2]); // on évacue les espaces
    $meta[2] = str_replace("\n", "", $meta[2]); // éventuellement, les sauts de lignes
    $getCreated = explode(",", $meta[2]); // et on éclate

    // updated
    // $meta[3] = str_replace(" ", "", $meta[3]); // on évacue les espaces
    $meta[3] = str_replace("\n", "", $meta[3]); // éventuellement, les sauts de lignes
    $getLastUpdated = explode(",", $meta[3]); // et on éclate

    // tags
    $meta[4] = str_replace(" ", "", $meta[4]); // on évacue les espaces
    $meta[4] = str_replace("\n", "", $meta[4]); // éventuellement, les sauts de lignes
    $getTags = explode(",", $meta[4]); // et on éclate

    // relations
    $meta[5] = str_replace(" ", "", $meta[5]);
    $meta[5] = str_replace("\n", "", $meta[5]);
    $getRelations = explode(",", $meta[5]);
    
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
    
    foreach($matchTop[1] as $part){
        $contentTop .= $part."... ";
    }
    foreach($matchMiddle[1] as $part){
        $contentMiddle .= $part."... ";
    }

    $contentArray = array(
        'all' => $meta,
        'title' => $getTitle,
        'path' => $path,
        'raw' => $getRawTitle,
        'created' => array(
            'user' => $getCreated[0],
            'date' => $getCreated[1]
        ),
        'lastupdated' => array(
            'user' => $getLastUpdated[0],
            'date' => $getLastUpdated[1]
        ),
        'tags' => $getTags,
        'content' => array(
            'top' => $contentTop,
            'middle' => $contentMiddle,
            'low' => $contentLow
        ),
        'location' => array(
            'latitude' => $getPosition[0],
            'longitude' => $getPosition[1]
        ),
        'relations' => $getRelations
    );
    
    return $contentArray;
}


?>

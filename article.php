<?php
$path = $_GET['path'];
include("includes/Parsedown.php");

$fileContent = file_get_contents($path);
$content = explode("---", $fileContent);
/////////////////
// métadonnées
//////////////////

// à chaque titre, on supprime et on remplace par un car. spécial
$p1 = "/title: /";
$p2 = "/position: /";
$p3 = "/relations: /";
$removep1 = preg_replace($p1, "{{##}}", $content[0]);
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

$Parsedown = new Parsedown();
$parsedText = $Parsedown->text($content[1]);
?>



<!doctype html>
<html class="no-js" lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title><?php echo $getTitle; ?></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="css/all.css" />
            <link rel="stylesheet" type="text/css" href="css/article.css" />

    <!--
	<script src="js/less.min.js" type="text/javascript"></script>
        <script src="js/vendor/modernizr-2.8.3.min.js"></script>
	-->
  </head>
  <body>
    <!--[if lt IE 8]>
        <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
	<![endif]-->

    <div class="container">
      <div class="container-inner">
        <div class="wrapper">
            <div class="row">
            <div class="col-4 span-2">
<h2><?php echo $getTitle; ?></h2>
      	    </div>
          </div>
          <div class="row">
            <div class="col-4 span-2">
<?php echo $parsedText; ?>
      	    </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>



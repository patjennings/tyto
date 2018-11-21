<?php
$title = $_GET['title'];
$content = $_GET['content'];
?>

<h1><?php echo $title; ?></h1>
<p><?php echo utf8_decode($content); ?></p>

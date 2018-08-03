<?php
require __DIR__ . '/vendor/autoload.php';
use League\CommonMark\DocParser;
use League\CommonMark\Environment;
use League\CommonMark\HtmlRenderer;
?>
<html>
 <head>
  <title>PHP Test</title>
 </head>
 <body>
<?php 
$environment = Environment::createCommonMarkEnvironment();
$parser = new DocParser($environment);
$htmlRenderer = new HtmlRenderer($environment);

$markdown = file_get_contents("CHANGLOG.md");
$document = $parser->parse($markdown);
echo $htmlRenderer->renderBlock($document);
?> 
 </body>
</html>

<?php
use League\CommonMark\CommonMarkConverter;
?>
<html>
 <head>
  <title>PHP Test</title>
 </head>
 <body>
<?php 
$converter = new CommonMarkConverter();
echo $converter->convertToHtml('# Hello World!');
?> 
 </body>
</html>

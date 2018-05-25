<?php
   include 'util.php';
   include 'Article.php';

   /** Responds to HTTP GET requests and returns HTML article elements that
    * hold the information of the text files in the directory corresponding to
    * the page being requested.
    * The format of the HTML article element returned is defined by the model
    * class Article.
    */
   if (isset($_GET['pageRequested'])) 
   {
      $nameOfPageRequested = sanitizeString($_GET['pageRequested']);
      $directoryRelativePath = "../content/$nameOfPageRequested";
      $textFilesNames = getListOfTextFiles($directoryRelativePath);
      $articleElementsWithContent = array();
      foreach ($textFilesNames as $filename) 
      {
         $fileContents = file_get_contents("$directoryRelativePath/$filename");
         $article = new Article($fileContents);
         array_push($articleElementsWithContent, $article->getHTML());
      }
      echo json_encode($articleElementsWithContent);
   } 
   else 
   {
      http_response_code(400);
   }
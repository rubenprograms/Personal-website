<?php

   include 'util.php';
   
   /** Responds to HTTP GET requests by returning the contents of the HTML file whose file name is
    *  specified in parameter fileName. The file is supposed to be present in directory reusableHTML.
    */
    $parameterName = "fileName";
    if (isset($_GET[$parameterName])) 
    {
      $fileRequested = $_GET[$parameterName] . ".html";
      $fileContents = file_get_contents("../reusableHTML/$fileRequested");
      echo $fileContents;
    } 
    else 
    {
      http_response_code(400);
    }
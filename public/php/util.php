<?php
   /**
    * Returns a string array with the names of text files in the indicated directory, sorted on 
    * last modification time, with the most recently-modified files first.
    * @param $directory Relative path of directory whose text files' names will be returned.
    * @return Array with names of text files in the indicated directory.
    */
   function getListOfTextFiles($directory) 
   {
      // Get list of all files (sorted on last modification time) in the directory.
      $commandToGetFileList = "cd $directory; ls -t";
      exec($commandToGetFileList, $fileList, $lsReturnValue);
      //If command runs successfully, find the names of the text files:
      $textFiles = array();
      if (!$lsReturnValue) 
      {
         // Get the list of text files in the directory:
         foreach ($fileList as $fileName) 
         {
            if (strchr($fileName, ".txt") != FALSE) 
            {
               array_push($textFiles, $fileName);
            }
         }
      }
      return $textFiles;
   }

   /** Function to add security to the code.
    * This function was copied from the book "Robin Nixon-Learning PHP, MySQL, JavaScript, CSS & HTML5: A Step-by-Step Guide to Creating Dynamic Websites". 
    * Page 412. Third Edition. O'Reilly Media. 2014.
    * Copied on May 15th, 2018.
    */
   function sanitizeString($var) 
   {
      $var = strip_tags($var);
      $var = htmlentities($var);
      return stripslashes($var);
   }
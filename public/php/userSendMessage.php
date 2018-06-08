<?php
   include 'UserMessage.php';
   include 'ServerResponse.php';
   
   /** 
    * Script to be run when user submits a form to send a message to the 
    * website owner. The data is submitted using the POST method.
    */
    if (isset($_POST['sender_name']) && isset($_POST['email_address']) && isset($_POST['message'])) 
    {
      // Create an object representing the message and get the JSON equivalent:
      $name = $_POST['sender_name'];
      $email = $_POST['email_address'];
      $messageText = $_POST['message'];
      $message = new UserMessage($name, mb_convert_encoding($email, 'UTF-8'), $messageText);
      $messageInJSON = $message->getJSON();
      // Generate a meaningful title for the name of file where the message will be stored:
      $currentTime = new DateTime();
      $todaysDate = $currentTime->format('Y_m_d');
      $fileName = "../messagesFromVisitors/" . $todaysDate . "_" . $name . ".txt";
      $file = fopen($fileName, 'a');   
      if ($file == false) 
      {
        $error = new ServerResponse(500, 'Permission denied to send the message.');
        echo $error->getJSON();
      }
      // Store file:
      fwrite($file, $messageInJSON);
      fclose($file);
      $success = new ServerResponse(200, 'Thank you, ' . $name . "! Your message has been sent.");
      echo $success->getJSON();
    }
    else 
    {
      $bad_request = new ServerResponse(400, 'One of the parameters of the POST request was not provided.');
      echo $bad_request->getJSON();
    }
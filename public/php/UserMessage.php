<?php
   /**
    * Represents a message left by a visitor to the website. The message includes the name and
    * email address of the sender, and, of course, the text of the message.
    */
   class UserMessage 
   {
      private $senderName;
      private $senderEmail;
      private $messageText;

      /**
       * Builds this user message from the provided name, email, and content.
       * @param name    Name of the message's author.
       * @param email   Email account of the message's author.
       * @param content  Content of the message.
       */
      public function __construct($name, $email, $content) 
      {
         $this->senderName = $name;
         $this->senderEmail = $email;
         $this->messageText = $content;
      }

      /**
       * Returns the JSON equivalent of this UserMessage.
       */
      public function getJSON() 
      {
         return json_encode(get_object_vars($this));
      }
   }
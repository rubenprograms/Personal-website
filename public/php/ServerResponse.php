<?php
   /**
    * Models a response from the server after a request has been sent to it. The server responds
    * with an HTTP code and with text, and methods for accessing both of these values are provided.
    */
    class ServerResponse 
    {
       private $responseCode;
       private $responseText;

       /**
        * Builds this ServerResponse with the provided code and the provided text.
        * @param code   Code for the status of the request made to the server.
        * @param text   Detailed message of the result of the request made to the server.
        */
       public function __construct ($code, $text) 
       {
         $this->responseCode = $code;
         $this->responseText = $text;
       }

       /**
        * Returns this response's status code.
        * @param  The response's status code.
        */
       public function getCode() 
       {
          return $this->code;
       }

       /**
        * Returns this response's text.
        * @param  The response's text.
        */
       public function getText() 
       {
          return $this->text;
       }

       /**
        * Returns the JSON representation of this object.
        * @return the JSON representation of this object.
        */
        public function getJSON() {
          return json_encode(get_object_vars($this));
        }
    }
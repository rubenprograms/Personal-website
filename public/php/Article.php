<?php
   /** Represents an HTML article element that will be used for displaying content
    * in the website.
    */
   class Article 
   {
      private $theTitle;
      private $theDate;
      private $text;

      /**
       * Builds this Article with the provided JSON string.
      * @param $data     JSON string with the data necessary to initialize this Article. The following
      *                  properties should be present in the JSON string: title, date, and content - all
      *                  with values of type string.
      */
      public function __construct($data) 
      {
         $dataObject = json_decode($data);
         $this->theTitle = $dataObject->{'title'};
         $this->theDate = $dataObject->{'date'};
         $this->text = $dataObject->{'content'};
      }

      /**
       * Returns the HTML equivalent that is used for displaying this article on the website.
       */
      public function getHTML() 
      {
         $textVersionOfDate = new DateTime($this->theDate, new DateTimeZone("America/Los_Angeles"));
         $textVersionOfDate = $textVersionOfDate->format('F j, Y');
         return "<article>
                  <h3>$this->theTitle</h3>
                  <div class='date-below-title'> 
                     <time datetime='$this->theDate'>$textVersionOfDate</time>
                     <br style='clear:both'/>
                  </div>
                  <p>
                     $this->text
                  </p>
               </article>";
         }
   }
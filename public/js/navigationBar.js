/** 
 * Loads the content for the home page of the website.
 * 
 * This function is called when the navigation bar's item corresponding to the home page is clicked.
 * An Ajax request is made to retrieve the content of the home page and, upon response from the server,
 * the content is placed in the appropriate HTML element.
 */
function loadHomeContent() {
   var requestObject = getXMLHttpRequestObject();
   // Make Ajax request.
   // TODO IMPLEMENT


   // Use response text for the content of the page:
   var id = "main-content";
   var mainContentElement = document.getElementById(id);
   if (mainContentElement == null) {
      alert("No element with ID " + id + " in current document!");
   } else {
      // TODO Implement: use response text to set content of page.
   }
}

/** 
 * Returns an XMLHttpRequest object, if possible.
 * 
 * Attempts at creating and returning a new XMLHttpRequest object in a browser-independent
 * fashion. If Ajax is not supported by the browser, false is returned.
 * 
 * @return  any   An XMLHttpRequest object if the browser supports Ajax. False, otherwise.
 */
function getXMLHttpRequestObject() {
   var request;
   try {
      request = new XMLHttpRequest(); // Works for non-IE browsers.
   } catch (noSupportForFunctionXMLHttpRequest) {
      try {
         request = new ActiveXObject("Msxml2.XMLHTTP"); // Works for IE+6 browsers.
      } catch (noSupportActiveXObjectWithMsxml2XMLHTTP) {
         try {
            request = new ActiveXObject("Microsoft.XMLHTTP"); // Works for IE5 browser.
         } catch (noSupportActiveXObjectWithMicrosoftXMLHTTP) {
            request = false; // No Ajax support.
         }
      }
   }
   return request;
}
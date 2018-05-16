/** 
 * Loads the content for the home page of the website.
 * 
 * This function is called when the navigation bar's item corresponding to the home page is clicked. Helper
 * function loadContent is called.
 */
function loadHomeContent() {
   loadContent("home");  
}

/** 
 * Loads the content for the about page of the website.
 * 
 * This function is called when the navigation bar's item corresponding to the about page is clicked. Helper
 * function loadContent is called.
 */
function loadAboutContent() {
   loadContent("about");
}

/** 
 * Loads the content for the specified page of the website.
 * 
 * This function is called when the navigation bar's item corresponding to page pageName is clicked.
 * An Ajax request is made to retrieve the content of the page and, upon response from the server,
 * the content is placed in the appropriate HTML element.
 * @param   pageName    Name of the page whose contents are to be retrieved from the server and displayed.
 */
function loadContent(pageName) {
   var requestObject = getXMLHttpRequestObject();
   if (requestObject == false) {
      // TODO Implement
      // 1. Display an alert saying no content could be loaded because Ajax
      // is not supported. 

      // 2. Modify content of element with ID main-content to empty.
   }
   // Make Ajax request. Parameter noCache is sent - with a different value every time - 
   // to workaround the caching of GET requests, which can produce unupdated returns from the
   // server.
   var noCache = "noCache=" + Math.random() * 1000;
   requestObject.open("GET", "../php/loadContent.php?pageRequested="+ pageName + "&" + noCache, true);
   requestObject.onreadystatechange = updateMainContent;
   requestObject.send(null);
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

/**
 * Call-back for the change of the onreadystatechange property of the XMLHttpRequest object used for
 * the loading of the website's contents.
 */
function updateMainContent() {
   if (this.readyState == 4) {
      if (this.status == 200) {
         if (this.responseText != null) {
            var response = JSON.parse(this.responseText);
            document.getElementById('main-content').innerHTML = response.join('\n');
         } else {
            alert("Ajax error: No data received");
         }
      } else {
         alert( "Ajax error: " + this.statusText);
      }
   }
}
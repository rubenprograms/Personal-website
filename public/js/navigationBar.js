/** 
 * Loads the content for the home page of the website.
 */
function loadHomeContent() {
   loadContent("home");  
}

/** 
 * Loads the content for the about page of the website.
 */
function loadAboutContent() {
   loadContent("about");
}

/**
 * Loads the content for the experience page of the website.
 */
function loadExperienceContent() {
   loadContent("experience");
   initializeForm();
}

/**
 * Sets the appropriate event handlers for the elements in the form to respond to
 * user input.
 */
function initializeForm() {
   var sendMessageInForm = document.getElementById("send-message-button");
   sendMessageInForm.onclick = attemptSendingMessage;
}

/**
 * Empties all fields in the form in the Experience webpage.
 */
function emptyFieldsInForm() {
   var formFields = document.getElementsByClassName("form-field");
   for (let field of formFields) {
      field.value = "";
   }
}

/**
 * Makes POST request to the server if all the fields in the form have been filled out.
 */
function attemptSendingMessage() {
   var formFields = document.getElementsByClassName("form-field");
   var someFieldIsEmpty = false;
   for (let field of formFields) {
      if (field.value.length == 0) {
         someFieldIsEmpty = true;
      }
   }
   if (someFieldIsEmpty) {
      window.alert("Please fill out all fields in the form.");
   } else {
      sendMessage();
   } 
}

/**
 * Sends the data in the form provided in the experience webpage.
 */
function sendMessage() {
   // Send message to server:
   var request = getXMLHttpRequestObject();
   if (request == false) {
      window.alert("Ajax is not supported by your browser. The message cannot be sent.");
   } else {
      // Get the input fields in the form:
      var formFields = document.querySelectorAll("#send-message-form > .form-field");
      document.selec
      var parameters = "";
      for (let field of formFields) {
         parameters += field.getAttribute("name") + "=" + field.value + "&";
      }
      parameters = parameters.substr(0, parameters.length - 1);
      request.open("POST", "php/userSendMessage.php", true);
      request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      request.onreadystatechange = sendMessageServerResponse;
      request.send(parameters);
   }
}

/**
 * Checks the response sent by the server when the send operation has been fully processed (completed).
 * Displays an alert with an appropriate message based on the response from the server.
 */
function sendMessageServerResponse() {
   if (this.readyState == 4) {
      if (this.status == 200) {
         if (this.responseText != null) {
            var response = JSON.parse(this.responseText);
            window.alert(response.responseText);
            emptyFieldsInForm();
         } else {
            alert("Ajax error: No data received");
         }
      } else {
         alert( "Ajax error. Status " + this.status + ": " + this.statusText);
      }
   }
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
      document.alert("The current browser does not support Ajax; no content can be loaded.");
      document.getElementById('main-content').innerHTML = "";
   } else {
      // Make Ajax request. Parameter noCache is sent - with a different value every time - 
      // to workaround the caching of GET requests, which can produce unupdated returns from the
      // server.
      var noCache = "&noCache=" + Math.random() * 1000;
      requestObject.open("GET", "php/loadContent.php?pageRequested="+ pageName + noCache, true);
      requestObject.onreadystatechange = updateMainContent;
      requestObject.send(null);
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
         alert( "Ajax error. Status " + this.status + ": " + this.statusText);
      }
   }
}

/**
 * Inserts the navigation bar common to all pages in the website into the calling webpage.
 */
function loadNavigationBar() {
   var request = getXMLHttpRequestObject();
   if (request == false) {
      window.alert("Ajax not supported by this browser. Loading navigation bar failed.");
   }
   var noCache = "&noCache=" + (Math.random() * 1000);
   var fileName = "navigationBar";
   request.open("GET", "php/getReusableHTML.php?fileName=" + fileName + noCache);
   request.onreadystatechange = insertNavigationBar; 
   request.send(null);
}

/**
 * Callback for the onreadystatechange property of the XMLHttpRequest object used for 
 * loading the navigation bar into the webpage.
 */
function insertNavigationBar () {
   if (this.readyState == 4) {
      if (this.status == 200) {
         if (this.responseText != null) {
            var navBar = document.getElementById("navigation-bar");
            if (navBar == null) {
               window.alert("No section for navigation bar is present in the HTML file!");
            } else {
               navBar.innerHTML = this.responseText;
            }
         } else {
            alert("Ajax error: No data received");
         }
      } else {
         alert( "Ajax error. Status " + this.status + ": " + this.statusText);
      }
   }
}
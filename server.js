var express = require('express');
var app = express();

var portNumber = 3000;
app.listen(portNumber, function() { console.log("Server is listening on port " + portNumber);}
);

app.get
('/', function(request, response)
   {
      response.send("The index of the website should be displayed here.");
   }
);

app.get
('/about', function(request, response)
   {
      response.send("The about section of the website should be displayed here.");
   }
);

app.get
('/posts', function(request, response)
   {
      response.send("The posts of the website, ordered from newest to oldest, should be displayed here.");
   }
);

app.post
('/comment', function(request, response)
   {
      response.send("A comment to a post should be posted, and the user should see it was indeed posted.");
   }
);
const path = require('path');

exports.renderHomePage = function (req, res) {
   const filePath = path.join(process.cwd(), 'index.html');
   console.log("Attempting to render home page: " + filePath);
   res.sendFile(filePath);
}